/** Authenticated v8 transport. Tokens are POST body-only and never cached by the service worker. */
const API_TIMEOUT_MS=45000;
const NET_ERROR='ยังยืนยันผลจากเซิร์ฟเวอร์ไม่ได้ ตรวจสอบการเชื่อมต่อแล้วลองอีกครั้ง';
const pendingReads=new Map();
async function fetchWithTimeout(url,opts={},ms=API_TIMEOUT_MS){const ctrl=new AbortController();window.__apiAbort=ctrl;const timer=setTimeout(()=>ctrl.abort(),ms);try{return await fetch(url,{...opts,signal:ctrl.signal,cache:'no-store'});}catch(e){const err=new Error(NET_ERROR);err.code='NETWORK_UNCERTAIN';throw err;}finally{clearTimeout(timer);if(window.__apiAbort===ctrl)window.__apiAbort=null;}}
async function apiRequest(action,data={},method='POST'){
 const started=Date.now();
 const session=typeof getSession==='function'?getSession():null;
 const body={...data,action,_method:method,token:session?.token||''};
 const response=await fetchWithTimeout(CONFIG.API_URL,{method:'POST',redirect:'follow',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(body)},data.items||data.receipts||data.signatureBase64?120000:API_TIMEOUT_MS);
 if(!response.ok){const e=new Error('เซิร์ฟเวอร์ตอบกลับไม่สำเร็จ ('+response.status+')');e.code='NETWORK_UNCERTAIN';throw e;}
 let result;try{result=await response.json();}catch(error){const e=new Error('ไม่สามารถอ่านผลจากเซิร์ฟเวอร์ กรุณาตรวจสอบการติดตั้ง Backend');e.code='NETWORK_UNCERTAIN';throw e;}
 if(session?.token&&session.token!==getSession()?.token){const e=new Error('บัญชีเปลี่ยนแล้ว กรุณาโหลดใหม่');e.code='STALE_SESSION';throw e;}
 if(result?.error){const e=new Error(result.error);e.code=result.code||'REQUEST_FAILED';if(e.code==='AUTH_REQUIRED'){clearSession();if(!location.pathname.endsWith('/index.html')&&!location.pathname.endsWith('/')){sessionStorage.setItem('exion_return_to',location.pathname.split('/').pop()+location.search);location.href='index.html';}}throw e;}
 performanceSamples.push({action,ms:Date.now()-started,serverMs:result?.serverMs??null,at:new Date().toISOString()});if(performanceSamples.length>80)performanceSamples.shift();try{sessionStorage.setItem('exion_perf:'+CONFIG.API_URL,JSON.stringify(performanceSamples));}catch(e){}
 return result;
}
// Coalesce reads started together. No completed financial data is cached here.
let readQueue=[],readTimer=null,batchAvailable=true;
function networkRead(action,params={}){
 if(action==='getReceiptImage')return apiRequest(action,params,'GET');
 const token=typeof getSession==='function'?getSession()?.token||'':'';
 const key=token+':'+action+JSON.stringify(params);
 if(pendingReads.has(key))return pendingReads.get(key);
 const request=new Promise((resolve,reject)=>{
  readQueue.push({action,params,token,resolve,reject});
  if(readTimer===null)readTimer=setTimeout(flushReadQueue,0);
 }).finally(()=>{if(pendingReads.get(key)===request)pendingReads.delete(key);});
 pendingReads.set(key,request);return request;
}
async function flushReadQueue(){
 const queue=readQueue;readQueue=[];readTimer=null;
 const current=typeof getSession==='function'?getSession()?.token||'':'';
 const reads=queue.filter(r=>{if(r.token===current)return true;const e=new Error('บัญชีเปลี่ยนแล้ว กรุณาโหลดใหม่');e.code='AUTH_REQUIRED';r.reject(e);return false;});
 for(let i=0;i<reads.length;i+=12){
  const group=reads.slice(i,i+12);
  const individual=()=>Promise.all(group.map(r=>apiRequest(r.action,r.params,'GET').then(r.resolve,r.reject)));
  if(!batchAvailable||group.length===1||!current){await individual();continue;}
  try{
   const result=await apiRequest('batchRead',{requests:group.map(r=>({action:r.action,params:r.params}))},'GET');
   if(!Array.isArray(result?.results)||result.results.length!==group.length)throw new Error('รูปแบบข้อมูลชุดคำขอไม่ถูกต้อง');
   result.results.forEach((item,n)=>{
    if(item.error){const e=new Error(item.error);e.code=item.code||'REQUEST_FAILED';group[n].reject(e);}
    else group[n].resolve(item.value);
   });
  }catch(e){
   // Compatibility during rollout: retry reads only when the old backend rejects this action.
   if(e.code==='VALIDATION'&&e.message==='ไม่รองรับคำสั่งนี้'){batchAvailable=false;await individual();}
   else group.forEach(r=>r.reject(e));
  }
 }
}
async function apiPost(action,body={}){const writes=!['getReceiptImage'].includes(action);if(writes)invalidateReadSnapshots();try{return await apiRequest(action,body,'POST');}finally{if(writes){invalidateReadSnapshots();if(typeof Event==='function'&&typeof window.dispatchEvent==='function')window.dispatchEvent(new Event('exion:write'));}}}

