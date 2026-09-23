/** Authenticated v8 transport. Tokens are POST body-only and never cached by the service worker. */
const API_TIMEOUT_MS=45000;
const NET_ERROR='ยังยืนยันผลจากเซิร์ฟเวอร์ไม่ได้ ตรวจสอบการเชื่อมต่อแล้วลองอีกครั้ง';
const pendingReads=new Map();
async function fetchWithTimeout(url,opts={},ms=API_TIMEOUT_MS){const ctrl=new AbortController();window.__apiAbort=ctrl;const timer=setTimeout(()=>ctrl.abort(),ms);try{return await fetch(url,{...opts,signal:ctrl.signal,cache:'no-store'});}catch(e){const err=new Error(NET_ERROR);err.code='NETWORK_UNCERTAIN';throw err;}finally{clearTimeout(timer);if(window.__apiAbort===ctrl)window.__apiAbort=null;}}
async function apiRequest(action,data={},method='POST'){
 const session=typeof getSession==='function'?getSession():null;
 const body={...data,action,_method:method,token:session?.token||''};
 const response=await fetchWithTimeout(CONFIG.API_URL,{method:'POST',redirect:'follow',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(body)},data.items||data.receipts||data.signatureBase64?120000:API_TIMEOUT_MS);
 if(!response.ok){const e=new Error('เซิร์ฟเวอร์ตอบกลับไม่สำเร็จ ('+response.status+')');e.code='NETWORK_UNCERTAIN';throw e;}
 let result;try{result=await response.json();}catch(error){const e=new Error('ไม่สามารถอ่านผลจากเซิร์ฟเวอร์ กรุณาตรวจสอบการติดตั้ง Backend');e.code='NETWORK_UNCERTAIN';throw e;}
 if(result?.error){const e=new Error(result.error);e.code=result.code||'REQUEST_FAILED';if(e.code==='AUTH_REQUIRED'){clearSession();if(!location.pathname.endsWith('/index.html')&&!location.pathname.endsWith('/')){sessionStorage.setItem('exion_return_to',location.pathname.split('/').pop()+location.search);location.href='index.html';}}throw e;}
 return result;
}
// Coalesce reads started together. No completed financial data is cached here.
let readQueue=[],readTimer=null,batchAvailable=true;
function apiGet(action,params={}){
 if(action==='getReceiptImage')return apiRequest(action,params,'GET');
 const token=typeof getSession==='function'?getSession()?.token||'':'';
 const key=token+':'+action+JSON.stringify(params);
 if(pendingReads.has(key))return pendingReads.get(key);
 const request=new Promise((resolve,reject)=>{
  readQueue.push({action,params,token,resolve,reject});
  if(readTimer===null)readTimer=setTimeout(flushReadQueue,0);
 }).finally(()=>pendingReads.delete(key));
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
function apiPost(action,body={}){return apiRequest(action,body,'POST');}

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