// Per-tab snapshots; never used for roles, approval details, previews or writes.
const SNAPSHOT_ACTIONS=new Set(['getCategories','getPettyCategories','getMyRequests','getMyExportRequests','getPendingApprovals','getExportApprovalInbox','getPettyInbox','getPettyHome','getPettyLedger','getMyTeam','getMyTeamRequests','getAllRequests','getVisibleRequests','getCustomers','getFuelRate','getMyApprover','getUnpaidExports','getPettyMSBC','getMyNotifications','getExportableStaff']);
const SNAPSHOT_KEY='exion_snapshots_v85:'+CONFIG.API_URL;
let snapshotEpoch=0,snapshotBypass=false;
try{snapshotBypass=sessionStorage.getItem(SNAPSHOT_KEY+':refresh')==='1';sessionStorage.removeItem(SNAPSHOT_KEY+':refresh');}catch(e){}
let performanceSamples=[];try{performanceSamples=JSON.parse(sessionStorage.getItem('exion_perf:'+CONFIG.API_URL)||'[]');if(!Array.isArray(performanceSamples))performanceSamples=[];}catch(e){}
function snapshotNotice(detail){if(typeof CustomEvent==='function')window.dispatchEvent(new CustomEvent('exion:data-status',{detail}));}
function invalidateReadSnapshots(broadcast=true){snapshotEpoch++;pendingReads.clear();try{sessionStorage.removeItem(SNAPSHOT_KEY);if(broadcast&&typeof localStorage!=='undefined')localStorage.setItem(SNAPSHOT_KEY+':changed',Date.now()+':'+Math.random());}catch(e){}}
if(typeof window.addEventListener==='function')window.addEventListener('storage',e=>{if(e.key===SNAPSHOT_KEY+':changed'){invalidateReadSnapshots(false);snapshotNotice({state:'changed',at:null});}});
function readSnapshots(){try{const s=JSON.parse(sessionStorage.getItem(SNAPSHOT_KEY)||'null');return s&&s.owner===getSession()?.token?s.entries:{};}catch(e){return {};}}
function saveSnapshot(key,value,token,epoch){
 if(epoch!==snapshotEpoch||token!==getSession()?.token)return;
 try{const entries=readSnapshots(),now=Date.now();entries[key]={value,at:now};
  Object.keys(entries).forEach(k=>{if(now-entries[k].at>120000)delete entries[k];});
  let text=JSON.stringify({owner:token,entries});
  while(text.length>800000&&Object.keys(entries).length){const oldest=Object.keys(entries).sort((a,b)=>entries[a].at-entries[b].at)[0];delete entries[oldest];text=JSON.stringify({owner:token,entries});}
  sessionStorage.setItem(SNAPSHOT_KEY,text);
 }catch(e){} // Storage quota/private mode: fall back to network.
}
function apiGet(action,params={}){
 if(!SNAPSHOT_ACTIONS.has(action)||!getSession())return networkRead(action,params);
 const key=action+JSON.stringify(params),token=getSession().token,epoch=snapshotEpoch;
 const hit=snapshotBypass?null:readSnapshots()[key];
 const fresh=networkRead(action,params).then(value=>{saveSnapshot(key,value,token,epoch);return value;});
 if(hit&&Date.now()-hit.at<120000){
  snapshotNotice({state:'cached',at:hit.at});
  fresh.then(()=>snapshotNotice({state:'ready',at:hit.at})).catch(e=>{
   if(e.code==='AUTH_REQUIRED'||e.code==='FORBIDDEN'){invalidateReadSnapshots();clearSession();location.href='index.html';return;}
   snapshotNotice({state:'error',at:hit.at});
  });
  return Promise.resolve(hit.value);
 }
 return fresh;
}
function refreshWorkspaceData(){try{sessionStorage.setItem(SNAPSHOT_KEY+':refresh','1');}catch(e){}location.reload();}
function getExpensePerformance(){return performanceSamples.slice();}

// --- Specific endpoints ---
// ⚠️ fetchStaff() removed for security — use verifyStaff(email) instead
async function verifyStaff(email) { return apiGet('verifyStaff', { email }); }
async function fetchCategories() { return apiGet('getCategories'); }
async function fetchMyRequests(email) { return apiGet('getMyRequests', { email }); }
async function fetchRequest(id) { return apiGet('getRequest', { id }); }
async function submitExpense(payload) { return apiPost('submit', payload); }
async function submitBatch(payload) { return apiPost('submit', payload); }
async function submitPreApprove(payload) { return apiPost('submitPreApprove', payload); }
async function finalizeClaim(payload) { return apiPost('finalizeClaim', payload); }
async function managerApprove(payload) { return apiPost('managerApprove', payload); }
async function seniorApprove(payload) { return apiPost('seniorApprove', payload); }
async function fetchManagerInbox(email) { return apiGet('getManagerInbox', { email }); }
async function fetchSeniorInbox(email) { return apiGet('getSeniorInbox', { email }); }
async function fetchMyTeam(email) { return apiGet('getMyTeam', { email }); }
async function fetchMyTeamRequests(email) { return apiGet('getMyTeamRequests', { email }); }
async function fetchAllRequests(email) { return apiGet('getAllRequests', { email }); }
async function fetchMyRole(email) { return apiGet('getMyRole', { email }); }
async function fetchCustomers(email) { return apiGet('getCustomers', { email }); }
async function approveRequest(payload) { return apiPost('approve', payload); }
async function fetchReceiptImage(id, viewerEmail, fileIndex) {
  // fileIndex = ใบเสร็จใบที่เท่าไหร่ (0-based) สำหรับคำขอที่แนบหลายไฟล์
  return apiPost('getReceiptImage', { id, viewerEmail, fileIndex: fileIndex || 0 });
}
// ── v6.0 แจ้งเตือนในแอป (แทนอีเมล) ──
async function fetchNotifications(email) { return apiGet('getMyNotifications', { email }); }
async function markNotifRead(email, id)  { return apiPost('markNotificationRead', { email, id }); }
async function markAllNotifRead(email)   { return apiPost('markNotificationRead', { email, all: true }); }

// ── v6.0 หัวหน้า/GM ล้างรหัสผ่านให้ลูกน้อง (ไม่มีเมล reset แล้ว) ──
async function adminResetPassword(requesterEmail, targetEmail) {
  return apiPost('adminResetPassword', { requesterEmail, targetEmail });
}

// ── v6.0 ปิดลูป: ทำเครื่องหมายว่าจ่ายเงินแล้ว ──
async function fetchUnpaidExports(email) { return apiGet('getUnpaidExports', { email }); }
async function markExportPaid(requesterEmail, exportId) {
  return apiPost('markExportPaid', { requesterEmail, exportId });
}

async function fetchFuelRate(email) {
  return apiGet('getFuelRate', { email });
}
async function fetchPendingApprovals(email) {
  return apiGet('getPendingApprovals', { email });
}
async function checkIsGM(email) {
  return apiGet('isGM', { email });
}
async function exportStaffReport(payload) {
  return apiPost('exportStaffReport', payload);
}
async function emailStaffReport(payload) {
  return apiPost('emailStaffReport', payload);
}
async function loginWithPassword(emailOrPayload, password) {
  if (typeof emailOrPayload === 'object') return apiPost('login', emailOrPayload);
  return apiPost('login', { email: emailOrPayload, password });
}
async function checkUser(email) {
  return apiGet('checkUser', { email });
}
async function setPassword(emailOrPayload, password, confirmPassword) {
  if (typeof emailOrPayload === 'object') return apiPost('setPassword', emailOrPayload);
  return apiPost('setPassword', { email: emailOrPayload, password, confirmPassword });
}
async function requestPasswordReset(emailOrPayload) {
  if (typeof emailOrPayload === 'object') return apiPost('requestReset', emailOrPayload);
  return apiPost('requestReset', { email: emailOrPayload });
}
async function resetPassword(emailOrPayload, token, newPassword, confirmPassword) {
  if (typeof emailOrPayload === 'object') return apiPost('resetPassword', emailOrPayload);
  return apiPost('resetPassword', { email: emailOrPayload, token, newPassword, confirmPassword });
}

// Aliases for backward compatibility (some pages call without 'fetch' prefix)
async function getMyRole(email) { return apiGet('getMyRole', { email }); }
async function fetchCustomerHistory(email) { return apiGet('getCustomers', { email }); }

// ✨ Signature — save once, use everywhere
async function saveSignature(email, signatureBase64) {
  return apiPost('saveSignature', { email, signatureBase64 });
}
async function getMySignature(email) {
  return apiGet('getMySignature', { email });
}

// --- File helpers ---
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ── 💵 Petty Cash ── */
async function fetchPettyHome(email, fundId)   { return apiGet('getPettyHome', { email, fundId: fundId || '' }); }
async function fetchPettyLedger(email, fundId, scope) { return apiGet('getPettyLedger', { email, fundId: fundId || '', scope: scope || '' }); }
async function fetchPettyInbox(email, fundId)  { return apiGet('getPettyInbox', { email, fundId: fundId || '' }); }
async function fetchPettyCategories()          { return apiGet('getPettyCategories', {}); }
async function submitPetty(payload)            { return apiPost('submitPetty', payload); }
async function approvePetty(payload)           { return apiPost('approvePetty', payload); }
async function payPetty(payload)               { return apiPost('payPetty', payload); }
async function cancelPetty(payload)            { return apiPost('cancelPetty', payload); }
async function requestPettyTopUp(payload)      { return apiPost('requestPettyTopUp', payload); }
async function submitPettyCount(payload)       { return apiPost('submitPettyCount', payload); }
async function fetchPettyMSBC(email, opt) {
  opt = opt || {};
  return apiGet('getPettyMSBC', {
    email, fundId: opt.fundId || '', dateFrom: opt.dateFrom || '', dateTo: opt.dateTo || '',
    includePending: opt.includePending === false ? 'false' : 'true'
  });
}
async function exportPettyMSBC(payload)        { return apiPost('exportPettyMSBC', payload); }
async function setPettyFundConfig(payload)     { return apiPost('setPettyFundConfig', payload); }
async function clearPettyBills(payload)        { return apiPost('clearPettyBills', payload); }

/* ── 📋 Export รายการคำขอเป็น Excel ── */
async function fetchExportableStaff(email) { return apiGet('getExportableStaff', { email }); }
async function exportRequestList(payload)  { return apiPost('exportRequestList', payload); }
