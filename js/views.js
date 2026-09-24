window.EXION_VIEWS={};window.EXION_SHARED=[];
window.EXION_SHARED.push(function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){
/**
 * Configuration
 * Exionth Expense Claim System
 */
const CONFIG = {
  // Apps Script Web App URL
  API_URL: 'https://script.google.com/macros/s/AKfycbweiUphd2aO4ESBgFMQF7AreHy-s0eEoYouBvtXxFHQRBlEhaywtLfVT66BKT_aC71w/exec',


  COMPANY_NAME: 'Exionth Co., Ltd.',
  CURRENCY: 'THB',

  WEB_APP_BASE: window.location.origin + window.location.pathname.replace(/[^/]*$/, '')
};

;
/**
 * SVG icon library (inline strings for performance)
 * Based on Lucide icon set
 */
const ICONS = {
  back: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>',
  plus: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
  list: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>',
  receipt: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/></svg>',
  check: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  x: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  camera: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>',
  lock: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  logout: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>',
  inbox: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
  user: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  // category icons
  car: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>',
  fuel: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>',
  road: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19 8 5"/><path d="m16 5 4 14"/><path d="M12 5v2"/><path d="M12 11v2"/><path d="M12 17v2"/></svg>',
  phone: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>',
  utensils: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>',
  golf: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1Z"/><path d="M10 10V5a1 1 0 0 1 1-1h10l-3 3 3 3H11a1 1 0 0 1-1-1Z"/><path d="M10 15v-5"/><circle cx="9" cy="20" r="1"/></svg>',
  parking: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="3"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>',
  home: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  hotel: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v18Z"/><path d="M6 12h12"/><path d="M6 6h12"/><path d="M6 18h12"/></svg>',
  plane: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
  globe: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
  more: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>',
  bell: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>'
};

// Map category codes to icon keys
const CATEGORY_ICONS = {
  CAR: 'car', FUEL: 'fuel', EXPRESS: 'road', MOBILE: 'phone',
  ENT: 'utensils', GOLF: 'golf', PARK: 'parking', APT: 'home',
  HOTEL: 'hotel', TRAVEL: 'plane', OVERSEAS: 'globe', OTHER: 'more'
};

function icon(name) { return ICONS[name] || ''; }
function categoryIcon(code) { return icon(CATEGORY_ICONS[code] || 'receipt'); }

// Generate initials from name
function initials(name) {
  if (!name) return '?';
  const parts = name.replace(/['"]/g, '').trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length-1][0]).toUpperCase();
}

;
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

;
/**
 * app.js
 * Shared client-side logic + lightweight session via localStorage
 */

const SESSION_KEY = 'exionth_session';

function getSession() {
  try { const s=JSON.parse(sessionStorage.getItem(SESSION_KEY)||'null'); return s && s.token && Number(s.expiresAt)>Date.now() ? s : null; }
  catch { return null; }
}

function setSession(staff) {
  if(getSession()?.token!==staff.token&&typeof invalidateReadSnapshots==='function')invalidateReadSnapshots();
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(staff));
  if(typeof window.EXION_SPA!=='undefined')queueMicrotask(()=>window.dispatchEvent(new Event('exion:session')));
  localStorage.removeItem(SESSION_KEY);
}

function clearSession() {
  if(typeof invalidateReadSnapshots==='function')invalidateReadSnapshots();
  sessionStorage.removeItem(SESSION_KEY);
  if(typeof window.EXION_SPA!=='undefined')queueMicrotask(()=>window.dispatchEvent(new Event('exion:session')));
  localStorage.removeItem(SESSION_KEY);
}

function requireLogin() {
  const sess = getSession();
  if (!sess) {
    sessionStorage.setItem('exion_return_to', location.pathname.split('/').pop()+location.search);
    window.location.href = 'index.html';
    return null;
  }
  return sess;
}

function formatCurrency(n) {
  if (!n && n !== 0) return '-';
  return Number(n).toLocaleString('en-US', {
    minimumFractionDigits: 2, maximumFractionDigits: 2
  });
}

/**
 * แปลงค่าวันที่เป็น "YYYY-MM-DD" ตามเวลาไทยเสมอ — ใช้กับ <input type="date">
 *
 * ⚠️ ห้ามใช้ String(v).substr(0,10) กับค่าที่มาจาก server
 *    Apps Script ส่ง Date กลับมาเป็น ISO แบบ UTC เช่น "2026-08-25T17:00:00.000Z"
 *    ซึ่งจริงๆ คือ 26 ส.ค. 07:00 น. เวลาไทย → substr จะได้ 25 ส.ค. คือ "ถอยหลัง 1 วัน"
 *    เคยทำให้วันตัดรอบเลื่อนเองและบิลวันสุดท้ายถูกนับซ้ำ
 */
function toYMD(v) {
  if (!v) return '';
  const s = String(v);
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;          // เป็นรูปแบบที่ต้องการอยู่แล้ว
  const d = new Date(s);
  if (isNaN(d)) return '';
  try {
    // en-CA ให้รูปแบบ YYYY-MM-DD พอดี
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(d);
  } catch (e) {
    const p = n => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }
}
function todayYMD() { return toYMD(new Date()); }

function formatDate(d) {
  if (!d) return '-';
  const dt = new Date(d);
  if (isNaN(dt)) return d;
  return dt.toLocaleString('th-TH', {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'Asia/Bangkok'
  });
}

/** ชื่อสถานะภาษาไทย — ใช้ร่วมกันทุกหน้า */
const STATUS_TH = {
  pending:    '⏳ รออนุมัติ',
  approved:   '✅ อนุมัติแล้ว',
  rejected:   '❌ ไม่อนุมัติ',
  finalized:  '✓ ส่งบิลแล้ว',
  preapprove: '📋 รออนุมัติงบ'
};
/**
 * กล่อง "โหลดไม่สำเร็จ" มาตรฐาน — มีปุ่มลองใหม่เสมอ
 * 🔴 ก่อนหน้านี้ 8 หน้าเขียนกล่อง error เองคนละแบบ และเป็นทางตัน
 *    ผู้ใช้เจอเน็ตกระตุกทีเดียวต้องปิดแอปเปิดใหม่
 * 🔴 4 หน้าลืม classList.remove('loading') ด้วย กล่องเลยเว้นว่างเบ้อเริ่ม
 * ใช้ textContent กับข้อความ error — ถ้าหลังบ้านส่งอะไรแปลกมาก็ไม่กลายเป็น HTML
 */
function renderError(el, message, onRetry) {
  const c = typeof el === 'string' ? document.getElementById(el) : el;
  if (!c) return;
  c.classList.remove('loading');
  const box = document.createElement('div');
  box.className = 'empty';
  box.innerHTML = '<div class="icon-wrap">⚠️</div>' +
                  '<div class="title">โหลดไม่สำเร็จ</div><div class="sub"></div>';
  box.querySelector('.sub').textContent = message || 'ไม่ทราบสาเหตุ';
  if (typeof onRetry === 'function') {
    const b = document.createElement('button');
    b.className = 'btn btn-secondary btn-sm';
    b.style.cssText = 'margin-top:14px;max-width:200px;';
    b.textContent = '🔄 ลองใหม่';
    b.addEventListener('click', onRetry);
    box.appendChild(b);
  }
  c.innerHTML = '';
  c.appendChild(box);
}

/* ═══════════ ชื่อประเภทค่าใช้จ่าย — แหล่งเดียวของทั้งระบบ ═══════════
 * 🔴 เคยก๊อปตารางนี้ไว้ 9 หน้า แล้วแก้ไม่ครบ จน EXPRESS กลายเป็น "ทางด่วน"
 *    ทั้งที่ Code.gs และไฟล์ Excel ที่ส่งบัญชีใช้ "ขนส่ง" มาตลอด
 *    บางหน้าถึงขั้นมี TOLL กับ EXPRESS ชื่อ "ทางด่วน" เหมือนกันทั้งคู่ แยกไม่ออก
 * ⚠️ ต้องตรงกับ REQ_EXPORT_CAT_TH ใน Code.gs เสมอ — แก้ที่ไหนแก้ทั้งสองที่
 */
const CAT_NAME_TH = {
  FUEL: 'น้ำมัน', ENT: 'ค่ารับรอง', GOLF: 'กอล์ฟ', TOLL: 'ทางด่วน', PARK: 'ที่จอดรถ',
  HOTEL: 'ที่พัก', EXPRESS: 'ขนส่ง', MILE: 'เบี้ยเลี้ยงรถ', CAR: 'ค่ารถเหมา',
  MOBILE: 'ค่าโทรศัพท์', OVERSEAS: 'โทร ตปท.', APT: 'ค่าที่พักรายเดือน',
  TRAVEL: 'เดินทาง', OTHER: 'อื่นๆ'
};
const CAT_ICON_TH = {
  FUEL: '⛽', ENT: '🍽', GOLF: '⛳', TOLL: '🛣', PARK: '🅿️', HOTEL: '🏨',
  EXPRESS: '📦', MILE: '🚗', CAR: '🚙', MOBILE: '📱', OVERSEAS: '☎️',
  APT: '🏠', TRAVEL: '✈️', OTHER: '📄'
};
function catTH(code)   { return CAT_NAME_TH[code] || String(code || '-'); }
function catIcon(code) { return CAT_ICON_TH[code] || '📄'; }
function catLabel(code) { return catIcon(code) + ' ' + catTH(code); }
/** ตารางพร้อมใช้ — catMap() ข้อความล้วน · catMap(true) มีอีโมจินำหน้า */
function catMap(withIcon) {
  const o = {};
  Object.keys(CAT_NAME_TH).forEach(function (k) {
    o[k] = withIcon ? catLabel(k) : CAT_NAME_TH[k];
  });
  return o;
}

function statusTH(status) {
  return STATUS_TH[String(status || '').toLowerCase()] || (status || '-');
}

function statusBadge(status) {
  const cls = (status || '').toLowerCase();
  return `<span class="badge ${cls}">${statusTH(status)}</span>`;
}

/**
 * ตัดลายเซ็น base64 ที่ต่อท้ายหมายเหตุออก
 * backend เก็บเป็น "อนุมัติแล้ว sig:data:image/png;base64,iVBOR..."
 * ถ้าไม่ตัด พนักงานจะเห็นข้อความขยะยาวเป็นหน้าจอ
 */
function cleanRemark(remark) {
  return String(remark || '').split(' sig:')[0].trim();
}

/** ตัวเลขระยะทาง — backend เขียนชื่อฟิลด์ไม่ตรงกันในบางที่ */
function mileageOf(r) {
  return Number(r.Mileage_KM || r.MileageKm || r.mileageKm || 0) || 0;
}

function showToast(msg, type = 'info') {
  const t = document.createElement('div');
  t.className = 'toast ' + (type === 'success' ? 'success' : type === 'error' ? 'error' : '');
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 300);
  }, 3000);
}

/* ══════════════════════════════════════════════════════
 *  แอปที่กำลังใช้อยู่ — 'expense' หรือ 'petty'
 *  เก็บแยกจาก session เพื่อให้สลับแอปได้โดยไม่ต้องล็อกอินใหม่
 * ══════════════════════════════════════════════════════ */
function getApp() {
  /*
   * 🔴 ต้องดูจาก "หน้าที่เปิดอยู่จริง" เป็นหลัก ไม่ใช่ค่าที่จำไว้
   *
   *    ถ้าดูจากค่าที่จำไว้อย่างเดียว จะเกิดเคสนี้:
   *      ใช้ Petty Cash ค้างไว้ → ปิดแอป → เปิด index.html (หน้า Expense)
   *      → เมนูล่างขึ้นเป็นของ Petty ทั้งที่อยู่หน้า Expense
   *    หน้าของ Petty ขึ้นต้นด้วย pc- เสมอ จึงดูจากชื่อไฟล์ได้แน่นอนที่สุด
   */
  try {
    const p = String(location.pathname || '').split('/').pop() || '';
    if (p.indexOf('pc-') === 0) return 'petty';
    if (p && p !== 'profile.html') return 'expense';   // หน้าอื่นทั้งหมด = Expense
  } catch (e) {}
  // profile.html ใช้ร่วมกันสองระบบ — ตรงนี้เท่านั้นที่ดูจากค่าที่จำไว้
  try { return sessionStorage.getItem('exionth_app') || localStorage.getItem('exionth_app') || 'expense'; }
  catch (e) { return 'expense'; }
}
function setApp(name) {
  const v = (name === 'petty') ? 'petty' : 'expense';
  try { sessionStorage.setItem('exionth_app', v); localStorage.setItem('exionth_app', v); } catch (e) {}
  return v;
}
/** พาไปหน้าแรกของแอปที่เลือก */
function goHomeOfApp(name) {
  location.href = setApp(name) === 'petty' ? 'pc-home.html' : 'index.html';
}

/**
 * Render bottom navigation. Pass `active` = one of: home / new / status / inbox
 * Shows Inbox tab only if isGM=true in session.
 */
async function renderBottomNav(active) {
  const session = getSession();
  if (!session) return;

  // Check role (cached in session, refresh in background)
  let role = session.role;
  let isGM = !!session.isGM;
  let isManager = !!session.isManager;
  let isSenior = !!session.isSenior;
  if (typeof session.role === 'undefined') {
    try {
      const r = await fetchMyRole(session.Email);
      role = r.role || 'staff';
      isGM = !!r.isGM;
      isManager = !!r.isManager;
      isSenior = !!r.isSenior;
      session.role = role;
      session.isGM = isGM;
      session.isManager = isManager;
      session.isSenior = isSenior;
      setSession(session);
    } catch { role = 'staff'; }
  }

  document.body.classList.add('has-bottom-nav');
  try { renderNotifBell(); } catch (e) {}
  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';

  /*
   * 💵 v7.0 — ระบบมี 2 แอปในโค้ดชุดเดียว
   *    expense = เบิกค่าใช้จ่าย (ออกเงินก่อน เบิกคืนทีหลัง)
   *    petty   = เงินสดย่อย    (เอาเงินบริษัทจ่ายเลย)
   *  เมนูล่างเปลี่ยนตามแอปที่เลือกตอนล็อกอิน · สลับได้จากหน้าแรก
   */
  if (getApp() === 'petty') {
    const pItems = [
      { key: 'pc-home', href: 'pc-home.html',    label: 'หน้าแรก', icon: 'home' },
      { key: 'pc-new',  href: 'pc-request.html', label: 'ขอเบิก',  icon: 'plus' },
      { key: 'pc-list', href: 'pc-list.html',    label: 'รายการ',  icon: 'list' },
      { key: 'pc-fund', href: 'pc-fund.html',    label: 'กล่องเงิน', emoji: '💰' }
    ];
    // 🔴 คำว่า "รอดำเนินการ" ยาวเกินสำหรับ 6 แท็บบนจอ 375px — คำแตกบรรทัด
    //    ใช้คำเดียวกับฝั่ง Expense และเรียกว่า "รออนุมัติ"
    pItems.push({ key: 'pc-inbox', href: 'pc-approve.html', label: 'รออนุมัติ', icon: 'bell' });
    pItems.push({ key: 'profile', href: 'profile.html', label: 'โปรไฟล์', icon: 'user' });
    nav.innerHTML = pItems.map(it => `
      <a href="${it.href}" class="nav-item ${it.key === active ? 'active' : ''}">
        ${it.emoji ? `<span style="font-size:20px;line-height:1;">${it.emoji}</span>` : icon(it.icon)}
        <span>${it.label}</span>
      </a>`).join('');
    document.body.appendChild(nav);
    if (active !== 'pc-inbox') {
      try {
        const inbox = await fetchPettyInbox(session.Email);
        const n = (inbox.toApprove || []).length + (inbox.toPay || []).length;
        if (n > 0) {
          // ใช้รูปแบบเดียวกับ badge ของเมนูเดิม (has-badge + data-badge)
          const link = nav.querySelector('.nav-item[href="pc-approve.html"]');
          if (link) {
            link.classList.add('has-badge');
            link.dataset.badge = n > 99 ? '99+' : n;
          }
        }
      } catch (e) {}
    }
    return;
  }

  const items = [
    { key: 'home',    href: 'index.html',        label: 'หน้าแรก', icon: 'home' },
    { key: 'new',     href: 'submit.html',       label: 'ขอเบิก',  icon: 'plus' },
    { key: 'status',  href: 'status.html',       label: 'คำขอ',    icon: 'list' },
    { key: 'summary', href: 'summary.html',      label: 'สรุป',    emoji: '📊' }
  ];
  // v6.1 ผู้บริหารที่ดูอย่างเดียว (isViewer) ไม่มีกล่องรออนุมัติ
  // GM = full inbox / Senior = senior-inbox / Manager = manager-inbox
  if (isGM) {
    items.push({ key: 'inbox', href: 'inbox.html', label: 'รออนุมัติ', icon: 'bell' });
  } else if (isSenior) {
    items.push({ key: 'inbox', href: 'senior-inbox.html', label: 'รออนุมัติ', icon: 'bell' });
  } else if (isManager) {
    items.push({ key: 'inbox', href: 'manager-inbox.html', label: 'รออนุมัติ', icon: 'bell' });
  }
  items.push({ key: 'profile', href: 'profile.html', label: 'โปรไฟล์', icon: 'user' });

  nav.innerHTML = items.map(it => `
    <a href="${it.href}" class="nav-item ${it.key === active ? 'active' : ''}">
      ${it.emoji ? `<span style="font-size:20px;line-height:1;">${it.emoji}</span>` : icon(it.icon)}
      <span>${it.label}</span>
    </a>`).join('');
  document.body.appendChild(nav);

  // Async load badge count for Inbox (GM/Senior/Manager)
  if ((isGM || isSenior || isManager) && active !== 'inbox') {
    try {
      const pending = await fetchPendingApprovals(session.Email);
      const count = Array.isArray(pending) ? pending.length : 0;
      if (count > 0) {
        const inboxLink = nav.querySelector('.nav-item[href*="inbox"]');
        if (inboxLink) {
          inboxLink.classList.add('has-badge');
          inboxLink.dataset.badge = count > 99 ? '99+' : count;
        }
      }
    } catch {}
  }
}

// Register service worker (PWA)
/**
 * SignaturePad — lightweight canvas signature
 * Usage:
 *   const sig = new SignaturePad(canvasElement);
 *   sig.isEmpty();           // → true/false
 *   sig.toDataURL();         // → 'data:image/png;base64,...'
 *   sig.clear();
 */
class SignaturePad {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.isDrawing = false;
    this.empty = true;
    this._setup();
  }
  _setup() {
    const c = this.canvas;
    const dpr = window.devicePixelRatio || 1;
    const rect = c.getBoundingClientRect();
    c.width = rect.width * dpr;
    c.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.strokeStyle = '#0F172A';
    this.ctx.lineWidth = 2.5;

    const start = e => { this.isDrawing = true; const p = this._pos(e); this.ctx.beginPath(); this.ctx.moveTo(p.x, p.y); e.preventDefault(); };
    const draw = e => {
      if (!this.isDrawing) return;
      const p = this._pos(e);
      this.ctx.lineTo(p.x, p.y);
      this.ctx.stroke();
      this.empty = false;
      const ph = c.parentElement.querySelector('.sig-placeholder');
      if (ph) ph.style.display = 'none';
      e.preventDefault();
    };
    const end = () => { this.isDrawing = false; };

    c.addEventListener('mousedown', start);
    c.addEventListener('mousemove', draw);
    c.addEventListener('mouseup', end);
    c.addEventListener('mouseout', end);
    c.addEventListener('touchstart', start);
    c.addEventListener('touchmove', draw);
    c.addEventListener('touchend', end);
  }
  _pos(e) {
    const r = this.canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
    return { x, y };
  }
  isEmpty() { return this.empty; }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.empty = true;
    const ph = this.canvas.parentElement.querySelector('.sig-placeholder');
    if (ph) ph.style.display = '';
  }
  toDataURL() {
    return this.canvas.toDataURL('image/png');
  }
}

/**
 * Loading overlay — prevents double-click during async operations
 */
function showLoading(text = 'กำลังประมวลผล...') {
  hideLoading();  // remove any existing
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.id = '__loadingOverlay';
  overlay.innerHTML = `
    <div class="loader-card">
      <div class="spinner"></div>
      <div class="loader-text" id="__loaderText">${text}</div>
      <button type="button" class="loader-cancel" id="__loaderCancel">หยุดรอผล</button>
    </div>`;
  document.body.appendChild(overlay);

  // ปุ่มยกเลิกโผล่หลัง 8 วิ — ถ้าเร็วกว่านั้นไม่ต้องรบกวนสายตา
  const btn = overlay.querySelector('#__loaderCancel');
  setTimeout(() => { if (btn && btn.isConnected) btn.classList.add('show'); }, 8000);
  btn.addEventListener('click', () => {
    if (window.__apiAbort) { try { window.__apiAbort.abort('user'); } catch (e) {} }
    hideLoading();
    showToast('หยุดรอผลแล้ว เซิร์ฟเวอร์อาจยังบันทึกอยู่ กรุณาตรวจสถานะก่อนทำรายการใหม่', 'error');
  });
}

/** อัปเดตข้อความบน loading overlay ที่เปิดอยู่ (เช่น "กำลังอนุมัติ 4/9") */
function setLoadingText(text) {
  const el = document.getElementById('__loaderText');
  if (el) el.textContent = text;
}
function hideLoading() {
  const o = document.getElementById('__loadingOverlay');
  if (o) o.remove();
}

/**
 * Image Lightbox — fullscreen image viewer with pinch/scroll zoom
 */
function openImageViewer(src, hint = '') {
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.id = '__lightbox';
  lb.innerHTML = `
    ${hint ? `<div class="lightbox-hint">${hint}</div>` : ''}
    <button class="lightbox-close" onclick="closeImageViewer()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
    <img class="lightbox-img" src="${src}" id="__lbImg">
    <div class="lightbox-controls">
      <button onclick="lbZoom(-1)">−</button>
      <button onclick="lbReset()">100%</button>
      <button onclick="lbZoom(1)">+</button>
    </div>`;
  document.body.appendChild(lb);

  const img = document.getElementById('__lbImg');
  let scale = 1, tx = 0, ty = 0;
  let isDragging = false, startX, startY, startTx, startTy;
  let lastTap = 0;
  let initialDist = null, initialScale = 1;

  function apply() {
    img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    img.classList.toggle('zoomed', scale > 1);
  }
  window.lbZoom = (dir) => {
    scale = Math.max(0.5, Math.min(5, scale + dir * 0.3));
    if (scale === 1) { tx = 0; ty = 0; }
    apply();
  };
  window.lbReset = () => { scale = 1; tx = 0; ty = 0; apply(); };

  // Mouse wheel zoom
  lb.addEventListener('wheel', e => {
    e.preventDefault();
    lbZoom(e.deltaY < 0 ? 1 : -1);
  }, { passive: false });

  // Double click / double tap to zoom
  img.addEventListener('click', e => {
    const now = Date.now();
    if (now - lastTap < 300) {
      scale = scale > 1 ? 1 : 2;
      if (scale === 1) { tx = 0; ty = 0; }
      apply();
    }
    lastTap = now;
  });

  // Touch pinch zoom
  img.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
      initialDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialScale = scale;
    } else if (e.touches.length === 1 && scale > 1) {
      isDragging = true;
      startX = e.touches[0].clientX; startY = e.touches[0].clientY;
      startTx = tx; startTy = ty;
      img.classList.add('dragging');
    }
  });
  img.addEventListener('touchmove', e => {
    if (e.touches.length === 2 && initialDist) {
      const d = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      scale = Math.max(0.5, Math.min(5, initialScale * (d / initialDist)));
      apply();
      e.preventDefault();
    } else if (isDragging && e.touches.length === 1) {
      tx = startTx + (e.touches[0].clientX - startX);
      ty = startTy + (e.touches[0].clientY - startY);
      apply();
      e.preventDefault();
    }
  }, { passive: false });
  img.addEventListener('touchend', () => {
    isDragging = false;
    initialDist = null;
    img.classList.remove('dragging');
  });

  // Mouse drag when zoomed
  img.addEventListener('mousedown', e => {
    if (scale > 1) {
      isDragging = true;
      startX = e.clientX; startY = e.clientY;
      startTx = tx; startTy = ty;
      img.classList.add('dragging');
      e.preventDefault();
    }
  });
  document.addEventListener('mousemove', e => {
    if (isDragging) {
      tx = startTx + (e.clientX - startX);
      ty = startTy + (e.clientY - startY);
      apply();
    }
  });
  document.addEventListener('mouseup', () => {
    isDragging = false;
    if (img) img.classList.remove('dragging');
  });

  // Close on background click
  lb.addEventListener('click', e => {
    if (e.target === lb) closeImageViewer();
  });

  // ESC key
  document.addEventListener('keydown', escHandler);
  function escHandler(e) {
    if (e.key === 'Escape') {
      closeImageViewer();
      document.removeEventListener('keydown', escHandler);
    }
  }
}
function closeImageViewer() {
  const lb = document.getElementById('__lightbox');
  if (lb) lb.remove();
}

/**
 * อนุมัติ/ปฏิเสธหลายรายการ — บอกความคืบหน้าและสรุปผลตอนจบ
 * ถ้าพังกลางทาง ผู้ใช้ต้องรู้ว่าอันไหนผ่านอันไหนไม่ผ่าน
 * @param {Array} rows   รายการที่จะทำ
 * @param {Function} fn  async (row) => result
 * @param {string} verb  'อนุมัติ' / 'ปฏิเสธ'
 */
async function runBatch(rows, fn, verb) {
  let ok = 0;
  const failed = [];
  showLoading(`กำลัง${verb} 0/${rows.length}...`);
  for (let i = 0; i < rows.length; i++) {
    setLoadingText(`กำลัง${verb} ${i + 1}/${rows.length}...`);
    try {
      const res = await fn(rows[i]);
      if (res && res.error) throw new Error(res.error);
      ok++;
    } catch (err) {
      failed.push({ row: rows[i], msg: err.message });
    }
  }
  hideLoading();
  if (!failed.length) {
    showToast(`✅ ${verb}ครบ ${ok} รายการ`, 'success');
  } else if (ok) {
    showToast(`${verb}สำเร็จ ${ok} · ไม่สำเร็จ ${failed.length} — ${failed[0].msg}`, 'error');
  } else {
    showToast(`${verb}ไม่สำเร็จ — ${failed[0].msg}`, 'error');
  }
  return { ok, failed };
}

/**
 * v6.0 — กระดิ่งแจ้งเตือนใน header
 * ระบบไม่ส่งอีเมลแล้ว ทุกอย่างมาที่นี่ ต้องเห็นชัดและกดง่าย
 */
async function renderNotifBell() {
  const session = getSession();
  if (!session) return;
  const header = document.querySelector('.header');
  if (!header || header.querySelector('.notif-bell')) return;

  const wrap = document.createElement('div');
  wrap.className = 'notif-bell';
  wrap.innerHTML = '<button type="button" aria-label="แจ้งเตือน">' + icon('bell') + '<span class="nb-count" style="display:none;">0</span></button>';
  header.appendChild(wrap);

  const panel = document.createElement('div');
  panel.className = 'notif-panel';
  panel.innerHTML = '<div class="np-head"><span>แจ้งเตือน</span><button type="button" class="np-all">อ่านทั้งหมด</button></div><div class="np-body"><div class="np-empty">กำลังโหลด...</div></div>';
  document.body.appendChild(panel);

  const btn = wrap.querySelector('button');
  const badge = wrap.querySelector('.nb-count');
  const body = panel.querySelector('.np-body');
  let data = { unread: 0, items: [] };

  function paint() {
    badge.style.display = data.unread > 0 ? 'flex' : 'none';
    badge.textContent = data.unread > 99 ? '99+' : data.unread;
    if (!data.items.length) {
      body.innerHTML = '<div class="np-empty">🎉 ไม่มีแจ้งเตือน</div>';
      return;
    }
    body.innerHTML = data.items.map(function (n) {
      const when = n.CreatedAt ? timeAgo(new Date(n.CreatedAt)) : '';
      const href = /^[a-z0-9-]+\.html(?:[?#].*)?$/i.test(n.Link||'') ? n.Link : '';
      return '<a class="np-item ' + (n.Unread ? 'unread' : '') + '" ' +
        (href ? 'href="' + esc(href) + '"' : 'href="javascript:void(0)"') + ' data-id="' + esc(n.ID) + '">' +
        '<div class="np-t">' + esc(n.Title || '') + '</div>' +
        '<div class="np-b">' + esc(n.Body || '') + '</div>' +
        '<div class="np-w">' + when + '</div></a>';
    }).join('');
  }

  function timeAgo(d) {
    const mins = Math.round((Date.now() - d.getTime()) / 60000);
    if (mins < 1) return 'เมื่อครู่';
    if (mins < 60) return mins + ' นาทีที่แล้ว';
    const hrs = Math.round(mins / 60);
    if (hrs < 24) return hrs + ' ชั่วโมงที่แล้ว';
    const days = Math.round(hrs / 24);
    if (days < 7) return days + ' วันที่แล้ว';
    return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
  }

  btn.addEventListener('click', function () {
    panel.classList.toggle('show');
    if (panel.classList.contains('show')) load();
  });
  document.addEventListener('click', function (e) {
    if (!panel.contains(e.target) && !wrap.contains(e.target)) panel.classList.remove('show');
  });
  panel.querySelector('.np-all').addEventListener('click', async function () {
    try { await markAllNotifRead(session.Email); } catch (err) {}
    data.items.forEach(function (n) { n.Unread = false; });
    data.unread = 0; paint();
  });
  body.addEventListener('click', function (e) {
    const a = e.target.closest('.np-item');
    if (a && a.dataset.id) { markNotifRead(session.Email, a.dataset.id).catch(()=>{}); }
  });

  async function load() {
    try {
      const r = await fetchNotifications(session.Email);
      if (r && !r.error) { data = r; paint(); }
    } catch (err) { body.innerHTML = '<div class="np-empty">โหลดแจ้งเตือนไม่สำเร็จ</div>'; }
  }
  load();
}

function signaturePadHtml(id) {
  return `<div class="sig-box">
    <canvas id="${id}" class="sig-canvas"></canvas>
    <span class="sig-placeholder">เซ็นที่นี่ด้วยนิ้ว / เมาส์</span>
    <div class="sig-actions">
      <span>ลายเซ็น GM</span>
      <button type="button" class="sig-clear" onclick="document.getElementById('${id}').__sig.clear()">ล้าง</button>
    </div>
  </div>`;
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(err =>
      console.warn('SW registration failed:', err)
    );
  });
}

;
function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function pageHeading(title,description,action){return `<div class="page-heading"><div><div class="eyebrow">EXION WORKSPACE</div><h1>${esc(title)}</h1><p>${esc(description)}</p></div>${action||''}</div>`;}
function emptyState(title,message,href,label){return `<div class="empty">${icon('inbox')}<div class="title">${esc(title)}</div><div class="sub">${esc(message)}</div>${href?`<a class="btn btn-secondary btn-sm" style="width:auto;margin-top:12px" href="${esc(href)}">${esc(label)}</a>`:''}</div>`;}
const ROLE_LABELS={staff:'พนักงาน',manager:'หัวหน้างาน',senior:'ผู้อนุมัติ',gm:'ผู้บริหาร',accountant:'บัญชี',viewer:'ผู้ดูรายงาน'};
async function renderWorkspaceNav(active){
 const s=getSession();if(!s)return;const path=location.pathname.split('/').pop()||'index.html';const approval=s.isManager||s.isSenior||s.isGM||s.isAccountant;
 const links=[['home','index.html','หน้าแรก','home'],['new','submit.html','สร้างคำขอ','plus'],['status','status.html','คำขอของฉัน','receipt'],['approvals','approvals.html','งานอนุมัติ','inbox'],['periods','periods.html','รอบเบิกและการจ่ายเงิน','list'],['petty','pc-home.html','เงินสดย่อย','car'],['summary','summary.html','รายงานภาพรวม','globe'],['team','my-team.html','ทีมของฉัน','user'],['profile','profile.html','บัญชีและลายเซ็น','user']].filter(x=>(x[0]!=='approvals'||approval)&&(x[0]!=='team'||s.isManager||s.isSenior||s.isGM));
 const key=path.startsWith('pc-')?'petty':/inbox|approve\.html|export-review/.test(path)?'approvals':path==='periods.html'?'periods':path==='approvals.html'?'approvals':active;
 document.querySelectorAll('.bottom-nav,.app-sidebar').forEach(x=>x.remove());document.body.classList.add('has-bottom-nav');
 const side=document.createElement('aside');side.className='app-sidebar';side.innerHTML=`<a class="sidebar-brand" href="index.html"><img src="icons/logo.png" alt="EXION"><small>EXPENSE WORKSPACE</small></a><div class="sidebar-section">พื้นที่ทำงาน</div><nav aria-label="เมนูหลัก">${links.map(x=>`<a class="side-link ${x[0]===key?'active':''}" ${x[0]===key?'aria-current="page"':''} href="${x[1]}">${icon(x[3])}<span>${x[2]}</span></a>`).join('')}</nav><div class="sidebar-footer">${esc(ROLE_LABELS[s.role]||'พนักงาน')} · ${esc(s.Department||'EXION')}<br><span style="font-size:10px">EXION (Thailand) · Workspace 8.0.6</span></div>`;document.body.append(side);
 const mobile=[links[0],links[1],links[2],links.find(x=>x[0]===(approval?'approvals':'periods')),['more','menu.html','เพิ่มเติม','more']];const nav=document.createElement('nav');nav.className='bottom-nav';nav.setAttribute('aria-label','เมนูหลัก');nav.innerHTML=mobile.map(x=>`<a class="nav-item ${x[0]===key?'active':''}" href="${x[1]}" ${x[0]===key?'aria-current="page"':''}>${icon(x[3])}<span>${x[2]}</span></a>`).join('');document.body.append(nav);
 const h=document.querySelector('.header');if(h&&!h.querySelector('.header-user')){const a=document.createElement('a');a.className='header-user';a.href='profile.html';a.innerHTML=`<span class="user-label">${esc(s.Name)}</span><span class="user-initial">${esc(initials(s.Name))}</span>`;a.setAttribute('aria-label','บัญชีของฉัน');h.append(a);}renderNotifBell();return links;
}
renderBottomNav=renderWorkspaceNav;
statusTH=value=>({pending:'รออนุมัติ',approved:'อนุมัติแล้ว',rejected:'ไม่อนุมัติ',finalized:'ส่งบิลแล้ว',preapprove:'ขออนุมัติงบ',paid:'จ่ายแล้ว',cancelled:'ยกเลิก'}[String(value||'').toLowerCase()]||String(value||'-'));
statusBadge=value=>`<span class="badge ${['pending','approved','rejected','finalized','preapprove','paid','cancelled'].includes(String(value).toLowerCase())?String(value).toLowerCase():''}">${esc(statusTH(value))}</span>`;
window.addEventListener('DOMContentLoaded',()=>{
 const banner=document.createElement('div');banner.className='offline-banner';banner.setAttribute('role','status');banner.textContent='ออฟไลน์ — กรอกร่างต่อได้ เชื่อมต่ออินเทอร์เน็ตก่อนส่งคำขอ';document.body.prepend(banner);const update=()=>banner.hidden=navigator.onLine;update();window.addEventListener('online',update);window.addEventListener('offline',update);
 const main=document.querySelector('.container');if(main){main.id=main.id||'main-content';main.setAttribute('role','main');const skip=document.createElement('a');skip.className='skip-link';skip.href='#'+main.id;skip.textContent='ข้ามไปเนื้อหา';document.body.prepend(skip);}
 document.querySelectorAll('.field label').forEach(l=>{const input=l.parentElement.querySelector('input,select,textarea');if(input?.id)l.htmlFor=input.id;});
 const file=location.pathname.split('/').pop();const descriptions={'status.html':['คำขอของฉัน','ติดตามสถานะ ตรวจสอบรายละเอียด และจัดการรายการของคุณ'],'pre-approve.html':['ขออนุมัติงบ','ขอวงเงินค่ารับรองหรือกอล์ฟก่อนเริ่มใช้จ่าย'],'pre-approves.html':['งบที่ขออนุมัติ','ติดตามวงเงินและส่งใบเสร็จเมื่อใช้จ่ายจริง'],'profile.html':['บัญชีและลายเซ็น','ข้อมูลส่วนตัว ลายเซ็น และความปลอดภัยของบัญชี'],'periods.html':['รอบเบิกและการจ่ายเงิน','ตรวจสอบช่วงวันที่ ขออนุมัติรอบเบิก และดาวน์โหลดเอกสาร'],'pc-home.html':['เงินสดย่อย','ยอดคงเหลือและรายการที่ต้องดำเนินการ'],'pc-request.html':['ขอเบิกเงินสดย่อย','กรอกรายละเอียดและแนบหลักฐานการใช้จ่าย'],'summary.html':['รายงานภาพรวม','ดูค่าใช้จ่ายตามช่วงเวลา ประเภท และผู้ใช้งาน'],'my-team.html':['ทีมของฉัน','ข้อมูลทีม รายงาน และการจัดการบัญชี'],'pc-fund.html':['จัดการกล่องเงินสด','เติมเงิน เคลียร์บิล และตรวจนับเงินสด'],'pc-msbc.html':['รายงานเงินสดย่อย','ตรวจสอบรายการและส่งออกข้อมูลสำหรับบัญชี']};if(main&&descriptions[file])main.insertAdjacentHTML('afterbegin',pageHeading(...descriptions[file]));
 if(file==='menu.html'&&main)renderWorkspaceNav('more').then(links=>{main.innerHTML=pageHeading('พื้นที่ทำงาน','ทุกเมนูของคุณ อยู่ที่เดียว')+`<div class="quick-grid">${links.map(x=>`<a class="quick-link" href="${x[1]}">${icon(x[3])}<strong>${x[2]}</strong></a>`).join('')}</div><button id="menuLogout" class="btn btn-secondary">ออกจากระบบ</button>`;document.getElementById('menuLogout').onclick=logout;});
});
async function logout(){try{await apiPost('logout');}catch(e){}clearSession();location.href='index.html';}
async function confirmDialog(title,message,label='ยืนยัน'){const d=document.createElement('dialog');d.className='review-dialog';d.innerHTML=`<h2>${esc(title)}</h2><p class="subtle" style="white-space:pre-line">${esc(message)}</p><div class="dialog-actions"><button class="btn btn-secondary" data-cancel>กลับไปแก้ไข</button><button class="btn btn-primary" data-yes>${esc(label)}</button></div>`;document.body.append(d);return new Promise(resolve=>{let result=false;d.querySelector('[data-yes]').onclick=()=>{result=true;d.close();};d.querySelector('[data-cancel]').onclick=()=>d.close();d.onclose=()=>{d.remove();resolve(result);};d.showModal();});}
function requestTimeline(r){const steps=[['ส่งคำขอแล้ว',r.Timestamp,r.StaffName,true],['ผลการอนุมัติ',r.ApprovedAt||r.ManagerApprovedAt,r.ApprovedBy||r.ManagerEmail,['Approved','Rejected','Finalized'].includes(r.Status)]];return `<div class="timeline">${steps.map(([title,date,who,done])=>`<div class="timeline-step ${done?'done':''}"><div><strong>${esc(title)}${title==='ผลการอนุมัติ'?' · '+esc(statusTH(r.Status)):''}</strong><small>${date?esc(formatDate(date)):done?'ดำเนินการแล้ว':'รอดำเนินการ'}${who?' · '+esc(who):''}</small></div></div>`).join('')}<div class="subtle">สถานะการจ่ายเงินดูที่ <a href="periods.html">รอบเบิกและการจ่ายเงิน →</a></div></div>`;}

// Snapshot labels stay visible until the user explicitly refreshes; never replace a draft.
let latestDataStatus=null;
window.addEventListener('exion:data-status',e=>{
 latestDataStatus=e.detail;
 let bar=document.getElementById('dataFreshness');
 if(!bar){bar=document.createElement('div');bar.id='dataFreshness';bar.className='data-freshness';bar.setAttribute('role','status');const main=document.querySelector('.container');if(!main)return;main.prepend(bar);}
 const time=new Date(e.detail.at).toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'});
 bar.replaceChildren();const label=document.createElement('span');
 label.textContent=e.detail.state==='changed'?'ข้อมูลเปลี่ยนจากอีกแท็บ · กดรีเฟรชเพื่อแสดงข้อมูลล่าสุด':'แสดงข้อมูลที่โหลดไว้ '+time+' · '+(e.detail.state==='cached'?'กำลังตรวจข้อมูลล่าสุด':e.detail.state==='error'?'อัปเดตไม่สำเร็จ':'กดรีเฟรชเพื่อแสดงข้อมูลล่าสุด');bar.append(label);
 const button=document.createElement('button');button.type='button';button.className='btn btn-secondary btn-sm';button.textContent='รีเฟรช';button.onclick=()=>{if(document.querySelector('form,.expense-card')){confirmDialog('รีเฟรชข้อมูล?','หากมีข้อมูลที่ยังไม่บันทึก กรุณาบันทึกก่อนรีเฟรช','รีเฟรช').then(ok=>{if(ok)refreshWorkspaceData();});}else refreshWorkspaceData();};bar.append(button);
});

new MutationObserver(()=>{if(latestDataStatus&&getSession()&&!document.getElementById('dataFreshness')&&document.querySelector('.container'))window.dispatchEvent(new CustomEvent('exion:data-status',{detail:latestDataStatus}));}).observe(document.body,{childList:true,subtree:true});

if(typeof adminResetPassword==='function')window.adminResetPassword=adminResetPassword;
if(typeof apiGet==='function')window.apiGet=apiGet;
if(typeof apiPost==='function')window.apiPost=apiPost;
if(typeof apiRequest==='function')window.apiRequest=apiRequest;
if(typeof apply==='function')window.apply=apply;
if(typeof approvePetty==='function')window.approvePetty=approvePetty;
if(typeof approveRequest==='function')window.approveRequest=approveRequest;
if(typeof cancelPetty==='function')window.cancelPetty=cancelPetty;
if(typeof catIcon==='function')window.catIcon=catIcon;
if(typeof catLabel==='function')window.catLabel=catLabel;
if(typeof catMap==='function')window.catMap=catMap;
if(typeof catTH==='function')window.catTH=catTH;
if(typeof categoryIcon==='function')window.categoryIcon=categoryIcon;
if(typeof checkIsGM==='function')window.checkIsGM=checkIsGM;
if(typeof checkUser==='function')window.checkUser=checkUser;
if(typeof cleanRemark==='function')window.cleanRemark=cleanRemark;
if(typeof clearPettyBills==='function')window.clearPettyBills=clearPettyBills;
if(typeof clearSession==='function')window.clearSession=clearSession;
if(typeof closeImageViewer==='function')window.closeImageViewer=closeImageViewer;
if(typeof confirmDialog==='function')window.confirmDialog=confirmDialog;
if(typeof emailStaffReport==='function')window.emailStaffReport=emailStaffReport;
if(typeof emptyState==='function')window.emptyState=emptyState;
if(typeof esc==='function')window.esc=esc;
if(typeof escHandler==='function')window.escHandler=escHandler;
if(typeof exportPettyMSBC==='function')window.exportPettyMSBC=exportPettyMSBC;
if(typeof exportRequestList==='function')window.exportRequestList=exportRequestList;
if(typeof exportStaffReport==='function')window.exportStaffReport=exportStaffReport;
if(typeof fetchAllRequests==='function')window.fetchAllRequests=fetchAllRequests;
if(typeof fetchCategories==='function')window.fetchCategories=fetchCategories;
if(typeof fetchCustomerHistory==='function')window.fetchCustomerHistory=fetchCustomerHistory;
if(typeof fetchCustomers==='function')window.fetchCustomers=fetchCustomers;
if(typeof fetchExportableStaff==='function')window.fetchExportableStaff=fetchExportableStaff;
if(typeof fetchFuelRate==='function')window.fetchFuelRate=fetchFuelRate;
if(typeof fetchManagerInbox==='function')window.fetchManagerInbox=fetchManagerInbox;
if(typeof fetchMyRequests==='function')window.fetchMyRequests=fetchMyRequests;
if(typeof fetchMyRole==='function')window.fetchMyRole=fetchMyRole;
if(typeof fetchMyTeam==='function')window.fetchMyTeam=fetchMyTeam;
if(typeof fetchMyTeamRequests==='function')window.fetchMyTeamRequests=fetchMyTeamRequests;
if(typeof fetchNotifications==='function')window.fetchNotifications=fetchNotifications;
if(typeof fetchPendingApprovals==='function')window.fetchPendingApprovals=fetchPendingApprovals;
if(typeof fetchPettyCategories==='function')window.fetchPettyCategories=fetchPettyCategories;
if(typeof fetchPettyHome==='function')window.fetchPettyHome=fetchPettyHome;
if(typeof fetchPettyInbox==='function')window.fetchPettyInbox=fetchPettyInbox;
if(typeof fetchPettyLedger==='function')window.fetchPettyLedger=fetchPettyLedger;
if(typeof fetchPettyMSBC==='function')window.fetchPettyMSBC=fetchPettyMSBC;
if(typeof fetchReceiptImage==='function')window.fetchReceiptImage=fetchReceiptImage;
if(typeof fetchRequest==='function')window.fetchRequest=fetchRequest;
if(typeof fetchSeniorInbox==='function')window.fetchSeniorInbox=fetchSeniorInbox;
if(typeof fetchUnpaidExports==='function')window.fetchUnpaidExports=fetchUnpaidExports;
if(typeof fetchWithTimeout==='function')window.fetchWithTimeout=fetchWithTimeout;
if(typeof fileToBase64==='function')window.fileToBase64=fileToBase64;
if(typeof finalizeClaim==='function')window.finalizeClaim=finalizeClaim;
if(typeof flushReadQueue==='function')window.flushReadQueue=flushReadQueue;
if(typeof formatCurrency==='function')window.formatCurrency=formatCurrency;
if(typeof formatDate==='function')window.formatDate=formatDate;
if(typeof getApp==='function')window.getApp=getApp;
if(typeof getExpensePerformance==='function')window.getExpensePerformance=getExpensePerformance;
if(typeof getMyRole==='function')window.getMyRole=getMyRole;
if(typeof getMySignature==='function')window.getMySignature=getMySignature;
if(typeof getSession==='function')window.getSession=getSession;
if(typeof goHomeOfApp==='function')window.goHomeOfApp=goHomeOfApp;
if(typeof hideLoading==='function')window.hideLoading=hideLoading;
if(typeof icon==='function')window.icon=icon;
if(typeof initials==='function')window.initials=initials;
if(typeof invalidateReadSnapshots==='function')window.invalidateReadSnapshots=invalidateReadSnapshots;
if(typeof load==='function')window.load=load;
if(typeof loginWithPassword==='function')window.loginWithPassword=loginWithPassword;
if(typeof logout==='function')window.logout=logout;
if(typeof managerApprove==='function')window.managerApprove=managerApprove;
if(typeof markAllNotifRead==='function')window.markAllNotifRead=markAllNotifRead;
if(typeof markExportPaid==='function')window.markExportPaid=markExportPaid;
if(typeof markNotifRead==='function')window.markNotifRead=markNotifRead;
if(typeof mileageOf==='function')window.mileageOf=mileageOf;
if(typeof networkRead==='function')window.networkRead=networkRead;
if(typeof openImageViewer==='function')window.openImageViewer=openImageViewer;
if(typeof pageHeading==='function')window.pageHeading=pageHeading;
if(typeof paint==='function')window.paint=paint;
if(typeof payPetty==='function')window.payPetty=payPetty;
if(typeof readSnapshots==='function')window.readSnapshots=readSnapshots;
if(typeof refreshWorkspaceData==='function')window.refreshWorkspaceData=refreshWorkspaceData;
if(typeof renderBottomNav==='function')window.renderBottomNav=renderBottomNav;
if(typeof renderError==='function')window.renderError=renderError;
if(typeof renderNotifBell==='function')window.renderNotifBell=renderNotifBell;
if(typeof renderWorkspaceNav==='function')window.renderWorkspaceNav=renderWorkspaceNav;
if(typeof requestPasswordReset==='function')window.requestPasswordReset=requestPasswordReset;
if(typeof requestPettyTopUp==='function')window.requestPettyTopUp=requestPettyTopUp;
if(typeof requestTimeline==='function')window.requestTimeline=requestTimeline;
if(typeof requireLogin==='function')window.requireLogin=requireLogin;
if(typeof resetPassword==='function')window.resetPassword=resetPassword;
if(typeof runBatch==='function')window.runBatch=runBatch;
if(typeof saveSignature==='function')window.saveSignature=saveSignature;
if(typeof saveSnapshot==='function')window.saveSnapshot=saveSnapshot;
if(typeof seniorApprove==='function')window.seniorApprove=seniorApprove;
if(typeof setApp==='function')window.setApp=setApp;
if(typeof setLoadingText==='function')window.setLoadingText=setLoadingText;
if(typeof setPassword==='function')window.setPassword=setPassword;
if(typeof setPettyFundConfig==='function')window.setPettyFundConfig=setPettyFundConfig;
if(typeof setSession==='function')window.setSession=setSession;
if(typeof showLoading==='function')window.showLoading=showLoading;
if(typeof showToast==='function')window.showToast=showToast;
if(typeof signaturePadHtml==='function')window.signaturePadHtml=signaturePadHtml;
if(typeof snapshotNotice==='function')window.snapshotNotice=snapshotNotice;
if(typeof statusBadge==='function')window.statusBadge=statusBadge;
if(typeof statusTH==='function')window.statusTH=statusTH;
if(typeof submitBatch==='function')window.submitBatch=submitBatch;
if(typeof submitExpense==='function')window.submitExpense=submitExpense;
if(typeof submitPetty==='function')window.submitPetty=submitPetty;
if(typeof submitPettyCount==='function')window.submitPettyCount=submitPettyCount;
if(typeof submitPreApprove==='function')window.submitPreApprove=submitPreApprove;
if(typeof timeAgo==='function')window.timeAgo=timeAgo;
if(typeof toYMD==='function')window.toYMD=toYMD;
if(typeof todayYMD==='function')window.todayYMD=todayYMD;
if(typeof verifyStaff==='function')window.verifyStaff=verifyStaff;
window.CONFIG=CONFIG;});
window.EXION_VIEWS["all-requests.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" aria-label=\"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a\" onclick=\"location.href='index.html'\" id=\"backBtn\"></button>\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">All Requests</span></h1>\n  </div>\n\n  <div class=\"container\">\n    <!-- v6.0 \u0e1b\u0e34\u0e14\u0e25\u0e39\u0e1b: \u0e23\u0e32\u0e22\u0e01\u0e32\u0e23\u0e17\u0e35\u0e48\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34\u0e41\u0e25\u0e49\u0e27\u0e23\u0e2d\u0e1a\u0e31\u0e0d\u0e0a\u0e35\u0e42\u0e2d\u0e19\u0e40\u0e07\u0e34\u0e19 -->\n    <div id=\"unpaidZone\"></div>\n\n    <!-- Filters -->\n    <div class=\"card\">\n      <div class=\"sec-label\" style=\"margin:0 0 10px;\">\ud83d\udd0e \u0e01\u0e23\u0e2d\u0e07\u0e23\u0e32\u0e22\u0e01\u0e32\u0e23</div>\n      <div class=\"flt-grid\">\n        <div class=\"field\"><label>\u0e2a\u0e16\u0e32\u0e19\u0e30</label>\n          <select id=\"fStatus\"><option value=\"\">\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14</option><option value=\"Pending\">\u0e23\u0e2d\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34</option><option value=\"Approved\">\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34\u0e41\u0e25\u0e49\u0e27</option><option value=\"Rejected\">\u0e44\u0e21\u0e48\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34</option></select>\n        </div>\n        <div class=\"field\"><label>\u0e41\u0e1c\u0e19\u0e01</label><select id=\"fDept\"><option value=\"\">\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14</option></select></div>\n        <div class=\"field\"><label>\u0e1e\u0e19\u0e31\u0e01\u0e07\u0e32\u0e19</label><select id=\"fStaff\"><option value=\"\">\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14</option></select></div>\n        <div class=\"field\"><label>\u0e1b\u0e23\u0e30\u0e40\u0e20\u0e17</label><select id=\"fCategory\"><option value=\"\">\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14</option></select></div>\n        <div class=\"field\"><label>\u0e1b\u0e35</label><select id=\"fYear\"><option value=\"\">\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14</option></select></div>\n        <div class=\"field\"><label>\u0e40\u0e14\u0e37\u0e2d\u0e19</label>\n          <select id=\"fMonth\"><option value=\"\">\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14</option>\n            <option value=\"01\">\u0e21.\u0e04.</option><option value=\"02\">\u0e01.\u0e1e.</option><option value=\"03\">\u0e21\u0e35.\u0e04.</option>\n            <option value=\"04\">\u0e40\u0e21.\u0e22.</option><option value=\"05\">\u0e1e.\u0e04.</option><option value=\"06\">\u0e21\u0e34.\u0e22.</option>\n            <option value=\"07\">\u0e01.\u0e04.</option><option value=\"08\">\u0e2a.\u0e04.</option><option value=\"09\">\u0e01.\u0e22.</option>\n            <option value=\"10\">\u0e15.\u0e04.</option><option value=\"11\">\u0e1e.\u0e22.</option><option value=\"12\">\u0e18.\u0e04.</option>\n          </select>\n        </div>\n      </div>\n      <div class=\"search-box\"><input type=\"text\" id=\"fSearch\" placeholder=\"\u0e04\u0e49\u0e19\u0e2b\u0e32 \u0e0a\u0e37\u0e48\u0e2d / \u0e2a\u0e16\u0e32\u0e19\u0e17\u0e35\u0e48 / ID...\"></div>\n      <button class=\"btn btn-secondary btn-sm\" id=\"clearBtn\" style=\"width:100%;margin-top:9px;\">\ud83d\uddd1 \u0e25\u0e49\u0e32\u0e07\u0e15\u0e31\u0e27\u0e01\u0e23\u0e2d\u0e07</button>\n    </div>\n\n    <div id=\"statsZone\"></div>\n    <div id=\"list\" class=\"loading\"><div class=\"spinner\"></div></div>\n  </div>\n\n  <div id=\"modal\" class=\"modal\">\n    <div class=\"modal-content\">\n      <div class=\"modal-head\"><h3 id=\"modalTitle\">\u0e23\u0e32\u0e22\u0e25\u0e30\u0e40\u0e2d\u0e35\u0e22\u0e14</h3><button class=\"modal-close\" aria-label=\"\u0e1b\u0e34\u0e14\" onclick=\"closeModal()\">\u2715</button></div>\n      <div id=\"modalContent\"></div>\n    </div>\n  </div>\n\n  \n  \n  \n  \n  \n  \n",css:"\n    .flt-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }\n    .flt-grid .field { margin:0; }\n    .flt-grid label { font-size:11px; }\n    .flt-grid select, .flt-grid input { padding:9px 11px; font-size:13px; }\n    .search-box { position:relative; margin-top:9px; }\n    .search-box input { padding-left:38px; }\n    .search-box::before { content:'\ud83d\udd0d'; position:absolute; left:13px; top:50%; transform:translateY(-50%); font-size:14px; opacity:.5; }\n  ",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();
    let allRequests = [];

    const CAT_TH = catMap();   // 🔴 รวมไว้ที่ js/app.js แล้ว ห้ามก๊อปตารางมาไว้ในหน้าอีก
    const CAT_IC = CAT_ICON_TH;

    const bb = document.getElementById('backBtn');
    if (bb && typeof icon === 'function') bb.innerHTML = icon('back');

    async function load() {
      loadUnpaid();
      try {
        const result = await fetchAllRequests(session.Email);
        if (result && result.error) throw new Error(result.error);
        allRequests = Array.isArray(result) ? result : [];
        populateFilters();
        applyFilters();
        renderBottomNav('home');
      } catch (err) {
        renderError('list', err.message, load);
        renderBottomNav('home');
      }
      ['fStatus','fDept','fStaff','fCategory','fYear','fMonth'].forEach(id => document.getElementById(id).addEventListener('change', applyFilters));
      document.getElementById('fSearch').addEventListener('input', applyFilters);
      document.getElementById('clearBtn').addEventListener('click', clearFilters);
    }

    function populateFilters() {
      const depts=new Set(), staffs=new Set(), cats=new Set(), years=new Set();
      allRequests.forEach(r => {
        if (r.Department) depts.add(r.Department);
        if (r.StaffName) staffs.add(r.StaffName);
        if (r.Category) cats.add(r.Category);
        const d = new Date(r.ExpenseDate || r.Timestamp);
        if (!isNaN(d)) years.add(String(d.getFullYear()));
      });
      fill('fDept', [...depts].sort());
      fill('fStaff', [...staffs].sort());
      fill('fCategory', [...cats].sort(), CAT_TH);
      fill('fYear', [...years].sort().reverse());
    }

    function fill(id, items, labelMap) {
      const sel = document.getElementById(id);
      const first = sel.options[0];
      sel.innerHTML = ''; sel.appendChild(first);
      items.forEach(v => { const o=document.createElement('option'); o.value=v; o.textContent=(labelMap&&labelMap[v])||v; sel.appendChild(o); });
    }

    function clearFilters() {
      ['fStatus','fDept','fStaff','fCategory','fYear','fMonth','fSearch'].forEach(id => document.getElementById(id).value = '');
      applyFilters();
    }

    function applyFilters() {
      const g = id => document.getElementById(id).value;
      const status=g('fStatus'), dept=g('fDept'), staff=g('fStaff'), cat=g('fCategory'), year=g('fYear'), month=g('fMonth');
      const search = g('fSearch').trim().toLowerCase();

      const filtered = allRequests.filter(r => {
        if (status && r.Status !== status) return false;
        if (dept && r.Department !== dept) return false;
        if (staff && r.StaffName !== staff) return false;
        if (cat && r.Category !== cat) return false;
        const d = new Date(r.ExpenseDate || r.Timestamp);
        if (year && (isNaN(d) || String(d.getFullYear()) !== year)) return false;
        if (month && (isNaN(d) || String(d.getMonth()+1).padStart(2,'0') !== month)) return false;
        if (search) {
          const blob = `${esc(r.StaffName)} ${esc(r.Venue)} ${esc(r.ID)} ${esc(r.Occasion)} ${esc(r.Customer)}`.toLowerCase();
          if (!blob.includes(search)) return false;
        }
        return true;
      });
      renderStats(filtered);
      renderList(filtered);
    }

    function renderStats(items) {
      const p = items.filter(r => r.Status==='Pending').length;
      const a = items.filter(r => r.Status==='Approved').length;
      const rj = items.filter(r => r.Status==='Rejected').length;
      /*
         🔴 ตัดใบ "ขอวงเงิน" ออกจากยอดรวม
            finalizeClaim เขียนยอดรวมบิลจริงกลับลงแถว Pre-Approve ด้วย
            ถ้าไม่ตัด ยอดรวมจะนับซ้ำสองเท่าของค่ารับรองทุกใบ
      */
      const money = items.filter(r => r.Status !== 'PreApprove' && r.Status !== 'Finalized');
      const total = money.reduce((s,r) => s+(Number(r.Amount)||0), 0);
      document.getElementById('statsZone').innerHTML = `
        <div class="kpi-grid">
          <div class="kpi red"><div class="label">💰 รวม</div><div class="value">${Math.round(total).toLocaleString()}</div><div class="delta">THB • ${money.length} รายการ</div></div>
          <div class="kpi green"><div class="label">✅ อนุมัติแล้ว</div><div class="value">${a}</div><div class="delta">รายการ</div></div>
          <div class="kpi orange"><div class="label">⏳ รออนุมัติ</div><div class="value">${p}</div><div class="delta">รายการ</div></div>
          <div class="kpi blue" style="background:linear-gradient(135deg,#64748B,#475569);"><div class="label">❌ ไม่อนุมัติ</div><div class="value">${rj}</div><div class="delta">รายการ</div></div>
        </div>`;
    }

    function renderList(items) {
      const list = document.getElementById('list');
      list.classList.remove('loading');
      if (items.length === 0) {
        list.innerHTML = `<div class="empty"><div class="icon-wrap">🔍</div><div class="title">ไม่พบรายการ</div><div class="sub">ลองปรับตัวกรอง</div></div>`;
        return;
      }
      const byMonth = {};
      items.forEach(r => {
        const d = new Date(r.ExpenseDate || r.Timestamp);
        const key = isNaN(d) ? 'ไม่ระบุ' : d.toLocaleDateString('th-TH', {year:'numeric', month:'long'});
        (byMonth[key] = byMonth[key] || []).push(r);
      });

      let html = '';
      Object.entries(byMonth).forEach(([month, reqs]) => {
        const sub = reqs.reduce((s,r)=>s+(Number(r.Amount)||0),0);
        html += `<div class="sec-label">${month} · ${reqs.length} รายการ · ${Math.round(sub).toLocaleString()} ฿</div>`;
        reqs.forEach(r => {
          const idx = allRequests.indexOf(r);
          const bg = r.Status==='Pending' ? '#FEF3C7' : r.Status==='Approved' ? '#DCFCE7' : '#FEE2E2';
          const fg = r.Status==='Pending' ? '#92400E' : r.Status==='Approved' ? '#065F46' : '#991B1B';
          const badgeCls = 'badge-' + String(r.Status||'').toLowerCase();
          html += `<div class="request-item" onclick="showDetail(${idx})">
            <div class="cat-icon" style="background:${bg};color:${fg};">${CAT_IC[r.Category]||'📦'}</div>
            <div class="info">
              <div class="title">${esc(r.StaffName)} · ${CAT_TH[r.Category]||r.Category}</div>
              <div class="meta">${formatDate(r.ExpenseDate || r.Timestamp)}${r.Venue ? ' • ' + r.Venue : ''}</div>
            </div>
            <div class="right">
              <div class="amount">${Math.round(Number(r.Amount)||0).toLocaleString()}</div>
              <span class="badge-pill ${badgeCls}" style="font-size:11px;">${esc(r.Status||'-')}</span>
            </div>
          </div>`;
        });
      });
      list.innerHTML = html;
    }

    function showDetail(idx) {
      const r = allRequests[idx];
      document.getElementById('modalTitle').textContent = r.StaffName + ' — ' + (CAT_TH[r.Category]||r.Category);
      const badgeCls = 'badge-' + String(r.Status||'').toLowerCase();
      const rows = [
        ['ID', r.ID], ['พนักงาน', r.StaffName + ' (' + r.Department + ')'], ['Email', r.StaffEmail],
        ['ประเภท', CAT_TH[r.Category]||r.Category], ['วันที่', formatDate(r.ExpenseDate)],
        ['สถานที่', r.Venue || '-'], ['โอกาส', r.Occasion || '-'], ['ผู้ร่วม', r.Attendees || '-']
      ];
      if (r.Customer) rows.push(['ลูกค้า', r.Customer]);
      if (r.Mileage_KM) rows.push(['ระยะทาง', r.Mileage_KM + ' กม.']);
      if (r.ApprovedBy) rows.push(['ผู้อนุมัติ', r.ApprovedBy]);
      if (r.ApprovedAt) rows.push(['อนุมัติเมื่อ', formatDate(r.ApprovedAt)]);
      if (r.Remark) rows.push(['หมายเหตุ', String(r.Remark).split(' sig:')[0]]);

      let html = `<div class="detail-row"><div class="key">จำนวนเงิน</div><div class="val big">${Math.round(Number(r.Amount)||0).toLocaleString()} <span style="font-size:13px;color:var(--gray-500);font-weight:600;">THB</span></div></div>
        <div class="detail-row"><div class="key">สถานะ</div><div class="val"><span class="badge-pill ${badgeCls}">${esc(r.Status)}</span></div></div>`
        + rows.map(([k,v]) => `<div class="detail-row"><div class="key">${k}</div><div class="val">${v}</div></div>`).join('');

      let urls = [];
      try { urls = JSON.parse(r.ReceiptURLs || '[]'); } catch {}
      if (urls.length === 0 && r.ReceiptURL) urls = [r.ReceiptURL];
      if (urls.length > 0) {
        html += `<div style="margin-top:16px;"><div style="font-size:13px;font-weight:700;margin-bottom:8px;">📎 ใบเสร็จ (${urls.length})</div><div style="display:flex;flex-wrap:wrap;gap:6px;">`;
        for (let i=0;i<urls.length;i++) html += `<button class="btn btn-secondary btn-sm" onclick="loadReceipt('${esc(r.ID)}',${i})">🔒 ไฟล์ ${i+1}</button>`;
        html += `</div><img id="rcptImg" class="preview-img" alt="ใบเสร็จ" style="display:none;"></div>`;
      }
      document.getElementById('modalContent').innerHTML = html;
      document.getElementById('modal').classList.add('show');
    }

    /**
     * v6.0 — ปิดลูปการจ่ายเงิน
     * เดิมระบบจบที่ "Export อนุมัติ" แล้วเงียบ พนักงานไม่รู้ว่าเงินเข้าเมื่อไหร่
     * ตรงนี้ให้บัญชี/GM กดยืนยันว่าโอนแล้ว → พนักงานได้แจ้งเตือนทันที
     */
    // เฉพาะฝ่ายบัญชีกับ GM เท่านั้นที่กดยืนยันการโอนได้ (คนเดียวเป็นได้ทั้งบัญชีและผู้บริหาร)
    let canMarkPaid = false;
    async function loadUnpaid() {
      try {
        const role = await fetchMyRole(session.Email);
        canMarkPaid = !!(role && (role.isAccountant || role.isGM));
      } catch (e) { canMarkPaid = false; }
      let list = [];
      try {
        const r = await apiGet('getUnpaidExports', { email: session.Email });
        list = Array.isArray(r) ? r : [];
      } catch (e) { return; }
      const zone = document.getElementById('unpaidZone');
      if (!list.length) { zone.innerHTML = ''; return; }

      const total = list.reduce((s,x) => s + (Number(x.TotalAmount)||0), 0);
      zone.innerHTML = `<div class="card">
        <div class="card-head"><span class="ib ib-green">💵</span>
          <div><div class="ch-title">รอโอนเงิน (${list.length})</div>
          <div class="ch-sub">อนุมัติแล้ว รวม ${Math.round(total).toLocaleString()} บาท</div></div>
        </div>
        <div style="margin-top:12px;">
        ${list.map(x => {
          const days = Math.floor((Date.now() - new Date(x.RequestedAt).getTime()) / 86400000);
          return `<div class="req-card ${days >= 7 ? 'warn' : 'ok'}">
            <div class="ri-top">
              <span class="ri-cat">${x.StaffName}</span>
              ${days >= 7 ? `<span class="pill warn">รอ ${days} วัน</span>` : ''}
              <span class="ri-amt">${Number(x.TotalAmount||0).toLocaleString()} ฿</span>
            </div>
            <div class="ri-meta">ใบเบิกเดือน ${x.Month}/${x.Year} · ${x.ItemCount} รายการ</div>
            ${canMarkPaid ? `<button class="btn btn-primary btn-sm" style="margin-top:9px;"
                    onclick="markPaid('${x.ID}','${String(x.StaffName).replace(/'/g,'')}',${Number(x.TotalAmount)||0})">
              💵 ยืนยันว่าโอนแล้ว</button>` : ''}
          </div>`;
        }).join('')}
        </div>
      </div>`;
    }

    window.markPaid = async (exportId, name, amount) => {
      if (!confirm('ยืนยันว่าโอนเงินให้ ' + name + ' แล้ว?\n\nจำนวน ' + Math.round(amount).toLocaleString() + ' บาท\nระบบจะแจ้งเตือนพนักงานทันที')) return;
      showLoading('กำลังบันทึก...');
      try {
        const r = await markExportPaid(session.Email, exportId);
        hideLoading();
        if (r.error) throw new Error(r.error);
        showToast('บันทึกแล้ว — แจ้ง ' + name + ' เรียบร้อย ✅', 'success');
        loadUnpaid();
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    async function loadReceipt(id, fileIndex) {
      showLoading('โหลดใบเสร็จ...');
      try {
        const r = await fetchReceiptImage(id, session.Email, fileIndex);
        hideLoading();
        if (r.error) throw new Error(r.error);
        const img = document.getElementById('rcptImg');
        img.src = r.dataUrl; img.style.display = 'block';
        img.onclick = () => openImageViewer(r.dataUrl, 'แตะ 2 ครั้งเพื่อซูม');
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    }

    function closeModal() { document.getElementById('modal').classList.remove('show'); }
    document.getElementById('modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
    window.showDetail = showDetail; window.loadReceipt = loadReceipt; window.closeModal = closeModal;
    if (session) load();
  
if(typeof applyFilters==='function')window.applyFilters=applyFilters;
if(typeof clearFilters==='function')window.clearFilters=clearFilters;
if(typeof closeModal==='function')window.closeModal=closeModal;
if(typeof fill==='function')window.fill=fill;
if(typeof load==='function')window.load=load;
if(typeof loadReceipt==='function')window.loadReceipt=loadReceipt;
if(typeof loadUnpaid==='function')window.loadUnpaid=loadUnpaid;
if(typeof populateFilters==='function')window.populateFilters=populateFilters;
if(typeof renderList==='function')window.renderList=renderList;
if(typeof renderStats==='function')window.renderStats=renderStats;
if(typeof showDetail==='function')window.showDetail=showDetail;
}}};
window.EXION_VIEWS["approvals.html"]={html:"<header class=\"header\"><h1>\u0e07\u0e32\u0e19\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34</h1></header><main class=\"container\" id=\"pageContent\"></main>",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){
(async()=>{
 const s=requireLogin();if(!s)return;renderWorkspaceNav('approvals');const root=document.getElementById('pageContent');let queue=[],tab='all',query='',failures=[];
 async function load(){root.innerHTML=pageHeading('งานอนุมัติ','ตรวจสอบคำขอและดำเนินการจากพื้นที่เดียว')+'<div class="skeleton-box"></div>';
 const results=await Promise.allSettled([fetchPendingApprovals(s.Email),apiGet('getExportApprovalInbox',{email:s.Email}),fetchPettyInbox(s.Email)]);queue=[];failures=[];
 results.forEach((r,i)=>{if(r.status==='rejected'){failures.push(['ค่าใช้จ่าย','รอบเบิก','เงินสดย่อย'][i]+': '+r.reason.message);return;}if(i===0)queue.push(...r.value.map(x=>({...x,kind:'expense'})));if(i===1)queue.push(...r.value.map(x=>({...x,kind:'period'})));if(i===2){queue.push(...(r.value.toApprove||[]).map(x=>({...x,kind:'petty'})));queue.push(...(r.value.toPay||[]).map(x=>({...x,kind:'pay'})));}});queue.sort((a,b)=>new Date(a.Timestamp||a.RequestedAt)-new Date(b.Timestamp||b.RequestedAt));render();}
 const labels={all:'ทั้งหมด',expense:'ค่าใช้จ่าย',period:'รอบเบิก',petty:'เงินสดย่อย',pay:'รอจ่ายเงินสด'};
 function render(){root.innerHTML=pageHeading('งานอนุมัติ','เรียงงานเก่าก่อน เพื่อช่วยให้คำขอไม่ตกค้าง',`<button class="btn btn-secondary" id="reloadQueue">รีเฟรช</button>`)+`<div class="queue-tabs" role="tablist">${Object.entries(labels).map(([k,v])=>`<button role="tab" aria-selected="${tab===k}" class="${tab===k?'active':''}" data-tab="${k}">${v} · ${k==='all'?queue.length:queue.filter(x=>x.kind===k).length}</button>`).join('')}</div><div class="filter-toolbar"><input type="search" id="queueSearch" aria-label="ค้นหางานอนุมัติ" placeholder="ค้นหาชื่อพนักงาน รายละเอียด หรือเลขคำขอ" value="${esc(query)}"></div>${failures.length?`<div class="warn-box" role="alert">บางส่วนโหลดไม่สำเร็จ กดรีเฟรชเพื่อลองใหม่<br>${failures.map(esc).join('<br>')}</div>`:''}<div style="margin-bottom:16px;font-size:12px"><a href="${s.isGM?'inbox.html':s.isSenior?'senior-inbox.html':'manager-inbox.html'}">เปิดเครื่องมืออนุมัติหลายรายการ →</a></div><div id="queueList"></div>`;document.getElementById('reloadQueue').onclick=()=>{invalidateReadSnapshots();load();};root.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{tab=b.dataset.tab;render();});document.getElementById('queueSearch').oninput=e=>{query=e.target.value;paint();};paint();}
 function paint(){const rows=queue.filter(r=>(tab==='all'||r.kind===tab)&&[r.StaffName,r.RequesterName,r.Purpose,r.Venue,r.ID].join(' ').toLowerCase().includes(query.toLowerCase()));document.getElementById('queueList').innerHTML=rows.length?rows.map((r)=>{const href=r.kind==='period'?'export-review.html?id='+encodeURIComponent(r.ID):r.kind==='expense'?'approve.html?id='+encodeURIComponent(r.ID)+'&stage='+(r._stage||'manager'):'pc-approve.html?id='+encodeURIComponent(r.ID);const n=Number(r.Amount||r.TotalAmount||r.Total||r.PreApproveBudget||0);const age=Math.max(0,Math.floor((Date.now()-new Date(r.Timestamp||r.RequestedAt||Date.now()))/86400000));return `<article class="queue-card"><div><h3>${esc(r.StaffName||r.RequesterName||'คำขอ')}</h3><p>${esc(r.kind==='period'?'ขออนุมัติรอบเบิก':r.Purpose||r.Venue||catTH(r.Category))}</p><p>${esc(r.ID)}</p></div><div class="queue-amount">${formatCurrency(n)}<p>บาท</p></div><div class="queue-footer"><span class="subtle">${labels[r.kind]} · รอ ${age} วัน</span><a class="btn btn-secondary" href="${href}">ตรวจสอบ${r.kind==='pay'?'และจ่ายเงิน':'รายละเอียด'} →</a></div></article>`;}).join(''):emptyState(query?'ไม่พบรายการที่ค้นหา':'ไม่มีงานค้างในหมวดนี้',query?'ลองค้นหาด้วยชื่อหรือเลขคำขออื่น':'เมื่อมีคำขอที่คุณรับผิดชอบ รายการจะแสดงที่นี่');}
 await load();
})();

if(typeof load==='function')window.load=load;
if(typeof paint==='function')window.paint=paint;
if(typeof render==='function')window.render=render;
}}};
window.EXION_VIEWS["approve.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" onclick=\"location.href='index.html'\" id=\"backBtn\"></button>\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34\u0e04\u0e33\u0e02\u0e2d</span></h1>\n  </div>\n\n  <div class=\"container\">\n    <div id=\"loading\" class=\"loading\"><div class=\"spinner\"></div></div>\n\n    <div id=\"content\" style=\"display:none;\">\n      <div class=\"count-hero\">\n        <div class=\"lbl\" id=\"reqCat\">\u2014</div>\n        <div class=\"num\" id=\"reqAmount\">\u2014</div>\n        <div class=\"sub\">THB</div>\n      </div>\n\n      <div class=\"card\">\n        <div class=\"sec-label\" style=\"margin:0 0 8px;\">\u0e23\u0e32\u0e22\u0e25\u0e30\u0e40\u0e2d\u0e35\u0e22\u0e14</div>\n        <div class=\"detail-list\" id=\"details\"></div>\n      </div>\n\n      <div class=\"card\" id=\"receiptBlock\" style=\"display:none;\">\n        <div class=\"card-head\"><span class=\"ib ib-blue\">\ud83e\uddfe</span>\n          <div><div class=\"ch-title\">\u0e43\u0e1a\u0e40\u0e2a\u0e23\u0e47\u0e08</div><div class=\"ch-sub\">\u0e40\u0e01\u0e47\u0e1a\u0e41\u0e1a\u0e1a\u0e2a\u0e48\u0e27\u0e19\u0e15\u0e31\u0e27 \u2014 \u0e15\u0e49\u0e2d\u0e07\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e15\u0e31\u0e27\u0e15\u0e19</div></div>\n        </div>\n        <div id=\"receiptLocked\" style=\"margin-top:14px;\">\n          <div class=\"info-box\">\ud83d\udd12 \u0e43\u0e2a\u0e48\u0e2d\u0e35\u0e40\u0e21\u0e25\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e43\u0e19\u0e01\u0e25\u0e48\u0e2d\u0e07\u0e14\u0e49\u0e32\u0e19\u0e25\u0e48\u0e32\u0e07\u0e01\u0e48\u0e2d\u0e19 \u0e41\u0e25\u0e49\u0e27\u0e01\u0e14\u0e40\u0e1b\u0e34\u0e14\u0e14\u0e39</div>\n          <button class=\"btn btn-secondary\" id=\"viewReceiptBtn\">\ud83d\udd13 \u0e40\u0e1b\u0e34\u0e14\u0e14\u0e39\u0e43\u0e1a\u0e40\u0e2a\u0e23\u0e47\u0e08</button>\n        </div>\n        <img id=\"receiptImg\" class=\"preview-img\" style=\"display:none;margin-top:12px;\">\n      </div>\n\n      <div class=\"card decide-card\" id=\"actionsBlock\">\n        <div class=\"card-head\"><span class=\"ib ib-red\">\u2705</span>\n          <div><div class=\"ch-title\">\u0e15\u0e31\u0e14\u0e2a\u0e34\u0e19\u0e43\u0e08</div><div class=\"ch-sub\">\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34 \u0e2b\u0e23\u0e37\u0e2d \u0e44\u0e21\u0e48\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34</div></div>\n        </div>\n        <div class=\"field\" style=\"margin-top:14px;\" id=\"emailField\">\n          <label>\u0e2d\u0e35\u0e40\u0e21\u0e25\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13 <span class=\"required\">*</span></label>\n          <input type=\"email\" id=\"approverEmail\" placeholder=\"you@exionth.com\" inputmode=\"email\">\n          <div class=\"hint\">\u0e23\u0e30\u0e1a\u0e1a\u0e15\u0e23\u0e27\u0e08\u0e2a\u0e2d\u0e1a\u0e2a\u0e34\u0e17\u0e18\u0e34\u0e4c\u0e01\u0e48\u0e2d\u0e19\u0e41\u0e2a\u0e14\u0e07\u0e43\u0e1a\u0e40\u0e2a\u0e23\u0e47\u0e08\u0e41\u0e25\u0e30\u0e1a\u0e31\u0e19\u0e17\u0e36\u0e01\u0e1c\u0e25</div>\n        </div>\n        <div id=\"asWho\" class=\"ok-box\" style=\"display:none;margin-top:14px;\"></div>\n        <div class=\"field\">\n          <label>\u0e2b\u0e21\u0e32\u0e22\u0e40\u0e2b\u0e15\u0e38 (\u0e16\u0e49\u0e32\u0e21\u0e35)</label>\n          <textarea id=\"remark\" rows=\"2\" placeholder=\"\u0e40\u0e0a\u0e48\u0e19 \u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34 \u0e20\u0e32\u0e22\u0e43\u0e19\u0e07\u0e1a Q2\"></textarea>\n        </div>\n\n        <div id=\"sigZone\"></div>\n\n        <div class=\"btn-row\" style=\"margin-top:14px;\">\n          <button class=\"btn btn-danger\" id=\"rejectBtn\" style=\"flex:1;\">\u274c \u0e44\u0e21\u0e48\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34</button>\n          <button class=\"btn btn-primary\" id=\"approveBtn\" style=\"flex:1.4;\">\u2705 \u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34</button>\n        </div>\n      </div>\n\n      <div class=\"card\" id=\"doneBlock\" style=\"display:none;\">\n        <div class=\"success-screen\">\n          <div class=\"big-ic\" id=\"doneIcon\">\u2705</div>\n          <h2 id=\"doneText\">\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34\u0e40\u0e23\u0e35\u0e22\u0e1a\u0e23\u0e49\u0e2d\u0e22</h2>\n          <p>\u0e1c\u0e25\u0e01\u0e32\u0e23\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34\u0e08\u0e30\u0e1b\u0e23\u0e32\u0e01\u0e0f\u0e43\u0e19\u0e01\u0e32\u0e23\u0e41\u0e08\u0e49\u0e07\u0e40\u0e15\u0e37\u0e2d\u0e19\u0e02\u0e2d\u0e07\u0e1e\u0e19\u0e31\u0e01\u0e07\u0e32\u0e19</p>\n          <a href=\"index.html\" class=\"btn btn-primary\" style=\"display:inline-flex;text-decoration:none;max-width:240px;margin:0 auto;\">\u0e01\u0e25\u0e31\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e41\u0e23\u0e01 \u2192</a>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  \n  \n  \n  \n  \n  \n",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const requestId = new URLSearchParams(location.search).get('id');
    const me = requireLogin();   // ไม่บังคับล็อกอิน (เปิดจากลิงก์ในอีเมลได้)
    const bb = document.getElementById('backBtn');
    if (bb && typeof icon === 'function') bb.innerHTML = icon('back');
    const CAT_TH = { FUEL:'⛽ น้ำมัน', ENT:'🍽 รับรอง', GOLF:'⛳ กอล์ฟ', TOLL:'🛣 ทางด่วน', PARK:'🅿️ จอดรถ', HOTEL:'🏨 ที่พัก', EXPRESS:'📦 ขนส่ง', MILE:'🚗 เบี้ยเลี้ยงรถ', OTHER:'📄 อื่นๆ' };
    let savedSig = null, sigPad = null;

    async function load() {
      if (!requestId) return fail('ไม่พบรหัสคำขอ');
      try {
        const r = await fetchRequest(requestId);
        if (!r || r.error) throw new Error((r && r.error) || 'ไม่พบคำขอนี้');

        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        document.getElementById('reqCat').textContent = CAT_TH[r.Category] || r.Category;
        document.getElementById('reqAmount').textContent = formatCurrency(r.Status==='PreApprove'?r.PreApproveBudget:r.Amount);

        const st = String(r.Status||'Pending');
        const stPill = st === 'Approved' ? '<span class="pill ok">✅ อนุมัติ</span>'
          : st === 'Rejected' ? '<span class="pill bad">❌ ไม่อนุมัติ</span>'
          : '<span class="pill warn">⏳ รออนุมัติ</span>';

        const rows = [
          ['รหัส', r.ID],
          ['พนักงาน', (r.StaffName||'-') + (r.Department ? ' · ' + r.Department : '')],
          ['อีเมล', r.StaffEmail || '-'],
          ['วันที่', formatDate(r.ExpenseDate)],
          ['สถานที่', r.Venue || '-'],
          ['ลูกค้า', r.Customer || '-'],
          ['โอกาส', r.Occasion || '-'],
          ['ผู้ร่วม', r.Attendees || '-'],
          ['สถานะ', stPill]
        ];
        document.getElementById('details').innerHTML = rows.map(([k,v]) =>
          `<div class="dl-row"><span class="k">${k}</span><span class="v">${k==='สถานะ'?v:esc(v)}</span></div>`).join('');

        if (r.ReceiptURL) {
          document.getElementById('receiptBlock').style.display = 'block';
          document.getElementById('viewReceiptBtn').addEventListener('click', viewReceipt);
        }

        if (st !== 'Pending') {
          document.getElementById('actionsBlock').innerHTML =
            `<div class="empty"><div class="icon-wrap">${st === 'Approved' ? '✅' : '❌'}</div>
              <div class="title">คำขอนี้${st === 'Approved' ? 'อนุมัติ' : 'ปฏิเสธ'}ไปแล้ว</div>
              <div class="sub">โดย ${esc(r.ApprovedBy || '-')}</div>
              <a href="index.html" class="btn btn-primary btn-sm" style="margin-top:16px;max-width:220px;text-decoration:none;">→ ไปหน้าแรก</a></div>`;
          if (typeof renderBottomNav === 'function' && me) renderBottomNav('inbox');
          return;
        }

        document.getElementById('approveBtn').addEventListener('click', () => decide('Approved'));
        document.getElementById('rejectBtn').addEventListener('click', () => decide('Rejected'));

        // ล็อกอินอยู่แล้ว → เติมอีเมลให้เลย ไม่ต้องพิมพ์เองบนมือถือ
        if (me && me.Email) {
          document.getElementById('approverEmail').value = me.Email;
          document.getElementById('emailField').style.display = 'none';
          const w = document.getElementById('asWho');
          w.style.display = 'block';
          w.innerHTML = `👤 อนุมัติในนาม <b>${me.Name || me.Email}</b>
            <button type="button" onclick="switchUser()" style="background:none;border:none;color:#166534;text-decoration:underline;font-size:11.5px;cursor:pointer;font-family:inherit;">ไม่ใช่ฉัน</button>`;
          checkSavedSig();
        }

        document.getElementById('approverEmail').addEventListener('blur', checkSavedSig);
      } catch (err) { fail(err.message); }
    }

    function fail(msg) {
      const l = document.getElementById('loading');
      l.classList.remove('loading');
      l.innerHTML = `<div class="empty"><div class="icon-wrap">⚠️</div>
        <div class="title">เปิดไม่ได้</div><div class="sub">${msg}</div>
        <a href="index.html" class="btn btn-primary btn-sm" style="margin-top:16px;max-width:220px;text-decoration:none;">→ ไปหน้าแรก</a></div>`;
    }

    window.switchUser = logout;

    async function checkSavedSig() {
      const email = document.getElementById('approverEmail').value.trim();
      if (!email || email.indexOf('@') < 0) return;
      try {
        const r = await getMySignature(email);
        if (r && r.hasSignature && r.dataUrl) {
          savedSig = r.dataUrl;
          document.getElementById('sigZone').innerHTML =
            `<div class="saved-sig"><div class="ss-label">✅ ใช้ลายเซ็นที่บันทึกไว้อัตโนมัติ</div>
              <img src="${esc(r.dataUrl)}" alt="signature"></div>`;
          return;
        }
      } catch {}
      renderSigPad();
    }

    function renderSigPad() {
      if (sigPad) return;
      document.getElementById('sigZone').innerHTML = `
        <div class="field" style="margin-bottom:0;">
          <label>ลายเซ็น <span class="required">*</span></label>
          <div class="sig-canvas-wrap">
            <canvas id="sigCanvas" class="sig-canvas"></canvas>
            <span id="sigPh" class="sig-ph">✍️ เซ็นที่นี่</span>
          </div>
          <button class="btn btn-secondary btn-sm" style="margin-top:8px;" onclick="sigPad.clear()">🗑 ล้าง</button>
          <div class="hint">💡 บันทึกลายเซ็นในหน้าโปรไฟล์ เพื่อไม่ต้องเซ็นซ้ำทุกครั้ง</div>
        </div>`;
      const canvas = document.getElementById('sigCanvas');
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle='#0F172A'; ctx.lineWidth=2.5;
      let drawing=false, empty=true;
      const ph = document.getElementById('sigPh');
      const pos = e => { const r=canvas.getBoundingClientRect(); return { x:(e.touches?e.touches[0].clientX:e.clientX)-r.left, y:(e.touches?e.touches[0].clientY:e.clientY)-r.top }; };
      const start = e => { drawing=true; const p=pos(e); ctx.beginPath(); ctx.moveTo(p.x,p.y); e.preventDefault(); };
      const draw = e => { if(!drawing) return; const p=pos(e); ctx.lineTo(p.x,p.y); ctx.stroke(); empty=false; ph.style.display='none'; e.preventDefault(); };
      const end = () => drawing=false;
      canvas.addEventListener('mousedown',start); canvas.addEventListener('mousemove',draw);
      canvas.addEventListener('mouseup',end); canvas.addEventListener('mouseout',end);
      canvas.addEventListener('touchstart',start,{passive:false}); canvas.addEventListener('touchmove',draw,{passive:false}); canvas.addEventListener('touchend',end);
      sigPad = {
        isEmpty: () => empty,
        clear: () => { ctx.clearRect(0,0,canvas.width,canvas.height); empty=true; ph.style.display='block'; },
        toDataURL: () => canvas.toDataURL('image/png')
      };
    }

    async function viewReceipt() {
      const email = document.getElementById('approverEmail').value.trim();
      if (!email) return showToast('ใส่อีเมลของคุณก่อน', 'error');
      const btn = document.getElementById('viewReceiptBtn');
      btn.disabled = true; btn.textContent = 'กำลังโหลด...';
      try {
        const result = await fetchReceiptImage(requestId, email);
        if (result.error) throw new Error(result.error);
        if (!result.dataUrl) throw new Error('ไม่มีใบเสร็จ');
        const img = document.getElementById('receiptImg');
        img.src = result.dataUrl; img.style.display = 'block';
        document.getElementById('receiptLocked').style.display = 'none';
      } catch (err) {
        showToast(err.message, 'error');
        btn.disabled = false; btn.textContent = '🔓 ลองอีกครั้ง';
      }
    }

    async function decide(decision) {
      const approverEmail = document.getElementById('approverEmail').value.trim();
      if (!approverEmail) return showToast('ใส่อีเมลของคุณ', 'error');
      const remark = document.getElementById('remark').value.trim();
      const isApprove = decision === 'Approved';

      let signatureBase64 = '';
      if (isApprove) {
        if (savedSig) signatureBase64 = savedSig;
        else {
          if (!sigPad) renderSigPad();
          if (!sigPad || sigPad.isEmpty()) return showToast('กรุณาเซ็นชื่อก่อนอนุมัติ', 'error');
          signatureBase64 = sigPad.toDataURL();
        }
      }
      if (!isApprove && !remark) return showToast('กรุณาระบุเหตุผลที่ไม่อนุมัติ','error');
      if (!await confirmDialog(isApprove?'ยืนยันอนุมัติคำขอนี้?':'ยืนยันไม่อนุมัติ?',isApprove?'ตรวจสอบยอดเงินและหลักฐานเรียบร้อยแล้ว':remark,isApprove?'อนุมัติ':'ไม่อนุมัติ')) return;

      const btn = document.getElementById(isApprove ? 'approveBtn' : 'rejectBtn');
      btn.disabled = true;
      showLoading('กำลังบันทึก...');
      try {
        const result = await approveRequest({ id: requestId, decision, remark, approverEmail, signatureBase64 });
        hideLoading();
        if (result.error) throw new Error(result.error);
        document.getElementById('actionsBlock').style.display = 'none';
        document.getElementById('receiptBlock').style.display = 'none';
        document.getElementById('doneBlock').style.display = 'block';
        document.getElementById('doneIcon').textContent = isApprove ? '✅' : '❌';
        document.getElementById('doneText').textContent = isApprove ? 'อนุมัติเรียบร้อย' : 'บันทึกเรียบร้อย';
      } catch (err) {
        hideLoading(); showToast(err.message, 'error'); btn.disabled = false;
      }
    }

    if (me) load();
    if (me && typeof renderBottomNav === 'function') renderBottomNav('inbox');
  
if(typeof checkSavedSig==='function')window.checkSavedSig=checkSavedSig;
if(typeof decide==='function')window.decide=decide;
if(typeof fail==='function')window.fail=fail;
if(typeof load==='function')window.load=load;
if(typeof renderSigPad==='function')window.renderSigPad=renderSigPad;
if(typeof viewReceipt==='function')window.viewReceipt=viewReceipt;
}}};
window.EXION_VIEWS["dashboard.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" onclick=\"location.href='index.html'\" id=\"backBtn\"></button>\n    <h1>Dashboard</h1>\n  </div>\n\n  <div class=\"container\">\n    <div class=\"filter-tabs\">\n      <button data-period=\"thisMonth\" class=\"active\" onclick=\"setPeriod('thisMonth', this)\">\u0e40\u0e14\u0e37\u0e2d\u0e19\u0e19\u0e35\u0e49</button>\n      <button data-period=\"lastMonth\" onclick=\"setPeriod('lastMonth', this)\">\u0e40\u0e14\u0e37\u0e2d\u0e19\u0e17\u0e35\u0e48\u0e41\u0e25\u0e49\u0e27</button>\n      <button data-period=\"thisYear\" onclick=\"setPeriod('thisYear', this)\">\u0e1b\u0e35\u0e19\u0e35\u0e49</button>\n      <button data-period=\"all\" onclick=\"setPeriod('all', this)\">\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14</button>\n    </div>\n\n    <div id=\"loading\" class=\"loading\"><div class=\"spinner\"></div></div>\n    <div id=\"content\" style=\"display:none;\"></div>\n  </div>\n\n  \n  \n  \n  \n  \n  \n",css:"\n    .kpi-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; margin-bottom:12px; }\n    .kpi { padding:14px; border-radius:14px; color:white; }\n    .kpi.red { background:linear-gradient(135deg,#B7081D,#7a0512); }\n    .kpi.orange { background:linear-gradient(135deg,#f59e0b,#d97706); }\n    .kpi.green { background:linear-gradient(135deg,#16a34a,#15803d); }\n    .kpi.blue { background:linear-gradient(135deg,#0891b2,#0e7490); }\n    .kpi .label { font-size:11px; opacity:0.9; text-transform:uppercase; letter-spacing:0.05em; }\n    .kpi .value { font-size:26px; font-weight:800; margin-top:4px; }\n    .kpi .delta { font-size:11px; opacity:0.85; margin-top:2px; }\n    .chart-card { background:white; border-radius:14px; padding:16px; margin-bottom:12px; border:1px solid var(--gray-200); }\n    .chart-card h3 { margin:0 0 4px; font-size:15px; color:var(--gray-900); }\n    .chart-card .sub { font-size:12px; color:var(--gray-500); margin-bottom:12px; }\n    .bar-row { display:grid; grid-template-columns:100px 1fr 60px; gap:8px; align-items:center; margin-bottom:8px; font-size:13px; }\n    .bar-row .name { font-weight:600; color:var(--gray-800); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }\n    .bar-row .bar-track { background:var(--gray-100); border-radius:999px; height:14px; overflow:hidden; }\n    .bar-row .bar-fill { background:linear-gradient(90deg,#B7081D,#f59e0b); height:100%; border-radius:999px; transition:width 0.5s; }\n    .bar-row .val { text-align:right; font-weight:700; color:#B7081D; }\n    .filter-tabs { display:flex; gap:4px; margin-bottom:12px; background:var(--gray-100); padding:4px; border-radius:10px; }\n    .filter-tabs button { flex:1; padding:8px; border:none; background:transparent; border-radius:8px; font-size:12px; font-weight:600; color:var(--gray-600); cursor:pointer; }\n    .filter-tabs button.active { background:white; color:#B7081D; box-shadow:0 1px 3px rgba(0,0,0,0.1); }\n    .staff-row { display:flex; align-items:center; gap:10px; padding:10px; background:var(--gray-50); border-radius:10px; margin-bottom:6px; }\n    .staff-avatar { width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg,#B7081D,#7a0512); color:white; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; }\n    .staff-info { flex:1; }\n    .staff-name { font-weight:700; font-size:13px; }\n    .staff-meta { font-size:11px; color:var(--gray-500); }\n    .staff-amount { font-weight:800; color:#B7081D; }\n  ",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();
    let allData = [];
    let currentPeriod = 'thisMonth';
    let userRole = { role: 'staff' };

    async function load() {
      document.getElementById('backBtn').innerHTML = icon('back');
      try {
        userRole = await fetchMyRole(session.Email);
        // เลือก data source ตาม role
        let data;
        if (userRole.canViewAll || userRole.isGM || userRole.isSenior) {
          data = await apiGet('getAllRequests', { email: session.Email });
        } else if (userRole.isManager) {
          data = await apiGet('getMyTeamRequests', { email: session.Email });
        } else {
          data = await fetchMyRequests(session.Email);
        }
        allData = Array.isArray(data) ? data : [];
        render();
      } catch (err) {
        document.getElementById('loading').innerHTML = `<div class="empty"><div class="title">Error</div><div class="sub">${esc(err.message)}</div></div>`;
      }
    }

    function setPeriod(period, btn) {
      currentPeriod = period;
      document.querySelectorAll('.filter-tabs button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render();
    }

    function filterByPeriod(items) {
      const now = new Date();
      const y = now.getFullYear(), m = now.getMonth();
      return items.filter(r => {
        if (r.Status !== 'Approved') return false;
        const d = new Date(r.ExpenseDate || r.Timestamp);
        if (isNaN(d)) return false;
        if (currentPeriod === 'thisMonth') return d.getFullYear() === y && d.getMonth() === m;
        if (currentPeriod === 'lastMonth') {
          const lm = new Date(y, m - 1, 1);
          return d.getFullYear() === lm.getFullYear() && d.getMonth() === lm.getMonth();
        }
        if (currentPeriod === 'thisYear') return d.getFullYear() === y;
        return true;
      });
    }

    function render() {
      document.getElementById('loading').style.display = 'none';
      document.getElementById('content').style.display = 'block';

      const items = filterByPeriod(allData);
      const total = items.reduce((s, r) => s + (Number(r.Amount) || 0), 0);
      const uniqueStaff = new Set(items.map(r => r.StaffEmail)).size;

      // By Category
      const byCat = {};
      items.forEach(r => {
        const cat = r.Category || 'OTHER';
        if (!byCat[cat]) byCat[cat] = { cat, amount: 0, count: 0 };
        byCat[cat].amount += Number(r.Amount) || 0;
        byCat[cat].count += 1;
      });
      const catSorted = Object.values(byCat).sort((a, b) => b.amount - a.amount);
      const catMax = Math.max(...catSorted.map(c => c.amount), 1);

      // By Person
      const byPerson = {};
      items.forEach(r => {
        const name = r.StaffName || 'Unknown';
        if (!byPerson[name]) byPerson[name] = { name, amount: 0, count: 0, dept: r.Department };
        byPerson[name].amount += Number(r.Amount) || 0;
        byPerson[name].count += 1;
      });
      const personSorted = Object.values(byPerson).sort((a, b) => b.amount - a.amount);

      const roleLabel = userRole.canViewAll ? 'ทั้งบริษัท' : userRole.isManager ? 'ทีม' : 'ตัวเอง';

      let html = `
        <div class="kpi-grid">
          <div class="kpi red">
            <div class="label">💰 รวม ${roleLabel}</div>
            <div class="value">${Math.round(total).toLocaleString()}</div>
            <div class="delta">THB • ${items.length} รายการ</div>
          </div>
          <div class="kpi blue">
            <div class="label">👥 พนักงาน</div>
            <div class="value">${uniqueStaff}</div>
            <div class="delta">คนที่เบิก</div>
          </div>
        </div>

        <div class="chart-card">
          <h3>📊 แยกตามประเภท</h3>
          <div class="sub">รวม ${catSorted.length} ประเภท</div>
          ${catSorted.length === 0 ? '<p style="color:var(--gray-500);text-align:center;padding:20px;">ไม่มีข้อมูล</p>' :
            catSorted.map(c => {
              const pct = (c.amount / catMax * 100).toFixed(0);
              return `<div class="bar-row">
                <div class="name">${c.cat}</div>
                <div class="bar-track"><div class="bar-fill" style="width:${pct}%;"></div></div>
                <div class="val">${Math.round(c.amount).toLocaleString()}</div>
              </div>`;
            }).join('')
          }
        </div>
      `;

      if (userRole.isManager || userRole.isSenior || userRole.isGM) {
        html += `
          <div class="chart-card">
            <h3>🏆 Top พนักงาน</h3>
            <div class="sub">เรียงตามยอดรวม</div>
            ${personSorted.length === 0 ? '<p style="color:var(--gray-500);text-align:center;padding:20px;">ไม่มีข้อมูล</p>' :
              personSorted.slice(0, 15).map((p, i) => {
                const initial = (p.name || '?').trim().charAt(0).toUpperCase();
                return `<div class="staff-row">
                  <div style="font-size:14px;font-weight:800;color:${i<3 ? '#B7081D' : 'var(--gray-400)'};min-width:28px;">#${i+1}</div>
                  <div class="staff-avatar">${initial}</div>
                  <div class="staff-info">
                    <div class="staff-name">${p.name}</div>
                    <div class="staff-meta">${p.dept || '-'} • ${p.count} รายการ</div>
                  </div>
                  <div class="staff-amount">${Math.round(p.amount).toLocaleString()}</div>
                </div>`;
              }).join('')
            }
          </div>

          <div class="chart-card">
            <h3>👥 แยกตามคน × ประเภท</h3>
            <div class="sub">Top 5 คน × ประเภท</div>
            ${renderMatrix(personSorted.slice(0, 5), catSorted.slice(0, 5), items)}
          </div>
        `;
      }

      document.getElementById('content').innerHTML = html;
    }

    function renderMatrix(persons, cats, items) {
      if (persons.length === 0 || cats.length === 0) return '<p style="color:var(--gray-500);text-align:center;padding:20px;">ไม่มีข้อมูล</p>';
      const matrix = {};
      items.forEach(r => {
        const key = (r.StaffName || 'Unknown') + '|' + (r.Category || 'OTHER');
        matrix[key] = (matrix[key] || 0) + (Number(r.Amount) || 0);
      });
      let html = '<div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:11px;"><thead><tr>';
      html += '<th style="text-align:left;padding:6px;border-bottom:2px solid var(--gray-200);">ชื่อ</th>';
      cats.forEach(c => html += `<th style="text-align:right;padding:6px;border-bottom:2px solid var(--gray-200);">${c.cat}</th>`);
      html += '</tr></thead><tbody>';
      persons.forEach(p => {
        html += `<tr><td style="padding:6px;border-bottom:1px solid var(--gray-100);font-weight:600;">${p.name}</td>`;
        cats.forEach(c => {
          const v = matrix[p.name + '|' + c.cat] || 0;
          html += `<td style="text-align:right;padding:6px;border-bottom:1px solid var(--gray-100);color:${v>0?'#B7081D':'var(--gray-400)'};">${v > 0 ? Math.round(v).toLocaleString() : '-'}</td>`;
        });
        html += '</tr>';
      });
      html += '</tbody></table></div>';
      return html;
    }

    if (session) { load(); renderBottomNav('status'); }
  
if(typeof filterByPeriod==='function')window.filterByPeriod=filterByPeriod;
if(typeof load==='function')window.load=load;
if(typeof render==='function')window.render=render;
if(typeof renderMatrix==='function')window.renderMatrix=renderMatrix;
if(typeof setPeriod==='function')window.setPeriod=setPeriod;
}}};
window.EXION_VIEWS["export-review.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" aria-label=\"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a\" onclick=\"location.href='index.html'\" id=\"backBtn\"></button>\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">\u0e15\u0e23\u0e27\u0e08\u0e2a\u0e2d\u0e1a Export</span></h1>\n  </div>\n\n  <div class=\"container\">\n    <div id=\"content\" class=\"loading\"><div class=\"spinner\"></div></div>\n  </div>\n\n  \n  \n  \n  \n  \n  \n",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();
    const bb = document.getElementById('backBtn');
    if (bb && typeof icon === 'function') bb.innerHTML = icon('back');

    const exportId = new URLSearchParams(location.search).get('id');
    let detail = null;
    const MONTHS = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
    const CAT_TH = catMap(true);   // 🔴 รวมไว้ที่ js/app.js แล้ว ห้ามก๊อปตารางมาไว้ในหน้าอีก

    async function load() {
      if (!exportId) return fail('ไม่พบรหัสคำขอ');
      try {
        detail = await apiGet('getExportRequestDetail', { id: exportId, viewerEmail: session.Email });
        if (detail.error) throw new Error(detail.error);
        render();
      } catch (err) { fail(err.message); }
    }

    function fail(msg) {
      const c = document.getElementById('content');
      c.classList.remove('loading');
      c.innerHTML = `<div class="empty"><div class="icon-wrap">⚠️</div>
        <div class="title">เปิดไม่ได้</div><div class="sub">${msg}</div>
        <a href="index.html" class="btn btn-primary btn-sm" style="margin-top:16px;max-width:220px;text-decoration:none;">→ ไปหน้าแรก</a></div>`;
    }

    function render() {
      const req = detail.request;
      const me = String(session.Email).toLowerCase();

      let stage = null;
      if (req.ManagerStatus === 'Pending') stage = 'หัวหน้า';
      else if (req.SeniorStatus === 'Pending') stage = 'Senior';
      else if (req.GMStatus === 'Pending') stage = 'GM';

      const canApprove =
        (stage === 'หัวหน้า' && String(req.ManagerEmail||'').toLowerCase() === me) ||
        (stage === 'Senior'  && String(req.SeniorEmail||'').toLowerCase()  === me) ||
        (stage === 'GM'      && String(req.GMEmail||'').toLowerCase()      === me);

      const stages = [
        { name:'หัวหน้า', email:req.ManagerEmail, status:req.ManagerStatus, remark:req.ManagerRemark },
        { name:'Senior',  email:req.SeniorEmail,  status:req.SeniorStatus,  remark:req.SeniorRemark },
        { name:'GM',      email:req.GMEmail,      status:req.GMStatus,      remark:req.GMRemark }
      ].filter(s => s.email);

      const chain = `<div class="approver-chain">` + stages.map(s => {
        const cls = s.status==='Approved'?'done':s.status==='Rejected'?'rejected':s.status==='Pending'?'current':'';
        const ic  = s.status==='Approved'?'✅':s.status==='Rejected'?'❌':s.status==='Pending'?'⏳':'⏸';
        return `<div class="approver-step ${cls}"><div class="as-ic">${ic}</div>
          <div class="as-role">${s.name}</div><div class="as-who">${String(s.email).split('@')[0]}</div></div>`;
      }).join('') + `</div>`;

      const remarks = stages.filter(s => s.remark).map(s =>
        `<div class="ri-meta">💬 <b>${s.name}:</b> ${s.remark}</div>`).join('');

      // Category breakdown
      const byCat = {};
      detail.items.forEach(r => { byCat[r.Category] = (byCat[r.Category]||0) + (Number(r.Amount)||0); });
      const maxCat = Math.max(1, ...Object.values(byCat));
      const bars = Object.entries(byCat).sort((a,b)=>b[1]-a[1]).map(([c,v]) =>
        `<div class="bar-row"><span class="bl">${CAT_TH[c]||c}</span>
          <span class="bt"><span class="bf" style="width:${(v/maxCat*100).toFixed(1)}%"></span></span>
          <span class="bv">${Math.round(v).toLocaleString()}</span></div>`).join('');

      const rows = detail.items.map((r,i) => {
        const d = r.ExpenseDate ? new Date(r.ExpenseDate) : null;
        const date = d && !isNaN(d) ? d.toLocaleDateString('th-TH',{day:'numeric',month:'short'}) : '-';
        return `<tr>
          <td>${i+1}</td><td>${date}</td><td>${CAT_TH[r.Category]||r.Category}</td>
          <td>${esc(r.Customer || '-')}</td><td>${r.Venue || r.Occasion || '-'}</td>
          <td class="num">${Number(r.Amount||0).toLocaleString()}</td></tr>`;
      }).join('');

      const badge = req.OverallStatus === 'Approved' ? '<span class="pill ok">✅ อนุมัติครบแล้ว</span>'
        : req.OverallStatus === 'Rejected' ? '<span class="pill bad">❌ ถูกปฏิเสธ</span>'
        : `<span class="pill warn">⏳ รอ ${stage || ''} อนุมัติ</span>`;

      const c = document.getElementById('content');
      c.classList.remove('loading');
      c.innerHTML = `
        <div class="count-hero">
          <div class="lbl">${esc(req.StaffName)} · ${MONTHS[Number(req.Month)-1]} ${esc(req.Year)}</div>
          <div class="num">${Number(req.TotalAmount||0).toLocaleString()}</div>
          <div class="sub">THB • ${esc(req.ItemCount)} รายการ</div>
          ${req.PeriodStart && req.PeriodEnd
            ? `<div class="sub" style="opacity:.85;">📅 ${fmtTH(req.PeriodStart)} – ${fmtTH(req.PeriodEnd)}</div>` : ''}
        </div>

        <div class="card">
          <div style="text-align:center;margin-bottom:4px;">${badge}</div>
          ${chain}
          ${remarks}
        </div>

        ${bars ? `<div class="card"><div class="sec-label" style="margin:0 0 10px;">แยกตามประเภท</div>${bars}</div>` : ''}

        <div class="card">
          <div class="sec-label" style="margin:0 0 10px;">รายการทั้งหมด (${detail.items.length})</div>
          <div class="xl-wrap">
            <table class="xl">
              <thead><tr><th>#</th><th>วันที่</th><th>ประเภท</th><th>ลูกค้า</th><th>รายละเอียด</th><th class="num">THB</th></tr></thead>
              <tbody>${rows}</tbody>
              <tfoot><tr><td colspan="5">รวมทั้งสิ้น</td><td class="num">${Number(req.TotalAmount||0).toLocaleString()}</td></tr></tfoot>
            </table>
          </div>
          <button class="btn btn-secondary" onclick="downloadDraft()" style="margin-top:12px;">👀 ดาวน์โหลดตัวอย่าง (มีลายน้ำ)</button>
        </div>

        ${canApprove ? `
        <div class="card decide-card">
          <div class="card-head"><span class="ib ib-red">✅</span>
            <div><div class="ch-title">คุณคือ ${stage}</div><div class="ch-sub">กรุณาตรวจสอบและตัดสินใจ</div></div>
          </div>
          <div class="field" style="margin-top:12px;">
            <label>ช่วงรอบ <span class="optional-tag">ปรับได้</span></label>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              <input type="date" id="periodStartInput"
                value="${toYMD(req.PeriodStart)}"
                max="${todayYMD()}">
              <input type="date" id="periodEndInput"
                value="${toYMD(req.PeriodEnd)}"
                max="${todayYMD()}">
            </div>
            <div class="hint">
              ${req.PeriodStart
                ? `พนักงานส่งมาเป็น <b>${fmtTH(req.PeriodStart)} – ${fmtTH(req.PeriodEnd)}</b>`
                : 'รอบเก่าที่ยังไม่ได้บันทึกช่วงวัน — เลือกได้เลย'}
              <br>เปลี่ยนแล้วระบบคิดยอดใหม่ให้ทันที ไม่ต้องตีกลับให้พนักงานส่งใหม่
            </div>
            <div id="periodWarn" style="margin-top:8px;"></div>
          </div>
          <div class="field">
            <label>หมายเหตุ (บังคับถ้าไม่อนุมัติ)</label>
            <textarea id="remarkInput" rows="2" placeholder="ระบุเหตุผล..."></textarea>
          </div>
          <div class="btn-row">
            <button class="btn btn-danger" style="flex:1;" onclick="decide('Rejected')">❌ ไม่อนุมัติ</button>
            <button class="btn btn-primary" style="flex:1.4;" onclick="decide('Approved')">✅ อนุมัติ</button>
          </div>
          <p class="footnote" style="margin-top:10px;">💡 ระบบใช้ลายเซ็นที่บันทึกไว้ในโปรไฟล์อัตโนมัติ</p>
        </div>` : (req.OverallStatus === 'Pending'
          ? `<div class="info-box">⏳ รอ ${stage} อนุมัติ — คุณยังไม่ต้องดำเนินการ</div>` : '')}
      `;
      if (canApprove) bindPeriodWatch();
    }

    function fmtTH(v) {
      const d = new Date(v);
      return isNaN(d) ? '-' : d.toLocaleDateString('th-TH', { day:'numeric', month:'long', year:'numeric' });
    }

    // เตือนสดๆ ถ้าช่วงที่เลือกทับรอบก่อนหรือมีวันหาย — ถามจาก server เพราะรู้ประวัติรอบทั้งหมด
    let warnTimer = null;
    function bindPeriodWatch() {
      const s = document.getElementById('periodStartInput');
      const e = document.getElementById('periodEndInput');
      if (!s || !e) return;
      const run = () => {
        clearTimeout(warnTimer);
        warnTimer = setTimeout(async () => {
          const box = document.getElementById('periodWarn');
          if (!box || !s.value || !e.value) return;
          if (new Date(e.value) < new Date(s.value)) {
            box.innerHTML = `<div class="bad-box" style="margin:0;font-size:12.5px;">❌ วันจบอยู่ก่อนวันเริ่ม</div>`;
            return;
          }
          try {
            const p = await apiGet('previewPeriod', {
              email: detail.request.StaffEmail, start: s.value, end: e.value, exportId: exportId });
            if (!p || p.error) return;
            box.innerHTML =
              (p.warnings || []).map(x => `<div class="warn-box" style="margin:0 0 6px;font-size:12.5px;">${x}</div>`).join('') +
              `<div class="info-box" style="margin:0;font-size:12.5px;">📊 ช่วงนี้มี <b>${p.count}</b> รายการ · <b>${Number(p.total).toLocaleString()}</b> บาท</div>`;
          } catch {}
        }, 350);
      };
      s.addEventListener('input', run);
      e.addEventListener('input', run);
      run();
    }

    window.decide = async (decision) => {
      const el = document.getElementById('remarkInput');
      const remark = el ? el.value.trim() : '';
      if (decision === 'Rejected' && !remark) return showToast('กรุณาระบุเหตุผล', 'error');

      const ps = document.getElementById('periodStartInput');
      const pe = document.getElementById('periodEndInput');
      const periodStart = (decision === 'Approved' && ps) ? ps.value : '';
      const periodEnd   = (decision === 'Approved' && pe) ? pe.value : '';
      if (decision === 'Approved' && periodStart && periodEnd && new Date(periodEnd) < new Date(periodStart)) {
        return showToast('วันจบอยู่ก่อนวันเริ่ม', 'error');
      }

      const origS = toYMD(detail.request.PeriodStart);
      const origE = toYMD(detail.request.PeriodEnd);
      const moved = decision === 'Approved' && ((periodStart && periodStart !== origS) || (periodEnd && periodEnd !== origE));

      let msg;
      if (decision !== 'Approved') msg = 'ไม่อนุมัติ Export นี้?';
      else if (moved) {
        const warnTxt = (document.getElementById('periodWarn') || {}).textContent || '';
        msg = `เปลี่ยนช่วงรอบเป็น\n${fmtTH(periodStart)} – ${fmtTH(periodEnd)}\n\n` +
              (/⚠️/.test(warnTxt) ? warnTxt.trim() + '\n\n' : '') +
              'ระบบจะคิดยอดใหม่ตามช่วงนี้ แล้วอนุมัติเลย\nยืนยัน?';
      } else msg = 'อนุมัติ Export นี้?';
      if (!confirm(msg)) return;

      showLoading(moved ? 'กำลังคิดยอดใหม่...' : 'กำลังบันทึก...');
      try {
        const r = await apiPost('approveExportRequest', {
          id: exportId, decision, approverEmail: session.Email, remark, periodStart, periodEnd });
        hideLoading();
        if (r.error) throw new Error(r.error);
        showToast(decision === 'Approved' ? 'อนุมัติเรียบร้อย ✅' : 'บันทึกแล้ว', 'success');
        setTimeout(() => location.reload(), 1000);
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    window.downloadDraft = async () => {
      const req = detail.request;
      showLoading('กำลังสร้างตัวอย่าง...');
      try {
        // ส่งช่วงวันที่กำลังปรับอยู่บนหน้าจอไปด้วย ไม่งั้นตัวอย่างไม่ตรงกับที่จะอนุมัติ
        const ps = document.getElementById('periodStartInput');
        const pe = document.getElementById('periodEndInput');
        const r = await apiPost('downloadDraftExport', {
          staffEmail: req.StaffEmail, year: req.Year, month: req.Month,
          periodStart: ps ? ps.value : toYMD(req.PeriodStart),
          periodEnd:   pe ? pe.value : toYMD(req.PeriodEnd),
          requesterEmail: session.Email });
        hideLoading();
        if (r.error) throw new Error(r.error);
        const bytes = atob(r.base64);
        const arr = new Uint8Array(bytes.length);
        for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
        const blob = new Blob([arr], { type: r.mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = r.filename;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        showToast('ดาวน์โหลดตัวอย่างแล้ว ✅', 'success');
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    if (session) { load(); renderBottomNav('inbox'); }
  
if(typeof bindPeriodWatch==='function')window.bindPeriodWatch=bindPeriodWatch;
if(typeof fail==='function')window.fail=fail;
if(typeof fmtTH==='function')window.fmtTH=fmtTH;
if(typeof load==='function')window.load=load;
if(typeof render==='function')window.render=render;
}}};
window.EXION_VIEWS["finalize-claim.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" aria-label=\"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a\" onclick=\"location.href='pre-approves.html'\" id=\"backBtn\"></button>\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">\u0e2a\u0e48\u0e07\u0e1a\u0e34\u0e25\u0e43\u0e0a\u0e49\u0e08\u0e23\u0e34\u0e07</span></h1>\n  </div>\n\n  <div class=\"container\">\n    <div id=\"loading\" class=\"loading\"><div class=\"spinner\"></div></div>\n\n    <div id=\"main\" style=\"display:none;\">\n      <div class=\"card\" id=\"preInfo\"></div>\n\n      <div class=\"batch-summary\" id=\"sumBox\">\n        <div style=\"font-size:11px;opacity:.9;font-weight:700;text-transform:uppercase;letter-spacing:.06em;\">\u0e22\u0e2d\u0e14\u0e43\u0e0a\u0e49\u0e08\u0e23\u0e34\u0e07\u0e23\u0e27\u0e21</div>\n        <div style=\"font-size:30px;font-weight:800;letter-spacing:-.03em;line-height:1.1;margin-top:2px;\" id=\"totalAmount\">0.00</div>\n        <div style=\"font-size:13px;opacity:.88;margin-top:2px;\" id=\"itemCount\">0 \u0e23\u0e32\u0e22\u0e01\u0e32\u0e23</div>\n        <div id=\"overBudgetMsg\"></div>\n      </div>\n\n      <div class=\"info-box\">\u2139\ufe0f \u0e2b\u0e25\u0e31\u0e07\u0e2a\u0e48\u0e07 \u0e2b\u0e31\u0e27\u0e2b\u0e19\u0e49\u0e32\u0e15\u0e49\u0e2d\u0e07\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07\u0e40\u0e2a\u0e21\u0e2d \u2014 \u0e41\u0e21\u0e49\u0e22\u0e2d\u0e14\u0e08\u0e30\u0e44\u0e21\u0e48\u0e40\u0e01\u0e34\u0e19\u0e07\u0e1a</div>\n\n      <div id=\"itemsContainer\"></div>\n\n      <button class=\"add-item-btn\" id=\"addBtn\" type=\"button\">\u2795 \u0e40\u0e1e\u0e34\u0e48\u0e21\u0e1a\u0e34\u0e25</button>\n      <button class=\"btn btn-primary\" id=\"submitBtn\" style=\"margin-top:16px;\">\u2705 \u0e2a\u0e48\u0e07\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14</button>\n    </div>\n  </div>\n\n  \n  \n  \n  \n  \n  \n",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();
    const bb = document.getElementById('backBtn');
    if (bb && typeof icon === 'function') bb.innerHTML = icon('back');

    const preId = new URLSearchParams(location.search).get('id');
    let preApprove = null, items = [], itemSeq = 0;
    let periodEnd = '';   // วันตัดรอบปัจจุบัน ใช้เตือนตอนลงวันที่เลยรอบ
    // หน้านี้ใช้แค่ 2 ประเภท แต่ยังดึงชื่อจากตารางกลาง คำจะได้ไม่เพี้ยนกัน
    const CAT_TH = { ENT: catLabel('ENT'), GOLF: catLabel('GOLF') };

    async function load() {
      if (!preId) return fail('ไม่พบรหัส Pre-Approve');
      try {
        const r = await fetchRequest(preId);
        if (!r || r.error) throw new Error((r && r.error) || 'ไม่พบ Pre-Approve');
        if (r.PreApproveStatus !== 'Approved') throw new Error('Pre-Approve ยังไม่ได้อนุมัติงบ');
        if (r.Status === 'Finalized') throw new Error('Pre-Approve นี้ส่งบิลไปแล้ว');
        preApprove = r;
        document.getElementById('loading').style.display = 'none';
        document.getElementById('main').style.display = 'block';
        renderInfo();
        try {
          const now = new Date();
          const pi = await apiGet('getPeriodInfo',
            { email: session.Email, year: now.getFullYear(), month: now.getMonth() + 1 });
          if (pi && pi.rangeEnd) periodEnd = pi.rangeEnd;
        } catch (e) { periodEnd = ''; }
        addItem();
        document.getElementById('addBtn').addEventListener('click', addItem);
        document.getElementById('submitBtn').addEventListener('click', onSubmit);
      } catch (err) { fail(err.message); }
    }

    function fail(msg) {
      document.getElementById('loading').classList.remove('loading');
      document.getElementById('loading').innerHTML =
        `<div class="empty"><div class="icon-wrap">⚠️</div><div class="title">เปิดไม่ได้</div><div class="sub">${msg}</div>
         <a href="pre-approves.html" class="btn btn-secondary btn-sm" style="margin-top:14px;text-decoration:none;max-width:200px;">← กลับ</a></div>`;
    }

    function renderInfo() {
      const p = preApprove;
      const budget = Number(p.PreApproveBudget) || 0;
      const cust = String(p.Customer||'-').replace(/^\[(.+?)\]\s*/, '<span class="tag">$1</span> ');
      document.getElementById('preInfo').innerHTML = `
        <div class="card-head"><span class="ib ib-orange">📋</span>
          <div><div class="ch-title">${CAT_TH[p.Category] || p.Category}</div>
          <div class="ch-sub">งบที่อนุมัติไว้แล้ว</div></div>
          <div style="margin-left:auto;text-align:right;">
            <div style="font-size:19px;font-weight:800;color:var(--accent);">${budget.toLocaleString()}</div>
            <div style="font-size:11px;color:var(--gray-400);">THB</div>
          </div>
        </div>
        <div class="detail-list" style="margin-top:10px;">
          <div class="dl-row"><span class="k">ลูกค้า</span><span class="v">${cust}</span></div>
          <div class="dl-row"><span class="k">สถานที่</span><span class="v">${p.Venue || '-'}</span></div>
          <div class="dl-row"><span class="k">โอกาส</span><span class="v">${p.Occasion || '-'}</span></div>
          <div class="dl-row"><span class="k">อนุมัติโดย</span><span class="v">${p.PreApproveBy || '-'}</span></div>
        </div>`;
    }

    function syncDom() {
      items.forEach(it => {
        const d = document.getElementById(it.id + '_date');
        const s = document.getElementById(it.id + '_desc');
        const a = document.getElementById(it.id + '_amount');
        if (d && d.value) it.date = d.value;
        if (s) it.description = s.value;
        if (a) it.amount = parseFloat(a.value) || 0;
      });
    }

    function addItem() {
      syncDom();
      itemSeq++;
      const prev = items.length ? items[items.length-1] : null;
      const it = {
        id: 'item_' + itemSeq,
        /*
         * 🔴 วันที่ตั้งต้นต้องเป็น "วันที่เกิดค่าใช้จ่ายจริง" จากใบ Pre-Approve
         *    เดิมตั้งเป็นวันนี้ — เลี้ยงลูกค้าวันที่ 19 แต่มาส่งบิลวันที่ 26
         *    บิลเลยลงวันที่ 26 ซึ่งเลยวันตัดรอบ (25) ไปแล้ว
         *    ผลคือค่ารับรองไม่โผล่ใน Excel ทั้งที่อนุมัติครบทุกขั้น
         */
        date: prev ? prev.date : (toYMD(preApprove && preApprove.ExpenseDate) || todayYMD()),
        description: '', amount: 0, receipts: [], _dup: !!prev
      };
      items.push(it);
      const wrap = document.createElement('div');
      wrap.innerHTML = itemHtml(it, items.length);
      const card = wrap.firstElementChild;
      document.getElementById('itemsContainer').appendChild(card);
      attach(it);
      renumber();
      updateSummary();
      setTimeout(() => card.scrollIntoView({behavior:'smooth', block:'center'}), 100);
    }

    function removeItem(id) {
      if (items.length === 1) return showToast('ต้องมีอย่างน้อย 1 บิล', 'error');
      syncDom();
      const idx = items.findIndex(i => i.id === id);
      if (idx < 0) return;
      items.splice(idx, 1);
      const cards = document.querySelectorAll('#itemsContainer .item-card');
      if (cards[idx]) cards[idx].remove();
      renumber(); updateSummary();
    }
    window.removeItem = removeItem;

    function renumber() {
      document.querySelectorAll('#itemsContainer .item-card').forEach((card, i) => {
        const n = card.querySelector('.item-num');
        if (n) n.textContent = 'บิล ' + (i+1);
        const old = card.querySelector('.remove-item');
        if (old) old.remove();
        if (items.length > 1 && items[i]) {
          const b = document.createElement('button');
          b.className = 'remove-item'; b.type = 'button'; b.textContent = '✕';
          b.addEventListener('click', () => removeItem(items[i].id));
          card.appendChild(b);
        }
      });
    }

    function itemHtml(it, num) {
      return `<div class="item-card">
        <span class="item-num">บิล ${num}</span>
        ${it._dup && num > 1 ? '<div class="dup-hint">📋 คัดลอกวันที่จากบิลก่อน</div>' : ''}
        <div class="field" style="margin-top:10px;">
          <label>วันที่บิล <span class="required">*</span></label>
          <input type="date" id="${esc(it.id)}_date" value="${esc(it.date)}">
        </div>
        <div class="field">
          <label>รายละเอียด <span class="required">*</span></label>
          <input type="text" id="${esc(it.id)}_desc" value="${esc(it.description)}" placeholder="เช่น อาหารมื้อค่ำ, ค่าเครื่องดื่ม">
        </div>
        <div class="field">
          <label>จำนวนเงิน (THB) <span class="required">*</span></label>
          <input type="number" id="${esc(it.id)}_amount" step="0.01" min="0" inputmode="decimal" value="${esc(it.amount||'')}" placeholder="0.00">
        </div>
        <div class="field" style="margin-bottom:0;">
          <label>ใบเสร็จ <span class="required">*</span></label>
          <label for="${esc(it.id)}_files" class="upload-area">
            <input type="file" id="${esc(it.id)}_files" accept="image/*,application/pdf" multiple>
            <div class="icon-wrap">📎</div>
            <div class="text">แตะเพื่อแนบไฟล์</div>
            <div class="sub">ภาพ / PDF · แนบได้หลายไฟล์</div>
          </label>
          <div id="${esc(it.id)}_chips" style="margin-top:8px;">${chips(it)}</div>
        </div>
      </div>`;
    }

    function chips(it) {
      return it.receipts.map((f,i) => `<span class="file-chip">📎 ${f.name.length>18?f.name.substr(0,15)+'...':f.name}<button type="button" onclick="removeFile('${esc(it.id)}',${i})">✕</button></span>`).join('');
    }

    function attach(it) {
      [['date','date'],['desc','description'],['amount','amount']].forEach(([sfx, field]) => {
        const el = document.getElementById(it.id + '_' + sfx);
        if (!el) return;
        const h = e => {
          it[field] = field === 'amount' ? (parseFloat(e.target.value)||0) : e.target.value;
          if (field === 'amount') updateSummary();
        };
        el.addEventListener('input', h); el.addEventListener('change', h); el.addEventListener('blur', h);
      });
      const fi = document.getElementById(it.id + '_files');
      if (fi) fi.addEventListener('change', e => onFiles(it.id, e));
    }

    async function onFiles(itemId, e) {
      const it = items.find(x => x.id === itemId);
      if (!it) return;
      for (const file of Array.from(e.target.files)) {
        if (file.size > 5*1024*1024) { showToast(file.name + ' > 5MB', 'error'); continue; }
        it.receipts.push({ name: file.name, base64: await fileToBase64(file) });
      }
      const c = document.getElementById(itemId + '_chips');
      if (c) c.innerHTML = chips(it);
      e.target.value = '';
    }

    window.removeFile = (itemId, idx) => {
      const it = items.find(i => i.id === itemId);
      if (!it) return;
      it.receipts.splice(idx, 1);
      const c = document.getElementById(itemId + '_chips');
      if (c) c.innerHTML = chips(it);
    };

    function updateSummary() {
      const total = items.reduce((s,it) => s + (parseFloat(it.amount)||0), 0);
      const budget = Number(preApprove.PreApproveBudget) || 0;
      document.getElementById('totalAmount').textContent = formatCurrency(total) + ' THB';
      document.getElementById('itemCount').textContent = items.length + ' บิล • งบ ' + budget.toLocaleString() + ' THB';
      const msg = document.getElementById('overBudgetMsg');
      if (total > budget && budget > 0) {
        msg.innerHTML = `<div class="over-flag">⚠️ เกินงบ ${formatCurrency(total-budget)} THB</div>`;
      } else if (total > 0) {
        msg.innerHTML = `<div class="under-flag">✓ เหลืองบ ${formatCurrency(budget-total)} THB</div>`;
      } else msg.innerHTML = '';
    }

    async function onSubmit() {
      syncDom();
      for (const it of items) {
        if (!it.date) return showToast('ใส่วันที่ให้ครบ', 'error');
        // ⚠️ ลงวันที่เลยวันตัดรอบ = บิลจะไปโผล่รอบหน้า ไม่ใช่รอบนี้ ต้องบอกก่อนกดส่ง
        if (periodEnd && it.date > periodEnd) {
          if (!confirm('บิลลงวันที่ ' + it.date + ' ซึ่งเลยวันตัดรอบ (' + periodEnd + ') ไปแล้ว\n\n' +
                       'บิลนี้จะไปอยู่ในรอบถัดไป ไม่ใช่รอบปัจจุบัน\n\nยืนยันส่งแบบนี้?')) return;
        }
        if (!it.description || !it.description.trim()) return showToast('ใส่รายละเอียดให้ครบ', 'error');
        if (!it.amount || it.amount <= 0) return showToast('ใส่จำนวนเงินให้ครบ', 'error');
        if (!it.receipts.length) return showToast('แนบใบเสร็จทุกบิล', 'error');
      }
      const btn = document.getElementById('submitBtn');
      btn.disabled = true;
      showLoading('กำลังส่ง ' + items.length + ' บิล...');
      try {
        const r = await apiPost('finalizeClaim', {
          preApproveId: preId, requesterEmail: session.Email,
          items: items.map(it => ({ date: it.date, description: it.description, amount: it.amount, receipts: it.receipts }))
        });
        hideLoading();
        if (r.error) throw new Error(r.error);
        showToast('ส่งสำเร็จ ' + (r.itemsCreated || items.length) + ' รายการ ✅', 'success');
        setTimeout(() => location.href = 'status.html', 1400);
      } catch (err) { hideLoading(); showToast(err.message, 'error'); btn.disabled = false; }
    }

    if (session) { load(); renderBottomNav(''); }
  
if(typeof addItem==='function')window.addItem=addItem;
if(typeof attach==='function')window.attach=attach;
if(typeof chips==='function')window.chips=chips;
if(typeof fail==='function')window.fail=fail;
if(typeof itemHtml==='function')window.itemHtml=itemHtml;
if(typeof load==='function')window.load=load;
if(typeof onFiles==='function')window.onFiles=onFiles;
if(typeof onSubmit==='function')window.onSubmit=onSubmit;
if(typeof removeItem==='function')window.removeItem=removeItem;
if(typeof renderInfo==='function')window.renderInfo=renderInfo;
if(typeof renumber==='function')window.renumber=renumber;
if(typeof syncDom==='function')window.syncDom=syncDom;
if(typeof updateSummary==='function')window.updateSummary=updateSummary;
}}};
window.EXION_VIEWS["index.html"]={html:"\n<div id=\"loginView\" class=\"auth-layout\" hidden><section class=\"auth-story\"><img src=\"icons/logo.png\" alt=\"EXION\"><div><div class=\"eyebrow\">YOUR EVERYDAY WORKSPACE</div><h1>Less paperwork.<br>More progress.</h1><p>\u0e17\u0e38\u0e01\u0e04\u0e48\u0e32\u0e43\u0e0a\u0e49\u0e08\u0e48\u0e32\u0e22 \u0e08\u0e31\u0e14\u0e01\u0e32\u0e23\u0e44\u0e14\u0e49\u0e43\u0e19\u0e17\u0e35\u0e48\u0e40\u0e14\u0e35\u0e22\u0e27<br>\u0e2a\u0e48\u0e07\u0e04\u0e33\u0e02\u0e2d \u0e15\u0e34\u0e14\u0e15\u0e32\u0e21\u0e01\u0e32\u0e23\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34 \u0e41\u0e25\u0e30\u0e40\u0e1a\u0e34\u0e01\u0e08\u0e48\u0e32\u0e22<br>\u0e2a\u0e30\u0e14\u0e27\u0e01\u0e17\u0e38\u0e01\u0e17\u0e35\u0e48\u0e17\u0e35\u0e48\u0e04\u0e38\u0e13\u0e17\u0e33\u0e07\u0e32\u0e19</p></div><footer>EXION (Thailand) Co., Ltd. \u00b7 Expense Workspace</footer></section><main class=\"auth-form-wrap\"><form class=\"auth-form\" id=\"loginForm\"><div class=\"eyebrow\" style=\"margin-bottom:20px\">WELCOME BACK</div><h2 id=\"authTitle\">\u0e40\u0e02\u0e49\u0e32\u0e2a\u0e39\u0e48\u0e1e\u0e37\u0e49\u0e19\u0e17\u0e35\u0e48\u0e17\u0e33\u0e07\u0e32\u0e19</h2><p id=\"authHelp\">\u0e43\u0e0a\u0e49\u0e2d\u0e35\u0e40\u0e21\u0e25\u0e1a\u0e23\u0e34\u0e29\u0e31\u0e17\u0e41\u0e25\u0e30\u0e23\u0e2b\u0e31\u0e2a\u0e1c\u0e48\u0e32\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13</p><div class=\"field\"><label for=\"email\">\u0e2d\u0e35\u0e40\u0e21\u0e25\u0e1a\u0e23\u0e34\u0e29\u0e31\u0e17</label><input id=\"email\" name=\"email\" type=\"email\" autocomplete=\"username\" required placeholder=\"name@company.com\"></div><div class=\"field\"><label for=\"password\">\u0e23\u0e2b\u0e31\u0e2a\u0e1c\u0e48\u0e32\u0e19</label><input id=\"password\" name=\"password\" type=\"password\" autocomplete=\"current-password\" required minlength=\"8\" placeholder=\"\u0e01\u0e23\u0e2d\u0e01\u0e23\u0e2b\u0e31\u0e2a\u0e1c\u0e48\u0e32\u0e19\"></div><div id=\"setupFields\" hidden><div class=\"field\" id=\"recoveryCodeField\" hidden><label for=\"setupCode\">\u0e23\u0e2b\u0e31\u0e2a\u0e01\u0e39\u0e49\u0e1a\u0e31\u0e0d\u0e0a\u0e35\u0e08\u0e32\u0e01\u0e2b\u0e31\u0e27\u0e2b\u0e19\u0e49\u0e32\u0e2b\u0e23\u0e37\u0e2d\u0e1c\u0e39\u0e49\u0e14\u0e39\u0e41\u0e25</label><input id=\"setupCode\" autocomplete=\"one-time-code\" placeholder=\"\u0e23\u0e2b\u0e31\u0e2a\u0e43\u0e0a\u0e49\u0e04\u0e23\u0e31\u0e49\u0e07\u0e40\u0e14\u0e35\u0e22\u0e27\"></div><div class=\"field\"><label for=\"confirmPassword\">\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e23\u0e2b\u0e31\u0e2a\u0e1c\u0e48\u0e32\u0e19</label><input id=\"confirmPassword\" type=\"password\" autocomplete=\"new-password\"></div></div><button class=\"btn btn-primary\" id=\"loginBtn\" type=\"submit\">\u0e40\u0e02\u0e49\u0e32\u0e2a\u0e39\u0e48\u0e23\u0e30\u0e1a\u0e1a \u2192</button><div class=\"auth-error\" id=\"authError\" role=\"alert\"></div><div style=\"display:flex;justify-content:space-between;margin-top:22px;font-size:12px\"><button type=\"button\" id=\"toggleSetup\" class=\"auth-back\">\u0e43\u0e0a\u0e49\u0e07\u0e32\u0e19\u0e04\u0e23\u0e31\u0e49\u0e07\u0e41\u0e23\u0e01 / \u0e15\u0e31\u0e49\u0e07\u0e23\u0e2b\u0e31\u0e2a\u0e1c\u0e48\u0e32\u0e19</button><a href=\"reset-password.html\">\u0e25\u0e37\u0e21\u0e23\u0e2b\u0e31\u0e2a\u0e1c\u0e48\u0e32\u0e19?</a></div></form></main></div>\n<div id=\"workspace\" hidden><header class=\"header\"><h1><img class=\"logo\" src=\"icons/logo.png\" alt=\"EXION\"> Expense Workspace</h1><span class=\"subtle\" id=\"headerDate\"></span></header><main class=\"container\" id=\"homeContent\"><div class=\"skeleton-grid\"><div class=\"skeleton-box\"></div><div class=\"skeleton-box\"></div><div class=\"skeleton-box\"></div></div></main></div>\n",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){
(() => {
 let setup=false;
 const recovery=new URLSearchParams(location.search).get('mode')==='recovery';
 const form=document.getElementById('loginForm'),error=document.getElementById('authError');
 function setMode(value){
  setup=value;
  document.getElementById('setupFields').hidden=!setup;
  document.getElementById('recoveryCodeField').hidden=!(setup&&recovery);
  document.getElementById('setupCode').required=setup&&recovery;
  document.getElementById('setupCode').disabled=!(setup&&recovery);
  document.getElementById('confirmPassword').required=setup;
  document.getElementById('confirmPassword').disabled=!setup;
  document.getElementById('password').autocomplete=setup?'new-password':'current-password';
  document.getElementById('authTitle').textContent=setup?(recovery?'ตั้งรหัสผ่านใหม่':'ตั้งรหัสผ่านครั้งแรก'):'เข้าสู่พื้นที่ทำงาน';
  document.getElementById('authHelp').textContent=setup?(recovery?'ใช้รหัสกู้บัญชีที่ผู้ดูแลให้ พร้อมกำหนดรหัสผ่านใหม่':'สำหรับอีเมลที่บริษัทเพิ่มไว้และยังไม่มีรหัสผ่าน · อย่างน้อย 8 ตัวอักษรและมีตัวเลข'):'ใช้อีเมลบริษัทและรหัสผ่านเดิมของแอปเบิกค่าใช้จ่าย';
  document.getElementById('loginBtn').textContent=setup?'ตั้งรหัสผ่านและเข้าสู่ระบบ':'เข้าสู่ระบบ →';
  document.getElementById('toggleSetup').textContent=setup?'กลับไปเข้าสู่ระบบ':(recovery?'ตั้งรหัสใหม่ด้วยรหัสกู้บัญชี':'ใช้งานครั้งแรก / ตั้งรหัสผ่าน');
  error.textContent='';
 }
 document.getElementById('toggleSetup').onclick=()=>setMode(!setup);
 setMode(recovery);
 form.onsubmit=async e=>{
  e.preventDefault();const btn=document.getElementById('loginBtn');if(btn.disabled)return;
  btn.disabled=true;document.getElementById('toggleSetup').disabled=true;error.textContent='';
  try{
   const email=form.email.value.trim().toLowerCase(),password=form.password.value;
   if(setup){
    const payload={email,password,confirmPassword:document.getElementById('confirmPassword').value};
    if(recovery)payload.setupCode=document.getElementById('setupCode').value.trim();
    await apiPost('setPassword',payload);
    setMode(false);document.getElementById('confirmPassword').value='';document.getElementById('setupCode').value='';
    document.getElementById('authHelp').textContent='ตั้งรหัสผ่านสำเร็จแล้ว กำลังเข้าสู่ระบบ หากเข้าไม่ได้ให้ใช้รหัสที่เพิ่งตั้ง';
   }
   const s=await loginWithPassword(email,password);
   if(!s.token)throw new Error('Backend ยังไม่ได้อัปเดตเป็น Workspace 8 กรุณาติดต่อผู้ดูแล');
   setSession(s);const next=sessionStorage.getItem('exion_return_to');sessionStorage.removeItem('exion_return_to');
   if(next&&/^[a-z0-9-]+\.html(?:[?#].*)?$/i.test(next)&&!next.startsWith('index.html')){location.href=next;return;}
   await showHome(true);
  }catch(e){error.textContent=e.message;}
  finally{btn.disabled=false;document.getElementById('toggleSetup').disabled=false;}
 };
 async function showHome(freshLogin=false){document.getElementById('loginView').hidden=true;document.getElementById('workspace').hidden=false;const el=document.getElementById('homeContent');const s=getSession();try{
 el.innerHTML=pageHeading('ภาพรวมของคุณ','เปิดเมนูหรือเริ่มกรอกคำขอได้ระหว่างโหลดข้อมูล',`<a class="btn btn-primary" href="submit.html">สร้างคำขอ</a>`)+`<div class="quick-grid"><a class="quick-link" href="submit.html">เบิกค่าใช้จ่าย →</a><a class="quick-link" href="status.html">คำขอของฉัน →</a><a class="quick-link" href="periods.html">รอบเบิก →</a></div><div class="skeleton-box" aria-label="กำลังโหลดข้อมูล"></div>`;
 // Login already returns current roles. On later visits refresh alongside data, not before it.
 renderWorkspaceNav('home');
 document.getElementById('headerDate').textContent=new Date().toLocaleDateString('th-TH',{day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Bangkok'});
 if(freshLogin!==true)fetchMyRole(s.Email).then(role=>{if(getSession()?.token!==s.token)return;Object.assign(s,role);setSession(s);renderWorkspaceNav('home');}).catch(e=>{if(e.code==='AUTH_REQUIRED'){clearSession();location.href='index.html';}});
 const results=await Promise.allSettled([fetchMyRequests(s.Email),apiGet('getMyExportRequests',{email:s.Email}),fetchPendingApprovals(s.Email),Promise.resolve(s)]);
 const authFailure=results.find(r=>r.status==='rejected'&&r.reason?.code==='AUTH_REQUIRED');
 if(authFailure)throw authFailure.reason;
 if(results[3].status==='rejected')throw results[3].reason;
 Object.assign(s,results[3].value);setSession(s);await renderWorkspaceNav('home');
 if(results[0].status==='rejected')throw results[0].reason;
 const rows=results[0].value||[], exports=results[1].status==='fulfilled'?results[1].value:[], inbox=results[2].status==='fulfilled'?results[2].value:null;
 const month=todayYMD().slice(0,7),current=rows.filter(r=>toYMD(r.ExpenseDate||r.Timestamp).startsWith(month));
 const pending=rows.filter(r=>r.Status==='Pending').length,needBills=rows.filter(r=>r.Status==='PreApprove'&&r.PreApproveStatus==='Approved').length,rejected=rows.filter(r=>r.Status==='Rejected').length;
 const approved=current.filter(r=>r.Status==='Approved').reduce((a,r)=>a+Number(r.Amount||0),0);const total=current.filter(r=>!['Rejected','PreApprove','Finalized','Cancelled'].includes(r.Status)).reduce((a,r)=>a+Number(r.Amount||0),0);
 el.innerHTML=pageHeading('ภาพรวมของคุณ','จัดการค่าใช้จ่ายและติดตามทุกขั้นตอนในที่เดียว',`<a class="btn btn-primary" href="submit.html">${icon('plus')} สร้างคำขอ</a>`)+`<div class="workspace-grid"><section><div class="welcome-panel"><div><div class="eyebrow">MAKE ROOM FOR WHAT MATTERS</div><h2>สวัสดี, ${esc((s.Name||'').split(' ')[0])}</h2><p>เริ่มต้นวันทำงาน ด้วยค่าใช้จ่ายที่จัดการเรียบร้อย</p><a class="btn btn-primary" href="submit.html">เบิกค่าใช้จ่าย ${icon('plus')}</a></div><span class="welcome-mark">EX.</span></div><div class="metrics"><div class="metric"><div class="metric-top">${icon('receipt')} ยอดเดือนนี้</div><strong>${formatCurrency(total)}</strong><small>บาท · ตามวันที่ใช้จ่าย</small></div><div class="metric"><div class="metric-top">${icon('check')} อนุมัติแล้ว</div><strong>${formatCurrency(approved)}</strong><small>บาท · ยังไม่ใช่ยอดจ่ายเงิน</small></div><div class="metric"><div class="metric-top">${icon('inbox')} รออนุมัติ</div><strong>${pending}<small> รายการ</small></strong><small>คำขอของคุณทุกช่วงเวลา</small></div></div><div class="section-head"><h2>เริ่มทำรายการ</h2><span class="subtle">เลือกให้ตรงกับการใช้จ่าย</span></div><div class="quick-grid"><a class="quick-link" href="submit.html">${icon('receipt')}<span><strong>เบิกค่าใช้จ่าย</strong><small>จ่ายก่อน แล้วเบิกคืน</small></span></a><a class="quick-link" href="pre-approve.html">${icon('utensils')}<span><strong>ขออนุมัติงบ</strong><small>ค่ารับรอง / กอล์ฟ</small></span></a><a class="quick-link" href="pc-home.html">${icon('car')}<span><strong>เงินสดย่อย</strong><small>เบิกจากกล่องเงินบริษัท</small></span></a></div><div class="section-head"><h2>คำขอล่าสุด</h2><a href="status.html">ดูรายการทั้งหมด →</a></div>${rows.length?table(rows.slice(0,6)):emptyState('เริ่มต้นคำขอแรกของคุณ','เลือกประเภทค่าใช้จ่าย แนบใบเสร็จ แล้วส่งให้ผู้อนุมัติ','submit.html','สร้างคำขอ')}</section><aside><div class="card task-card"><h2>สิ่งที่ต้องทำต่อ</h2>${(s.isManager||s.isSenior||s.isGM)?task('approvals.html',inbox?inbox.length:'—','งานรอคุณอนุมัติ',inbox?'ตรวจสอบและดำเนินการ':'โหลดไม่สำเร็จ · เปิดเพื่อลองใหม่'):''}${task('pre-approves.html',needBills,'งบรอส่งใบเสร็จ','ส่งยอดใช้จริงเพื่อปิดงาน')}${task('status.html?status=Rejected',rejected,'คำขอไม่อนุมัติ','อ่านเหตุผลและตรวจสอบรายการ')}${task('periods.html',exports.filter(x=>x.OverallStatus==='Pending').length,'รอบเบิกรออนุมัติ',results[1].status==='rejected'?'โหลดไม่สำเร็จ · เปิดเพื่อลองใหม่':'ตรวจสอบก่อนส่งบัญชี')}</div><div class="card task-card"><h2>ปิดรอบเบิก</h2><p class="subtle" style="line-height:1.8">เลือกช่วงวันที่ ตรวจรายการ แล้วส่งขออนุมัติเอกสารเบิก</p><a class="btn btn-secondary" href="periods.html" style="margin-top:18px;width:100%">จัดการรอบเบิก →</a></div><div class="card note-card"><strong>อนุมัติแล้ว ≠ จ่ายเงินแล้ว</strong>ดูสถานะการจ่ายเงินในหน้ารอบเบิกและการจ่ายเงิน เพื่อทราบว่าบัญชีดำเนินการถึงขั้นตอนไหน</div></aside></div>`;
 }catch(e){if(e.code==='AUTH_REQUIRED'){clearSession();location.reload();return;}renderError(el,e.message,showHome);}}
 function task(href,count,title,desc){return `<a class="task-link" href="${href}"><span class="task-number">${esc(count)}</span><span><strong>${title}</strong><small>${desc}</small></span></a>`;}
 function table(rows){return `<div class="data-table-wrap"><table class="data-table"><thead><tr><th>รายการ</th><th class="hide-mobile">วันที่</th><th>สถานะ</th><th class="amount">จำนวนเงิน</th></tr></thead><tbody>${rows.map(r=>`<tr><td><a class="category-cell" href="status.html?id=${encodeURIComponent(r.ID)}"><span class="category-symbol">${categoryIcon(r.Category)}</span><span style="color:var(--ink)">${esc(catTH(r.Category))}<small>${esc(r.Customer||r.Venue||r.ID)}</small></span></a></td><td class="hide-mobile">${esc(formatDate(r.ExpenseDate||r.Timestamp))}</td><td>${statusBadge(r.Status)}</td><td class="amount">${formatCurrency(r.Amount)}<small>THB</small></td></tr>`).join('')}</tbody></table></div>`;}
 if(getSession())showHome();else document.getElementById('loginView').hidden=false;
})();

if(typeof setMode==='function')window.setMode=setMode;
if(typeof showHome==='function')window.showHome=showHome;
if(typeof table==='function')window.table=table;
if(typeof task==='function')window.task=task;
}}};
window.EXION_VIEWS["inbox.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" aria-label=\"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a\" onclick=\"location.href='index.html'\" id=\"backBtn\"></button>\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">Inbox (GM)</span></h1>\n  </div>\n\n  <div id=\"stickyBar\" class=\"sticky-bar\" style=\"display:none;\"></div>\n\n  <div class=\"container\">\n    <div id=\"filterCard\" class=\"card\" style=\"display:none;\">\n      <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px;\">\n        <div class=\"field\" style=\"margin:0;\"><label>\u0e1e\u0e19\u0e31\u0e01\u0e07\u0e32\u0e19</label><select id=\"fStaff\"><option value=\"\">\u0e17\u0e38\u0e01\u0e04\u0e19</option></select></div>\n        <div class=\"field\" style=\"margin:0;\"><label>\u0e1b\u0e23\u0e30\u0e40\u0e20\u0e17</label><select id=\"fCat\"><option value=\"\">\u0e17\u0e38\u0e01\u0e1b\u0e23\u0e30\u0e40\u0e20\u0e17</option></select></div>\n      </div>\n      <div class=\"field\" style=\"margin:10px 0 0;\">\n        <input type=\"search\" id=\"fSearch\" placeholder=\"\ud83d\udd0d \u0e04\u0e49\u0e19\u0e2b\u0e32 \u0e0a\u0e37\u0e48\u0e2d / \u0e25\u0e39\u0e01\u0e04\u0e49\u0e32 / \u0e2a\u0e16\u0e32\u0e19\u0e17\u0e35\u0e48\">\n      </div>\n    </div>\n    <div id=\"list\" class=\"loading\"><div class=\"spinner\"></div></div>\n  </div>\n\n  <div id=\"modal\" class=\"modal\">\n    <div class=\"modal-content\">\n      <div class=\"modal-head\"><h3 id=\"modalTitle\">\u0e23\u0e32\u0e22\u0e25\u0e30\u0e40\u0e2d\u0e35\u0e22\u0e14</h3><button class=\"modal-close\" aria-label=\"\u0e1b\u0e34\u0e14\" onclick=\"closeModal()\">\u2715</button></div>\n      <div id=\"modalContent\"></div>\n    </div>\n  </div>\n\n  \n  \n  \n  \n  \n  \n",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();
    let pending = [];
    let exportPending = [];
    let mySig = { hasSignature: false };
    let sigPad = null;

    const CAT_TH = catMap();   // 🔴 รวมไว้ที่ js/app.js แล้ว ห้ามก๊อปตารางมาไว้ในหน้าอีก
    const CAT_IC = CAT_ICON_TH;

    const bb = document.getElementById('backBtn');
    if (bb && typeof icon === 'function') bb.innerHTML = icon('back');

    async function load() {
      try {
        const [result, sig, exps] = await Promise.all([
          fetchPendingApprovals(session.Email),
          getMySignature(session.Email).catch(() => ({ hasSignature: false })),
          apiGet('getExportApprovalInbox', { email: session.Email }).catch(() => [])
        ]);
        exportPending = Array.isArray(exps) ? exps : [];
        mySig = sig;
        if (result && result.error) throw new Error(result.error);
        pending = Array.isArray(result) ? result : [];
        render();
      } catch (err) {
        renderError('list', err.message, load);
        renderBottomNav('inbox');
      }
    }

    /** เติมตัวเลือกในดรอปดาวน์จากข้อมูลจริง — โชว์เฉพาะตอนมีของเยอะพอ */
    function buildFilters() {
      const card = document.getElementById('filterCard');
      if (pending.length < 6) { card.style.display = 'none'; return; }
      card.style.display = 'block';

      const sSel = document.getElementById('fStaff'), cSel = document.getElementById('fCat');
      if (sSel.dataset.built) return;
      sSel.dataset.built = '1';

      const staff = [...new Set(pending.map(r => r.StaffName).filter(Boolean))].sort();
      staff.forEach(n => { const o = document.createElement('option'); o.value = n; o.textContent = n; sSel.appendChild(o); });

      const cats = [...new Set(pending.map(r => r.Category).filter(Boolean))].sort();
      cats.forEach(c => { const o = document.createElement('option'); o.value = c; o.textContent = (CAT_IC[c]||'') + ' ' + (CAT_TH[c]||c); cSel.appendChild(o); });

      ['fStaff','fCat'].forEach(id => document.getElementById(id).addEventListener('change', render));
      document.getElementById('fSearch').addEventListener('input', render);
    }

    function getVisible() {
      const st = (document.getElementById('fStaff')||{}).value || '';
      const ct = (document.getElementById('fCat')||{}).value || '';
      const q  = ((document.getElementById('fSearch')||{}).value || '').trim().toLowerCase();
      return pending.filter(r => {
        if (st && r.StaffName !== st) return false;
        if (ct && r.Category !== ct) return false;
        if (q) {
          const hay = [r.StaffName, r.Customer, r.Venue, r.Occasion, r.Department].join(' ').toLowerCase();
          if (hay.indexOf(q) < 0) return false;
        }
        return true;
      });
    }

    function render() {
      const list = document.getElementById('list');
      list.classList.remove('loading');
      buildFilters();

      if (pending.length === 0 && exportPending.length === 0) {
        list.innerHTML = `<div class="empty"><div class="icon-wrap">🎉</div><div class="title">เคลียร์หมดแล้ว!</div><div class="sub">ไม่มีคำขอรออนุมัติ</div></div>`;
        document.getElementById('stickyBar').style.display = 'none';
        document.getElementById('filterCard').style.display = 'none';
        renderBottomNav('inbox');
        return;
      }

      const shown = getVisible();
      // ⚠️ ถ้าไม่มีคำขอรายรายการ แต่ยังมี Export ค้าง ต้องไม่ return ทิ้ง
      //    ไม่งั้นผู้อนุมัติจะมองไม่เห็นคำขอ Export เลย → พนักงานไม่ได้เงิน
      if (shown.length === 0 && !exportPending.length) {
        list.innerHTML = `<div class="empty"><div class="icon-wrap">🔍</div>
          <div class="title">ไม่พบรายการที่ตรงกับตัวกรอง</div>
          <button class="btn btn-secondary btn-sm" style="margin-top:14px;max-width:200px;" onclick="clearInboxFilters()">🗑 ล้างตัวกรอง</button></div>`;
        document.getElementById('stickyBar').style.display = 'none';
        renderBottomNav('inbox');
        return;
      }

      const total = shown.reduce((s,r)=>s+(Number(r.Amount)||Number(r.PreApproveBudget)||0),0);
      const mgrStage = shown.filter(r => r._stage === 'manager');
      const snrStage = shown.filter(r => r._stage === 'senior');

      document.getElementById('stickyBar').innerHTML =
        `เหลือ <b>${shown.length}</b> รายการ · รวม <b>${Math.round(total).toLocaleString()}</b> บาท`;
      document.getElementById('stickyBar').style.display = 'block';

      let html = `<div class="count-hero">
        <div class="lbl">รออนุมัติทั้งหมด</div>
        <div class="num">${shown.length}</div>
        <div class="sub">รวม ${Math.round(total).toLocaleString()} THB</div>
      </div>`;

      // ✨ v6.0 คำขอ Export เคยแจ้งทางอีเมลอย่างเดียว หัวหน้าเปิดแอปแล้วไม่เห็นอะไรเลย
      if (exportPending.length) {
        html += `<div class="sec-label" style="color:var(--accent);">📊 คำขอ Export รออนุมัติ (${exportPending.length})</div>`;
        exportPending.forEach(ex => {
          const days = Math.floor((Date.now() - new Date(ex.RequestedAt).getTime()) / 86400000);
          html += `<a href="export-review.html?id=${ex.ID}" class="req-card warn" style="text-decoration:none;display:block;">
            <div class="ri-top">
              <span class="ri-cat">📊 ${ex.StaffName}</span>
              ${days >= 2 ? `<span class="pill bad">ค้าง ${days} วัน</span>` : '<span class="pill warn">ใหม่</span>'}
              <span class="ri-amt">${Number(ex.TotalAmount||0).toLocaleString()} ฿</span>
            </div>
            <div class="ri-meta">ใบเบิกเดือน ${ex.Month}/${ex.Year} · ${ex.ItemCount} รายการ · แตะเพื่อตรวจสอบ</div>
          </a>`;
        });
        html += `<div class="sec-label">คำขอเบิกรายรายการ</div>`;
      }

      if (!mySig.hasSignature) {
        html += `<div class="warn-box"><div class="t">✍️ ยังไม่มีลายเซ็นบันทึกไว้</div>
          <a href="profile.html" style="font-weight:700;font-size:12px;">→ ไปตั้งลายเซ็น (approve เร็วขึ้น)</a></div>`;
      }

      const section = (title, items, emoji) => {
        if (items.length === 0) return '';
        let h = `<div class="sec-label">${emoji} ${title} · ${items.length} รายการ</div>`;
        items.forEach(r => {
          const idx = pending.indexOf(r);
          const amt = Number(r.Amount) || Number(r.PreApproveBudget) || 0;
          h += `<div class="request-item" onclick="showDetail(${idx})">
            <div class="cat-icon" style="background:#FEF3C7;color:#92400E;">${CAT_IC[r.Category]||'📦'}</div>
            <div class="info">
              <div class="title">${esc(r.StaffName)} · ${CAT_TH[r.Category]||r.Category}</div>
              <div class="meta">${formatDate(r.ExpenseDate || r.Timestamp)}${r.Venue ? ' • ' + r.Venue : ''}</div>
            </div>
            <div class="right"><div class="amount">${Math.round(amt).toLocaleString()}</div></div>
          </div>`;
        });
        return h;
      };

      if (mgrStage.length || snrStage.length) {
        html += section('รอหัวหน้าอนุมัติ', mgrStage, '👨‍💼');
        html += section('รออนุมัติขั้นสุดท้าย', snrStage, '👑');
      } else {
        html += section('รออนุมัติ', shown, '🔔');
      }

      list.innerHTML = html;
      renderBottomNav('inbox');
    }

    function showDetail(idx) {
      const r = pending[idx];
      const isPre = !!r.PreApproveBudget;
      document.getElementById('modalTitle').textContent = r.StaffName + ' — ' + (CAT_TH[r.Category]||r.Category);

      const rows = [
        ['ID', r.ID], ['แผนก', r.Department], ['ประเภท', CAT_TH[r.Category]||r.Category],
        ['วันที่', formatDate(r.ExpenseDate)], ['สถานที่', r.Venue||'-'],
        ['โอกาส', r.Occasion||'-'], ['ผู้ร่วม', r.Attendees||'-']
      ];
      if (r.Customer) rows.push(['ลูกค้า', r.Customer]);
      if (r.ManagerEmail) rows.push(['Manager', r.ManagerEmail + (r.ManagerStatus === 'Approved' ? ' ✓' : '')]);

      const amount = r.PreApproveBudget || r.Amount;
      let html = `<div class="detail-row"><div class="key">${isPre?'งบประมาณ':'จำนวนเงิน'}</div>
        <div class="val big">${Math.round(Number(amount)).toLocaleString()} <span style="font-size:13px;color:var(--gray-500);font-weight:600;">THB</span></div></div>`
        + rows.map(([k,v]) => `<div class="detail-row"><div class="key">${k}</div><div class="val">${v}</div></div>`).join('');

      let urls = [];
      try { urls = JSON.parse(r.ReceiptURLs||'[]'); } catch {}
      if (urls.length === 0 && r.ReceiptURL) urls = [r.ReceiptURL];
      if (urls.length > 0) {
        html += `<div style="margin-top:16px;"><div style="font-size:13px;font-weight:700;margin-bottom:8px;">📎 ใบเสร็จ (${urls.length})</div><div style="display:flex;flex-wrap:wrap;gap:6px;">`;
        for (let i=0;i<urls.length;i++) html += `<button class="btn btn-secondary btn-sm" onclick="loadReceipt('${esc(r.ID)}',${i})">🔒 ไฟล์ ${i+1}</button>`;
        html += `</div><img id="rcptImg" class="preview-img" alt="ใบเสร็จ" style="display:none;"></div>`;
      }

      html += `<div class="field" style="margin-top:18px;"><label>หมายเหตุ <span style="color:var(--gray-400);font-weight:400;">(ถ้ามี)</span></label><textarea id="remark" rows="2"></textarea></div>`;

      if (mySig.hasSignature) {
        html += `<div class="saved-sig"><img src="${mySig.dataUrl}" alt="sig"><div>✅ ใช้ลายเซ็นที่บันทึกไว้</div></div>`;
      } else {
        html += `<div class="field" style="margin-top:14px;">
          <label>ลายเซ็น <span class="required">*</span></label>
          <div class="sig-box"><canvas id="sigCanvas" class="sig-canvas"></canvas><span class="sig-placeholder">เซ็นที่นี่</span></div>
          <div class="sig-actions"><span>เซ็นเพื่ออนุมัติ</span><button type="button" class="sig-clear" onclick="clearSig()">ล้าง</button></div>
        </div>`;
      }

      html += `<div class="btn-row" style="margin-top:14px;">
        <button class="btn btn-primary" style="flex:1;" onclick="decide('${esc(r.ID)}','Approved')">✅ Approve</button>
        <button class="btn" style="flex:1;background:var(--danger);color:white;" onclick="decide('${esc(r.ID)}','Rejected')">❌ ไม่อนุมัติ</button>
      </div>`;

      document.getElementById('modalContent').innerHTML = html;
      document.getElementById('modal').classList.add('show');
      if (!mySig.hasSignature) setTimeout(initSigPad, 80);
    }

    function initSigPad() {
      const c = document.getElementById('sigCanvas');
      if (!c) return;
      const ctx = c.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = c.getBoundingClientRect();
      c.width = rect.width*dpr; c.height = rect.height*dpr; ctx.scale(dpr,dpr);
      ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle='#0F172A'; ctx.lineWidth=2.5;
      let draw=false, empty=true;
      const ph = c.parentElement.querySelector('.sig-placeholder');
      const pos = e => { const r=c.getBoundingClientRect(); return {x:(e.touches?e.touches[0].clientX:e.clientX)-r.left,y:(e.touches?e.touches[0].clientY:e.clientY)-r.top}; };
      const st = e => { draw=true; const p=pos(e); ctx.beginPath(); ctx.moveTo(p.x,p.y); e.preventDefault(); };
      const mv = e => { if(!draw)return; const p=pos(e); ctx.lineTo(p.x,p.y); ctx.stroke(); empty=false; if(ph)ph.style.display='none'; e.preventDefault(); };
      const en = () => draw=false;
      c.addEventListener('mousedown',st); c.addEventListener('mousemove',mv); c.addEventListener('mouseup',en); c.addEventListener('mouseout',en);
      c.addEventListener('touchstart',st); c.addEventListener('touchmove',mv); c.addEventListener('touchend',en);
      sigPad = { isEmpty:()=>empty, clear:()=>{ctx.clearRect(0,0,c.width,c.height);empty=true;if(ph)ph.style.display='block';}, toDataURL:()=>c.toDataURL('image/png') };
    }
    window.clearSig = () => sigPad && sigPad.clear();

    async function loadReceipt(id, fileIndex) {
      showLoading('โหลดใบเสร็จ...');
      try {
        const r = await fetchReceiptImage(id, session.Email, fileIndex);
        hideLoading();
        if (r.error) throw new Error(r.error);
        const img = document.getElementById('rcptImg');
        img.src = r.dataUrl; img.style.display='block';
        img.onclick = () => openImageViewer(r.dataUrl, 'แตะ 2 ครั้งเพื่อซูม');
      } catch (err) { hideLoading(); showToast(err.message,'error'); }
    }

    async function decide(id, decision) {
      const remark = (document.getElementById('remark')?.value || '').trim();
      let signatureBase64 = '';
      if (decision === 'Approved' && !mySig.hasSignature) {
        if (!sigPad || sigPad.isEmpty()) return showToast('กรุณาเซ็นชื่อก่อน','error');
        signatureBase64 = sigPad.toDataURL();
      }
      if (decision === 'Rejected' && !remark) return showToast('ระบุเหตุผล','error');
      if (!confirm(decision === 'Approved' ? 'ยืนยันอนุมัติ?' : 'ยืนยันปฏิเสธ?')) return;
      showLoading('กำลังบันทึก...');
      try {
        const result = await approveRequest({ id, decision, remark, approverEmail: session.Email, signatureBase64 });
        hideLoading();
        if (result && result.error) throw new Error(result.error);
        showToast(decision === 'Approved' ? '✅ อนุมัติแล้ว' : '❌ ปฏิเสธแล้ว','success');
        closeModal(); load();
      } catch (err) { hideLoading(); showToast(err.message,'error'); }
    }

    function closeModal() { document.getElementById('modal').classList.remove('show'); }
    document.getElementById('modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
    window.showDetail=showDetail; window.loadReceipt=loadReceipt; window.decide=decide; window.closeModal=closeModal;
    window.clearInboxFilters = () => {
      ['fStaff','fCat','fSearch'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
      render();
    };

    if (session) load();
  
if(typeof buildFilters==='function')window.buildFilters=buildFilters;
if(typeof closeModal==='function')window.closeModal=closeModal;
if(typeof decide==='function')window.decide=decide;
if(typeof getVisible==='function')window.getVisible=getVisible;
if(typeof initSigPad==='function')window.initSigPad=initSigPad;
if(typeof load==='function')window.load=load;
if(typeof loadReceipt==='function')window.loadReceipt=loadReceipt;
if(typeof render==='function')window.render=render;
if(typeof showDetail==='function')window.showDetail=showDetail;
}}};
window.EXION_VIEWS["manager-inbox.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" aria-label=\"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a\" onclick=\"location.href='index.html'\" id=\"backBtn\"></button>\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">\u0e23\u0e2d\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34 (\u0e2b\u0e31\u0e27\u0e2b\u0e19\u0e49\u0e32)</span></h1>\n  </div>\n\n  <div id=\"stickyBar\" class=\"sticky-bar\" style=\"display:none;\"></div>\n\n  <div class=\"container\">\n    <div id=\"filterCard\" class=\"card\" style=\"display:none;\">\n      <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px;\">\n        <div class=\"field\" style=\"margin:0;\"><label>\u0e1e\u0e19\u0e31\u0e01\u0e07\u0e32\u0e19</label><select id=\"fStaff\"><option value=\"\">\u0e17\u0e38\u0e01\u0e04\u0e19</option></select></div>\n        <div class=\"field\" style=\"margin:0;\"><label>\u0e1b\u0e23\u0e30\u0e40\u0e20\u0e17</label><select id=\"fCat\"><option value=\"\">\u0e17\u0e38\u0e01\u0e1b\u0e23\u0e30\u0e40\u0e20\u0e17</option></select></div>\n      </div>\n      <div class=\"field\" style=\"margin:10px 0 0;\">\n        <input type=\"search\" id=\"fSearch\" placeholder=\"\ud83d\udd0d \u0e04\u0e49\u0e19\u0e2b\u0e32 \u0e0a\u0e37\u0e48\u0e2d / \u0e25\u0e39\u0e01\u0e04\u0e49\u0e32 / \u0e2a\u0e16\u0e32\u0e19\u0e17\u0e35\u0e48\">\n      </div>\n    </div>\n    <div id=\"list\" class=\"loading\"><div class=\"spinner\"></div></div>\n  </div>\n\n  <div id=\"modal\" class=\"modal\">\n    <div class=\"modal-content\">\n      <div class=\"modal-head\">\n        <h3 id=\"modalTitle\">\u0e23\u0e32\u0e22\u0e25\u0e30\u0e40\u0e2d\u0e35\u0e22\u0e14</h3>\n        <button class=\"modal-close\" aria-label=\"\u0e1b\u0e34\u0e14\" onclick=\"closeModal()\" id=\"closeBtn\">\u2715</button>\n      </div>\n      <div id=\"modalContent\"></div>\n    </div>\n  </div>\n\n  \n  \n  \n  \n  \n  \n",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();
    let pending = [];
    let exportPending = [];
    let mySig = null;

    const CAT_TH = catMap();   // 🔴 รวมไว้ที่ js/app.js แล้ว ห้ามก๊อปตารางมาไว้ในหน้าอีก
    const CAT_IC = CAT_ICON_TH;

    function setI(id, n) { const el = document.getElementById(id); if (el && typeof icon === 'function') el.innerHTML = icon(n); }

    async function load() {
      setI('backBtn', 'back');
      try {
        const [result, sig, exps] = await Promise.all([
          fetchManagerInbox(session.Email),
          getMySignature(session.Email).catch(() => ({ hasSignature: false })),
          apiGet('getExportApprovalInbox', { email: session.Email }).catch(() => [])
        ]);
        exportPending = Array.isArray(exps) ? exps : [];
        mySig = sig;
        if (result && result.error) throw new Error(result.error);
        pending = Array.isArray(result) ? result : [];
        render();
      } catch (err) {
        renderError('list', err.message, load);
        renderBottomNav('inbox');
      }
    }

    /** เติมตัวเลือกในดรอปดาวน์จากข้อมูลจริง — โชว์เฉพาะตอนมีของเยอะพอ */
    function buildFilters() {
      const card = document.getElementById('filterCard');
      if (pending.length < 6) { card.style.display = 'none'; return; }
      card.style.display = 'block';

      const sSel = document.getElementById('fStaff'), cSel = document.getElementById('fCat');
      if (sSel.dataset.built) return;
      sSel.dataset.built = '1';

      const staff = [...new Set(pending.map(r => r.StaffName).filter(Boolean))].sort();
      staff.forEach(n => { const o = document.createElement('option'); o.value = n; o.textContent = n; sSel.appendChild(o); });

      const cats = [...new Set(pending.map(r => r.Category).filter(Boolean))].sort();
      cats.forEach(c => { const o = document.createElement('option'); o.value = c; o.textContent = (CAT_IC[c]||'') + ' ' + (CAT_TH[c]||c); cSel.appendChild(o); });

      ['fStaff','fCat'].forEach(id => document.getElementById(id).addEventListener('change', render));
      document.getElementById('fSearch').addEventListener('input', render);
    }

    function getVisible() {
      const st = (document.getElementById('fStaff')||{}).value || '';
      const ct = (document.getElementById('fCat')||{}).value || '';
      const q  = ((document.getElementById('fSearch')||{}).value || '').trim().toLowerCase();
      return pending.filter(r => {
        if (st && r.StaffName !== st) return false;
        if (ct && r.Category !== ct) return false;
        if (q) {
          const hay = [r.StaffName, r.Customer, r.Venue, r.Occasion, r.Department].join(' ').toLowerCase();
          if (hay.indexOf(q) < 0) return false;
        }
        return true;
      });
    }

    function render() {
      const list = document.getElementById('list');
      list.classList.remove('loading');
      buildFilters();

      if (pending.length === 0 && exportPending.length === 0) {
        list.innerHTML = `<div class="empty"><div class="icon-wrap">🎉</div><div class="title">เคลียร์แล้ว!</div><div class="sub">ไม่มีคำขอรออนุมัติ</div></div>`;
        document.getElementById('stickyBar').style.display = 'none';
        document.getElementById('filterCard').style.display = 'none';
        renderBottomNav('inbox');
        return;
      }

      const shown = getVisible();
      const total = shown.reduce((s,r) => s + (Number(r.Amount) || Number(r.PreApproveBudget) || 0), 0);

      // ⚠️ ถ้าไม่มีคำขอรายรายการ แต่ยังมี Export ค้าง ต้องไม่ return ทิ้ง
      //    ไม่งั้นหัวหน้ามองไม่เห็นคำขอ Export เลย → พนักงานไม่ได้เงิน
      if (shown.length === 0 && !exportPending.length) {
        list.innerHTML = `<div class="empty"><div class="icon-wrap">🔍</div>
          <div class="title">ไม่พบรายการที่ตรงกับตัวกรอง</div>
          <button class="btn btn-secondary btn-sm" style="margin-top:14px;max-width:200px;" onclick="clearInboxFilters()">🗑 ล้างตัวกรอง</button></div>`;
        renderBottomNav('inbox');
        return;
      }

      // Group by batch
      const batches = {};
      shown.forEach(r => {
        const idx = pending.indexOf(r);   // index ของรายการจริง ไม่ใช่ index หลังกรอง
        const bid = r.BatchID || r.ID;
        if (!batches[bid]) batches[bid] = { items: [], staff: r.StaffName, dept: r.Department, total: 0, isPre: !!r.PreApproveBudget };
        batches[bid].items.push({ ...r, _idx: idx });
        batches[bid].total += Number(r.Amount) || Number(r.PreApproveBudget) || 0;
      });

      document.getElementById('stickyBar').innerHTML =
        `เหลือ <b>${shown.length}</b> รายการ · รวม <b>${Math.round(total).toLocaleString()}</b> บาท`;
      document.getElementById('stickyBar').style.display = 'block';

      let html = `<div class="count-hero">
        <div class="lbl">รออนุมัติ</div>
        <div class="num">${shown.length}</div>
        <div class="sub">${Object.keys(batches).length} ชุด • รวม ${Math.round(total).toLocaleString()} THB</div>
      </div>`;

      // ✨ v6.0 คำขอ Export เคยแจ้งทางอีเมลอย่างเดียว หัวหน้าเปิดแอปแล้วไม่เห็นอะไรเลย
      if (exportPending.length) {
        html += `<div class="sec-label" style="color:var(--accent);">📊 คำขอ Export รออนุมัติ (${exportPending.length})</div>`;
        exportPending.forEach(ex => {
          const days = Math.floor((Date.now() - new Date(ex.RequestedAt).getTime()) / 86400000);
          html += `<a href="export-review.html?id=${ex.ID}" class="req-card warn" style="text-decoration:none;display:block;">
            <div class="ri-top">
              <span class="ri-cat">📊 ${ex.StaffName}</span>
              ${days >= 2 ? `<span class="pill bad">ค้าง ${days} วัน</span>` : '<span class="pill warn">ใหม่</span>'}
              <span class="ri-amt">${Number(ex.TotalAmount||0).toLocaleString()} ฿</span>
            </div>
            <div class="ri-meta">ใบเบิกเดือน ${ex.Month}/${ex.Year} · ${ex.ItemCount} รายการ · แตะเพื่อตรวจสอบ</div>
          </a>`;
        });
        html += `<div class="sec-label">คำขอเบิกรายรายการ</div>`;
      }

      if (!mySig.hasSignature) {
        html += `<div class="warn-box"><div class="t">✍️ ยังไม่มีลายเซ็นบันทึกไว้</div>
          <div style="font-size:12px;">ตั้งลายเซ็น 1 ครั้งใน Profile → Approve เร็วขึ้น ไม่ต้องเซ็นทุกครั้ง</div>
          <a href="profile.html" style="display:inline-block;margin-top:8px;font-weight:700;font-size:12px;">→ ไปตั้งลายเซ็น</a></div>`;
      }

      Object.entries(batches).forEach(([bid, b]) => {
        html += `<div class="batch-card">
          <div class="batch-head">
            <div>
              <div class="who">${b.staff}</div>
              <div class="sub">${b.dept} • ${b.items.length} รายการ${b.isPre ? ' • 🍽️ Pre-Approve' : ''}</div>
            </div>
            <div class="amt">${Math.round(b.total).toLocaleString()}</div>
          </div>`;
        b.items.forEach(r => {
          const amt = Number(r.Amount) || Number(r.PreApproveBudget) || 0;
          html += `<div class="request-item" onclick="showDetail(${esc(r._idx)})">
            <div class="cat-icon" style="background:#FEF3C7;color:#92400E;">${CAT_IC[r.Category] || '📦'}</div>
            <div class="info">
              <div class="title">${CAT_TH[r.Category] || r.Category}${b.isPre ? ' (งบ)' : ''}</div>
              <div class="meta">${formatDate(r.ExpenseDate)}${r.Venue ? ' • ' + r.Venue : ''}</div>
            </div>
            <div class="right"><div class="amount">${Math.round(amt).toLocaleString()}</div></div>
          </div>`;
        });
        html += `<div class="btn-row" style="margin-top:10px;">
          <button class="btn btn-primary btn-sm" style="flex:1;" onclick="approveBatch('${bid}')">✅ อนุมัติทั้งชุด</button>
          <button class="btn btn-sm" style="flex:1;background:var(--danger);color:white;" onclick="rejectBatch('${bid}')">❌ ไม่อนุมัติ</button>
        </div></div>`;
      });

      list.innerHTML = html;
      renderBottomNav('inbox');
    }

    function showDetail(idx) {
      const r = pending[idx];
      const isPre = !!r.PreApproveBudget;
      document.getElementById('modalTitle').textContent = r.StaffName + ' — ' + (CAT_TH[r.Category] || r.Category);

      const rows = [
        ['ID', r.ID],
        ['ประเภท', (CAT_TH[r.Category] || r.Category) + (isPre ? ' (Pre-Approve)' : '')],
        ['วันที่', formatDate(r.ExpenseDate)],
        ['สถานที่', r.Venue || '-'],
        ['โอกาส', r.Occasion || '-'],
        ['ผู้ร่วม', r.Attendees || '-']
      ];
      if (r.Origin) rows.push(['ต้นทาง', r.Origin]);
      if (r.Destination) rows.push(['ปลายทาง', r.Destination]);
      if (r.Customer) rows.push(['ลูกค้า', r.Customer + (r.CustomerContact ? ' (' + r.CustomerContact + ')' : '')]);
      if (r.Mileage_KM) rows.push(['ระยะทาง', r.Mileage_KM + ' กม.']);

      const amount = r.PreApproveBudget || r.Amount;
      let html = `<div class="detail-row">
        <div class="key">${isPre ? 'งบประมาณ' : 'จำนวนเงิน'}</div>
        <div class="val big">${Math.round(Number(amount)).toLocaleString()} <span style="font-size:13px;color:var(--gray-500);font-weight:600;">THB</span></div>
      </div>` + rows.map(([k,v]) => `<div class="detail-row"><div class="key">${k}</div><div class="val">${v}</div></div>`).join('');

      // Receipts
      let urls = [];
      try { urls = JSON.parse(r.ReceiptURLs || '[]'); } catch {}
      if (urls.length === 0 && r.ReceiptURL) urls = [r.ReceiptURL];
      if (urls.length > 0) {
        html += `<div style="margin-top:16px;">
          <div style="font-size:13px;font-weight:700;margin-bottom:8px;">📎 ใบเสร็จ (${urls.length})</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;">`;
        for (let i = 0; i < urls.length; i++) {
          html += `<button class="btn btn-secondary btn-sm" onclick="loadReceipt('${esc(r.ID)}',${i})">🔒 ไฟล์ ${i+1}</button>`;
        }
        html += `</div><img id="rcptImg" class="preview-img" alt="ใบเสร็จ" style="display:none;"></div>`;
      }

      html += `<div class="field" style="margin-top:18px;">
        <label>หมายเหตุ <span style="color:var(--gray-400);font-weight:400;">(ถ้ามี)</span></label>
        <textarea id="remark" placeholder="เช่น อนุมัติภายในงบ Q3" rows="2"></textarea>
      </div>`;

      // Signature — use saved if available
      if (mySig.hasSignature) {
        html += `<div class="saved-sig"><img src="${mySig.dataUrl}" alt="sig"><div>✅ ใช้ลายเซ็นที่บันทึกไว้อัตโนมัติ</div></div>`;
      } else {
        html += `<div class="field" style="margin-top:14px;">
          <label>ลายเซ็น <span class="required">*</span></label>
          <div class="sig-box">
            <canvas id="sigCanvas" class="sig-canvas"></canvas>
            <span class="sig-placeholder">เซ็นที่นี่</span>
          </div>
          <div class="sig-actions"><span>เซ็นเพื่ออนุมัติ</span><button type="button" class="sig-clear" onclick="clearSig()">ล้าง</button></div>
        </div>`;
      }

      html += `<div class="btn-row" style="margin-top:14px;">
        <button class="btn btn-primary" style="flex:1;" onclick="decide('${esc(r.ID)}','Approved')">✅ Approve</button>
        <button class="btn" style="flex:1;background:var(--danger);color:white;" onclick="decide('${esc(r.ID)}','Rejected')">❌ ไม่อนุมัติ</button>
      </div>`;

      document.getElementById('modalContent').innerHTML = html;
      document.getElementById('modal').classList.add('show');
      if (!mySig.hasSignature) setTimeout(initSigPad, 80);
    }

    let sigPad = null;
    function initSigPad() {
      const c = document.getElementById('sigCanvas');
      if (!c) return;
      const ctx = c.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = c.getBoundingClientRect();
      c.width = rect.width * dpr; c.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#0F172A'; ctx.lineWidth = 2.5;
      let draw = false, empty = true;
      const ph = c.parentElement.querySelector('.sig-placeholder');
      const pos = e => { const r = c.getBoundingClientRect(); return { x:(e.touches?e.touches[0].clientX:e.clientX)-r.left, y:(e.touches?e.touches[0].clientY:e.clientY)-r.top }; };
      const st = e => { draw = true; const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x,p.y); e.preventDefault(); };
      const mv = e => { if(!draw) return; const p = pos(e); ctx.lineTo(p.x,p.y); ctx.stroke(); empty = false; if(ph) ph.style.display='none'; e.preventDefault(); };
      const en = () => draw = false;
      c.addEventListener('mousedown',st); c.addEventListener('mousemove',mv); c.addEventListener('mouseup',en); c.addEventListener('mouseout',en);
      c.addEventListener('touchstart',st); c.addEventListener('touchmove',mv); c.addEventListener('touchend',en);
      sigPad = { isEmpty:()=>empty, clear:()=>{ctx.clearRect(0,0,c.width,c.height);empty=true;if(ph)ph.style.display='block';}, toDataURL:()=>c.toDataURL('image/png') };
    }
    window.clearSig = () => sigPad && sigPad.clear();

    async function loadReceipt(id, fileIndex) {
      showLoading('โหลดใบเสร็จ...');
      try {
        const r = await fetchReceiptImage(id, session.Email, fileIndex);
        hideLoading();
        if (r.error) throw new Error(r.error);
        const img = document.getElementById('rcptImg');
        img.src = r.dataUrl; img.style.display = 'block';
        img.onclick = () => openImageViewer(r.dataUrl, 'แตะ 2 ครั้งเพื่อซูม');
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    }

    async function decide(id, decision) {
      const remark = (document.getElementById('remark')?.value || '').trim();
      let signatureBase64 = '';
      if (decision === 'Approved' && !mySig.hasSignature) {
        if (!sigPad || sigPad.isEmpty()) return showToast('กรุณาเซ็นชื่อก่อน', 'error');
        signatureBase64 = sigPad.toDataURL();
      }
      if (decision === 'Rejected' && !remark) return showToast('ระบุเหตุผลที่ปฏิเสธ', 'error');
      if (!confirm(decision === 'Approved' ? 'ยืนยันอนุมัติ?' : 'ยืนยันปฏิเสธ?')) return;
      showLoading(decision === 'Approved' ? 'กำลังอนุมัติ...' : 'กำลังปฏิเสธ...');
      try {
        const result = await managerApprove({ id, decision, remark, approverEmail: session.Email, signatureBase64 });
        hideLoading();
        if (result && result.error) throw new Error(result.error);
        showToast(decision === 'Approved' ? '✅ อนุมัติแล้ว' : '❌ ปฏิเสธแล้ว', 'success');
        closeModal();
        load();
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    }

    window.approveBatch = async (bid) => {
      const items = pending.filter(r => (r.BatchID || r.ID) === bid);
      if (!mySig.hasSignature) {
        showToast('ตั้งลายเซ็นใน Profile ก่อน เพื่อ approve ทั้งชุด', 'error');
        return showDetail(pending.indexOf(items[0]));
      }
      const total = items.reduce((s,r) => s + (Number(r.Amount)||0), 0);
      const who = items[0] ? (items[0].StaffName || '') : '';
      if (!confirm(`อนุมัติทั้ง ${items.length} รายการของ ${who}\nรวม ${Math.round(total).toLocaleString()} บาท ?`)) return;
      try {
        await runBatch(items, r => managerApprove({ id: r.ID, decision: 'Approved', remark: '', approverEmail: session.Email }), 'อนุมัติ');
      } finally { load(); }
    };

    window.rejectBatch = async (bid) => {
      const items = pending.filter(r => (r.BatchID || r.ID) === bid);
      const total = items.reduce((s,r) => s + (Number(r.Amount)||0), 0);
      const who = items[0] ? (items[0].StaffName || '') : '';
      const remark = prompt('เหตุผลที่ไม่อนุมัติ (พนักงานจะเห็นข้อความนี้):');
      if (!remark || !remark.trim()) return;
      // ยืนยันอีกชั้น — ปฏิเสธแล้วย้อนไม่ได้ และอีเมลเด้งหาพนักงานทันที
      if (!confirm(`ไม่อนุมัติทั้ง ${items.length} รายการของ ${who}\nรวม ${Math.round(total).toLocaleString()} บาท\n\nเหตุผล: ${remark}\n\nยืนยัน? (ย้อนกลับไม่ได้)`)) return;
      try {
        await runBatch(items, r => managerApprove({ id: r.ID, decision: 'Rejected', remark, approverEmail: session.Email }), 'ปฏิเสธ');
      } finally { load(); }
    };

    function closeModal() { document.getElementById('modal').classList.remove('show'); }
    document.getElementById('modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
    window.showDetail = showDetail; window.loadReceipt = loadReceipt; window.decide = decide; window.closeModal = closeModal;
    window.clearInboxFilters = () => {
      ['fStaff','fCat','fSearch'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
      render();
    };

    if (session) load();
  
if(typeof buildFilters==='function')window.buildFilters=buildFilters;
if(typeof closeModal==='function')window.closeModal=closeModal;
if(typeof decide==='function')window.decide=decide;
if(typeof getVisible==='function')window.getVisible=getVisible;
if(typeof initSigPad==='function')window.initSigPad=initSigPad;
if(typeof load==='function')window.load=load;
if(typeof loadReceipt==='function')window.loadReceipt=loadReceipt;
if(typeof render==='function')window.render=render;
if(typeof setI==='function')window.setI=setI;
if(typeof showDetail==='function')window.showDetail=showDetail;
}}};
window.EXION_VIEWS["menu.html"]={html:"<header class=\"header\"><h1>\u0e1e\u0e37\u0e49\u0e19\u0e17\u0e35\u0e48\u0e17\u0e33\u0e07\u0e32\u0e19</h1></header><main class=\"container\" id=\"pageContent\"></main>",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){
requireLogin();

}}};
window.EXION_VIEWS["my-team.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" aria-label=\"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a\" onclick=\"location.href='index.html'\" id=\"backBtn\"></button>\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">\u0e17\u0e35\u0e21\u0e02\u0e2d\u0e07\u0e09\u0e31\u0e19</span></h1>\n  </div>\n\n  <div class=\"container\">\n    <div class=\"card\" style=\"padding:14px;\">\n      <div style=\"display:flex;align-items:center;gap:10px;margin-bottom:9px;\">\n        <span class=\"sec-label\" style=\"margin:0;flex:1;\">\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e40\u0e14\u0e37\u0e2d\u0e19</span>\n        <select id=\"year\" style=\"width:auto;padding:7px 10px;font-size:12.5px;border-radius:10px;border:1.5px solid var(--gray-200);font-family:inherit;font-weight:700;\"></select>\n      </div>\n      <div class=\"mbar\" id=\"mbar\"></div>\n    </div>\n\n    <div id=\"dash\" class=\"loading\"><div class=\"spinner\"></div></div>\n  </div>\n\n  \n  \n  \n  \n  \n  \n",css:"\n    /* \u2500\u2500 \u0e41\u0e16\u0e1a\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e40\u0e14\u0e37\u0e2d\u0e19\u0e41\u0e1a\u0e1a\u0e40\u0e25\u0e37\u0e48\u0e2d\u0e19\u0e44\u0e14\u0e49 \u2500\u2500 */\n    .mbar { display:flex; gap:7px; overflow-x:auto; padding:2px 0 4px; -webkit-overflow-scrolling:touch; scrollbar-width:none; }\n    .mbar::-webkit-scrollbar { display:none; }\n    .mchip {\n      flex:0 0 auto; padding:8px 15px; border-radius:999px;\n      border:1.5px solid var(--gray-200); background:#fff;\n      font-size:12.5px; font-weight:700; color:var(--gray-600);\n      cursor:pointer; font-family:inherit; white-space:nowrap; min-height:40px;\n      transition:all .14s ease;\n    }\n    .mchip.on {\n      background:linear-gradient(135deg,#B7081D,#8B0616); color:#fff;\n      border-color:transparent; box-shadow:0 4px 12px rgba(183,8,29,.26);\n    }\n\n    /* \u2500\u2500 Hero + \u0e40\u0e17\u0e23\u0e19\u0e14\u0e4c \u2500\u2500 */\n    .trend {\n      display:inline-flex; align-items:center; gap:5px; margin-top:9px;\n      background:rgba(255,255,255,.2); border:1px solid rgba(255,255,255,.28);\n      padding:4px 12px; border-radius:999px; font-size:12px; font-weight:700;\n      backdrop-filter:blur(8px);\n    }\n\n    /* \u2500\u2500 \u0e01\u0e23\u0e32\u0e1f\u0e41\u0e17\u0e48\u0e07\u0e08\u0e31\u0e14\u0e2d\u0e31\u0e19\u0e14\u0e31\u0e1a \u2500\u2500 */\n    .rank-row {\n      display:grid; grid-template-columns:34px 1fr auto; gap:10px;\n      align-items:center; padding:9px 0; cursor:pointer;\n      border-bottom:1px solid var(--gray-100);\n    }\n    .rank-row:last-child { border-bottom:none; }\n    .rank-row:active { background:var(--gray-50); }\n    .rk-badge {\n      width:30px; height:30px; border-radius:10px;\n      display:flex; align-items:center; justify-content:center;\n      font-size:12px; font-weight:800; color:#fff; flex-shrink:0;\n    }\n    .rk-mid { min-width:0; }\n    .rk-name { font-size:13px; font-weight:700; color:var(--gray-900); margin-bottom:5px;\n               overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }\n    .rk-track { height:9px; border-radius:999px; background:var(--gray-100); overflow:hidden; }\n    .rk-fill { height:100%; border-radius:999px; transition:width .6s cubic-bezier(.4,0,.2,1); }\n    .rk-right { text-align:right; flex-shrink:0; }\n    .rk-amt { font-size:14px; font-weight:800; color:var(--gray-900); font-variant-numeric:tabular-nums; }\n    .rk-pct { font-size:11px; color:var(--gray-400); }\n\n    /* \u2500\u2500 \u0e42\u0e14\u0e19\u0e31\u0e17\u0e1b\u0e23\u0e30\u0e40\u0e20\u0e17\u0e04\u0e48\u0e32\u0e43\u0e0a\u0e49\u0e08\u0e48\u0e32\u0e22 \u2500\u2500 */\n    .donut-wrap { display:flex; align-items:center; gap:16px; margin-top:14px; }\n    .donut { flex:0 0 128px; position:relative; }\n    .donut svg { transform:rotate(-90deg); display:block; }\n    .donut-mid {\n      position:absolute; inset:0; display:flex; flex-direction:column;\n      align-items:center; justify-content:center; pointer-events:none;\n    }\n    .donut-mid .n { font-size:19px; font-weight:800; letter-spacing:-.03em; color:var(--gray-900); line-height:1.1; }\n    .donut-mid .l { font-size:11px; color:var(--gray-400); font-weight:600; }\n    .legend { flex:1; min-width:0; }\n    .lg-row { display:flex; align-items:center; gap:8px; margin-bottom:7px; font-size:12px; }\n    .lg-dot { width:11px; height:11px; border-radius:4px; flex-shrink:0; }\n    .lg-name { flex:1; color:var(--gray-700); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }\n    .lg-val { font-weight:800; color:var(--gray-900); font-variant-numeric:tabular-nums; }\n\n    /* \u2500\u2500 \u0e01\u0e32\u0e23\u0e4c\u0e14\u0e1e\u0e19\u0e31\u0e01\u0e07\u0e32\u0e19 \u2500\u2500 */\n    .pcard {\n      background:#fff; border:1px solid var(--gray-200); border-radius:var(--r-lg);\n      margin-bottom:10px; box-shadow:var(--sh-xs); overflow:hidden;\n    }\n    .pcard-top { display:flex; align-items:center; gap:12px; padding:14px; cursor:pointer; }\n    .pav {\n      width:46px; height:46px; border-radius:15px; color:#fff;\n      display:flex; align-items:center; justify-content:center;\n      font-weight:800; font-size:15px; flex-shrink:0; letter-spacing:-.02em;\n    }\n    .pinfo { flex:1; min-width:0; }\n    .pname { font-weight:800; font-size:15px; letter-spacing:-.01em; color:var(--gray-900); }\n    .pmeta { font-size:11px; color:var(--gray-500); margin-top:1px;\n             overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }\n    .pright { text-align:right; flex-shrink:0; }\n    .pamt { font-weight:800; font-size:17px; color:var(--accent); font-variant-numeric:tabular-nums; letter-spacing:-.02em; }\n    .pcnt { font-size:11px; color:var(--gray-400); }\n    .pchev { color:var(--gray-300); font-size:13px; margin-left:2px; transition:transform .2s; }\n    .pcard.open .pchev { transform:rotate(90deg); }\n    .pbody { display:none; padding:0 14px 14px; border-top:1px solid var(--gray-100); }\n    .pcard.open .pbody { display:block; }\n    .pbar { display:grid; grid-template-columns:74px 1fr 60px; gap:8px; align-items:center;\n            font-size:11.5px; margin-top:8px; }\n    .pbar .bn { color:var(--gray-600); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }\n    .pbar .bt { height:7px; background:var(--gray-100); border-radius:999px; overflow:hidden; }\n    .pbar .bf { height:100%; border-radius:999px; }\n    .pbar .bv { text-align:right; font-weight:700; color:var(--gray-800); font-variant-numeric:tabular-nums; }\n    .pzero { opacity:.55; }\n  ",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();
    let teamData = null, allTeamReqs = [];
    let selMonth = new Date().getMonth() + 1;

    const MONTHS = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
    const MONTHS_FULL = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];

    const CAT_TH = catMap();   // 🔴 รวมไว้ที่ js/app.js แล้ว ห้ามก๊อปตารางมาไว้ในหน้าอีก

    // สีประจำตัว — คนละสีชัดเจน ไล่ตามลำดับในทีม ไม่สุ่ม จะได้คงที่ทุกครั้งที่เปิด
    const PALETTE = ['#B7081D','#2563EB','#16A34A','#D97706','#7C3AED',
                     '#0D9488','#DB2777','#0891B2','#65A30D','#E11D48',
                     '#4F46E5','#EA580C'];
    const CAT_COLORS = ['#B7081D','#F59E0B','#2563EB','#16A34A','#7C3AED',
                        '#0D9488','#DB2777','#64748B','#EA580C','#0891B2'];

    const colorOf = {};   // email → สี

    const bb = document.getElementById('backBtn');
    if (bb && typeof icon === 'function') bb.innerHTML = icon('back');

    // ── ตัวเลือกเดือน / ปี ──
    const ySel = document.getElementById('year');
    const now = new Date();
    for (let y = now.getFullYear(); y >= now.getFullYear() - 3; y--) {
      const o = document.createElement('option'); o.value = y; o.textContent = y;
      if (y === now.getFullYear()) o.selected = true; ySel.appendChild(o);
    }
    ySel.addEventListener('change', render);

    function buildMonthBar() {
      const bar = document.getElementById('mbar');
      bar.innerHTML = MONTHS.map((m, i) =>
        `<button type="button" class="mchip ${i+1===selMonth?'on':''}" data-m="${i+1}">${m}</button>`).join('');
      bar.querySelectorAll('.mchip').forEach(b => b.addEventListener('click', () => {
        selMonth = parseInt(b.dataset.m);
        bar.querySelectorAll('.mchip').forEach(x => x.classList.remove('on'));
        b.classList.add('on');
        render();
      }));
      // เลื่อนให้เดือนที่เลือกอยู่กลางจอ
      setTimeout(() => {
        const on = bar.querySelector('.mchip.on');
        if (on) bar.scrollLeft = on.offsetLeft - bar.clientWidth / 2 + on.clientWidth / 2;
      }, 50);
    }

    async function load() {
      buildMonthBar();
      try {
        const [team, reqs] = await Promise.all([
          fetchMyTeam(session.Email),
          fetchMyTeamRequests(session.Email).catch(() => [])
        ]);
        if (team && team.error) throw new Error(team.error);
        teamData = team;
        allTeamReqs = Array.isArray(reqs) ? reqs : [];
        (teamData.team || []).forEach((mem, i) => {
          colorOf[String(mem.Email).toLowerCase()] = PALETTE[i % PALETTE.length];
        });
        render();
      } catch (err) {
        const d = document.getElementById('dash');
        d.classList.remove('loading');
        d.innerHTML = `<div class="empty"><div class="icon-wrap">⚠️</div>
          <div class="title">โหลดข้อมูลไม่สำเร็จ</div><div class="sub">${esc(err.message)}</div>
          <button class="btn btn-primary btn-sm" style="margin-top:14px;max-width:180px;" onclick="location.reload()">🔄 ลองใหม่</button></div>`;
        renderBottomNav('home');
      }
    }

    /** รวมยอดของเดือนที่ระบุ */
    function sumMonth(y, m) {
      return allTeamReqs
        .filter(r => {
          if (r.Status !== 'Approved') return false;
          const d = new Date(r.ExpenseDate || r.Timestamp);
          return !isNaN(d) && d.getFullYear() === y && d.getMonth() + 1 === m;
        });
    }

    function render() {
      const dash = document.getElementById('dash');
      dash.classList.remove('loading');

      if (!teamData || !teamData.team || teamData.team.length === 0) {
        dash.innerHTML = `<div class="empty"><div class="icon-wrap">👥</div>
          <div class="title">ยังไม่มีสมาชิกในทีม</div>
          <div class="sub">ระบบดูจากช่อง Manager ในชีท Staff — ถ้ายังไม่มีใครใส่ชื่อคุณไว้ จะยังไม่เห็นใคร</div></div>`;
        renderBottomNav('home');
        return;
      }

      const y = parseInt(ySel.value);
      const reqs = sumMonth(y, selMonth);
      const total = reqs.reduce((s, r) => s + (Number(r.Amount) || 0), 0);

      // เดือนก่อนหน้า เอาไว้เทียบเทรนด์
      const pm = selMonth === 1 ? 12 : selMonth - 1;
      const py = selMonth === 1 ? y - 1 : y;
      const prevTotal = sumMonth(py, pm).reduce((s, r) => s + (Number(r.Amount) || 0), 0);

      // แยกตามคน
      const byEmail = {};
      reqs.forEach(r => {
        const e = String(r.StaffEmail || '').toLowerCase();
        if (!byEmail[e]) byEmail[e] = { total: 0, count: 0, cats: {} };
        const amt = Number(r.Amount) || 0;
        byEmail[e].total += amt;
        byEmail[e].count++;
        const c = r.Category || 'OTHER';
        byEmail[e].cats[c] = (byEmail[e].cats[c] || 0) + amt;
      });

      // แยกตามประเภท (ทั้งทีม)
      const byCat = {};
      reqs.forEach(r => {
        const c = r.Category || 'OTHER';
        byCat[c] = (byCat[c] || 0) + (Number(r.Amount) || 0);
      });
      const cats = Object.keys(byCat).map(c => ({ code: c, amt: byCat[c] })).sort((a, b) => b.amt - a.amt);

      const members = [...teamData.team].sort((a, b) =>
        (byEmail[String(b.Email).toLowerCase()]?.total || 0) - (byEmail[String(a.Email).toLowerCase()]?.total || 0));

      const active = members.filter(m => (byEmail[String(m.Email).toLowerCase()]?.total || 0) > 0).length;
      const avg = active ? total / active : 0;

      // ── เทรนด์เทียบเดือนก่อน ──
      let trendHtml = '';
      if (prevTotal > 0) {
        const diff = total - prevTotal;
        const pct = Math.round(Math.abs(diff) / prevTotal * 100);
        const up = diff > 0;
        trendHtml = `<div class="trend">${up ? '📈' : '📉'} ${up ? 'เพิ่มขึ้น' : 'ลดลง'} ${pct}% จาก ${MONTHS_FULL[pm-1]}</div>`;
      } else if (total > 0) {
        trendHtml = `<div class="trend">🆕 เดือนก่อนไม่มีรายการ</div>`;
      }

      let html = `
        <div class="count-hero">
          <div class="lbl">${teamData.teamName || 'ทีม'} · ${MONTHS_FULL[selMonth-1]} ${y}</div>
          <div class="num">${Math.round(total).toLocaleString()}</div>
          <div class="sub">บาท · ${reqs.length} รายการ</div>
          ${trendHtml}
        </div>

        <div class="kpi-grid">
          <div class="kpi"><div class="n">${teamData.team.length}</div><div class="l">คนในทีม</div></div>
          <div class="kpi ok"><div class="n">${active}</div><div class="l">มีการเบิก</div></div>
          <div class="kpi warn"><div class="n">${Math.round(avg).toLocaleString()}</div><div class="l">เฉลี่ย/คน</div></div>
          <div class="kpi"><div class="n">${reqs.length}</div><div class="l">รายการ</div></div>
        </div>`;

      // ── ไม่มีข้อมูลเดือนนี้ ──
      if (total === 0) {
        html += `<div class="card"><div class="empty" style="padding:30px 12px;">
          <div class="icon-wrap">📭</div>
          <div class="title">ไม่มีรายการที่อนุมัติแล้วใน${MONTHS_FULL[selMonth-1]}</div>
          <div class="sub">ลองเลือกเดือนอื่นดู หรือรายการอาจยังรออนุมัติอยู่</div>
        </div></div>`;
        html += renderMemberCards(members, byEmail, 0, y);
        dash.innerHTML = html;
        bindCards();
        renderBottomNav('home');
        return;
      }

      // ── กราฟจัดอันดับรายคน ──
      const maxSpend = Math.max(...members.map(m => byEmail[String(m.Email).toLowerCase()]?.total || 0), 1);
      html += `<div class="card">
        <div class="card-head"><span class="ib ib-red">🏆</span>
          <div><div class="ch-title">จัดอันดับการใช้จ่าย</div>
          <div class="ch-sub">แตะที่ชื่อเพื่อดูรายละเอียด</div></div>
        </div>
        <div style="margin-top:12px;">`;

      members.forEach((mem, i) => {
        const em = String(mem.Email).toLowerCase();
        const st = byEmail[em] || { total: 0, count: 0 };
        const color = colorOf[em] || PALETTE[0];
        const pct = total ? (st.total / total * 100) : 0;
        const w = (st.total / maxSpend * 100).toFixed(1);
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1);
        html += `<div class="rank-row ${st.total ? '' : 'pzero'}" data-go="${em}">
          <div class="rk-badge" style="background:${color};">${medal}</div>
          <div class="rk-mid">
            <div class="rk-name">${esc(mem.Name)}</div>
            <div class="rk-track"><div class="rk-fill" style="width:${w}%;background:${color};"></div></div>
          </div>
          <div class="rk-right">
            <div class="rk-amt">${Math.round(st.total).toLocaleString()}</div>
            <div class="rk-pct">${pct.toFixed(0)}% · ${st.count} ใบ</div>
          </div>
        </div>`;
      });
      html += `</div></div>`;

      // ── โดนัทแยกตามประเภท ──
      html += `<div class="card">
        <div class="card-head"><span class="ib ib-orange">🍩</span>
          <div><div class="ch-title">แยกตามประเภท</div>
          <div class="ch-sub">${cats.length} ประเภท</div></div>
        </div>
        ${donutHtml(cats, total)}
      </div>`;

      // ── การ์ดรายคน ──
      html += `<div class="sec-label">รายละเอียดรายคน</div>`;
      html += renderMemberCards(members, byEmail, total, y);

      dash.innerHTML = html;
      bindCards();
      renderBottomNav('home');
    }

    /** โดนัทวาดด้วย SVG ล้วน ไม่ต้องโหลดไลบรารีเพิ่ม */
    function donutHtml(cats, total) {
      const R = 52, C = 2 * Math.PI * R;
      let offset = 0;
      const arcs = cats.slice(0, 8).map((c, i) => {
        const frac = c.amt / total;
        const len = frac * C;
        const seg = `<circle cx="64" cy="64" r="${R}" fill="none"
          stroke="${CAT_COLORS[i % CAT_COLORS.length]}" stroke-width="21"
          stroke-dasharray="${len.toFixed(2)} ${(C - len).toFixed(2)}"
          stroke-dashoffset="${(-offset).toFixed(2)}"></circle>`;
        offset += len;
        return seg;
      }).join('');

      const legend = cats.slice(0, 8).map((c, i) => `
        <div class="lg-row">
          <span class="lg-dot" style="background:${CAT_COLORS[i % CAT_COLORS.length]};"></span>
          <span class="lg-name">${CAT_TH[c.code] || c.code}</span>
          <span class="lg-val">${Math.round(c.amt).toLocaleString()}</span>
          <span style="color:var(--gray-400);font-size:11px;min-width:32px;text-align:right;">${(c.amt/total*100).toFixed(0)}%</span>
        </div>`).join('');

      return `<div class="donut-wrap">
        <div class="donut">
          <svg width="128" height="128" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r="${R}" fill="none" stroke="#F1F5F9" stroke-width="21"></circle>
            ${arcs}
          </svg>
          <div class="donut-mid">
            <div class="n">${Math.round(total).toLocaleString()}</div>
            <div class="l">บาท</div>
          </div>
        </div>
        <div class="legend">${legend}</div>
      </div>`;
    }

    function renderMemberCards(members, byEmail, total, y) {
      return members.map(mem => {
        const em = String(mem.Email).toLowerCase();
        const st = byEmail[em] || { total: 0, count: 0, cats: {} };
        const color = colorOf[em] || PALETTE[0];
        const pct = total ? (st.total / total * 100).toFixed(0) : 0;

        const myCats = Object.keys(st.cats || {})
          .map(c => ({ code: c, amt: st.cats[c] })).sort((a, b) => b.amt - a.amt);
        const maxCat = Math.max(...myCats.map(c => c.amt), 1);

        const bars = myCats.length
          ? myCats.map((c, i) => `<div class="pbar">
              <span class="bn">${CAT_TH[c.code] || c.code}</span>
              <span class="bt"><span class="bf" style="width:${(c.amt/maxCat*100).toFixed(0)}%;background:${CAT_COLORS[i % CAT_COLORS.length]};"></span></span>
              <span class="bv">${Math.round(c.amt).toLocaleString()}</span>
            </div>`).join('')
          : `<div style="font-size:12px;color:var(--gray-400);padding:10px 0;text-align:center;">ไม่มีรายการในเดือนนี้</div>`;

        const safeName = String(mem.Name).replace(/'/g, '');
        return `<div class="pcard ${st.total ? '' : 'pzero'}">
          <div class="pcard-top">
            <div class="pav" style="background:${color};">${initials(mem.Name)}</div>
            <div class="pinfo">
              <div class="pname">${esc(mem.Name)}</div>
              <div class="pmeta">${esc(mem.Department || '')}${mem.Position ? ' · ' + mem.Position : ''}</div>
            </div>
            <div class="pright">
              <div class="pamt">${Math.round(st.total).toLocaleString()}</div>
              <div class="pcnt">${st.count} ใบ${total ? ' · ' + pct + '%' : ''}</div>
            </div>
            <span class="pchev">▶</span>
          </div>
          <div class="pbody">
            <div style="margin-top:10px;">${bars}</div>
            <div class="btn-row" style="margin-top:12px;">
              <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="event.stopPropagation();viewSummary('${em}')">👁 ดูรายการ</button>
              <button class="btn btn-primary btn-sm" style="flex:1;" onclick="event.stopPropagation();exportRep('${esc(mem.Email)}',decodeURIComponent('${encodeURIComponent(mem.Name||'').replace(/'/g,'%27')}'))">📊 โหลด Excel</button>
            </div>
            ${session.isViewer ? '' : `<button class="btn btn-secondary btn-sm" style="margin-top:7px;color:#0F766E;border-color:#5EEAD4;"
              onclick="event.stopPropagation();closePeriod('${esc(mem.Email)}',decodeURIComponent('${encodeURIComponent(mem.Name||'').replace(/'/g,'%27')}'))">📅 ปิดรอบ / ตัดยอด</button>`}
            ${session.isViewer ? '' : `<button class="btn btn-secondary btn-sm" style="margin-top:7px;color:#B45309;border-color:#FCD34D;"
              onclick="event.stopPropagation();resetPwd('${esc(mem.Email)}',decodeURIComponent('${encodeURIComponent(mem.Name||'').replace(/'/g,'%27')}'))">🔑 ล้างรหัสผ่านให้</button>`}
          </div>
        </div>`;
      }).join('');
    }

    /** แตะการ์ดเพื่อกาง/พับ + แตะแถวในกราฟแล้วเลื่อนไปหาการ์ดนั้น */
    function bindCards() {
      document.querySelectorAll('.pcard-top').forEach(top => {
        top.addEventListener('click', () => top.closest('.pcard').classList.toggle('open'));
      });
      document.querySelectorAll('.rank-row').forEach((row, i) => {
        row.addEventListener('click', () => {
          const card = document.querySelectorAll('.pcard')[i];
          if (!card) return;
          card.classList.add('open');
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      });
    }

    window.viewSummary = () => { location.href = 'summary.html'; };

    // 📅 v6.3 หัวหน้าปิดรอบ/ตัดยอดให้ลูกน้องได้ เลือกวันตัดเองได้ทุกเดือน
    window.closePeriod = async (email, name) => {
      const year = parseInt(ySel.value);
      showLoading('ดูข้อมูลรอบของ ' + name + '...');
      let info;
      try {
        info = await apiGet('getPeriodInfo', { email, year, month: selMonth });
        hideLoading();
        if (!info || info.error) throw new Error((info && info.error) || 'ดูข้อมูลรอบไม่ได้');
      } catch (err) { hideLoading(); return showToast(err.message, 'error'); }

      const ans = prompt(
        `ปิดรอบให้ ${name}\n\n` +
        `รอบนี้เริ่ม ${info.periodStartTH}\n` +
        (info.lastSettledTH ? `รอบก่อนปิดถึง ${info.lastSettledTH}\n` : 'ยังไม่เคยปิดรอบ\n') +
        `\nตัดยอดถึงวันที่ไหน? (YYYY-MM-DD)\n` +
        `ค่าเริ่มต้น = วันที่ ${info.cutoffDay} ของเดือน`,
        info.suggestedEnd
      );
      if (!ans) return;

      showLoading('กำลังปิดรอบ...');
      try {
        const r = await apiPost('requestExportApproval', {
          staffEmail: email, year, month: selMonth,
          periodEnd: ans.trim(), requesterEmail: session.Email
        });
        hideLoading();
        if (r.error) throw new Error(r.error);
        showToast(r.auto ? `ปิดรอบ ${name} แล้ว ✅` : `ส่งขออนุมัติรอบของ ${name} แล้ว ✅`, 'success');
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    window.exportRep = async (email, name) => {
      const year = parseInt(ySel.value);
      showLoading('สร้าง Excel ของ ' + name + '...');
      try {
        const r = await exportStaffReport({ staffEmail: email, year, month: selMonth, requesterEmail: session.Email });
        hideLoading();
        if (r.error) throw new Error(r.error);
        if (!r.base64) throw new Error('ไม่มีข้อมูลไฟล์');
        const bytes = atob(r.base64);
        const arr = new Uint8Array(bytes.length);
        for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
        const blob = new Blob([arr], { type: r.mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = r.filename;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        showToast('✅ ' + r.itemCount + ' รายการ · ' + Math.round(r.totalAmount).toLocaleString() + ' บาท', 'success');
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    /** ลืมรหัสผ่าน — ระบบไม่ส่งอีเมลแล้ว หัวหน้าล้างให้แทน */
    window.resetPwd = async (email, name) => {
      if (!confirm('ล้างรหัสผ่านของ ' + name + ' ?\n\nหลังล้างแล้วเขาจะตั้งรหัสใหม่เองตอนล็อกอินครั้งถัดไป')) return;
      showLoading('กำลังล้างรหัสผ่าน...');
      try {
        const r = await adminResetPassword(session.Email, email);
        hideLoading();
        if (r.error) throw new Error(r.error);
        await confirmDialog('รหัสกู้บัญชีของ '+name, 'ส่งรหัสนี้ให้พนักงานผ่านช่องทางที่ตรวจสอบตัวตนแล้ว\n\n'+r.setupCode+'\n\nใช้ได้ครั้งเดียว ภายใน 24 ชั่วโมง\nเปิดหน้าลืมรหัสผ่าน แล้วเลือก มีรหัสกู้บัญชีแล้ว', 'รับทราบ');
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    if (session) load();
  
if(typeof bindCards==='function')window.bindCards=bindCards;
if(typeof buildMonthBar==='function')window.buildMonthBar=buildMonthBar;
if(typeof donutHtml==='function')window.donutHtml=donutHtml;
if(typeof load==='function')window.load=load;
if(typeof render==='function')window.render=render;
if(typeof renderMemberCards==='function')window.renderMemberCards=renderMemberCards;
if(typeof sumMonth==='function')window.sumMonth=sumMonth;
}}};
window.EXION_VIEWS["pc-approve.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" aria-label=\"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a\" onclick=\"location.href='pc-home.html'\" id=\"backBtn\"></button>\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">\u0e23\u0e2d\u0e14\u0e33\u0e40\u0e19\u0e34\u0e19\u0e01\u0e32\u0e23</span></h1>\n  </div>\n\n  <div class=\"container\">\n    <div id=\"content\" class=\"loading\"><div class=\"spinner\"></div></div>\n  </div>\n\n  \n  \n  \n  \n  \n  \n",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();
    setApp('petty');
    const bb = document.getElementById('backBtn');
    if (bb && typeof icon === 'function') bb.innerHTML = icon('back');

    let data = null;
    const CAT_TH = {};
    const money = n => Math.round(Number(n) || 0).toLocaleString();
    const thDate = v => { const d = v ? new Date(v) : null;
      return d && !isNaN(d) ? d.toLocaleDateString('th-TH', { day:'numeric', month:'short', year:'2-digit' }) : '-'; };

    async function load() {
      try {
        const [d, cs] = await Promise.all([
          fetchPettyInbox(session.Email),
          fetchPettyCategories().catch(() => [])
        ]);
        if (d.error) throw new Error(d.error);
        (Array.isArray(cs) ? cs : []).forEach(c => { CAT_TH[c.Code] = c.NameTH || c.Code; });
        data = d;
        render();
      } catch (err) {
        renderError('content', err.message, load);
        renderBottomNav('pc-inbox');
      }
    }

    function render() {
      const c = document.getElementById('content');
      c.classList.remove('loading');
      const ap = data.toApprove || [], pay = data.toPay || [], inn = data.toReceive || [];

      if (!ap.length && !pay.length && !inn.length) {
        c.innerHTML = `<div class="empty"><div class="icon-wrap">🎉</div>
          <div class="title">เคลียร์หมดแล้ว!</div><div class="sub">ไม่มีรายการรอดำเนินการ</div></div>`;
        renderBottomNav('pc-inbox');
        return;
      }

      const b = data.balance;
      let html = `
        <div class="card" style="padding:12px 15px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:20px;">💰</span>
            <span style="flex:1;">
              <span style="display:block;font-size:11.5px;color:var(--gray-500);">เงินสดในกล่อง</span>
              <span style="display:block;font-size:18px;font-weight:800;color:var(--gray-800);">${money(b.cash)} บาท</span>
            </span>
            <span style="text-align:right;font-size:11px;color:var(--gray-400);line-height:1.5;">
              กันไว้ ${money(b.reserved)}<br>ใช้ได้ ${money(b.available)}</span>
          </div>
        </div>`;

      if (ap.length) {
        const sum = ap.reduce((s, r) => s + (Number(r.Amount) || 0), 0);
        html += `<div class="sec-label">⏳ รออนุมัติ (${ap.length}) · ${money(sum)} บาท</div>` +
                ap.map(r => card(r, 'approve')).join('');
      }
      if (pay.length) {
        const sum = pay.reduce((s, r) => s + (Number(r.Amount) || 0), 0);
        html += `<div class="sec-label">💵 อนุมัติแล้ว รอจ่ายเงินสด (${pay.length}) · ${money(sum)} บาท</div>` +
                pay.map(r => card(r, 'pay')).join('');
      }
      if (inn.length) {
        html += `<div class="sec-label">📥 เติมเงิน — รออนุมัติแล้ว รอรับเงินจริง (${inn.length})</div>` +
                inn.map(r => card(r, 'pay')).join('');
      }
      c.innerHTML = html;
      renderBottomNav('pc-inbox');
    }

    function card(r, mode) {
      const isIn = String(r.Type).toUpperCase() === 'IN';
      const files = (() => { try { return JSON.parse(r.ReceiptURLs || '[]'); } catch (e) { return []; } })();
      return `
        <div class="card" style="border-left:4px solid ${mode === 'pay' ? 'var(--ok)' : 'var(--warn)'};">
          <div style="display:flex;align-items:flex-start;gap:10px;">
            <span style="font-size:20px;line-height:1.2;">${isIn ? '📥' : '📤'}</span>
            <div style="flex:1;min-width:0;">
              <div style="font-size:14px;font-weight:800;color:var(--gray-800);">${esc(r.Purpose || CAT_TH[r.Category] || r.Category)}</div>
              <div style="font-size:11.5px;color:var(--gray-500);margin-top:3px;">
                ${esc(CAT_TH[r.Category] || r.Category)} · ${thDate(r.ExpenseDate)}</div>
            </div>
            <div style="font-size:17px;font-weight:800;color:${isIn ? 'var(--ok)' : 'var(--accent)'};white-space:nowrap;">
              ${money(r.Amount)} ฿</div>
          </div>

          <div class="detail-list" style="margin-top:10px;">
            <div class="dl-row"><span class="k">ผู้ขอ</span><span class="v">${esc(r.RequesterName || r.RequesterEmail)}</span></div>
            ${r.OnBehalfBy ? `<div class="dl-row"><span class="k">บันทึกโดย</span><span class="v">${String(r.OnBehalfBy).split('@')[0]}</span></div>` : ''}
            ${r.Payee ? `<div class="dl-row"><span class="k">จ่ายให้</span><span class="v">${esc(r.Payee)}</span></div>` : ''}
            <div class="dl-row"><span class="k">ใบเสร็จ</span><span class="v">${files.length ? files.length + ' ไฟล์' : '— ไม่มี —'}</span></div>
          </div>

          ${files.length ? `<button class="btn btn-secondary btn-sm" style="margin-top:9px;"
             onclick="viewReceipt('${esc(r.ID)}')">👁 ดูใบเสร็จ</button>` : ''}
          <div id="rc_${esc(r.ID)}"></div>

          ${mode === 'approve' ? `
          <div style="display:flex;gap:9px;margin-top:11px;">
            <button class="btn btn-primary" style="flex:1;" onclick="decide('${esc(r.ID)}','Approved')">✅ อนุมัติ</button>
            <button class="btn" style="flex:1;background:var(--danger);color:#fff;" onclick="decide('${esc(r.ID)}','Rejected')">❌ ไม่อนุมัติ</button>
          </div>` : `
          <button class="btn btn-primary" style="margin-top:11px;" onclick="doPay('${esc(r.ID)}','${money(r.Amount)}')">
            ${isIn ? '📥 รับเงินเข้ากล่องแล้ว' : '💵 จ่ายเงินสดแล้ว'}
          </button>`}
        </div>`;
    }

    window.viewReceipt = async function (id) {
      const box = document.getElementById('rc_' + id);
      if (box.dataset.loaded) { box.innerHTML = ''; box.dataset.loaded = ''; return; }
      box.innerHTML = '<div class="hint" style="margin-top:8px;">กำลังโหลด...</div>';
      try {
        const r = await apiGet('getReceiptImage', { id: id, viewerEmail: session.Email, fileIndex: 0 });
        if (r.error) throw new Error(r.error);
        if (!r.dataUrl) { box.innerHTML = '<div class="hint">ไม่มีไฟล์</div>'; return; }
        box.innerHTML = `<img src="${esc(r.dataUrl)}" alt="ใบเสร็จ" style="width:100%;border-radius:12px;margin-top:9px;
                          border:1px solid var(--gray-200);">
          ${r.totalFiles > 1 ? `<div class="hint">มีทั้งหมด ${esc(r.totalFiles)} ไฟล์ — ดูไฟล์อื่นในชีท</div>` : ''}`;
        box.dataset.loaded = '1';
      } catch (e) { box.innerHTML = `<div class="hint" style="color:var(--danger);">${esc(e.message)}</div>`; }
    };

    window.decide = async function (id, decision) {
      let remark = '';
      if (decision === 'Rejected') {
        remark = prompt('เหตุผลที่ไม่อนุมัติ (บังคับ)') || '';
        if (!remark.trim()) return showToast('ต้องระบุเหตุผล', 'error');
      } else if (!confirm('ยืนยันอนุมัติ?')) return;
      showLoading('กำลังบันทึก...');
      try {
        const r = await approvePetty({ id, decision, approverEmail: session.Email, remark });
        hideLoading();
        if (r.error) throw new Error(r.error);
        showToast(decision === 'Approved' ? '✅ อนุมัติแล้ว' : '❌ ไม่อนุมัติ', 'success');
        setTimeout(load, 700);
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    window.doPay = async function (id, amt) {
      if (!confirm('ยืนยันว่าจ่าย/รับเงินสด ' + amt + ' บาท เรียบร้อยแล้ว?\n\nยอดในกล่องจะเปลี่ยนทันที')) return;
      showLoading('กำลังบันทึก...');
      try {
        const r = await payPetty({ id, actorEmail: session.Email });
        hideLoading();
        if (r.error) throw new Error(r.error);
        showToast('บันทึกแล้ว · เหลือ ' + money((r.balance || {}).cash) + ' บาท', 'success');
        setTimeout(load, 700);
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    load();
  
if(typeof card==='function')window.card=card;
if(typeof load==='function')window.load=load;
if(typeof render==='function')window.render=render;
}}};
window.EXION_VIEWS["pc-fund.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" aria-label=\"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a\" onclick=\"location.href='pc-home.html'\" id=\"backBtn\"></button>\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">\ud83d\udcb0 \u0e01\u0e25\u0e48\u0e2d\u0e07\u0e40\u0e07\u0e34\u0e19\u0e2a\u0e14</span></h1>\n  </div>\n\n  <div class=\"container\">\n    <div id=\"content\" class=\"loading\"><div class=\"spinner\"></div></div>\n  </div>\n\n  \n  \n  \n  \n  \n  \n",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();
    setApp('petty');
    const bb = document.getElementById('backBtn');
    if (bb && typeof icon === 'function') bb.innerHTML = icon('back');

    let home = null;
    const money = n => Math.round(Number(n) || 0).toLocaleString();

    /* หลอดเงินคงเหลือ — แดงเมื่อต่ำกว่าเส้นเตือนที่บัญชีตั้งไว้ */
    function gauge(b) {
      const pct = b.limit > 0 ? Math.max(0, Math.min(100, (b.cash / b.limit) * 100)) : 0;
      const markPct = b.limit > 0 ? Math.max(0, Math.min(100, (b.lowAlert / b.limit) * 100)) : 0;
      const col = b.lowCash ? 'var(--danger)' : (pct < 50 ? '#E0A800' : 'var(--ok)');
      return `
        <div style="margin-top:13px;">
          <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:6px;">
            <span style="font-size:25px;font-weight:800;color:${col};">${money(b.cash)}</span>
            <span style="font-size:12.5px;color:var(--gray-500);">/ ${money(b.limit)} บาท</span>
            <span style="margin-left:auto;font-size:11.5px;color:var(--gray-400);">ใช้ไป ${b.usedPct || 0}%</span>
          </div>
          <div style="position:relative;height:11px;border-radius:6px;background:var(--gray-100);overflow:hidden;">
            <div style="height:100%;width:${pct}%;background:${col};transition:width .3s;"></div>
            <div style="position:absolute;top:-2px;left:${markPct}%;width:2px;height:15px;background:var(--gray-800);"
                 title="เส้นเตือน ${money(b.lowAlert)}"></div>
          </div>
          ${b.lowCash ? `<div style="margin-top:9px;padding:9px 11px;border-radius:9px;background:var(--warn-bg);
            font-size:12.5px;font-weight:700;color:var(--gray-800);">
            ⚠️ เงินเหลือน้อยกว่า ${money(b.lowAlert)} บาท — ถึงเวลาเคลียร์บิล</div>` : ''}
        </div>`;
    }

    async function load() {
      try {
        const h = await fetchPettyHome(session.Email);
        if (h.error) throw new Error(h.error);
        home = h;
        render();
      } catch (err) {
        renderError('content', err.message, load);
        renderBottomNav('pc-fund');
      }
    }

    function render() {
      const b = home.balance, f = home.fund;
      const c = document.getElementById('content');
      c.classList.remove('loading');

      c.innerHTML = `
        <div class="card">
          <div class="card-head"><span class="ib ib-teal">💰</span>
            <div><div class="ch-title">${esc(f.Name)}</div>
              <div class="ch-sub">${esc(f.Branch || '—')} · ผู้ถือเงิน ${b.holderName || f.HolderEmail}</div></div>
          </div>
          ${gauge(b)}
          <div class="detail-list" style="margin-top:11px;">
            <div class="dl-row"><span class="k">วงเงิน</span><span class="v">${money(b.limit)} บาท</span></div>
            <div class="dl-row"><span class="k">เงินสดในกล่อง</span><span class="v">${money(b.cash)} บาท</span></div>
            <div class="dl-row"><span class="k">อนุมัติแล้ว รอจ่าย</span><span class="v">${money(b.reserved)} บาท</span></div>
            <div class="dl-row"><span class="k">ใช้ได้จริง</span><span class="v">${money(b.available)} บาท</span></div>
            <div class="dl-row"><span class="k">บิลที่ยังไม่เคลียร์</span><span class="v">${money(b.spentSinceTopUp)} บาท</span></div>
            <div class="dl-row"><span class="k">เตือนเมื่อต่ำกว่า</span><span class="v">${money(b.lowAlert)} บาท</span></div>
            ${b.lastTopUpAt ? `<div class="dl-row"><span class="k">เคลียร์บิลล่าสุด</span><span class="v">${b.lastTopUpAt}</span></div>` : ''}
          </div>
          <div class="info-box" style="margin-top:11px;">
            ℹ️ กติกาเงินสดย่อย — <b>เงินสดในกล่อง + บิลที่ยังไม่เคลียร์ = วงเงินเสมอ</b>
          </div>
        </div>

        ${home.isAccountant ? `
        <div class="sec-label">🧾 ฝ่ายบัญชี</div>
        <div class="card">
          <button class="btn btn-primary" onclick="doClear()" ${b.suggestTopUp > 0 ? '' : 'disabled'}>
            🧾 เคลียร์บิล — เติมกลับเป็น ${money(b.limit)}
          </button>
          <div class="hint" style="margin-top:7px;">
            ${b.suggestTopUp > 0
              ? 'ตอนนี้มี <b>' + money(b.cash) + '</b> · กดแล้วเติม <b>' + money(b.suggestTopUp) +
                '</b> บาท กลับเป็น <b>' + money(b.limit) + '</b> ทันที<br>กดได้ทุกเมื่อ ไม่ต้องรอให้เงินต่ำกว่าเส้นเตือน'
              : 'เงินเต็มวงเงินอยู่แล้ว ยังไม่มีบิลให้เคลียร์'}
          </div>
        </div>

        <div class="card">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div class="field" style="margin:0;"><label>วงเงินในกระเป๋า</label>
              <input type="number" id="cfgLimit" inputmode="decimal" step="1000" min="1" value="${b.limit}"></div>
            <div class="field" style="margin:0;"><label>เตือนเมื่อต่ำกว่า</label>
              <input type="number" id="cfgAlert" inputmode="decimal" step="1000" min="0" value="${b.lowAlert}"></div>
          </div>
          <button class="btn btn-secondary" onclick="doCfg()" style="margin-top:11px;">💾 บันทึกวงเงิน</button>
          <div class="hint" style="margin-top:7px;">
            เปลี่ยนวงเงินแล้วเงินในกล่อง<b>ยังเท่าเดิม</b> — ต้องกด "เคลียร์บิล" อีกทีถึงจะเติมให้เต็ม
          </div>
        </div>` : ''}

        ${home.canSeeAll ? `
        <a href="pc-msbc.html" class="card" style="display:flex;align-items:center;gap:11px;text-decoration:none;">
          <span class="ib ib-red">📋</span>
          <span style="flex:1;">
            <span style="display:block;font-size:14px;font-weight:700;color:var(--gray-800);">ตาราง MSBC</span>
            <span style="display:block;font-size:11.5px;color:var(--gray-500);">ก๊อปไปวางใน MSBC · โหลดเป็น Excel</span>
          </span>
          <span style="color:var(--gray-300);font-size:19px;">›</span>
        </a>` : ''}

        ${!home.isHolder ? `<div class="empty"><div class="icon-wrap">🔒</div>
          <div class="title">ดูได้อย่างเดียว</div>
          <div class="sub">นับเงินได้เฉพาะผู้ถือเงินสด (${b.holderName || f.HolderEmail})</div></div>` : `

        <div class="sec-label">⚖️ นับเงินตรวจสอบ</div>
        <div class="card">
          <div class="field">
            <label>นับเงินสดในกล่องได้เท่าไหร่ (บาท)</label>
            <input type="number" id="cntAmt" inputmode="decimal" step="0.01" min="0" placeholder="0.00">
            <div class="hint">ระบบบอกว่าควรมี <b>${money(b.cash)} บาท</b></div>
          </div>
          <div id="diffBox"></div>
          <div class="field" id="reasonWrap" style="display:none;">
            <label>สาเหตุที่ไม่ตรง *</label>
            <input type="text" id="cntReason" placeholder="เช่น ทอนเงินผิด / ลืมบันทึกค่าแท็กซี่">
          </div>
          <button class="btn btn-secondary" onclick="doCount()">⚖️ บันทึกผลการนับ</button>
          <div class="hint" style="margin-top:7px;">ถ้ายอดไม่ตรง ระบบจะสร้างรายการปรับปรุงและแจ้ง GM กับบัญชีอัตโนมัติ</div>
        </div>`}`;

      const cnt = document.getElementById('cntAmt');
      if (cnt) cnt.addEventListener('input', showDiff);
      renderBottomNav('pc-fund');
    }

    function showDiff() {
      const v = parseFloat(document.getElementById('cntAmt').value);
      const box = document.getElementById('diffBox');
      const wrap = document.getElementById('reasonWrap');
      if (isNaN(v)) { box.innerHTML = ''; wrap.style.display = 'none'; return; }
      const diff = Math.round((v - home.balance.cash) * 100) / 100;
      if (Math.abs(diff) < 0.01) {
        box.innerHTML = `<div class="ok-box">✅ ตรงกับระบบพอดี</div>`;
        wrap.style.display = 'none';
      } else {
        box.innerHTML = `<div class="card" style="background:var(--warn-bg);border:none;padding:11px 13px;margin:0 0 11px;">
          <b style="color:var(--gray-800);">${diff > 0 ? '💰 เงินเกิน' : '⚠️ เงินขาด'} ${money(Math.abs(diff))} บาท</b>
          <div style="font-size:11.5px;color:var(--gray-600);margin-top:3px;">
            ระบบ ${money(home.balance.cash)} · นับได้ ${money(v)}</div></div>`;
        wrap.style.display = 'block';
      }
    }

    /* 🧾 เคลียร์บิล — เติมเงินกลับให้เต็มวงเงินทันที */
    window.doClear = async function () {
      const b = home.balance;
      if (!(b.suggestTopUp > 0)) return showToast('เงินเต็มวงเงินอยู่แล้ว', 'error');
      if (!confirm('เคลียร์บิล ' + money(b.spentSinceTopUp) + ' บาท\n\n' +
                   'ตอนนี้มี ' + money(b.cash) + ' บาท\n' +
                   'จะเติม ' + money(b.suggestTopUp) + ' บาท\n' +
                   'หลังเคลียร์ = ' + money(b.limit) + ' บาท\n\nยืนยัน?')) return;
      showLoading('กำลังเคลียร์บิล...');
      try {
        const r = await clearPettyBills({ actorEmail: session.Email, fundId: (home.fund || {}).FundID || '' });
        hideLoading();
        if (r.error) throw new Error(r.error);
        showToast('เคลียร์บิลแล้ว — เงินกลับเป็น ' + money(r.after) + ' บาท ✅', 'success');
        setTimeout(load, 900);
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    /* บัญชีตั้งวงเงิน + เส้นเตือนเอง */
    window.doCfg = async function () {
      const limit = parseFloat(document.getElementById('cfgLimit').value);
      const alert = parseFloat(document.getElementById('cfgAlert').value);
      if (!(limit > 0)) return showToast('ใส่วงเงิน', 'error');
      if (!(alert >= 0)) return showToast('ใส่เส้นเตือน', 'error');
      if (alert >= limit) return showToast('เส้นเตือนต้องน้อยกว่าวงเงิน', 'error');
      showLoading('กำลังบันทึก...');
      try {
        const r = await setPettyFundConfig({
          actorEmail: session.Email, fundId: (home.fund || {}).FundID || '',
          limit: limit, lowAlert: alert
        });
        hideLoading();
        if (r.error) throw new Error(r.error);
        showToast(r.message || 'บันทึกแล้ว ✅', 'success');
        setTimeout(load, 900);
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };


    window.doCount = async function () {
      const counted = parseFloat(document.getElementById('cntAmt').value);
      if (isNaN(counted) || counted < 0) return showToast('ใส่ยอดที่นับได้', 'error');
      const reason = (document.getElementById('cntReason') || {}).value || '';
      showLoading('กำลังบันทึก...');
      try {
        const r = await submitPettyCount({ actorEmail: session.Email, counted: counted, reason: reason });
        hideLoading();
        if (r.error) throw new Error(r.error);
        if (r.needReason) { showToast(r.message, 'error'); return; }
        showToast(r.matched ? '✅ ยอดตรงกับระบบ' :
          'บันทึกส่วนต่าง ' + money(Math.abs(r.diff)) + ' บาทแล้ว', 'success');
        setTimeout(load, 900);
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    load();
  
if(typeof gauge==='function')window.gauge=gauge;
if(typeof load==='function')window.load=load;
if(typeof render==='function')window.render=render;
if(typeof showDiff==='function')window.showDiff=showDiff;
}}};
window.EXION_VIEWS["pc-home.html"]={html:"\n  <div class=\"header\">\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">\ud83d\udcb5 \u0e40\u0e07\u0e34\u0e19\u0e2a\u0e14\u0e22\u0e48\u0e2d\u0e22</span></h1>\n  </div>\n\n  <div class=\"container\">\n    <div id=\"content\" class=\"loading\"><div class=\"spinner\"></div></div>\n  </div>\n\n  \n  \n  \n  \n  \n  \n",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();
    setApp('petty');
    let home = null;

    const CAT_TH = {};
    const ST = {
      Pending:   { t: 'รออนุมัติ',   c: 'warn' },
      Approved:  { t: 'รอรับเงิน',   c: 'ok'   },
      Paid:      { t: 'จ่ายแล้ว',    c: 'ok'   },
      Rejected:  { t: 'ไม่อนุมัติ',  c: 'bad'  },
      Cancelled: { t: 'ยกเลิก',      c: ''     }
    };
    const money = n => Math.round(Number(n) || 0).toLocaleString();

    async function load() {
      try {
        const [h, cats] = await Promise.all([
          fetchPettyHome(session.Email),
          fetchPettyCategories().catch(() => [])
        ]);
        if (h.error) throw new Error(h.error);
        (Array.isArray(cats) ? cats : []).forEach(c => { CAT_TH[c.Code] = c.NameTH || c.Code; });
        home = h;
        render();
      } catch (err) { fail(err.message); }
    }

    function fail(msg) {
      const c = document.getElementById('content');
      c.classList.remove('loading');
      const notSetUp = /ยังไม่ได้ตั้งกล่องเงินสด/.test(msg);
      c.innerHTML = `<div class="empty"><div class="icon-wrap">${notSetUp ? '💰' : '⚠️'}</div>
        <div class="title">${notSetUp ? 'ยังไม่ได้เปิดใช้งาน' : 'โหลดไม่สำเร็จ'}</div>
        <div class="sub">${msg}</div>
        <a href="index.html" onclick="setApp('expense')" class="btn btn-secondary btn-sm"
           style="margin-top:16px;max-width:240px;text-decoration:none;">← กลับไป Exion Expense</a></div>`;
      renderBottomNav('pc-home');
    }

    function render() {
      const b = home.balance, f = home.fund;
      const pct = b.limit > 0 ? Math.max(0, Math.min(100, (b.cash / b.limit) * 100)) : 0;
      const c = document.getElementById('content');
      c.classList.remove('loading');

      c.innerHTML = `
        <div class="count-hero">
          <div class="lbl">${esc(f.Name)}${f.Branch ? ' · ' + f.Branch : ''}</div>
          <div class="num">${money(b.cash)}</div>
          <div class="sub">บาท · เงินสดในกล่อง</div>
          <div style="margin-top:12px;height:7px;border-radius:99px;background:rgba(255,255,255,.25);overflow:hidden;">
            <div style="height:100%;width:${pct.toFixed(1)}%;background:#fff;border-radius:99px;"></div>
          </div>
          <div class="sub" style="margin-top:7px;opacity:.9;">วงเงิน ${money(b.limit)} บาท · ${pct.toFixed(0)}%</div>
        </div>

        ${b.lowCash ? `<div class="card" style="border-left:4px solid var(--warn);">
          <div style="font-size:13px;font-weight:700;color:var(--gray-800);">⚠️ เงินสดเหลือน้อย</div>
          <div style="font-size:12px;color:var(--gray-500);margin-top:4px;">
            เหลือ ${money(b.cash)} บาท ต่ำกว่าเส้นเตือน ${money(b.lowAlert)} บาท —
            ${home.isAccountant ? 'ถึงเวลาเคลียร์บิล' : 'แจ้งฝ่ายบัญชีให้เคลียร์บิล'}</div>
          ${home.isAccountant ? `<a href="pc-fund.html" class="btn btn-primary btn-sm"
             style="margin-top:11px;max-width:220px;text-decoration:none;">🧾 ไปเคลียร์บิล</a>`
           : home.isHolder ? `<a href="pc-fund.html" class="btn btn-secondary btn-sm"
             style="margin-top:11px;max-width:200px;text-decoration:none;">💰 ดูกล่องเงิน</a>` : ''}
        </div>` : ''}

        <div class="kpi-grid">
          <div class="kpi ${b.reserved ? 'warn' : ''}"><div class="n">${money(b.reserved)}</div><div class="l">อนุมัติแล้ว รอจ่าย</div></div>
          <div class="kpi ok"><div class="n">${money(b.available)}</div><div class="l">ใช้ได้จริง</div></div>
          <div class="kpi ${b.pendingOut ? 'warn' : ''}"><div class="n">${money(b.pendingOut)}</div><div class="l">รออนุมัติ</div></div>
          <div class="kpi"><div class="n">${money(b.spentSinceTopUp)}</div><div class="l">บิลที่ยังไม่เคลียร์</div></div>
        </div>

        <div class="tiles">
          <a href="pc-request.html" class="tile">
            <div class="ib ib-red">${icon('plus')}</div>
            <div><div class="lb">ขอเบิกเงินสด</div><div class="sb">กรอกรายการ + แนบใบเสร็จ</div></div>
          </a>
          <a href="pc-list.html" class="tile">
            <div class="ib ib-blue">${icon('list')}</div>
            <div><div class="lb">รายการเคลื่อนไหว</div><div class="sb">${b.txCount} รายการทั้งหมด</div></div>
          </a>
          ${(home.toApprove || home.toPay) ? `
          <a href="pc-approve.html" class="tile">
            <div class="ib ib-orange">${icon('bell')}</div>
            <div><div class="lb">รอดำเนินการ</div>
              <div class="sb">${home.toApprove ? home.toApprove + ' รออนุมัติ' : ''}${home.toApprove && home.toPay ? ' · ' : ''}${home.toPay ? home.toPay + ' รอจ่ายเงิน' : ''}</div></div>
            <span class="cnt-badge">${home.toApprove + home.toPay}</span>
          </a>` : ''}
          ${home.isHolder ? `
          <a href="pc-fund.html" class="tile">
            <div class="ib ib-teal">💰</div>
            <div><div class="lb">กล่องเงินสด</div><div class="sb">เติมเงิน · นับเงินตรวจสอบ</div></div>
          </a>` : ''}
        </div>

        ${home.recent && home.recent.length ? `
        <div class="sec-label">รายการล่าสุด</div>
        <div class="card" style="padding:6px 0;">
          ${home.recent.map(rowHtml).join('')}
        </div>
        <a href="pc-list.html" class="btn btn-secondary btn-sm"
           style="margin-top:10px;text-decoration:none;">ดูทั้งหมด →</a>` : `
        <div class="empty"><div class="icon-wrap">📭</div>
          <div class="title">ยังไม่มีรายการเคลื่อนไหว</div>
          <a href="pc-request.html" class="btn btn-primary btn-sm"
             style="margin-top:14px;max-width:220px;text-decoration:none;">➕ ขอเบิกเงินสด</a></div>`}

        <div class="sec-label">ระบบอื่น</div>
        <div class="tiles">
          <a href="javascript:void(0)" onclick="goHomeOfApp('expense')" class="tile">
            <div class="ib ib-purple">🧾</div>
            <div><div class="lb">Exion Expense</div><div class="sb">เบิกค่าใช้จ่าย — ออกเงินก่อน เบิกคืนทีหลัง</div></div>
          </a>
        </div>`;
      renderBottomNav('pc-home');
    }

    function rowHtml(r) {
      const isIn = String(r.Type).toUpperCase() !== 'OUT';
      const st = ST[r.Status] || { t: r.Status, c: '' };
      const d = r.ExpenseDate ? new Date(r.ExpenseDate) : null;
      const day = d && !isNaN(d) ? d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }) : '-';
      return `
        <div style="display:flex;gap:11px;align-items:center;padding:11px 15px;border-bottom:1px solid var(--gray-100);">
          <span style="font-size:19px;line-height:1;">${isIn ? '📥' : '📤'}</span>
          <span style="flex:1;min-width:0;">
            <span style="display:block;font-size:13px;font-weight:700;color:var(--gray-800);
                  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(r.Purpose || CAT_TH[r.Category] || r.Category)}</span>
            <span style="display:block;font-size:11px;color:var(--gray-500);margin-top:2px;">
              ${day} · ${esc(r.RequesterName || '')}</span>
          </span>
          <span style="text-align:right;">
            <span style="display:block;font-size:14px;font-weight:800;color:${isIn ? 'var(--ok)' : 'var(--accent)'};">
              ${isIn ? '+' : '−'}${money(r.Amount)}</span>
            <span class="pill ${st.c}" style="font-size:11px;margin-top:2px;">${st.t}</span>
          </span>
        </div>`;
    }

    load();
  
if(typeof fail==='function')window.fail=fail;
if(typeof load==='function')window.load=load;
if(typeof render==='function')window.render=render;
if(typeof rowHtml==='function')window.rowHtml=rowHtml;
}}};
window.EXION_VIEWS["pc-list.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" aria-label=\"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a\" onclick=\"location.href='pc-home.html'\" id=\"backBtn\"></button>\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">\u0e23\u0e32\u0e22\u0e01\u0e32\u0e23\u0e40\u0e04\u0e25\u0e37\u0e48\u0e2d\u0e19\u0e44\u0e2b\u0e27</span></h1>\n  </div>\n\n  <div class=\"container\">\n    <div class=\"card\" id=\"filterCard\" style=\"display:none;\">\n      <div class=\"seg\" id=\"scopeSeg\">\n        <button type=\"button\" data-s=\"all\" class=\"on\">\u0e17\u0e31\u0e49\u0e07\u0e01\u0e25\u0e48\u0e2d\u0e07</button>\n        <button type=\"button\" data-s=\"mine\">\u0e02\u0e2d\u0e07\u0e09\u0e31\u0e19</button>\n      </div>\n      <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px;\">\n        <div class=\"field\" style=\"margin:0;\"><label>\u0e15\u0e31\u0e49\u0e07\u0e41\u0e15\u0e48</label><input type=\"date\" id=\"dFrom\"></div>\n        <div class=\"field\" style=\"margin:0;\"><label>\u0e16\u0e36\u0e07</label><input type=\"date\" id=\"dTo\"></div>\n      </div>\n      <div class=\"field\" style=\"margin:10px 0 0;\"><label>\u0e2a\u0e16\u0e32\u0e19\u0e30</label>\n        <select id=\"fStatus\">\n          <option value=\"\">\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14</option>\n          <option value=\"Pending\">\u0e23\u0e2d\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34</option>\n          <option value=\"Approved\">\u0e23\u0e2d\u0e23\u0e31\u0e1a\u0e40\u0e07\u0e34\u0e19</option>\n          <option value=\"Paid\">\u0e08\u0e48\u0e32\u0e22/\u0e23\u0e31\u0e1a\u0e41\u0e25\u0e49\u0e27</option>\n          <option value=\"Rejected\">\u0e44\u0e21\u0e48\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34</option>\n          <option value=\"Cancelled\">\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01</option>\n        </select>\n      </div>\n    </div>\n    <div id=\"content\" class=\"loading\"><div class=\"spinner\"></div></div>\n  </div>\n\n  \n  \n  \n  \n  \n  \n",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();
    setApp('petty');
    const bb = document.getElementById('backBtn');
    if (bb && typeof icon === 'function') bb.innerHTML = icon('back');

    let raw = null, scope = 'all';
    const CAT_TH = {};
    const ST = {
      Pending:   { t:'รออนุมัติ',  c:'warn' },
      Approved:  { t:'รอรับเงิน',  c:'ok'   },
      Paid:      { t:'จ่าย/รับแล้ว', c:'ok' },
      Rejected:  { t:'ไม่อนุมัติ', c:'bad'  },
      Cancelled: { t:'ยกเลิก',     c:''     }
    };
    const money = n => Math.round(Number(n) || 0).toLocaleString();
    const thDate = v => { const d = v ? new Date(v) : null;
      return d && !isNaN(d) ? d.toLocaleDateString('th-TH', { day:'numeric', month:'short', year:'2-digit' }) : '-'; };

    async function load() {
      try {
        const [d, cs] = await Promise.all([
          fetchPettyLedger(session.Email, '', scope),
          fetchPettyCategories().catch(() => [])
        ]);
        if (d.error) throw new Error(d.error);
        (Array.isArray(cs) ? cs : []).forEach(c => { CAT_TH[c.Code] = c.NameTH || c.Code; });
        raw = d;
        if (d.canSeeAll) document.getElementById('filterCard').style.display = 'block';
        render();
      } catch (err) {
        renderError('content', err.message, load);
        renderBottomNav('pc-list');
      }
    }

    document.getElementById('scopeSeg').querySelectorAll('button').forEach(b => {
      b.addEventListener('click', () => {
        document.getElementById('scopeSeg').querySelectorAll('button').forEach(x => x.classList.remove('on'));
        b.classList.add('on');
        scope = b.dataset.s;
        load();
      });
    });
    ['dFrom', 'dTo', 'fStatus'].forEach(id =>
      document.getElementById(id).addEventListener('change', render));

    function visible() {
      const from = document.getElementById('dFrom').value;
      const to = document.getElementById('dTo').value;
      const st = document.getElementById('fStatus').value;
      return (raw.items || []).filter(r => {
        if (st && r.Status !== st) return false;
        const d = new Date(r.ExpenseDate || r.Timestamp);
        if (isNaN(d)) return false;
        if (from && d < new Date(from + 'T00:00:00')) return false;
        if (to && d > new Date(to + 'T23:59:59')) return false;
        return true;
      });
    }

    function render() {
      const c = document.getElementById('content');
      c.classList.remove('loading');
      const items = visible();
      const b = raw.balance;

      // ยอดที่ขยับเงินจริงเท่านั้น (Paid) — Pending/Approved ยังไม่ออกจากกล่อง
      const paidOut = items.filter(r => r.Status === 'Paid' && String(r.Type).toUpperCase() === 'OUT')
                           .reduce((s, r) => s + (Number(r.Amount) || 0), 0);
      const paidIn = items.filter(r => r.Status === 'Paid' && String(r.Type).toUpperCase() !== 'OUT')
                          .reduce((s, r) => s + (Number(r.Amount) || 0), 0);

      let html = `
        <div class="kpi-grid">
          <div class="kpi"><div class="n">${items.length}</div><div class="l">รายการ</div></div>
          <div class="kpi bad"><div class="n">${money(paidOut)}</div><div class="l">จ่ายออก</div></div>
          <div class="kpi ok"><div class="n">${money(paidIn)}</div><div class="l">รับเข้า</div></div>
          <div class="kpi"><div class="n">${money(b.cash)}</div><div class="l">คงเหลือตอนนี้</div></div>
        </div>`;

      if (!items.length) {
        html += `<div class="empty"><div class="icon-wrap">🔍</div>
          <div class="title">ไม่พบรายการ</div>
          <a href="pc-request.html" class="btn btn-primary btn-sm"
             style="margin-top:14px;max-width:220px;text-decoration:none;">➕ ขอเบิกเงินสด</a></div>`;
        c.innerHTML = html;
        renderBottomNav('pc-list');
        return;
      }

      // จัดกลุ่มตามเดือน
      const byMonth = {};
      items.forEach(r => {
        const d = new Date(r.ExpenseDate || r.Timestamp);
        const k = isNaN(d) ? 'อื่นๆ' : d.toLocaleDateString('th-TH', { month:'long', year:'numeric' });
        (byMonth[k] = byMonth[k] || []).push(r);
      });
      Object.keys(byMonth).forEach(m => {
        const sum = byMonth[m].filter(r => r.Status === 'Paid' && String(r.Type).toUpperCase() === 'OUT')
                              .reduce((s, r) => s + (Number(r.Amount) || 0), 0);
        html += `<div style="display:flex;align-items:baseline;margin:16px 2px 8px;">
            <span class="sec-label" style="margin:0;flex:1;">${m}</span>
            <span style="font-size:12px;font-weight:700;color:var(--accent);">จ่ายออก ${money(sum)} ฿</span>
          </div>`;
        html += byMonth[m].map(card).join('');
      });
      c.innerHTML = html;
      renderBottomNav('pc-list');
    }

    function card(r) {
      const isIn = String(r.Type).toUpperCase() !== 'OUT';
      const isAdj = String(r.Type).toUpperCase() === 'ADJUST';
      const st = ST[r.Status] || { t: r.Status, c: '' };
      const mine = String(r.RequesterEmail || '').toLowerCase() === String(session.Email).toLowerCase();
      const canCancel = mine && (r.Status === 'Pending' || r.Status === 'Approved');
      const amt = Number(r.Amount) || 0;
      return `
        <div class="card" style="border-left:4px solid ${r.Status === 'Paid' ? 'var(--ok)'
            : r.Status === 'Rejected' ? 'var(--danger)' : 'var(--warn)'};">
          <div style="display:flex;align-items:flex-start;gap:10px;">
            <span style="font-size:19px;line-height:1.2;">${isAdj ? '⚖️' : isIn ? '📥' : '📤'}</span>
            <div style="flex:1;min-width:0;">
              <div style="font-size:13.5px;font-weight:800;color:var(--gray-800);">${esc(r.Purpose || CAT_TH[r.Category] || r.Category)}</div>
              <div style="font-size:11px;color:var(--gray-500);margin-top:3px;">
                ${thDate(r.ExpenseDate)} · ${esc(CAT_TH[r.Category] || r.Category)}
                ${r.Payee ? ' · ' + r.Payee : ''}</div>
              <div style="font-size:11px;color:var(--gray-400);margin-top:2px;">
                ${esc(r.RequesterName || '')}${r.OnBehalfBy ? ' (บันทึกโดย ' + String(r.OnBehalfBy).split('@')[0] + ')' : ''}</div>
              ${r.ApproverRemark ? `<div style="font-size:11px;color:var(--gray-500);margin-top:4px;">💬 ${esc(r.ApproverRemark)}</div>` : ''}
            </div>
            <div style="text-align:right;white-space:nowrap;">
              <div style="font-size:15px;font-weight:800;color:${amt < 0 ? 'var(--danger)' : isIn ? 'var(--ok)' : 'var(--accent)'};">
                ${amt < 0 ? '−' : isIn ? '+' : '−'}${money(Math.abs(amt))}</div>
              <span class="pill ${st.c}" style="font-size:11px;margin-top:3px;">${st.t}</span>
            </div>
          </div>
          ${canCancel ? `<button class="btn btn-secondary btn-sm" style="margin-top:9px;"
             onclick="doCancel('${esc(r.ID)}')">🗑 ยกเลิกรายการนี้</button>` : ''}
        </div>`;
    }

    window.doCancel = async function (id) {
      if (!confirm('ยกเลิกรายการนี้?')) return;
      showLoading('กำลังยกเลิก...');
      try {
        const r = await cancelPetty({ id, actorEmail: session.Email });
        hideLoading();
        if (r.error) throw new Error(r.error);
        showToast('ยกเลิกแล้ว', 'success');
        setTimeout(load, 600);
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    load();
  
if(typeof card==='function')window.card=card;
if(typeof load==='function')window.load=load;
if(typeof render==='function')window.render=render;
if(typeof visible==='function')window.visible=visible;
}}};
window.EXION_VIEWS["pc-msbc.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" aria-label=\"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a\" onclick=\"location.href='pc-home.html'\" id=\"backBtn\"></button>\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">\ud83d\udccb \u0e15\u0e32\u0e23\u0e32\u0e07 MSBC</span></h1>\n  </div>\n\n  <div class=\"container\">\n    <div id=\"gate\" class=\"loading\"><div class=\"spinner\"></div></div>\n\n    <div id=\"main\" style=\"display:none;\">\n      <div class=\"card\">\n        <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px;\">\n          <div class=\"field\" style=\"margin:0;\"><label>\u0e15\u0e31\u0e49\u0e07\u0e41\u0e15\u0e48</label><input type=\"date\" id=\"dFrom\"></div>\n          <div class=\"field\" style=\"margin:0;\"><label>\u0e16\u0e36\u0e07</label><input type=\"date\" id=\"dTo\"></div>\n        </div>\n        <label style=\"display:flex;align-items:center;gap:8px;margin-top:11px;font-size:13px;cursor:pointer;\">\n          <input type=\"checkbox\" id=\"incPending\" checked style=\"width:17px;height:17px;\">\n          \u0e23\u0e27\u0e21\u0e23\u0e32\u0e22\u0e01\u0e32\u0e23\u0e17\u0e35\u0e48\u0e22\u0e31\u0e07\u0e44\u0e21\u0e48\u0e08\u0e48\u0e32\u0e22 (Pending)\n        </label>\n        <div class=\"field\" style=\"margin:11px 0 0;\">\n          <label>\u0e2b\u0e31\u0e27\u0e23\u0e32\u0e22\u0e07\u0e32\u0e19 <span class=\"optional-tag\">\u0e41\u0e01\u0e49\u0e44\u0e14\u0e49</span></label>\n          <input type=\"text\" id=\"title\" placeholder=\"(F) Other Operation Expense #1 of SEP 2026\">\n        </div>\n        <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:11px;\">\n          <button class=\"btn btn-secondary btn-sm\" id=\"sinceBtn\" style=\"margin:0;display:none;\">\ud83e\uddfe \u0e15\u0e31\u0e49\u0e07\u0e41\u0e15\u0e48\u0e40\u0e04\u0e25\u0e35\u0e22\u0e23\u0e4c\u0e1a\u0e34\u0e25\u0e25\u0e48\u0e32\u0e2a\u0e38\u0e14</button>\n          <button class=\"btn btn-secondary btn-sm\" id=\"reloadBtn\" style=\"margin:0;\">\ud83d\udd04 \u0e14\u0e36\u0e07\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e43\u0e2b\u0e21\u0e48</button>\n        </div>\n      </div>\n\n      <div id=\"warnBox\"></div>\n\n      <div class=\"card\" style=\"padding:11px 13px;\">\n        <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:9px;\">\n          <button class=\"btn btn-primary btn-sm\" id=\"copyBtn\" style=\"margin:0;\">\ud83d\udccb \u0e01\u0e4a\u0e2d\u0e1b\u0e17\u0e31\u0e49\u0e07\u0e15\u0e32\u0e23\u0e32\u0e07</button>\n          <button class=\"btn btn-secondary btn-sm\" id=\"xlsBtn\" style=\"margin:0;\">\ud83d\udce5 \u0e42\u0e2b\u0e25\u0e14 Excel</button>\n        </div>\n        <label style=\"display:flex;align-items:center;gap:8px;margin-top:10px;font-size:12.5px;cursor:pointer;color:var(--gray-600);\">\n          <input type=\"checkbox\" id=\"withHead\" style=\"width:16px;height:16px;\">\n          \u0e01\u0e4a\u0e2d\u0e1b\u0e2b\u0e31\u0e27\u0e04\u0e2d\u0e25\u0e31\u0e21\u0e19\u0e4c\u0e21\u0e32\u0e14\u0e49\u0e27\u0e22\n        </label>\n        <div class=\"hint\" style=\"margin-top:6px;\">\n          \u0e04\u0e25\u0e34\u0e01\u0e0a\u0e48\u0e2d\u0e07\u0e44\u0e2b\u0e19\u0e01\u0e47\u0e1e\u0e34\u0e21\u0e1e\u0e4c\u0e41\u0e01\u0e49\u0e44\u0e14\u0e49 \u00b7 \u0e01\u0e14 \u2715 \u0e17\u0e49\u0e32\u0e22\u0e41\u0e16\u0e27\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e15\u0e31\u0e14\u0e2d\u0e2d\u0e01 \u00b7 \u0e22\u0e2d\u0e14\u0e2a\u0e23\u0e38\u0e1b\u0e04\u0e34\u0e14\u0e15\u0e32\u0e21\u0e17\u0e35\u0e48\u0e41\u0e01\u0e49\u0e25\u0e48\u0e32\u0e2a\u0e38\u0e14\n        </div>\n      </div>\n\n      <div class=\"sec-label\">\u0e15\u0e32\u0e23\u0e32\u0e07 <span id=\"cnt\" style=\"color:var(--gray-400);font-weight:600;\"></span></div>\n      <div class=\"msbc-wrap\"><table class=\"msbc\" id=\"tbl\"></table></div>\n\n      <div class=\"sec-label\">\u0e2a\u0e23\u0e38\u0e1b</div>\n      <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:11px;\">\n        <div class=\"card\" style=\"padding:11px 4px;\"><table class=\"mini\" id=\"mDept\"></table></div>\n        <div class=\"card\" style=\"padding:11px 4px;\"><table class=\"mini\" id=\"mStat\"></table></div>\n      </div>\n      <div class=\"card\"><table class=\"mini\" id=\"mBal\"></table></div>\n    </div>\n  </div>\n\n  \n  \n  \n  \n  \n  \n",css:"\n    /* \u0e15\u0e49\u0e2d\u0e07\u0e08\u0e33\u0e01\u0e31\u0e14\u0e04\u0e27\u0e32\u0e21\u0e2a\u0e39\u0e07 \u0e2b\u0e31\u0e27\u0e15\u0e32\u0e23\u0e32\u0e07\u0e17\u0e35\u0e48\u0e15\u0e31\u0e49\u0e07 sticky \u0e44\u0e27\u0e49\u0e16\u0e36\u0e07\u0e08\u0e30\u0e04\u0e49\u0e32\u0e07\u0e08\u0e23\u0e34\u0e07\u0e15\u0e2d\u0e19\u0e40\u0e25\u0e37\u0e48\u0e2d\u0e19 */\n    .msbc-wrap { overflow: auto; max-height: 68vh; -webkit-overflow-scrolling: touch;\n                 border: 1px solid var(--gray-200); border-radius: 10px; background: #fff; }\n    table.msbc { border-collapse: collapse; font-size: 12px; min-width: 1080px; width: 100%; }\n    table.msbc th { background: #D9D9D9; font-weight: 700; padding: 7px 8px; text-align: center;\n                    white-space: nowrap; border: 1px solid #bbb; position: sticky; top: 0; z-index: 2; }\n    table.msbc td { padding: 5px 8px; border: 1px solid #ddd; vertical-align: top; }\n    table.msbc td[contenteditable]:focus { outline: 2px solid var(--accent); background: #fff8f8; }\n    table.msbc tr:nth-child(even) td { background: #fafafa; }\n    table.msbc tr:nth-child(even) td[contenteditable]:focus { background: #fff8f8; }\n    .c-no    { width: 34px;  text-align: center; color: var(--gray-500); }\n    .c-amt   { width: 92px;  text-align: right; white-space: nowrap; }\n    .c-dep   { width: 74px;  text-align: center; }\n    .c-date  { width: 92px;  text-align: center; white-space: nowrap; }\n    .c-del   { width: 44px;  text-align: center; padding: 0 !important; }\n    .c-del button { width: 100%; min-height: 40px; border: 0; background: none; cursor: pointer;\n                    color: var(--gray-400); font-size: 14px; font-family: inherit; border-radius: 8px; }\n    .c-del button:hover { color: var(--danger); background: var(--warn-bg); }\n    .warnDept { background: #FFF3CD !important; box-shadow: inset 0 0 0 1px #E0A800; }\n    table.msbc select { border: none; background: transparent; font: inherit; width: 100%; }\n    .tfoot td { font-weight: 800; background: #f0f0f0 !important; }\n    .mini { border-collapse: collapse; font-size: 12.5px; width: 100%; }\n    .mini td { padding: 5px 9px; border-bottom: 1px solid var(--gray-100); }\n    .mini td:last-child { text-align: right; font-variant-numeric: tabular-nums; }\n    .mini tr:last-child td { font-weight: 800; border-bottom: none; border-top: 2px solid var(--gray-200); }\n  ",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();
    setApp('petty');
    const bb = document.getElementById('backBtn');
    if (bb && typeof icon === 'function') bb.innerHTML = icon('back');

    /* ลำดับคอลัมน์ต้องตรงกับไฟล์ที่บัญชีใช้เป๊ะ ไม่งั้นวางแล้วเลื่อน */
    const COLS = [
      { k:'supplier',       h:'Suppliers',        cls:'' },
      { k:'description',    h:'Description',      cls:'' },
      { k:'amount',         h:'Amount',           cls:'c-amt' },
      { k:'department',     h:'Department',       cls:'c-dep' },
      { k:'preparedBy',     h:'Prepared By',      cls:'' },
      { k:'status',         h:'Status',           cls:'c-dep' },
      { k:'paymentDate',    h:'Payment date',     cls:'c-date' },
      { k:'processingDate', h:'Processing Date',  cls:'c-date' },
      { k:'dueDate',        h:'Payment due date', cls:'c-date' },
      { k:'remark',         h:'Remark',           cls:'' }
    ];

    let rows = [], meta = null;
    const money = n => (Math.round((Number(n) || 0) * 100) / 100)
                        .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const num = v => Number(String(v == null ? 0 : v).replace(/,/g, '')) || 0;
    /* ตัด tab/ขึ้นบรรทัดออก ไม่งั้นวางใน Excel แล้วช่องแตก */
    const flat = s => String(s == null ? '' : s).replace(/[\t\r\n]+/g, ' ').trim();

    function ymd(d) {
      const p = n => String(n).padStart(2, '0');
      return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
    }

    async function load() {
      const g = document.getElementById('gate');
      document.getElementById('main').style.display = 'none';
      g.style.display = 'block'; g.className = 'loading';
      g.innerHTML = '<div class="spinner"></div>';
      try {
        const d = await fetchPettyMSBC(session.Email, {
          dateFrom: document.getElementById('dFrom').value,
          dateTo:   document.getElementById('dTo').value,
          includePending: document.getElementById('incPending').checked
        });
        if (d.error) throw new Error(d.error);
        meta = d;
        rows = (d.items || []).slice();
        const t = document.getElementById('title');
        if (!t.value) t.value = d.titleSuggest || '';
        /* ทางลัด: บิลที่ยังไม่เคลียร์ = ตั้งแต่วันเคลียร์ล่าสุดถึงวันนี้ */
        const since = (d.live || {}).lastTopUpAt || '';
        document.getElementById('sinceBtn').style.display = since ? 'block' : 'none';
        document.getElementById('sinceBtn').dataset.since = since;
        g.style.display = 'none';
        document.getElementById('main').style.display = 'block';
        renderWarn(); renderTable(); renderSums();
        renderBottomNav('pc-fund');
      } catch (err) {
        g.classList.remove('loading');
        g.innerHTML = '<div class="empty"><div class="icon-wrap">⚠️</div>' +
          '<div class="title">เปิดไม่ได้</div><div class="sub">' + esc(err.message) + '</div>' +
          '<a href="pc-home.html" class="btn btn-secondary btn-sm" style="margin-top:14px;max-width:200px;text-decoration:none;">← กลับ</a></div>';
        renderBottomNav('pc-fund');
      }
    }

    function renderWarn() {
      const u = (meta && meta.unmapped) || [];
      document.getElementById('warnBox').innerHTML = !u.length ? '' :
        '<div class="card" style="background:var(--warn-bg);border:none;padding:11px 13px;">' +
        '<b style="color:var(--gray-800);">⚠️ แผนกที่ยังไม่มีรหัส MSBC</b>' +
        '<div style="font-size:12px;color:var(--gray-600);margin-top:4px;line-height:1.6;">' +
        u.map(esc).join(' · ') + '<br>ตอนนี้ใส่ชื่อเดิมลงไปก่อน — เพิ่มในชีท <b>Settings</b> ' +
        'คีย์ <code>PETTY_DEPT_MAP</code> เช่น <code>Sales=VS, Service=CS</code></div></div>';
    }

    function renderTable() {
      let h = '<thead><tr><th class="c-no">No.</th>' +
              COLS.map(c => '<th>' + c.h + '</th>').join('') + '<th class="c-del"></th></tr></thead><tbody>';
      rows.forEach((r, i) => {
        h += '<tr data-i="' + i + '"><td class="c-no">' + (i + 1) + '</td>';
        COLS.forEach(c => {
          if (c.k === 'status') {
            h += '<td class="' + c.cls + '"><select data-i="' + i + '" data-k="status">' +
                 ['Paid', 'Pending'].map(s =>
                   '<option' + (r.status === s ? ' selected' : '') + '>' + s + '</option>').join('') +
                 '</select></td>';
          } else {
            const v = c.k === 'amount' ? money(r.amount) : (r[c.k] || '');
            const bad = c.k === 'department' && r.deptUnmapped ? ' warnDept' : '';
            h += '<td class="' + c.cls + bad + '" contenteditable="true" data-i="' + i +
                 '" data-k="' + c.k + '">' + esc(v) + '</td>';
          }
        });
        h += '<td class="c-del"><button type="button" data-del="' + i +
               '" aria-label="ตัดแถวที่ ' + (i + 1) + ' ออก" title="ตัดแถวนี้ออก">✕</button></td></tr>';
      });
      h += '</tbody>';
      document.getElementById('tbl').innerHTML = h;
      document.getElementById('cnt').textContent = rows.length + ' รายการ';
    }

    /* แก้ในช่อง → เก็บกลับเข้าตัวแปรทันที ปุ่มก๊อป/โหลดจะได้ค่าล่าสุดเสมอ */
    document.getElementById('tbl').addEventListener('input', e => {
      const td = e.target.closest('[data-k]');
      if (!td || td.tagName === 'SELECT') return;
      const i = +td.dataset.i, k = td.dataset.k;
      if (!rows[i]) return;
      rows[i][k] = k === 'amount' ? num(td.textContent) : td.textContent;
      if (k === 'department') { rows[i].deptUnmapped = false; td.classList.remove('warnDept'); }
      if (k === 'amount') renderSums();
    });
    document.getElementById('tbl').addEventListener('change', e => {
      if (e.target.tagName !== 'SELECT') return;
      const i = +e.target.dataset.i;
      if (rows[i]) { rows[i].status = e.target.value; renderSums(); }
    });
    /* Enter ในช่องแก้ = จบการแก้ ไม่ใช่ขึ้นบรรทัดใหม่ (ขึ้นบรรทัดแล้ววางใน Excel ช่องแตก) */
    document.getElementById('tbl').addEventListener('keydown', e => {
      if (e.key === 'Enter' && e.target.hasAttribute('contenteditable')) { e.preventDefault(); e.target.blur(); }
    });
    document.getElementById('tbl').addEventListener('click', e => {
      const d = e.target.closest('[data-del]');
      if (!d) return;
      rows.splice(+d.dataset.del, 1);
      renderTable(); renderSums();
    });

    function renderSums() {
      const byDept = {}, byStat = { Paid: 0, Pending: 0 };
      let total = 0;
      rows.forEach(r => {
        const a = num(r.amount);
        const k = String(r.department || '').trim() || '(ไม่ระบุ)';
        byDept[k] = (byDept[k] || 0) + a;
        byStat[r.status === 'Paid' ? 'Paid' : 'Pending'] += a;
        total += a;
      });
      document.getElementById('mDept').innerHTML =
        '<tr><td><b>Department</b></td><td><b>Amount</b></td></tr>' +
        Object.keys(byDept).sort().map(k =>
          '<tr><td>' + esc(k) + '</td><td>' + money(byDept[k]) + '</td></tr>').join('') +
        '<tr><td>TOTAL</td><td>' + money(total) + '</td></tr>';
      document.getElementById('mStat').innerHTML =
        '<tr><td><b>Status</b></td><td><b>Amount</b></td></tr>' +
        '<tr><td>Paid</td><td>' + money(byStat.Paid) + '</td></tr>' +
        '<tr><td>Pending</td><td>' + money(byStat.Pending) + '</td></tr>' +
        '<tr><td>TOTAL</td><td>' + money(total) + '</td></tr>';
      const limit = (meta && meta.topUp) || 0;
      document.getElementById('mBal').innerHTML =
        '<tr><td>Petty Cash Account - Top Up to meet</td><td>' + money(limit) + '</td></tr>' +
        '<tr><td>Operation Expense</td><td>' + money(total) + '</td></tr>' +
        '<tr><td>Balance</td><td>' + money(limit - total) + '</td></tr>';
      document.getElementById('cnt').textContent = rows.length + ' รายการ · ' + money(total) + ' ฿';
    }

    function buildTSV() {
      const out = [];
      if (document.getElementById('withHead').checked) {
        out.push(['No.'].concat(COLS.map(c => c.h)).join('\t'));
      }
      rows.forEach((r, i) => {
        out.push([i + 1].concat(COLS.map(c =>
          c.k === 'amount' ? num(r.amount).toFixed(2) : flat(r[c.k])
        )).join('\t'));
      });
      return out.join('\n');
    }

    document.getElementById('copyBtn').addEventListener('click', async () => {
      if (!rows.length) return showToast('ไม่มีรายการให้ก๊อป', 'error');
      const tsv = buildTSV();
      try {
        await navigator.clipboard.writeText(tsv);
        showToast('ก๊อป ' + rows.length + ' แถวแล้ว — ไปวางใน MSBC ได้เลย', 'success');
      } catch (e) {
        /* บางเบราว์เซอร์/หน้าที่ไม่ใช่ https ใช้ clipboard API ไม่ได้ — ถอยไปวิธีเดิม */
        let ok = false;
        if (typeof document.execCommand === 'function') {
          const ta = document.createElement('textarea');
          ta.value = tsv;
          ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
          document.body.appendChild(ta);
          ta.select();
          try { ok = document.execCommand('copy'); } catch (e2) { ok = false; }
          document.body.removeChild(ta);
        }
        showToast(ok ? 'ก๊อป ' + rows.length + ' แถวแล้ว' : 'ก๊อปไม่สำเร็จ — ลากคลุมตารางแล้วกด Ctrl+C',
                  ok ? 'success' : 'error');
      }
    });

    document.getElementById('xlsBtn').addEventListener('click', async () => {
      if (!rows.length) return showToast('ไม่มีรายการให้โหลด', 'error');
      const btn = document.getElementById('xlsBtn');
      btn.disabled = true; btn.textContent = '⏳ กำลังสร้างไฟล์...';
      try {
        const r = await exportPettyMSBC({
          requesterEmail: session.Email,
          fundId: (meta.fund || {}).FundID || '',
          title: document.getElementById('title').value,
          rows: rows.map(x => ({
            supplier: x.supplier, description: x.description, amount: num(x.amount),
            department: x.department, preparedBy: x.preparedBy, status: x.status,
            paymentDate: x.paymentDate, processingDate: x.processingDate,
            dueDate: x.dueDate, remark: x.remark
          }))
        });
        if (r.error) throw new Error(r.error);
        if (!r.base64) throw new Error('ไม่มีข้อมูลไฟล์');
        const bytes = atob(r.base64);
        const arr = new Uint8Array(bytes.length);
        for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
        const blob = new Blob([arr], { type: r.mimeType ||
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = r.filename || 'msbc.xlsx';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 4000);
        showToast('โหลดไฟล์แล้ว ✅', 'success');
      } catch (err) {
        showToast(err.message, 'error');
      } finally {
        btn.disabled = false; btn.textContent = '📥 โหลด Excel';
      }
    });

    document.getElementById('reloadBtn').addEventListener('click', load);
    document.getElementById('sinceBtn').addEventListener('click', e => {
      const s = e.currentTarget.dataset.since;
      if (!s) return;
      document.getElementById('dFrom').value = s;
      document.getElementById('dTo').value = ymd(new Date());
      load();
    });
    ['dFrom', 'dTo', 'incPending'].forEach(id =>
      document.getElementById(id).addEventListener('change', load));

    // ค่าเริ่มต้น = เดือนนี้
    const now = new Date();
    document.getElementById('dFrom').value = ymd(new Date(now.getFullYear(), now.getMonth(), 1));
    document.getElementById('dTo').value = ymd(now);
    load();
  
if(typeof buildTSV==='function')window.buildTSV=buildTSV;
if(typeof load==='function')window.load=load;
if(typeof renderSums==='function')window.renderSums=renderSums;
if(typeof renderTable==='function')window.renderTable=renderTable;
if(typeof renderWarn==='function')window.renderWarn=renderWarn;
if(typeof ymd==='function')window.ymd=ymd;
}}};
window.EXION_VIEWS["pc-request.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" aria-label=\"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a\" onclick=\"location.href='pc-home.html'\" id=\"backBtn\"></button>\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">\u0e02\u0e2d\u0e40\u0e1a\u0e34\u0e01\u0e40\u0e07\u0e34\u0e19\u0e2a\u0e14</span></h1>\n  </div>\n\n  <div class=\"container\">\n    <div id=\"loading\" class=\"loading\"><div class=\"spinner\"></div></div>\n    <div id=\"main\" style=\"display:none;\">\n      <div id=\"balBox\"></div>\n      <div id=\"behalfBox\"></div>\n      <div id=\"items\"></div>\n      <button class=\"add-item-btn\" id=\"addBtn\" type=\"button\">\u2795 \u0e40\u0e1e\u0e34\u0e48\u0e21\u0e23\u0e32\u0e22\u0e01\u0e32\u0e23</button>\n      <div id=\"sumBox\"></div>\n      <button class=\"btn btn-primary\" id=\"submitBtn\" style=\"margin-top:14px;\">\u2705 \u0e2a\u0e48\u0e07\u0e02\u0e2d\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34</button>\n    </div>\n  </div>\n\n  \n  \n  \n  \n  \n  \n",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();
    setApp('petty');
    const bb = document.getElementById('backBtn');
    if (bb && typeof icon === 'function') bb.innerHTML = icon('back');

    let cats = [], home = null, items = [], seq = 0, team = [];
    let currentBatchId = null;   // 🔁 กันเน็ตหลุดแล้วยิงซ้ำ
    const money = n => Math.round(Number(n) || 0).toLocaleString();
    const catOf = code => cats.find(c => String(c.Code) === String(code)) || null;

    async function init() {
      try {
        const [h, cs] = await Promise.all([fetchPettyHome(session.Email), fetchPettyCategories()]);
        if (h.error) throw new Error(h.error);
        home = h; cats = Array.isArray(cs) ? cs : [];
        if (!cats.length) throw new Error('ยังไม่ได้ตั้งประเภทค่าใช้จ่ายเงินสดย่อย');

        // ผู้ถือเงินบันทึกแทนคนอื่นได้
        if (home.isHolder || home.canSeeAll) {
          try {
            const t = await apiGet('getAllRequests', { email: session.Email }).catch(() => []);
            const names = {};
            (Array.isArray(t) ? t : []).forEach(r => {
              if (r.StaffEmail && r.StaffName) names[String(r.StaffEmail).toLowerCase()] = r.StaffName;
            });
            team = Object.keys(names).map(e => ({ email: e, name: names[e] })).sort((a, b) => a.name.localeCompare(b.name, 'th'));
          } catch (e) { team = []; }
        }
        document.getElementById('loading').style.display = 'none';
        document.getElementById('main').style.display = 'block';
        renderBal(); renderBehalf(); addItem();
        document.getElementById('addBtn').addEventListener('click', addItem);
        document.getElementById('submitBtn').addEventListener('click', onSubmit);
        renderBottomNav('pc-new');
      } catch (err) {
        const l = document.getElementById('loading');
        l.classList.remove('loading');
        l.innerHTML = `<div class="empty"><div class="icon-wrap">⚠️</div><div class="title">เปิดไม่ได้</div>
          <div class="sub">${esc(err.message)}</div>
          <a href="pc-home.html" class="btn btn-secondary btn-sm" style="margin-top:14px;max-width:200px;text-decoration:none;">← กลับ</a></div>`;
        renderBottomNav('pc-new');
      }
    }

    function renderBal() {
      const b = home.balance;
      document.getElementById('balBox').innerHTML = `
        <div class="card" style="padding:13px 15px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:22px;">💰</span>
            <span style="flex:1;">
              <span style="display:block;font-size:11.5px;color:var(--gray-500);">เงินที่เบิกได้ตอนนี้</span>
              <span style="display:block;font-size:19px;font-weight:800;color:var(--gray-800);">${money(b.available)} บาท</span>
            </span>
            <span style="text-align:right;font-size:11px;color:var(--gray-400);line-height:1.5;">
              ในกล่อง ${money(b.cash)}<br>${home.maxPerRequest
                ? 'ครั้งละไม่เกิน ' + money(home.maxPerRequest) : 'กันไว้ ' + money(b.reserved)}
            </span>
          </div>
        </div>`;
    }

    function renderBehalf() {
      if (!team.length) return;
      document.getElementById('behalfBox').innerHTML = `
        <div class="card">
          <div class="field" style="margin:0;">
            <label>บันทึกแทนใคร <span class="optional-tag">ผู้ถือเงินเท่านั้น</span></label>
            <select id="onBehalf">
              <option value="">— ตัวเอง (${esc(session.Name)}) —</option>
              ${team.filter(t => t.email !== String(session.Email).toLowerCase())
                    .map(t => `<option value="${esc(t.email)}">${esc(t.name)}</option>`).join('')}
            </select>
            <div class="hint">เลือกเมื่อพนักงานมาขอเงินสดที่โต๊ะ แล้วคุณกรอกให้</div>
          </div>
        </div>`;
    }

    function addItem() {
      syncDom();
      seq++;
      const prev = items.length ? items[items.length - 1] : null;
      const it = { id: 'it_' + seq, category: '', expenseDate: prev ? prev.expenseDate : todayYMD(),
                   payee: '', purpose: '', amount: 0, note: '', receipts: [] };
      items.push(it);
      renderItems();
    }
    window.removeItem = function (id) {
      syncDom();
      if (items.length <= 1) return showToast('ต้องมีอย่างน้อย 1 รายการ', 'error');
      items = items.filter(x => x.id !== id);
      renderItems();
    };

    function syncDom() {
      items.forEach(it => {
        const g = k => document.getElementById(it.id + '_' + k);
        if (g('cat')) it.category = g('cat').value;
        if (g('date')) it.expenseDate = g('date').value;
        if (g('payee')) it.payee = g('payee').value;
        if (g('purpose')) it.purpose = g('purpose').value;
        if (g('amount')) it.amount = parseFloat(g('amount').value) || 0;
        if (g('note')) it.note = g('note').value;
      });
    }

    function renderItems() {
      document.getElementById('items').innerHTML = items.map((it, i) => {
        const cat = catOf(it.category);
        const rule = cat ? String(cat.NeedReceipt || '').toUpperCase() : '';
        const cap = cat ? Number(cat.MaxAmount) || 0 : 0;
        return `
        <div class="card">
          <div class="card-head">
            <span class="ib ib-red">${i + 1}</span>
            <div><div class="ch-title">รายการที่ ${i + 1}</div>
              <div class="ch-sub">${cat ? (cat.NameTH || cat.Code) : 'เลือกประเภทก่อน'}</div></div>
            ${items.length > 1 ? `<button type="button" class="btn btn-secondary btn-sm"
               onclick="removeItem('${esc(it.id)}')" style="margin-left:auto;max-width:52px;">🗑</button>` : ''}
          </div>

          <div class="field"><label>ประเภท *</label>
            <select id="${esc(it.id)}_cat">
              <option value="">— เลือก —</option>
              ${cats.map(c => `<option value="${c.Code}" ${c.Code === it.category ? 'selected' : ''}>${c.NameTH || c.Code}</option>`).join('')}
            </select>
            ${cap ? `<div class="hint">เพดาน ${money(cap)} บาทต่อรายการ · เกินกว่านี้ให้เบิกผ่าน Exion Expense</div>` : ''}
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div class="field" style="margin:0;"><label>วันที่ *</label>
              <input type="date" id="${esc(it.id)}_date" value="${esc(it.expenseDate)}" max="${todayYMD()}"></div>
            <div class="field" style="margin:0;"><label>จำนวนเงิน (บาท) *</label>
              <input type="number" id="${esc(it.id)}_amount" inputmode="decimal" step="0.01" min="0"
                     value="${esc(it.amount || '')}" placeholder="0.00"></div>
          </div>

          <div class="field"><label>จ่ายค่าอะไร *</label>
            <input type="text" id="${esc(it.id)}_purpose" value="${esc(it.purpose)}" placeholder="เช่น ซื้อกระดาษ A4 5 รีม"></div>

          <div class="field"><label>จ่ายให้ใคร / ร้าน <span class="optional-tag">ไม่บังคับ</span></label>
            <input type="text" id="${esc(it.id)}_payee" value="${esc(it.payee)}" placeholder="เช่น ออฟฟิศเมท สาขาพระราม 9"></div>

          ${rule !== 'NO' && rule !== '' ? `
          <div class="field"><label>ใบเสร็จ ${rule === 'YES' ? '*' : '<span class="optional-tag">แนบก็ได้</span>'}</label>
            <label class="upload-area" for="${esc(it.id)}_files">
              <div class="icon-wrap">📎</div>
              <div class="text">แตะเพื่อแนบไฟล์</div>
              <div class="sub">ภาพ / PDF · แนบได้หลายไฟล์</div>
            </label>
            <input type="file" id="${esc(it.id)}_files" accept="image/*,application/pdf" multiple style="display:none;">
            <div id="${esc(it.id)}_chips" class="chips"></div>
          </div>` : ''}
        </div>`;
      }).join('');

      items.forEach(it => {
        const cat = document.getElementById(it.id + '_cat');
        if (cat) cat.addEventListener('change', () => { syncDom(); renderItems(); });
        const amt = document.getElementById(it.id + '_amount');
        if (amt) amt.addEventListener('input', () => { syncDom(); renderSum(); });
        const files = document.getElementById(it.id + '_files');
        if (files) files.addEventListener('change', e => onFiles(it, e.target.files));
        drawChips(it);
      });
      renderSum();
    }

    async function onFiles(it, fileList) {
      syncDom();
      for (const f of Array.from(fileList || [])) {
        if (f.size > 5 * 1024 * 1024) { showToast(f.name + ' ใหญ่เกิน 5 MB', 'error'); continue; }
        try {
          const base64 = await readAsDataURL(f);
          it.receipts.push({ name: f.name, base64: base64 });
        } catch (e) { showToast('อ่านไฟล์ไม่ได้: ' + f.name, 'error'); }
      }
      drawChips(it);
    }
    function readAsDataURL(file) {
      return new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result);
        r.onerror = rej;
        r.readAsDataURL(file);
      });
    }
    window.dropFile = function (itemId, idx) {
      const it = items.find(x => x.id === itemId);
      if (!it) return;
      it.receipts.splice(idx, 1);
      drawChips(it);
    };
    function drawChips(it) {
      const box = document.getElementById(it.id + '_chips');
      if (!box) return;
      box.innerHTML = it.receipts.map((f, i) =>
        `<span class="file-chip">📄 ${String(f.name).slice(0, 22)}
           <button type="button" onclick="dropFile('${esc(it.id)}',${i})">✕</button></span>`).join('');
    }

    function renderSum() {
      const total = items.reduce((s, x) => s + (Number(x.amount) || 0), 0);
      const avail = home.balance.available;
      const cap = Number(home.maxPerRequest) || 0;
      /* เตือนตั้งแต่ตอนกรอก ไม่ใช่กรอกครบแล้วกดส่งค่อยเด้งกลับ */
      const overCap = cap > 0 && total > cap;
      const over = total > avail || overCap;
      document.getElementById('sumBox').innerHTML = `
        <div class="card" style="margin-top:12px;${over ? 'border-left:4px solid var(--danger);' : ''}">
          <div style="display:flex;align-items:center;">
            <span style="flex:1;font-size:13px;color:var(--gray-500);">รวม ${items.length} รายการ</span>
            <span style="font-size:21px;font-weight:800;color:${over ? 'var(--danger)' : 'var(--accent)'};">${money(total)} บาท</span>
          </div>
          ${overCap ? `<div style="font-size:12px;color:var(--danger);margin-top:7px;font-weight:600;">
            ⚠️ เบิกได้ครั้งละไม่เกิน ${money(cap)} บาท — แยกส่งหลายครั้ง หรือเบิกผ่าน Exion Expense</div>` : ''}
          ${total > avail ? `<div style="font-size:12px;color:var(--danger);margin-top:7px;font-weight:600;">
            ⚠️ เกินเงินที่เบิกได้ (${money(avail)} บาท) — ให้ฝ่ายบัญชีเคลียร์บิลก่อน</div>` : ''}
        </div>`;
    }

    async function onSubmit() {
      syncDom();
      for (let i = 0; i < items.length; i++) {
        const it = items[i], n = 'รายการที่ ' + (i + 1) + ': ';
        const cat = catOf(it.category);
        if (!cat) return showToast(n + 'เลือกประเภทก่อน', 'error');
        if (!it.expenseDate) return showToast(n + 'ใส่วันที่', 'error');
        if (!(Number(it.amount) > 0)) return showToast(n + 'ใส่จำนวนเงิน', 'error');
        if (!String(it.purpose || '').trim()) return showToast(n + 'ใส่ว่าจ่ายค่าอะไร', 'error');
        const cap = Number(cat.MaxAmount) || 0;
        if (cap && Number(it.amount) > cap)
          return showToast(n + (cat.NameTH || cat.Code) + ' เกินเพดาน ' + money(cap) + ' บาท', 'error');
        if (String(cat.NeedReceipt || '').toUpperCase() === 'YES' && !it.receipts.length)
          return showToast(n + 'ต้องแนบใบเสร็จ', 'error');
      }
      const total = items.reduce((s, x) => s + (Number(x.amount) || 0), 0);
      const capNow = Number(home.maxPerRequest) || 0;
      if (capNow > 0 && total > capNow)
        return showToast('เบิกได้ครั้งละไม่เกิน ' + money(capNow) + ' บาท', 'error');
      if (total > home.balance.available)
        return showToast('เกินเงินที่เบิกได้ (' + money(home.balance.available) + ' บาท)', 'error');

      const behalf = (document.getElementById('onBehalf') || {}).value || '';
      const who = behalf ? (team.find(t => t.email === behalf) || {}).name : session.Name;
      if (!confirm('ขอเบิกเงินสด ' + money(total) + ' บาท\n' + items.length + ' รายการ · ให้ ' + who + '\n\nยืนยันส่งขออนุมัติ?')) return;

      const btn = document.getElementById('submitBtn');
      btn.disabled = true;
      showLoading('กำลังส่ง...');
      if (!currentBatchId) currentBatchId = 'PCB-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
      try {
        const r = await submitPetty({
          actorEmail: session.Email,
          requesterEmail: behalf || session.Email,
          batchId: currentBatchId,
          items: items.map(it => ({
            category: it.category, expenseDate: it.expenseDate, amount: it.amount,
            payee: it.payee, purpose: it.purpose, note: it.note, receipts: it.receipts
          }))
        });
        hideLoading();
        if (r.error) throw new Error(r.error);
        currentBatchId = null;   // ส่งสำเร็จ รอบหน้าได้รหัสใหม่
        showToast('ส่งขออนุมัติแล้ว ' + (r.items || []).length + ' รายการ ✅', 'success');
        setTimeout(() => location.href = 'pc-list.html', 1300);
      } catch (err) {
        // ⚠️ ไม่ล้างรหัสชุด — กดส่งใหม่จะใช้รหัสเดิม ไม่เกิดรายการซ้ำ
        hideLoading();
        showToast(err.message, 'error');
        btn.disabled = false;
      }
    }

    init();
  
if(typeof addItem==='function')window.addItem=addItem;
if(typeof drawChips==='function')window.drawChips=drawChips;
if(typeof init==='function')window.init=init;
if(typeof onFiles==='function')window.onFiles=onFiles;
if(typeof onSubmit==='function')window.onSubmit=onSubmit;
if(typeof readAsDataURL==='function')window.readAsDataURL=readAsDataURL;
if(typeof renderBal==='function')window.renderBal=renderBal;
if(typeof renderBehalf==='function')window.renderBehalf=renderBehalf;
if(typeof renderItems==='function')window.renderItems=renderItems;
if(typeof renderSum==='function')window.renderSum=renderSum;
if(typeof syncDom==='function')window.syncDom=syncDom;
}}};
window.EXION_VIEWS["periods.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" aria-label=\"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a\" onclick=\"location.href = getApp() === 'petty' ? 'pc-home.html' : 'index.html'\" id=\"backBtn\"></button>\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">\u0e23\u0e2d\u0e1a\u0e40\u0e1a\u0e34\u0e01\u0e41\u0e25\u0e30\u0e01\u0e32\u0e23\u0e08\u0e48\u0e32\u0e22\u0e40\u0e07\u0e34\u0e19</span></h1>\n  </div>\n\n  <div class=\"container\">    <!-- Monthly Export -->\n    <div class=\"card\">\n      <div class=\"card-head\"><span class=\"ib ib-green\">\ud83d\udcca</span>\n        <div><div class=\"ch-title\">Export \u0e43\u0e1a\u0e40\u0e1a\u0e34\u0e01\u0e23\u0e32\u0e22\u0e40\u0e14\u0e37\u0e2d\u0e19</div>\n        <div class=\"ch-sub\">\u0e02\u0e2d\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34 1 \u0e04\u0e23\u0e31\u0e49\u0e07 \u0e41\u0e25\u0e49\u0e27\u0e14\u0e32\u0e27\u0e19\u0e4c\u0e42\u0e2b\u0e25\u0e14 Excel \u0e15\u0e31\u0e27\u0e08\u0e23\u0e34\u0e07\u0e44\u0e14\u0e49\u0e40\u0e25\u0e22</div></div>\n      </div>\n      <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px;\">\n        <div class=\"field\" style=\"margin:0;\"><label>\u0e40\u0e14\u0e37\u0e2d\u0e19</label><select id=\"exportMonth\"></select></div>\n        <div class=\"field\" style=\"margin:0;\"><label>\u0e1b\u0e35</label><select id=\"exportYear\"></select></div>\n      </div>\n      <div id=\"cutoffWrap\" style=\"margin-top:12px;display:none;\">\n        <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px;\">\n          <div class=\"field\" style=\"margin:0;\"><label>\u0e15\u0e31\u0e49\u0e07\u0e41\u0e15\u0e48\u0e27\u0e31\u0e19\u0e17\u0e35\u0e48</label><input type=\"date\" id=\"cutoffStart\"></div>\n          <div class=\"field\" style=\"margin:0;\"><label>\u0e16\u0e36\u0e07\u0e27\u0e31\u0e19\u0e17\u0e35\u0e48</label><input type=\"date\" id=\"cutoffEnd\"></div>\n        </div>\n        <div class=\"hint\" id=\"cutoffHint\" style=\"margin-top:6px;\">\u2014</div>\n        <div id=\"cutoffWarn\" style=\"margin-top:8px;\"></div>\n      </div>\n      <div id=\"exportStatusBox\" style=\"margin-top:14px;\"><div class=\"loading\" style=\"padding:20px;\"><div class=\"spinner\"></div></div></div>\n      <div id=\"exportActions\" style=\"display:grid;gap:9px;margin-top:12px;\"></div>\n    </div>\n\n<div id=\"paymentHistory\" class=\"card\"><h3>\u0e2a\u0e16\u0e32\u0e19\u0e30\u0e23\u0e2d\u0e1a\u0e40\u0e1a\u0e34\u0e01</h3><div id=\"paymentRows\" class=\"subtle\">\u0e01\u0e33\u0e25\u0e31\u0e07\u0e42\u0e2b\u0e25\u0e14...</div></div></div>\n  \n  \n  \n  \n  \n  \n",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();
    let myExports = [], sigPad = null;
    const MONTHS = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];

    function init() {
      const bb = document.getElementById('backBtn');
      if (bb && typeof icon === 'function') bb.innerHTML = icon('back');
      if (document.getElementById('avatar')) {
      document.getElementById('avatar').textContent = (session.Name||'?').trim().charAt(0).toUpperCase();
      document.getElementById('userName').textContent = session.Name || '-';
      document.getElementById('userPosition').textContent = session.Position || '-';
      document.getElementById('userEmail').textContent = session.Email || '-';
      document.getElementById('userDept').textContent = session.Department || '-';

      }
      const logoutBtn=document.getElementById('logoutBtn'); if(logoutBtn)logoutBtn.onclick=logout;
      if(!document.getElementById('exportMonth')) return;
      const mSel = document.getElementById('exportMonth'), ySel = document.getElementById('exportYear');
      const now = new Date();
      MONTHS.forEach((m,i) => { const o=document.createElement('option'); o.value=i+1; o.textContent=m; if(i+1===now.getMonth()+1) o.selected=true; mSel.appendChild(o); });
      for (let y = now.getFullYear(); y >= now.getFullYear()-3; y--) { const o=document.createElement('option'); o.value=y; o.textContent=y; if(y===now.getFullYear()) o.selected=true; ySel.appendChild(o); }
      mSel.addEventListener('change', refreshExportStatus);
      ySel.addEventListener('change', refreshExportStatus);

    }

    async function loadMyExports() {
      try { const r = await apiGet('getMyExportRequests', { email: session.Email }); myExports = Array.isArray(r) ? r : []; }
      catch { myExports = []; }
      refreshExportStatus();
    }

    // 📅 v6.3 เลือกช่วงรอบเองได้ทั้งวันเริ่มและวันจบ — ทับหรือเว้นแค่เตือน ไม่บล็อก
    let periodInfo = null;
    async function loadPeriodInfo() {
      const year = parseInt(document.getElementById('exportYear').value);
      const month = parseInt(document.getElementById('exportMonth').value);
      const wrap = document.getElementById('cutoffWrap');
      const sIn = document.getElementById('cutoffStart');
      const eIn = document.getElementById('cutoffEnd');
      const hint = document.getElementById('cutoffHint');
      try {
        periodInfo = await apiGet('getPeriodInfo', { email: session.Email, year, month });
        if (!periodInfo || periodInfo.error) throw new Error('n/a');
        sIn.value = periodInfo.expectedStart;
        sIn.max = periodInfo.maxEnd;
        eIn.max = periodInfo.maxEnd;
        eIn.value = periodInfo.suggestedEnd;
        hint.innerHTML = (periodInfo.hasSettled
            ? `รอบก่อนปิดถึง <b>${periodInfo.lastSettledTH}</b> — ระบบแนะนำให้เริ่ม ${periodInfo.expectedStartTH}`
            : `ยังไม่เคยปิดรอบ — เริ่มจากบิลเก่าสุดที่มี (${periodInfo.expectedStartTH})`) +
          `<br>วันตัดยอดตามค่ากลางคือ${periodInfo.cutoffLabel} · เลือกเองได้ทั้งสองช่อง`;
        sIn.oninput = checkPeriodRange;
        eIn.oninput = checkPeriodRange;
        checkPeriodRange();
        wrap.style.display = 'block';
      } catch { wrap.style.display = 'none'; periodInfo = null; }
    }

    // เตือนแบบสดๆ ถ้าทับรอบก่อนหรือมีวันหาย — คำนวณฝั่งหน้าเว็บ ไม่ต้องยิง server
    function periodWarnings(startStr, endStr) {
      const w = [];
      if (!periodInfo || !startStr || !endStr) return w;
      const day = 86400000;
      const s = new Date(startStr), e = new Date(endStr);
      const exp = new Date(periodInfo.expectedStart);
      if (e < s) { w.push('❌ วันจบอยู่ก่อนวันเริ่ม'); return w; }
      if (periodInfo.hasSettled && s < exp) {
        w.push(`⚠️ ทับกับรอบก่อน ${Math.round((exp - s)/day)} วัน — ช่วงนั้นเบิกไปแล้ว อาจได้เงินซ้ำ`);
      } else if (s > exp) {
        w.push(`⚠️ มีวันหาย ${Math.round((s - exp)/day)} วัน — บิลช่วง ${fmtTH(periodInfo.expectedStart)} ถึง ${fmtTH(new Date(s - day))} จะไม่อยู่ในรอบไหนเลย`);
      }
      return w;
    }

    function fmtTH(v) {
      const d = new Date(v);
      return isNaN(d) ? '-' : d.toLocaleDateString('th-TH', { day:'numeric', month:'short', year:'numeric' });
    }

    function checkPeriodRange() {
      const box = document.getElementById('cutoffWarn');
      if (!box) return;
      const w = periodWarnings(document.getElementById('cutoffStart').value,
                               document.getElementById('cutoffEnd').value);
      box.innerHTML = w.length
        ? w.map(x => `<div class="warn-box" style="margin:0 0 6px;font-size:12.5px;">${x}</div>`).join('')
        : '';
    }

    function refreshExportStatus() {
      const year = parseInt(document.getElementById('exportYear').value);
      const month = parseInt(document.getElementById('exportMonth').value);
      const ex = myExports.find(x => Number(x.Year)===year && Number(x.Month)===month);
      const box = document.getElementById('exportStatusBox');
      const act = document.getElementById('exportActions');
      const cw = document.getElementById('cutoffWrap');

      // เลือกวันตัดได้เฉพาะตอนที่ยังไม่ได้ขอ (หรือถูกปฏิเสธมา)
      const canPickCutoff = !ex || ex.OverallStatus === 'Rejected';
      if (canPickCutoff) loadPeriodInfo(); else cw.style.display = 'none';

      if (!ex || ex.OverallStatus === 'Rejected') {
        box.innerHTML = ex
          ? `<div class="bad-box"><b>❌ ไม่อนุมัติ</b><br><span style="font-weight:400;">${ex.GMRemark || ex.ManagerRemark || ex.SeniorRemark || 'ไม่ได้ระบุเหตุผล'}</span></div>`
          : `<div class="info-box">📋 ยังไม่ได้ขออนุมัติสำหรับ <b>${MONTHS[month-1]} ${year}</b></div>`;
        act.innerHTML = `
          <button class="btn btn-primary" onclick="requestApproval()">✅ ขออนุมัติเพื่อ Export</button>
          <button class="btn btn-secondary" onclick="downloadDraft()">👀 ดูตัวอย่างก่อน (ยังใช้เบิกไม่ได้)</button>`;

      } else if (ex.OverallStatus === 'Approved') {
        // ✨ v6.0 ปิดลูป — บอกด้วยว่าบัญชีจ่ายเงินแล้วหรือยัง
        const paid = !!ex.PaidAt;
        box.innerHTML = `
          <div class="ok-box"><b>✅ อนุมัติแล้ว</b><br>
            <span style="font-weight:400;">${ex.ItemCount} รายการ · ${Number(ex.TotalAmount||0).toLocaleString()} บาท</span>
            ${periodTxt(ex)}</div>
          ${paid
            ? `<div class="ok-box" style="background:#ECFDF5;border-color:#6EE7B7;">
                 💵 <b>บัญชีโอนเงินแล้ว</b><br>
                 <span style="font-weight:400;font-size:12px;">${new Date(ex.PaidAt).toLocaleDateString('th-TH',{day:'numeric',month:'long',year:'numeric'})}</span>
               </div>`
            : `<div class="info-box" style="margin-bottom:0;">⏳ รอฝ่ายบัญชีโอนเงิน</div>`}`;
        act.innerHTML = `
          <button class="btn btn-primary" onclick="downloadFinal('${ex.ID}')">📥 ดาวน์โหลด Excel ตัวจริง</button>
          <button class="btn btn-secondary" onclick="downloadDraft()">👀 ดูตัวอย่าง</button>`;

      } else {
        const who = String(ex.GMEmail || ex.SeniorEmail || ex.ManagerEmail || '').split('@')[0];
        box.innerHTML = `<div class="warn-box"><b>⏳ รออนุมัติ</b><br>
          <span style="font-weight:400;font-size:12.5px;">อยู่ที่ ${who || 'ผู้อนุมัติ'} · ${ex.ItemCount} รายการ · ${Number(ex.TotalAmount||0).toLocaleString()} บาท</span>
          ${periodTxt(ex)}</div>`;
        act.innerHTML = `<button class="btn btn-secondary" onclick="downloadDraft()">👀 ดูตัวอย่างก่อน (ยังใช้เบิกไม่ได้)</button>`;
      }
    }

    // แสดงช่วงวันของรอบใต้กล่องสถานะ
    function periodTxt(ex) {
      if (!ex || !ex.PeriodStart || !ex.PeriodEnd) return '';
      const f = s => new Date(s).toLocaleDateString('th-TH', { day:'numeric', month:'short', year:'2-digit' });
      return `<br><span style="font-weight:400;font-size:11.5px;opacity:.8;">📅 รอบ ${f(ex.PeriodStart)} – ${f(ex.PeriodEnd)}</span>`;
    }

    window.requestApproval = async () => {
      const year = parseInt(document.getElementById('exportYear').value);
      const month = parseInt(document.getElementById('exportMonth').value);
      const periodStart = (document.getElementById('cutoffStart') || {}).value || '';
      const periodEnd   = (document.getElementById('cutoffEnd') || {}).value || '';

      if (periodStart && periodEnd) {
        if (new Date(periodEnd) < new Date(periodStart)) return showToast('วันจบอยู่ก่อนวันเริ่ม', 'error');
        const w = periodWarnings(periodStart, periodEnd);
        let msg = `ส่งรอบ ${fmtTH(periodStart)} – ${fmtTH(periodEnd)}\n\n`;
        if (w.length) msg += w.join('\n') + '\n\nยืนยันส่งทั้งที่มีคำเตือน?';
        else msg += 'รายการหลังจากวันนี้จะไปอยู่รอบถัดไป\nยืนยันส่งขออนุมัติ?';
        if (!confirm(msg)) return;
      }

      showLoading('กำลังส่งคำขอ...');
      try {
        const r = await apiPost('requestExportApproval', {
          staffEmail: session.Email, year, month, periodStart, periodEnd, requesterEmail: session.Email
        });
        hideLoading();
        if (r.error) throw new Error(r.error);
        showToast(r.auto
          ? '✅ ผ่านอัตโนมัติ — ดาวน์โหลด Excel ได้เลย'
          : 'ส่งคำขอแล้ว รออนุมัติ ✅', 'success');
        await loadMyExports();
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    window.downloadDraft = async () => {
      const year = parseInt(document.getElementById('exportYear').value);
      const month = parseInt(document.getElementById('exportMonth').value);
      showLoading('กำลังสร้างตัวอย่าง...');
      try {
        // ส่งช่วงวันที่เพิ่งเลือกไปด้วย ไม่งั้นตัวอย่างจะใช้เดือนปฏิทินแทน
        const periodStart = (document.getElementById('cutoffStart') || {}).value || '';
        const periodEnd   = (document.getElementById('cutoffEnd') || {}).value || '';
        const r = await apiPost('downloadDraftExport', {
          staffEmail: session.Email, year, month, periodStart, periodEnd, requesterEmail: session.Email });
        hideLoading();
        if (r.error) throw new Error(r.error);
        dl(r);
        showToast(`ตัวอย่าง ${esc(r.periodLabel || '')} · ${esc(r.itemCount)} รายการ · ${Number(r.totalAmount||0).toLocaleString()} บาท`, 'success');
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    window.downloadFinal = async (exportId) => {
      showLoading('กำลังดาวน์โหลด...');
      try {
        const r = await apiPost('downloadFinalExport', { exportId, requesterEmail: session.Email });
        hideLoading();
        if (r.error) throw new Error(r.error);
        dl(r);
        if (r.drift) {
          alert('⚠️ ตัวเลขเปลี่ยนไปหลังจากได้รับอนุมัติ\n\n' +
            'ตอนอนุมัติ: ' + r.drift.approvedCount + ' รายการ · ' + Number(r.drift.approvedTotal).toLocaleString() + ' บาท\n' +
            'ตอนนี้: ' + r.drift.currentCount + ' รายการ · ' + Number(r.drift.currentTotal).toLocaleString() + ' บาท\n\n' +
            'กรุณาตรวจสอบกับหัวหน้าก่อนส่งบัญชี');
        }
        showToast('ดาวน์โหลดสำเร็จ ✅', 'success');
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    function dl(result) {
      if (!result.base64) throw new Error('ไม่มีข้อมูลไฟล์');
      const bytes = atob(result.base64);
      const arr = new Uint8Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
      const blob = new Blob([arr], { type: result.mimeType || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = result.filename || 'export.xlsx';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    }

    // ── Signature pad ──
    async function initSignature() {
      const canvas = document.getElementById('sigCanvas');
      if (!canvas) return;
      try {
        const r = await getMySignature(session.Email);
        if (r && r.hasSignature && r.dataUrl) {
          document.getElementById('currentSig').src = r.dataUrl;
          document.getElementById('currentSigWrap').style.display = 'block';
        }
      } catch {}
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.strokeStyle = '#0F172A'; ctx.lineWidth = 2.5;
      let drawing = false, empty = true;
      const ph = document.getElementById('sigPlaceholder');
      const pos = e => { const r = canvas.getBoundingClientRect(); return { x:(e.touches?e.touches[0].clientX:e.clientX)-r.left, y:(e.touches?e.touches[0].clientY:e.clientY)-r.top }; };
      const start = e => { drawing = true; const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x,p.y); e.preventDefault(); };
      const draw = e => { if(!drawing) return; const p = pos(e); ctx.lineTo(p.x,p.y); ctx.stroke(); empty=false; ph.style.display='none'; e.preventDefault(); };
      const end = () => drawing = false;
      canvas.addEventListener('mousedown',start); canvas.addEventListener('mousemove',draw);
      canvas.addEventListener('mouseup',end); canvas.addEventListener('mouseout',end);
      canvas.addEventListener('touchstart',start,{passive:false}); canvas.addEventListener('touchmove',draw,{passive:false}); canvas.addEventListener('touchend',end);
      sigPad = {
        isEmpty: () => empty,
        clear: () => { ctx.clearRect(0,0,canvas.width,canvas.height); empty=true; ph.style.display='block'; },
        toDataURL: () => canvas.toDataURL('image/png')
      };
      document.getElementById('clearSigBtn').addEventListener('click', () => sigPad.clear());
      document.getElementById('saveSigBtn').addEventListener('click', onSaveSignature);
      document.getElementById('sigUpload').addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2*1024*1024) return showToast('ไฟล์ใหญ่เกิน 2 MB', 'error');
        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            sigPad.clear();
            const W = canvas.getBoundingClientRect().width, H = 150;
            const ratio = Math.min(W/img.width, H/img.height);
            const w = img.width*ratio, h = img.height*ratio;
            ctx.drawImage(img, (W-w)/2, (H-h)/2, w, h);
            empty = false; ph.style.display = 'none';
            showToast('โหลดรูปแล้ว — กด "บันทึกลายเซ็น"', 'success');
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(file);
        e.target.value = '';
      });
    }

    async function onSaveSignature() {
      if (!sigPad || sigPad.isEmpty()) return showToast('กรุณาเซ็นหรืออัปโหลดก่อน', 'error');
      const base64 = sigPad.toDataURL();
      showLoading('กำลังบันทึกลายเซ็น...');
      try {
        const r = await saveSignature(session.Email, base64);
        hideLoading();
        if (r && r.error) throw new Error(r.error);
        showToast('บันทึกลายเซ็นสำเร็จ ✅', 'success');
        document.getElementById('currentSig').src = base64;
        document.getElementById('currentSigWrap').style.display = 'block';
        sigPad.clear();
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    }

    if (session) { init(); renderBottomNav(document.getElementById('exportMonth')?'periods':'profile'); if(document.getElementById('exportMonth'))loadMyExports(); if(document.getElementById('sigCanvas'))initSignature(); }

;
(async()=>{const s=getSession();if(!s)return;const el=document.getElementById('paymentRows');try{const rows=await apiGet('getMyExportRequests',{email:s.Email});el.innerHTML=rows.length?rows.map(r=>`<div class="review-row"><div>${esc(r.Year)} / ${esc(r.Month)}<small>${esc(r.ID)} · ${esc(toYMD(r.PeriodStart))} – ${esc(toYMD(r.PeriodEnd))}</small></div><div>${statusBadge(r.PaidAt||r.PaymentStatus==='Paid'||r.Paid===true?'Paid':r.OverallStatus)}<small>${r.PaidAt?'จ่ายเมื่อ '+esc(formatDate(r.PaidAt)):r.OverallStatus==='Approved'?'อนุมัติเอกสารแล้ว · รอการบันทึกจ่าย':''}</small></div></div>`).join(''):emptyState('ยังไม่มีรอบเบิก','เลือกรอบด้านบนเพื่อเตรียมเอกสารเบิกครั้งแรก');}catch(e){renderError(el,e.message,()=>location.reload());}})();
(async()=>{
 const s=getSession();if(!s||!(s.isAccountant||s.isGM))return;
 const section=document.createElement('section');section.className='card';section.id='financePayments';document.querySelector('.container').prepend(section);
 async function load(){section.innerHTML='<h3>สำหรับบัญชี · รอบเบิกรอจ่าย</h3><div class="subtle">กำลังโหลด...</div>';try{const rows=await fetchUnpaidExports(s.Email);section.innerHTML='<h3>สำหรับบัญชี · รอบเบิกรอจ่าย</h3><p class="subtle">บันทึกหลังโอนเงินเรียบร้อยแล้วเท่านั้น</p>'+ (rows.length?rows.map(r=>`<div class="review-row"><div>${esc(r.StaffName)}<small>${esc(r.ID)} · ${esc(r.Month)}/${esc(r.Year)}</small></div><div>${formatCurrency(r.TotalAmount)} บาท<br><button class="btn btn-secondary btn-sm" data-pay="${esc(r.ID)}" style="margin-top:7px">บันทึกว่าจ่ายแล้ว</button></div></div>`).join(''):emptyState('ไม่มีรอบเบิกรอจ่าย','รายการจะปรากฏหลังอนุมัติเอกสารเบิกแล้ว'));
 section.querySelectorAll('[data-pay]').forEach(b=>b.onclick=async()=>{const r=rows.find(x=>x.ID===b.dataset.pay);if(!await confirmDialog('ยืนยันว่าจ่ายเงินแล้ว?',r.StaffName+' · '+formatCurrency(r.TotalAmount)+' บาท\nบันทึกเมื่อโอนเงินจริงเรียบร้อยแล้ว','บันทึกการจ่าย'))return;b.disabled=true;try{await markExportPaid(s.Email,r.ID);showToast('บันทึกการจ่ายเงินเรียบร้อย','success');await load();}catch(e){showToast(e.message,'error');b.disabled=false;}});
 }catch(e){renderError(section,e.message,load);}}
 await load();
})();

if(typeof checkPeriodRange==='function')window.checkPeriodRange=checkPeriodRange;
if(typeof dl==='function')window.dl=dl;
if(typeof fmtTH==='function')window.fmtTH=fmtTH;
if(typeof init==='function')window.init=init;
if(typeof initSignature==='function')window.initSignature=initSignature;
if(typeof load==='function')window.load=load;
if(typeof loadMyExports==='function')window.loadMyExports=loadMyExports;
if(typeof loadPeriodInfo==='function')window.loadPeriodInfo=loadPeriodInfo;
if(typeof onSaveSignature==='function')window.onSaveSignature=onSaveSignature;
if(typeof periodTxt==='function')window.periodTxt=periodTxt;
if(typeof periodWarnings==='function')window.periodWarnings=periodWarnings;
if(typeof refreshExportStatus==='function')window.refreshExportStatus=refreshExportStatus;
}}};
window.EXION_VIEWS["pre-approve.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" aria-label=\"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a\" onclick=\"location.href='index.html'\" id=\"backBtn\"></button>\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">\u0e02\u0e2d Pre-Approve</span></h1>\n  </div>\n\n  <div class=\"container\">\n    <div class=\"hero\" style=\"background:linear-gradient(135deg,#F59E0B,#D97706);\">\n      <div class=\"hero-name\" style=\"font-size:20px;\">\ud83d\udccb \u0e02\u0e2d\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34\u0e07\u0e1a\u0e25\u0e48\u0e27\u0e07\u0e2b\u0e19\u0e49\u0e32</div>\n      <div class=\"hero-sub\" style=\"line-height:1.6;\">\n        \u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a <b>\u0e04\u0e48\u0e32\u0e23\u0e31\u0e1a\u0e23\u0e2d\u0e07</b> \u0e41\u0e25\u0e30 <b>\u0e01\u0e2d\u0e25\u0e4c\u0e1f</b> \u0e40\u0e17\u0e48\u0e32\u0e19\u0e31\u0e49\u0e19<br>\n        \u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34\u0e41\u0e25\u0e49\u0e27 \u2192 \u0e43\u0e0a\u0e49\u0e44\u0e14\u0e49\u0e20\u0e32\u0e22\u0e43\u0e19 <b>30 \u0e27\u0e31\u0e19</b> \u2192 \u0e01\u0e25\u0e31\u0e1a\u0e21\u0e32\u0e2a\u0e48\u0e07\u0e43\u0e1a\u0e40\u0e2a\u0e23\u0e47\u0e08\u0e17\u0e35\u0e48\u0e2b\u0e19\u0e49\u0e32 \u201cPre-Approve \u0e02\u0e2d\u0e07\u0e09\u0e31\u0e19\u201d\n      </div>\n    </div>\n\n    <div class=\"card\">\n      <div class=\"sec-label\" style=\"margin:0 0 12px;\">\u0e23\u0e32\u0e22\u0e25\u0e30\u0e40\u0e2d\u0e35\u0e22\u0e14\u0e01\u0e32\u0e23\u0e19\u0e31\u0e14</div>\n\n      <div class=\"field\">\n        <label>\u0e1b\u0e23\u0e30\u0e40\u0e20\u0e17 <span class=\"required\">*</span></label>\n        <select id=\"category\">\n          <option value=\"\">\u2014 \u0e40\u0e25\u0e37\u0e2d\u0e01\u0e1b\u0e23\u0e30\u0e40\u0e20\u0e17 \u2014</option>\n          <option value=\"ENT\">\ud83c\udf7d \u0e04\u0e48\u0e32\u0e23\u0e31\u0e1a\u0e23\u0e2d\u0e07\u0e25\u0e39\u0e01\u0e04\u0e49\u0e32 \u2014 Entertainment</option>\n          <option value=\"GOLF\">\u26f3 \u0e04\u0e48\u0e32\u0e23\u0e31\u0e1a\u0e23\u0e2d\u0e07 (\u0e01\u0e2d\u0e25\u0e4c\u0e1f) \u2014 Golf</option>\n        </select>\n      </div>\n\n      <div class=\"field\">\n        <label>\u0e27\u0e31\u0e19\u0e17\u0e35\u0e48\u0e19\u0e31\u0e14 / \u0e27\u0e32\u0e07\u0e41\u0e1c\u0e19 <span class=\"required\">*</span></label>\n        <input type=\"date\" id=\"expenseDate\">\n      </div>\n\n      <div class=\"field\">\n        <label>\u0e2a\u0e16\u0e32\u0e19\u0e17\u0e35\u0e48 <span class=\"required\">*</span></label>\n        <input type=\"text\" id=\"venue\" placeholder=\"\u0e0a\u0e37\u0e48\u0e2d\u0e23\u0e49\u0e32\u0e19 / \u0e2a\u0e19\u0e32\u0e21\u0e01\u0e2d\u0e25\u0e4c\u0e1f\">\n      </div>\n    </div>\n\n    <div class=\"card\">\n      <div class=\"sec-label\" style=\"margin:0 0 12px;\">\u0e1d\u0e48\u0e32\u0e22\u0e17\u0e35\u0e48\u0e23\u0e31\u0e1a\u0e23\u0e2d\u0e07</div>\n\n      <div class=\"field\">\n        <label>\u0e1b\u0e23\u0e30\u0e40\u0e20\u0e17 <span class=\"required\">*</span></label>\n        <div class=\"seg\" id=\"custTypeSeg\">\n          <button type=\"button\" data-v=\"Customer\">\ud83d\udc64 Customer</button>\n          <button type=\"button\" data-v=\"Principle\">\ud83c\udfe2 Principle</button>\n          <button type=\"button\" data-v=\"Other Customer\">\ud83d\udc65 Other Cust.</button>\n          <button type=\"button\" data-v=\"Other Principle\">\ud83c\udfdb Other Prin.</button>\n        </div>\n        <input type=\"hidden\" id=\"customerType\">\n      </div>\n\n      <div class=\"field\">\n        <label>\u0e0a\u0e37\u0e48\u0e2d\u0e25\u0e39\u0e01\u0e04\u0e49\u0e32 / Principle <span class=\"required\">*</span></label>\n        <input type=\"text\" id=\"customer\" placeholder=\"\u0e0a\u0e37\u0e48\u0e2d\u0e1a\u0e23\u0e34\u0e29\u0e31\u0e17\" list=\"customerList\">\n      </div>\n\n      <div class=\"field\">\n        <label>\u0e1c\u0e39\u0e49\u0e15\u0e34\u0e14\u0e15\u0e48\u0e2d</label>\n        <input type=\"text\" id=\"customerContact\" placeholder=\"\u0e0a\u0e37\u0e48\u0e2d \u0e15\u0e33\u0e41\u0e2b\u0e19\u0e48\u0e07\">\n      </div>\n\n      <div class=\"field\">\n        <label>\u0e40\u0e25\u0e02 Job <span class=\"optional-tag\">\u0e44\u0e21\u0e48\u0e1a\u0e31\u0e07\u0e04\u0e31\u0e1a</span></label>\n        <input type=\"text\" id=\"jobNo\" placeholder=\"\u0e40\u0e0a\u0e48\u0e19 J2026-0142\">\n      </div>\n\n      <div class=\"field\">\n        <label>\u0e42\u0e2d\u0e01\u0e32\u0e2a / \u0e27\u0e31\u0e15\u0e16\u0e38\u0e1b\u0e23\u0e30\u0e2a\u0e07\u0e04\u0e4c <span class=\"required\">*</span></label>\n        <textarea id=\"occasion\" rows=\"3\" placeholder=\"\u0e40\u0e0a\u0e48\u0e19 \u0e1e\u0e1a\u0e40\u0e1e\u0e37\u0e48\u0e2d Demo \u0e42\u0e04\u0e23\u0e07\u0e01\u0e32\u0e23 Q3\"></textarea>\n      </div>\n\n      <div class=\"field\" style=\"margin-bottom:0;\">\n        <label>\u0e1c\u0e39\u0e49\u0e23\u0e48\u0e27\u0e21 (\u0e04\u0e32\u0e14\u0e01\u0e32\u0e23\u0e13\u0e4c)</label>\n        <textarea id=\"attendees\" rows=\"2\" placeholder=\"\u0e23\u0e30\u0e1a\u0e38\u0e0a\u0e37\u0e48\u0e2d + \u0e1a\u0e23\u0e34\u0e29\u0e31\u0e17\"></textarea>\n      </div>\n    </div>\n\n    <div class=\"card budget-card\">\n      <div class=\"sec-label\" style=\"margin:0 0 10px;color:#991B1B;\">\u0e07\u0e1a\u0e1b\u0e23\u0e30\u0e21\u0e32\u0e13</div>\n      <div class=\"field\" style=\"margin-bottom:8px;\">\n        <label style=\"color:#991B1B;\">\u0e07\u0e1a\u0e04\u0e32\u0e14\u0e01\u0e32\u0e23\u0e13\u0e4c (THB) <span class=\"required\">*</span></label>\n        <input type=\"number\" id=\"budget\" step=\"0.01\" min=\"0\" placeholder=\"0.00\" inputmode=\"decimal\" class=\"big-num\">\n      </div>\n      <div class=\"warn-box\" style=\"margin:0;\">\u26a0\ufe0f \u0e16\u0e49\u0e32\u0e22\u0e2d\u0e14\u0e43\u0e0a\u0e49\u0e08\u0e23\u0e34\u0e07\u0e40\u0e01\u0e34\u0e19\u0e07\u0e1a \u0e2b\u0e31\u0e27\u0e2b\u0e19\u0e49\u0e32\u0e15\u0e49\u0e2d\u0e07\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34\u0e0b\u0e49\u0e33\u0e2d\u0e35\u0e01\u0e23\u0e2d\u0e1a</div>\n    </div>\n\n    <button class=\"btn btn-primary\" id=\"submitBtn\">\ud83d\udccb \u0e2a\u0e48\u0e07\u0e02\u0e2d Pre-Approve</button>\n  </div>\n\n  <datalist id=\"customerList\"></datalist>\n\n  \n  \n  \n  \n  \n  \n",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();

    async function init() {
      const bb = document.getElementById('backBtn');
      if (bb && typeof icon === 'function') bb.innerHTML = icon('back');
      document.getElementById('expenseDate').value = toYMD(new Date(Date.now() + 86400000));   // พรุ่งนี้ ตามเวลาไทย

      document.querySelectorAll('#custTypeSeg button').forEach(b => {
        b.addEventListener('click', () => {
          document.querySelectorAll('#custTypeSeg button').forEach(x => x.classList.remove('on'));
          b.classList.add('on');
          document.getElementById('customerType').value = b.dataset.v;
        });
      });

      try {
        const customers = await fetchCustomerHistory(session.Email);
        const dl = document.getElementById('customerList');
        (customers || []).forEach(c => { const o=document.createElement('option'); o.value=c; dl.appendChild(o); });
      } catch {}

      document.getElementById('submitBtn').addEventListener('click', onSubmit);
    }

    async function onSubmit() {
      const category = document.getElementById('category').value;
      const expenseDate = document.getElementById('expenseDate').value;
      const venue = document.getElementById('venue').value.trim();
      const customerType = document.getElementById('customerType').value;
      const customerName = document.getElementById('customer').value.trim();
      const occasion = document.getElementById('occasion').value.trim();
      const budget = parseFloat(document.getElementById('budget').value) || 0;
      const customerContact = document.getElementById('customerContact').value.trim();
      const attendees = document.getElementById('attendees').value.trim();

      if (!category) return showToast('เลือกประเภท', 'error');
      if (!expenseDate) return showToast('ใส่วันที่', 'error');
      if (!venue) return showToast('ใส่สถานที่', 'error');
      if (!customerType) return showToast('เลือกประเภทลูกค้า / Principle', 'error');
      if (!customerName) return showToast('ใส่ชื่อลูกค้า', 'error');
      if (!occasion) return showToast('ใส่โอกาส', 'error');
      if (budget <= 0) return showToast('ใส่งบประมาณ', 'error');

      const customer = '[' + customerType + '] ' + customerName;
      const btn = document.getElementById('submitBtn');
      btn.disabled = true;
      showLoading('กำลังส่ง Pre-Approve...');
      try {
        const result = await submitPreApprove({
          staffEmail: session.Email, category, expenseDate, venue,
          customer, customerContact, occasion, attendees, budget,
          jobNo: (document.getElementById('jobNo') || {}).value || ''
        });
        if (result.error) throw new Error(result.error);
        hideLoading();
        showToast('ส่งสำเร็จ! หัวหน้าได้รับอีเมลแล้ว ✅', 'success');
        setTimeout(() => location.href = 'pre-approves.html', 1400);
      } catch (err) {
        hideLoading(); showToast(err.message, 'error');
        btn.disabled = false;
      }
    }

    if (session) { init(); renderBottomNav(''); }
  
if(typeof init==='function')window.init=init;
if(typeof onSubmit==='function')window.onSubmit=onSubmit;
}}};
window.EXION_VIEWS["pre-approves.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" aria-label=\"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a\" onclick=\"location.href='index.html'\" id=\"backBtn\"></button>\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">Pre-Approve \u0e02\u0e2d\u0e07\u0e09\u0e31\u0e19</span></h1>\n  </div>\n\n  <div class=\"container\">\n    <a href=\"pre-approve.html\" class=\"btn btn-primary\" style=\"text-decoration:none;margin-bottom:14px;\">\u2795 \u0e02\u0e2d Pre-Approve \u0e43\u0e2b\u0e21\u0e48</a>\n    <div id=\"kpiZone\"></div>\n    <div id=\"list\" class=\"loading\"><div class=\"spinner\"></div></div>\n  </div>\n\n  \n  \n  \n  \n  \n  \n",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();
    // หน้านี้ใช้แค่ 2 ประเภท แต่ยังดึงชื่อจากตารางกลาง คำจะได้ไม่เพี้ยนกัน
    const CAT_TH = { ENT: catLabel('ENT'), GOLF: catLabel('GOLF') };

    const bb = document.getElementById('backBtn');
    if (bb && typeof icon === 'function') bb.innerHTML = icon('back');

    async function load() {
      try {
        const all = await fetchMyRequests(session.Email);
        const pres = (all || []).filter(r => r.PreApproveStatus);
        const list = document.getElementById('list');
        list.classList.remove('loading');

        if (!pres.length) {
          document.getElementById('kpiZone').innerHTML = '';
          list.innerHTML = `<div class="empty"><div class="icon-wrap">📋</div>
            <div class="title">ยังไม่มี Pre-Approve</div>
            <div class="sub">กดปุ่มด้านบนเพื่อขออนุมัติงบล่วงหน้า</div></div>`;
          renderBottomNav('');
          return;
        }

        const pending = pres.filter(r => r.PreApproveStatus === 'Pending');
        const ready   = pres.filter(r => r.PreApproveStatus === 'Approved' && r.Status !== 'Finalized');
        const done    = pres.filter(r => r.Status === 'Finalized' || r.PreApproveStatus === 'Rejected');
        const budgetTotal = ready.reduce((s,r) => s + (Number(r.PreApproveBudget)||0), 0);

        document.getElementById('kpiZone').innerHTML = `<div class="kpi-grid">
          <div class="kpi warn"><div class="n">${pending.length}</div><div class="l">รออนุมัติงบ</div></div>
          <div class="kpi ok"><div class="n">${ready.length}</div><div class="l">รอส่งบิล</div></div>
          <div class="kpi"><div class="n">${done.length}</div><div class="l">เสร็จสิ้น</div></div>
          <div class="kpi"><div class="n">${Math.round(budgetTotal).toLocaleString()}</div><div class="l">งบคงค้าง</div></div>
        </div>`;

        let html = '';
        if (ready.length) {
          html += `<div class="sec-label" style="color:var(--success);">✅ อนุมัติงบแล้ว — รอส่งบิล (${ready.length})</div>`;
          ready.forEach(r => html += row(r, 'ready'));
        }
        if (pending.length) {
          html += `<div class="sec-label" style="color:#B45309;">⏳ รอหัวหน้าอนุมัติงบ (${pending.length})</div>`;
          pending.forEach(r => html += row(r, 'pending'));
        }
        if (done.length) {
          html += `<div class="sec-label">เสร็จสิ้น (${done.length})</div>`;
          done.forEach(r => html += row(r, 'done'));
        }
        list.innerHTML = html;
        renderBottomNav('');
      } catch (err) {
        renderError('list', err.message, load);
        renderBottomNav('pre');
      }
    }

    function row(r, state) {
      const cls = state === 'ready' ? 'ok' : state === 'pending' ? 'warn' : '';
      const badge = state === 'pending' ? '<span class="pill warn">⏳ รอหัวหน้า</span>'
        : state === 'ready' ? '<span class="pill ok">✅ พร้อมส่งบิล</span>'
        : r.Status === 'Finalized' ? '<span class="pill ok">✓ ส่งบิลแล้ว</span>'
        : '<span class="pill bad">❌ ไม่อนุมัติ</span>';
      const custRaw = String(r.Customer || '-');
      const m = custRaw.match(/^\[(.+?)\]\s*(.*)$/);
      const custTag = m ? `<span class="tag">${m[1]}</span> ${m[2]}` : custRaw;
      const over = Number(r.Amount) > Number(r.PreApproveBudget);

      return `<div class="req-card ${cls}">
        <div class="ri-top">
          <span class="ri-cat">${CAT_TH[r.Category] || r.Category}</span>
          ${badge}
          <span class="ri-amt">${formatCurrency(r.PreApproveBudget)} ฿</span>
        </div>
        <div class="ri-meta">${custTag}</div>
        <div class="ri-meta">${formatDate(r.ExpenseDate)} • ${esc(r.Venue || '-')}</div>
        ${r.Occasion ? `<div class="ri-meta" style="color:var(--gray-400);">💬 ${esc(r.Occasion)}</div>` : ''}
        ${Number(r.Amount) > 0 ? `<div class="${over?'bad-box':'ok-box'}" style="margin:9px 0 0;">
            ยอดจริง <b>${formatCurrency(r.Amount)} THB</b> ${over ? '— เกินงบ ต้องอนุมัติซ้ำ' : '— อยู่ในงบ ✓'}
          </div>` : ''}
        ${r.PreApproveBy ? `<div class="ri-meta" style="margin-top:6px;">อนุมัติงบโดย ${esc(r.PreApproveBy)}</div>` : ''}
        ${state === 'ready' ? `<a href="finalize-claim.html?id=${esc(r.ID)}" class="btn btn-primary btn-sm" style="text-decoration:none;margin-top:10px;">📤 ส่งบิล + ยอดจริง</a>` : ''}
      </div>`;
    }

    if (session) load();
  
if(typeof load==='function')window.load=load;
if(typeof row==='function')window.row=row;
}}};
window.EXION_VIEWS["profile.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" aria-label=\"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a\" onclick=\"location.href = getApp() === 'petty' ? 'pc-home.html' : 'index.html'\" id=\"backBtn\"></button>\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">\u0e42\u0e1b\u0e23\u0e44\u0e1f\u0e25\u0e4c</span></h1>\n  </div>\n\n  <div class=\"container\">\n    <div class=\"hero\" style=\"text-align:center;\">\n      <div class=\"avatar-xl\" id=\"avatar\">?</div>\n      <div class=\"hero-name\" id=\"userName\">-</div>\n      <div class=\"hero-sub\" id=\"userPosition\">-</div>\n      <div class=\"hero-sub\" id=\"userEmail\" style=\"opacity:.72;font-size:12px;\">-</div>\n      <span class=\"role-badge\" id=\"userDept\">-</span>\n    </div>\n\n<div class=\"card\"><a class=\"task-link\" href=\"periods.html\">\u0e23\u0e2d\u0e1a\u0e40\u0e1a\u0e34\u0e01\u0e41\u0e25\u0e30\u0e01\u0e32\u0e23\u0e08\u0e48\u0e32\u0e22\u0e40\u0e07\u0e34\u0e19 \u2192</a></div>\n    <!-- Signature -->\n    <div class=\"card\">\n      <div class=\"card-head\"><span class=\"ib ib-purple\">\u270d\ufe0f</span>\n        <div><div class=\"ch-title\">\u0e25\u0e32\u0e22\u0e40\u0e0b\u0e47\u0e19\u0e02\u0e2d\u0e07\u0e09\u0e31\u0e19</div>\n        <div class=\"ch-sub\">\u0e40\u0e0b\u0e47\u0e19 1 \u0e04\u0e23\u0e31\u0e49\u0e07 \u2014 \u0e43\u0e0a\u0e49\u0e2d\u0e31\u0e15\u0e42\u0e19\u0e21\u0e31\u0e15\u0e34\u0e17\u0e38\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07\u0e17\u0e35\u0e48\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34</div></div>\n      </div>\n\n      <div id=\"currentSigWrap\" class=\"saved-sig\" style=\"display:none;\">\n        <div class=\"ss-label\">\u2705 \u0e25\u0e32\u0e22\u0e40\u0e0b\u0e47\u0e19\u0e17\u0e35\u0e48\u0e1a\u0e31\u0e19\u0e17\u0e36\u0e01\u0e44\u0e27\u0e49</div>\n        <img id=\"currentSig\" alt=\"signature\">\n      </div>\n\n      <div class=\"sig-canvas-wrap\">\n        <canvas id=\"sigCanvas\" class=\"sig-canvas\"></canvas>\n        <span id=\"sigPlaceholder\" class=\"sig-ph\">\u270d\ufe0f \u0e40\u0e0b\u0e47\u0e19\u0e17\u0e35\u0e48\u0e19\u0e35\u0e48\u0e14\u0e49\u0e27\u0e22\u0e19\u0e34\u0e49\u0e27 / \u0e40\u0e21\u0e32\u0e2a\u0e4c</span>\n      </div>\n\n      <label for=\"sigUpload\" class=\"upload-area\" style=\"padding:14px;margin-top:10px;\">\n        <input type=\"file\" id=\"sigUpload\" accept=\"image/png,image/jpeg\">\n        <div class=\"icon-wrap\">\ud83d\udcf7</div>\n        <div class=\"text\">\u0e2d\u0e31\u0e1b\u0e42\u0e2b\u0e25\u0e14\u0e23\u0e39\u0e1b\u0e25\u0e32\u0e22\u0e40\u0e0b\u0e47\u0e19\u0e41\u0e17\u0e19</div>\n        <div class=\"sub\">PNG \u0e1e\u0e37\u0e49\u0e19\u0e2b\u0e25\u0e31\u0e07\u0e43\u0e2a\u0e08\u0e30\u0e2a\u0e27\u0e22\u0e17\u0e35\u0e48\u0e2a\u0e38\u0e14 \u00b7 \u0e44\u0e21\u0e48\u0e40\u0e01\u0e34\u0e19 2 MB</div>\n      </label>\n\n      <div class=\"btn-row\" style=\"margin-top:12px;\">\n        <button class=\"btn btn-secondary\" id=\"clearSigBtn\" style=\"flex:1;\">\ud83d\uddd1 \u0e25\u0e49\u0e32\u0e07</button>\n        <button class=\"btn btn-primary\" id=\"saveSigBtn\" style=\"flex:1.4;\">\ud83d\udcbe \u0e1a\u0e31\u0e19\u0e17\u0e36\u0e01\u0e25\u0e32\u0e22\u0e40\u0e0b\u0e47\u0e19</button>\n      </div>\n    </div>\n\n    <!-- Account -->\n    <div class=\"card\">\n      <div class=\"card-head\"><span class=\"ib ib-blue\">\u2699\ufe0f</span><div><div class=\"ch-title\">\u0e1a\u0e31\u0e0d\u0e0a\u0e35</div></div></div>\n      <div style=\"display:grid;gap:9px;margin-top:12px;\">\n        <button class=\"btn btn-secondary\" onclick=\"location.href='reset-password.html'\">\ud83d\udd11 \u0e40\u0e1b\u0e25\u0e35\u0e48\u0e22\u0e19 / \u0e23\u0e35\u0e40\u0e0b\u0e47\u0e15\u0e23\u0e2b\u0e31\u0e2a\u0e1c\u0e48\u0e32\u0e19</button>\n        <button class=\"btn btn-danger\" id=\"logoutBtn\">\ud83d\udeaa \u0e2d\u0e2d\u0e01\u0e08\u0e32\u0e01\u0e23\u0e30\u0e1a\u0e1a</button>\n      </div>\n    </div>\n\n    <p class=\"footnote\">EXION Workspace 8.0 \u00b7 EXION (Thailand) Co., Ltd.</p>\n  </div>\n\n  \n  \n  \n  \n  \n  \n",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();
    let myExports = [], sigPad = null;
    const MONTHS = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];

    function init() {
      const bb = document.getElementById('backBtn');
      if (bb && typeof icon === 'function') bb.innerHTML = icon('back');
      if (document.getElementById('avatar')) {
      document.getElementById('avatar').textContent = (session.Name||'?').trim().charAt(0).toUpperCase();
      document.getElementById('userName').textContent = session.Name || '-';
      document.getElementById('userPosition').textContent = session.Position || '-';
      document.getElementById('userEmail').textContent = session.Email || '-';
      document.getElementById('userDept').textContent = session.Department || '-';

      }
      const logoutBtn=document.getElementById('logoutBtn'); if(logoutBtn)logoutBtn.onclick=logout;
      if(!document.getElementById('exportMonth')) return;
      const mSel = document.getElementById('exportMonth'), ySel = document.getElementById('exportYear');
      const now = new Date();
      MONTHS.forEach((m,i) => { const o=document.createElement('option'); o.value=i+1; o.textContent=m; if(i+1===now.getMonth()+1) o.selected=true; mSel.appendChild(o); });
      for (let y = now.getFullYear(); y >= now.getFullYear()-3; y--) { const o=document.createElement('option'); o.value=y; o.textContent=y; if(y===now.getFullYear()) o.selected=true; ySel.appendChild(o); }
      mSel.addEventListener('change', refreshExportStatus);
      ySel.addEventListener('change', refreshExportStatus);

    }

    async function loadMyExports() {
      try { const r = await apiGet('getMyExportRequests', { email: session.Email }); myExports = Array.isArray(r) ? r : []; }
      catch { myExports = []; }
      refreshExportStatus();
    }

    // 📅 v6.3 เลือกช่วงรอบเองได้ทั้งวันเริ่มและวันจบ — ทับหรือเว้นแค่เตือน ไม่บล็อก
    let periodInfo = null;
    async function loadPeriodInfo() {
      const year = parseInt(document.getElementById('exportYear').value);
      const month = parseInt(document.getElementById('exportMonth').value);
      const wrap = document.getElementById('cutoffWrap');
      const sIn = document.getElementById('cutoffStart');
      const eIn = document.getElementById('cutoffEnd');
      const hint = document.getElementById('cutoffHint');
      try {
        periodInfo = await apiGet('getPeriodInfo', { email: session.Email, year, month });
        if (!periodInfo || periodInfo.error) throw new Error('n/a');
        sIn.value = periodInfo.expectedStart;
        sIn.max = periodInfo.maxEnd;
        eIn.max = periodInfo.maxEnd;
        eIn.value = periodInfo.suggestedEnd;
        hint.innerHTML = (periodInfo.hasSettled
            ? `รอบก่อนปิดถึง <b>${periodInfo.lastSettledTH}</b> — ระบบแนะนำให้เริ่ม ${periodInfo.expectedStartTH}`
            : `ยังไม่เคยปิดรอบ — เริ่มจากบิลเก่าสุดที่มี (${periodInfo.expectedStartTH})`) +
          `<br>วันตัดยอดตามค่ากลางคือ${periodInfo.cutoffLabel} · เลือกเองได้ทั้งสองช่อง`;
        sIn.oninput = checkPeriodRange;
        eIn.oninput = checkPeriodRange;
        checkPeriodRange();
        wrap.style.display = 'block';
      } catch { wrap.style.display = 'none'; periodInfo = null; }
    }

    // เตือนแบบสดๆ ถ้าทับรอบก่อนหรือมีวันหาย — คำนวณฝั่งหน้าเว็บ ไม่ต้องยิง server
    function periodWarnings(startStr, endStr) {
      const w = [];
      if (!periodInfo || !startStr || !endStr) return w;
      const day = 86400000;
      const s = new Date(startStr), e = new Date(endStr);
      const exp = new Date(periodInfo.expectedStart);
      if (e < s) { w.push('❌ วันจบอยู่ก่อนวันเริ่ม'); return w; }
      if (periodInfo.hasSettled && s < exp) {
        w.push(`⚠️ ทับกับรอบก่อน ${Math.round((exp - s)/day)} วัน — ช่วงนั้นเบิกไปแล้ว อาจได้เงินซ้ำ`);
      } else if (s > exp) {
        w.push(`⚠️ มีวันหาย ${Math.round((s - exp)/day)} วัน — บิลช่วง ${fmtTH(periodInfo.expectedStart)} ถึง ${fmtTH(new Date(s - day))} จะไม่อยู่ในรอบไหนเลย`);
      }
      return w;
    }

    function fmtTH(v) {
      const d = new Date(v);
      return isNaN(d) ? '-' : d.toLocaleDateString('th-TH', { day:'numeric', month:'short', year:'numeric' });
    }

    function checkPeriodRange() {
      const box = document.getElementById('cutoffWarn');
      if (!box) return;
      const w = periodWarnings(document.getElementById('cutoffStart').value,
                               document.getElementById('cutoffEnd').value);
      box.innerHTML = w.length
        ? w.map(x => `<div class="warn-box" style="margin:0 0 6px;font-size:12.5px;">${x}</div>`).join('')
        : '';
    }

    function refreshExportStatus() {
      const year = parseInt(document.getElementById('exportYear').value);
      const month = parseInt(document.getElementById('exportMonth').value);
      const ex = myExports.find(x => Number(x.Year)===year && Number(x.Month)===month);
      const box = document.getElementById('exportStatusBox');
      const act = document.getElementById('exportActions');
      const cw = document.getElementById('cutoffWrap');

      // เลือกวันตัดได้เฉพาะตอนที่ยังไม่ได้ขอ (หรือถูกปฏิเสธมา)
      const canPickCutoff = !ex || ex.OverallStatus === 'Rejected';
      if (canPickCutoff) loadPeriodInfo(); else cw.style.display = 'none';

      if (!ex || ex.OverallStatus === 'Rejected') {
        box.innerHTML = ex
          ? `<div class="bad-box"><b>❌ ไม่อนุมัติ</b><br><span style="font-weight:400;">${ex.GMRemark || ex.ManagerRemark || ex.SeniorRemark || 'ไม่ได้ระบุเหตุผล'}</span></div>`
          : `<div class="info-box">📋 ยังไม่ได้ขออนุมัติสำหรับ <b>${MONTHS[month-1]} ${year}</b></div>`;
        act.innerHTML = `
          <button class="btn btn-primary" onclick="requestApproval()">✅ ขออนุมัติเพื่อ Export</button>
          <button class="btn btn-secondary" onclick="downloadDraft()">👀 ดูตัวอย่างก่อน (ยังใช้เบิกไม่ได้)</button>`;

      } else if (ex.OverallStatus === 'Approved') {
        // ✨ v6.0 ปิดลูป — บอกด้วยว่าบัญชีจ่ายเงินแล้วหรือยัง
        const paid = !!ex.PaidAt;
        box.innerHTML = `
          <div class="ok-box"><b>✅ อนุมัติแล้ว</b><br>
            <span style="font-weight:400;">${ex.ItemCount} รายการ · ${Number(ex.TotalAmount||0).toLocaleString()} บาท</span>
            ${periodTxt(ex)}</div>
          ${paid
            ? `<div class="ok-box" style="background:#ECFDF5;border-color:#6EE7B7;">
                 💵 <b>บัญชีโอนเงินแล้ว</b><br>
                 <span style="font-weight:400;font-size:12px;">${new Date(ex.PaidAt).toLocaleDateString('th-TH',{day:'numeric',month:'long',year:'numeric'})}</span>
               </div>`
            : `<div class="info-box" style="margin-bottom:0;">⏳ รอฝ่ายบัญชีโอนเงิน</div>`}`;
        act.innerHTML = `
          <button class="btn btn-primary" onclick="downloadFinal('${ex.ID}')">📥 ดาวน์โหลด Excel ตัวจริง</button>
          <button class="btn btn-secondary" onclick="downloadDraft()">👀 ดูตัวอย่าง</button>`;

      } else {
        const who = String(ex.GMEmail || ex.SeniorEmail || ex.ManagerEmail || '').split('@')[0];
        box.innerHTML = `<div class="warn-box"><b>⏳ รออนุมัติ</b><br>
          <span style="font-weight:400;font-size:12.5px;">อยู่ที่ ${who || 'ผู้อนุมัติ'} · ${ex.ItemCount} รายการ · ${Number(ex.TotalAmount||0).toLocaleString()} บาท</span>
          ${periodTxt(ex)}</div>`;
        act.innerHTML = `<button class="btn btn-secondary" onclick="downloadDraft()">👀 ดูตัวอย่างก่อน (ยังใช้เบิกไม่ได้)</button>`;
      }
    }

    // แสดงช่วงวันของรอบใต้กล่องสถานะ
    function periodTxt(ex) {
      if (!ex || !ex.PeriodStart || !ex.PeriodEnd) return '';
      const f = s => new Date(s).toLocaleDateString('th-TH', { day:'numeric', month:'short', year:'2-digit' });
      return `<br><span style="font-weight:400;font-size:11.5px;opacity:.8;">📅 รอบ ${f(ex.PeriodStart)} – ${f(ex.PeriodEnd)}</span>`;
    }

    window.requestApproval = async () => {
      const year = parseInt(document.getElementById('exportYear').value);
      const month = parseInt(document.getElementById('exportMonth').value);
      const periodStart = (document.getElementById('cutoffStart') || {}).value || '';
      const periodEnd   = (document.getElementById('cutoffEnd') || {}).value || '';

      if (periodStart && periodEnd) {
        if (new Date(periodEnd) < new Date(periodStart)) return showToast('วันจบอยู่ก่อนวันเริ่ม', 'error');
        const w = periodWarnings(periodStart, periodEnd);
        let msg = `ส่งรอบ ${fmtTH(periodStart)} – ${fmtTH(periodEnd)}\n\n`;
        if (w.length) msg += w.join('\n') + '\n\nยืนยันส่งทั้งที่มีคำเตือน?';
        else msg += 'รายการหลังจากวันนี้จะไปอยู่รอบถัดไป\nยืนยันส่งขออนุมัติ?';
        if (!confirm(msg)) return;
      }

      showLoading('กำลังส่งคำขอ...');
      try {
        const r = await apiPost('requestExportApproval', {
          staffEmail: session.Email, year, month, periodStart, periodEnd, requesterEmail: session.Email
        });
        hideLoading();
        if (r.error) throw new Error(r.error);
        showToast(r.auto
          ? '✅ ผ่านอัตโนมัติ — ดาวน์โหลด Excel ได้เลย'
          : 'ส่งคำขอแล้ว รออนุมัติ ✅', 'success');
        await loadMyExports();
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    window.downloadDraft = async () => {
      const year = parseInt(document.getElementById('exportYear').value);
      const month = parseInt(document.getElementById('exportMonth').value);
      showLoading('กำลังสร้างตัวอย่าง...');
      try {
        // ส่งช่วงวันที่เพิ่งเลือกไปด้วย ไม่งั้นตัวอย่างจะใช้เดือนปฏิทินแทน
        const periodStart = (document.getElementById('cutoffStart') || {}).value || '';
        const periodEnd   = (document.getElementById('cutoffEnd') || {}).value || '';
        const r = await apiPost('downloadDraftExport', {
          staffEmail: session.Email, year, month, periodStart, periodEnd, requesterEmail: session.Email });
        hideLoading();
        if (r.error) throw new Error(r.error);
        dl(r);
        showToast(`ตัวอย่าง ${esc(r.periodLabel || '')} · ${esc(r.itemCount)} รายการ · ${Number(r.totalAmount||0).toLocaleString()} บาท`, 'success');
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    window.downloadFinal = async (exportId) => {
      showLoading('กำลังดาวน์โหลด...');
      try {
        const r = await apiPost('downloadFinalExport', { exportId, requesterEmail: session.Email });
        hideLoading();
        if (r.error) throw new Error(r.error);
        dl(r);
        if (r.drift) {
          alert('⚠️ ตัวเลขเปลี่ยนไปหลังจากได้รับอนุมัติ\n\n' +
            'ตอนอนุมัติ: ' + r.drift.approvedCount + ' รายการ · ' + Number(r.drift.approvedTotal).toLocaleString() + ' บาท\n' +
            'ตอนนี้: ' + r.drift.currentCount + ' รายการ · ' + Number(r.drift.currentTotal).toLocaleString() + ' บาท\n\n' +
            'กรุณาตรวจสอบกับหัวหน้าก่อนส่งบัญชี');
        }
        showToast('ดาวน์โหลดสำเร็จ ✅', 'success');
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    function dl(result) {
      if (!result.base64) throw new Error('ไม่มีข้อมูลไฟล์');
      const bytes = atob(result.base64);
      const arr = new Uint8Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
      const blob = new Blob([arr], { type: result.mimeType || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = result.filename || 'export.xlsx';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    }

    // ── Signature pad ──
    async function initSignature() {
      const canvas = document.getElementById('sigCanvas');
      if (!canvas) return;
      try {
        const r = await getMySignature(session.Email);
        if (r && r.hasSignature && r.dataUrl) {
          document.getElementById('currentSig').src = r.dataUrl;
          document.getElementById('currentSigWrap').style.display = 'block';
        }
      } catch {}
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.strokeStyle = '#0F172A'; ctx.lineWidth = 2.5;
      let drawing = false, empty = true;
      const ph = document.getElementById('sigPlaceholder');
      const pos = e => { const r = canvas.getBoundingClientRect(); return { x:(e.touches?e.touches[0].clientX:e.clientX)-r.left, y:(e.touches?e.touches[0].clientY:e.clientY)-r.top }; };
      const start = e => { drawing = true; const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x,p.y); e.preventDefault(); };
      const draw = e => { if(!drawing) return; const p = pos(e); ctx.lineTo(p.x,p.y); ctx.stroke(); empty=false; ph.style.display='none'; e.preventDefault(); };
      const end = () => drawing = false;
      canvas.addEventListener('mousedown',start); canvas.addEventListener('mousemove',draw);
      canvas.addEventListener('mouseup',end); canvas.addEventListener('mouseout',end);
      canvas.addEventListener('touchstart',start,{passive:false}); canvas.addEventListener('touchmove',draw,{passive:false}); canvas.addEventListener('touchend',end);
      sigPad = {
        isEmpty: () => empty,
        clear: () => { ctx.clearRect(0,0,canvas.width,canvas.height); empty=true; ph.style.display='block'; },
        toDataURL: () => canvas.toDataURL('image/png')
      };
      document.getElementById('clearSigBtn').addEventListener('click', () => sigPad.clear());
      document.getElementById('saveSigBtn').addEventListener('click', onSaveSignature);
      document.getElementById('sigUpload').addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2*1024*1024) return showToast('ไฟล์ใหญ่เกิน 2 MB', 'error');
        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            sigPad.clear();
            const W = canvas.getBoundingClientRect().width, H = 150;
            const ratio = Math.min(W/img.width, H/img.height);
            const w = img.width*ratio, h = img.height*ratio;
            ctx.drawImage(img, (W-w)/2, (H-h)/2, w, h);
            empty = false; ph.style.display = 'none';
            showToast('โหลดรูปแล้ว — กด "บันทึกลายเซ็น"', 'success');
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(file);
        e.target.value = '';
      });
    }

    async function onSaveSignature() {
      if (!sigPad || sigPad.isEmpty()) return showToast('กรุณาเซ็นหรืออัปโหลดก่อน', 'error');
      const base64 = sigPad.toDataURL();
      showLoading('กำลังบันทึกลายเซ็น...');
      try {
        const r = await saveSignature(session.Email, base64);
        hideLoading();
        if (r && r.error) throw new Error(r.error);
        showToast('บันทึกลายเซ็นสำเร็จ ✅', 'success');
        document.getElementById('currentSig').src = base64;
        document.getElementById('currentSigWrap').style.display = 'block';
        sigPad.clear();
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    }

    if (session) { init(); renderBottomNav(document.getElementById('exportMonth')?'periods':'profile'); if(document.getElementById('exportMonth'))loadMyExports(); if(document.getElementById('sigCanvas'))initSignature(); }

if(typeof checkPeriodRange==='function')window.checkPeriodRange=checkPeriodRange;
if(typeof dl==='function')window.dl=dl;
if(typeof fmtTH==='function')window.fmtTH=fmtTH;
if(typeof init==='function')window.init=init;
if(typeof initSignature==='function')window.initSignature=initSignature;
if(typeof loadMyExports==='function')window.loadMyExports=loadMyExports;
if(typeof loadPeriodInfo==='function')window.loadPeriodInfo=loadPeriodInfo;
if(typeof onSaveSignature==='function')window.onSaveSignature=onSaveSignature;
if(typeof periodTxt==='function')window.periodTxt=periodTxt;
if(typeof periodWarnings==='function')window.periodWarnings=periodWarnings;
if(typeof refreshExportStatus==='function')window.refreshExportStatus=refreshExportStatus;
}}};
window.EXION_VIEWS["reset-password.html"]={html:"<header class=\"header\"><h1><img class=\"logo\" src=\"icons/logo.png\" alt=\"EXION\"> \u0e15\u0e31\u0e49\u0e07\u0e23\u0e2b\u0e31\u0e2a\u0e1c\u0e48\u0e32\u0e19\u0e43\u0e2b\u0e21\u0e48</h1></header><main class=\"container\" style=\"max-width:520px\"><div class=\"card\" style=\"padding:28px\"><div class=\"eyebrow\">ACCOUNT RECOVERY</div><h2 style=\"font-size:24px;margin:12px 0\">\u0e01\u0e25\u0e31\u0e1a\u0e40\u0e02\u0e49\u0e32\u0e2a\u0e39\u0e48\u0e1e\u0e37\u0e49\u0e19\u0e17\u0e35\u0e48\u0e17\u0e33\u0e07\u0e32\u0e19</h2><p class=\"subtle\" style=\"line-height:1.9;margin-bottom:24px\">\u0e01\u0e23\u0e2d\u0e01\u0e2d\u0e35\u0e40\u0e21\u0e25\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e41\u0e08\u0e49\u0e07\u0e2b\u0e31\u0e27\u0e2b\u0e19\u0e49\u0e32 \u0e08\u0e32\u0e01\u0e19\u0e31\u0e49\u0e19\u0e23\u0e31\u0e1a\u0e23\u0e2b\u0e31\u0e2a\u0e01\u0e39\u0e49\u0e1a\u0e31\u0e0d\u0e0a\u0e35\u0e08\u0e32\u0e01\u0e2b\u0e31\u0e27\u0e2b\u0e19\u0e49\u0e32 \u0e41\u0e25\u0e49\u0e27\u0e01\u0e14 \u201c\u0e21\u0e35\u0e23\u0e2b\u0e31\u0e2a\u0e01\u0e39\u0e49\u0e1a\u0e31\u0e0d\u0e0a\u0e35\u0e41\u0e25\u0e49\u0e27\u201d \u0e14\u0e49\u0e32\u0e19\u0e25\u0e48\u0e32\u0e07\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e15\u0e31\u0e49\u0e07\u0e23\u0e2b\u0e31\u0e2a\u0e43\u0e2b\u0e21\u0e48</p><form id=\"resetForm\"><div class=\"field\"><label for=\"resetEmail\">\u0e2d\u0e35\u0e40\u0e21\u0e25\u0e1a\u0e23\u0e34\u0e29\u0e31\u0e17</label><input type=\"email\" id=\"resetEmail\" autocomplete=\"username\" required></div><button class=\"btn btn-primary\" style=\"width:100%\">\u0e41\u0e08\u0e49\u0e07\u0e2b\u0e31\u0e27\u0e2b\u0e19\u0e49\u0e32\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e02\u0e2d\u0e15\u0e31\u0e49\u0e07\u0e23\u0e2b\u0e31\u0e2a\u0e43\u0e2b\u0e21\u0e48</button><p id=\"resetStatus\" role=\"status\" class=\"subtle\" style=\"margin:18px 0;line-height:1.8\"></p></form><a href=\"index.html?mode=recovery\" class=\"btn btn-primary\" style=\"width:100%;margin-bottom:12px\">\u0e21\u0e35\u0e23\u0e2b\u0e31\u0e2a\u0e01\u0e39\u0e49\u0e1a\u0e31\u0e0d\u0e0a\u0e35\u0e41\u0e25\u0e49\u0e27 / \u0e15\u0e31\u0e49\u0e07\u0e23\u0e2b\u0e31\u0e2a\u0e43\u0e2b\u0e21\u0e48</a><a href=\"index.html\" class=\"btn btn-secondary\" style=\"width:100%\">\u0e01\u0e25\u0e31\u0e1a\u0e44\u0e1b\u0e40\u0e02\u0e49\u0e32\u0e2a\u0e39\u0e48\u0e23\u0e30\u0e1a\u0e1a</a></div></main>",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){
document.getElementById('resetForm').onsubmit=async e=>{e.preventDefault();const btn=e.target.querySelector('button'),status=document.getElementById('resetStatus');btn.disabled=true;try{const r=await requestPasswordReset(document.getElementById('resetEmail').value.trim());status.textContent=r.message;}catch(err){status.textContent=err.message;}finally{btn.disabled=false;}};

}}};
window.EXION_VIEWS["senior-inbox.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" aria-label=\"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a\" onclick=\"location.href='index.html'\" id=\"backBtn\"></button>\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">Senior Inbox</span></h1>\n  </div>\n\n  <div class=\"container\">\n    <div id=\"list\" class=\"loading\"><div class=\"spinner\"></div></div>\n  </div>\n\n  <div id=\"modal\" class=\"modal\">\n    <div class=\"modal-content\">\n      <div class=\"modal-head\">\n        <h3 id=\"modalTitle\">Final Approval</h3>\n        <button class=\"modal-close\" aria-label=\"\u0e1b\u0e34\u0e14\" onclick=\"closeModal()\">\u2715</button>\n      </div>\n      <div id=\"modalContent\"></div>\n    </div>\n  </div>\n\n  \n  \n  \n  \n  \n  \n",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();
    let pending = [];
    let exportPending = [];
    let mySig = { hasSignature: false };
    let sigPad = null;

    const CAT_TH = catMap();   // 🔴 รวมไว้ที่ js/app.js แล้ว ห้ามก๊อปตารางมาไว้ในหน้าอีก
    const CAT_IC = CAT_ICON_TH;

    async function load() {
      const bb = document.getElementById('backBtn');
      if (bb && typeof icon === 'function') bb.innerHTML = icon('back');
      try {
        const [result, sig, exps] = await Promise.all([
          // 🔴 เดิมดึงแค่ getSeniorInbox ซึ่งตายไปแล้วตั้งแต่ v6.1 (กรอง ManagerStatus==='Approved')
          //    หัวหน้าที่ถูกตั้งเป็น Senior ด้วย จึงมองไม่เห็นงานของทีมตัวเองเลยสักใบ
          //    getPendingApprovals รวมทั้งกล่องหัวหน้าและของค้างเก่าให้ในตัวอยู่แล้ว
          fetchPendingApprovals(session.Email),
          getMySignature(session.Email).catch(() => ({ hasSignature: false })),
          apiGet('getExportApprovalInbox', { email: session.Email }).catch(() => [])
        ]);
        exportPending = Array.isArray(exps) ? exps : [];
        mySig = sig;
        if (result && result.error) throw new Error(result.error);
        pending = Array.isArray(result) ? result : [];
        render();
      } catch (err) {
        renderError('list', err.message, load);
        renderBottomNav('inbox');
      }
    }

    function render() {
      const list = document.getElementById('list');
      list.classList.remove('loading');

      if (pending.length === 0 && exportPending.length === 0) {
        list.innerHTML = `<div class="empty"><div class="icon-wrap">🎉</div><div class="title">เคลียร์หมดแล้ว!</div><div class="sub">ไม่มีคำขอรออนุมัติ</div></div>`;
        renderBottomNav('inbox');
        return;
      }

      const total = pending.reduce((s,r) => s + (Number(r.Amount) || Number(r.PreApproveBudget) || 0), 0);
      const batches = {};
      pending.forEach((r, idx) => {
        const bid = r.BatchID || r.ID;
        if (!batches[bid]) batches[bid] = { items: [], staff: r.StaffName, dept: r.Department, total: 0, mgrEmail: r.ManagerEmail, mgrStatus: r.ManagerStatus };
        batches[bid].items.push({ ...r, _idx: idx });
        batches[bid].total += Number(r.Amount) || Number(r.PreApproveBudget) || 0;
      });

      let html = `<div class="count-hero">
        <div class="lbl">รออนุมัติ</div>
        <div class="num">${pending.length}</div>
        <div class="sub">${Object.keys(batches).length} ชุด • รวม ${Math.round(total).toLocaleString()} THB</div>
      </div>`;

      // ✨ v6.0 คำขอ Export เคยแจ้งทางอีเมลอย่างเดียว หัวหน้าเปิดแอปแล้วไม่เห็นอะไรเลย
      if (exportPending.length) {
        html += `<div class="sec-label" style="color:var(--accent);">📊 คำขอ Export รออนุมัติ (${exportPending.length})</div>`;
        exportPending.forEach(ex => {
          const days = Math.floor((Date.now() - new Date(ex.RequestedAt).getTime()) / 86400000);
          html += `<a href="export-review.html?id=${ex.ID}" class="req-card warn" style="text-decoration:none;display:block;">
            <div class="ri-top">
              <span class="ri-cat">📊 ${ex.StaffName}</span>
              ${days >= 2 ? `<span class="pill bad">ค้าง ${days} วัน</span>` : '<span class="pill warn">ใหม่</span>'}
              <span class="ri-amt">${Number(ex.TotalAmount||0).toLocaleString()} ฿</span>
            </div>
            <div class="ri-meta">ใบเบิกเดือน ${ex.Month}/${ex.Year} · ${ex.ItemCount} รายการ · แตะเพื่อตรวจสอบ</div>
          </a>`;
        });
        html += `<div class="sec-label">คำขอเบิกรายรายการ</div>`;
      }

      if (!mySig.hasSignature) {
        html += `<div class="warn-box"><div class="t">✍️ ยังไม่มีลายเซ็นบันทึกไว้</div>
          <div style="font-size:12px;">ตั้ง 1 ครั้งใน Profile → approve เร็วขึ้นมาก</div>
          <a href="profile.html" style="display:inline-block;margin-top:8px;font-weight:700;font-size:12px;">→ ไปตั้งลายเซ็น</a></div>`;
      }

      Object.entries(batches).forEach(([bid, b]) => {
        const bypass = b.mgrStatus === 'ข้ามขั้นหัวหน้าed'
          ? '<span class="badge-pill badge-pending" style="margin-left:6px;font-size:11px;">ข้ามขั้นหัวหน้า</span>'
          : '<span class="badge-pill badge-approved" style="margin-left:6px;font-size:11px;">Mgr ✓</span>';
        html += `<div class="batch-card">
          <div class="batch-head">
            <div>
              <div class="who">${b.staff} ${bypass}</div>
              <div class="sub">${b.dept} • ${b.items.length} รายการ${b.mgrEmail ? ' • ' + b.mgrEmail.split('@')[0] : ''}</div>
            </div>
            <div class="amt">${Math.round(b.total).toLocaleString()}</div>
          </div>`;
        b.items.forEach(r => {
          const over = r.PreApproveBudget && Number(r.Amount) > Number(r.PreApproveBudget);
          html += `<div class="request-item" onclick="showDetail(${esc(r._idx)})" ${over?'style="border-color:#FCA5A5;background:#FFF5F5;"':''}>
            <div class="cat-icon" style="background:#DCFCE7;color:#065F46;">${CAT_IC[r.Category] || '📦'}</div>
            <div class="info">
              <div class="title">${CAT_TH[r.Category] || r.Category}${over ? ' ⚠️' : ''}</div>
              <div class="meta">${formatDate(r.ExpenseDate)}${r.Venue ? ' • ' + r.Venue : ''}</div>
            </div>
            <div class="right"><div class="amount">${Math.round(Number(r.Amount) || Number(r.PreApproveBudget) || 0).toLocaleString()}</div></div>
          </div>`;
        });
        if (mySig.hasSignature) {
          html += `<button class="btn btn-primary btn-sm" style="width:100%;margin-top:10px;" onclick="approveBatch('${bid}')">✅ อนุมัติทั้งชุด</button>`;
        }
        html += `</div>`;
      });

      list.innerHTML = html;
      renderBottomNav('inbox');
    }

    function showDetail(idx) {
      const r = pending[idx];
      document.getElementById('modalTitle').textContent = r.StaffName + ' — ' + (CAT_TH[r.Category] || r.Category);

      const rows = [
        ['ID', r.ID],
        ['ประเภท', CAT_TH[r.Category] || r.Category],
        ['วันที่', formatDate(r.ExpenseDate)],
        ['สถานที่', r.Venue || '-'],
        ['โอกาส', r.Occasion || '-'],
        ['ผู้ร่วม', r.Attendees || '-']
      ];
      if (r.Origin) rows.push(['ต้นทาง', r.Origin]);
      if (r.Destination) rows.push(['ปลายทาง', r.Destination]);
      if (r.Customer) rows.push(['ลูกค้า', r.Customer + (r.CustomerContact ? ' (' + r.CustomerContact + ')' : '')]);
      rows.push(['Manager', (r.ManagerEmail || '-') + (r.ManagerStatus === 'ข้ามขั้นหัวหน้าed' ? ' (ข้ามขั้นหัวหน้า)' : ' ✓')]);
      if (r.ManagerRemark) rows.push(['Manager Remark', String(r.ManagerRemark).split(' sig:')[0]]);
      if (r.PreApproveBudget) rows.push(['งบที่อนุมัติ', Math.round(Number(r.PreApproveBudget)).toLocaleString() + ' THB']);

      let html = `<div class="detail-row">
        <div class="key">จำนวนเงิน</div>
        <div class="val big">${Math.round(Number(r.Amount) || Number(r.PreApproveBudget) || 0).toLocaleString()} <span style="font-size:13px;color:var(--gray-500);font-weight:600;">THB</span></div>
      </div>` + rows.map(([k,v]) => `<div class="detail-row"><div class="key">${k}</div><div class="val">${v}</div></div>`).join('');

      if (r.PreApproveBudget && Number(r.Amount) > Number(r.PreApproveBudget)) {
        const over = Number(r.Amount) - Number(r.PreApproveBudget);
        const pct = ((over / Number(r.PreApproveBudget)) * 100).toFixed(0);
        html += `<div class="warn-box" style="margin-top:12px;"><div class="t">⚠️ เกินงบ ${Math.round(over).toLocaleString()} THB (${pct}%)</div></div>`;
      }

      let urls = [];
      try { urls = JSON.parse(r.ReceiptURLs || '[]'); } catch {}
      if (urls.length === 0 && r.ReceiptURL) urls = [r.ReceiptURL];
      if (urls.length > 0) {
        html += `<div style="margin-top:16px;">
          <div style="font-size:13px;font-weight:700;margin-bottom:8px;">📎 ใบเสร็จ (${urls.length})</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;">`;
        for (let i = 0; i < urls.length; i++) html += `<button class="btn btn-secondary btn-sm" onclick="loadReceipt('${esc(r.ID)}',${i})">🔒 ไฟล์ ${i+1}</button>`;
        html += `</div><img id="rcptImg" class="preview-img" alt="ใบเสร็จ" style="display:none;"></div>`;
      }

      html += `<div class="field" style="margin-top:18px;">
        <label>หมายเหตุ <span style="color:var(--gray-400);font-weight:400;">(ถ้ามี)</span></label>
        <textarea id="remark" rows="2" placeholder="..."></textarea>
      </div>`;

      if (mySig.hasSignature) {
        html += `<div class="saved-sig"><img src="${mySig.dataUrl}" alt="sig"><div>✅ ใช้ลายเซ็นที่บันทึกไว้</div></div>`;
      } else {
        html += `<div class="field" style="margin-top:14px;">
          <label>ลายเซ็น Senior <span class="required">*</span></label>
          <div class="sig-box"><canvas id="sigCanvas" class="sig-canvas"></canvas><span class="sig-placeholder">เซ็นที่นี่</span></div>
          <div class="sig-actions"><span>เซ็นเพื่ออนุมัติ</span><button type="button" class="sig-clear" onclick="clearSig()">ล้าง</button></div>
        </div>`;
      }

      html += `<div class="btn-row" style="margin-top:14px;">
        <button class="btn btn-primary" style="flex:1;" onclick="decide('${esc(r.ID)}','Approved')">🎉 อนุมัติ</button>
        <button class="btn" style="flex:1;background:var(--danger);color:white;" onclick="decide('${esc(r.ID)}','Rejected')">❌ Reject</button>
      </div>`;

      document.getElementById('modalContent').innerHTML = html;
      document.getElementById('modal').classList.add('show');
      if (!mySig.hasSignature) setTimeout(initSigPad, 80);
    }

    function initSigPad() {
      const c = document.getElementById('sigCanvas');
      if (!c) return;
      const ctx = c.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = c.getBoundingClientRect();
      c.width = rect.width * dpr; c.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle='#0F172A'; ctx.lineWidth=2.5;
      let draw=false, empty=true;
      const ph = c.parentElement.querySelector('.sig-placeholder');
      const pos = e => { const r=c.getBoundingClientRect(); return {x:(e.touches?e.touches[0].clientX:e.clientX)-r.left, y:(e.touches?e.touches[0].clientY:e.clientY)-r.top}; };
      const st = e => { draw=true; const p=pos(e); ctx.beginPath(); ctx.moveTo(p.x,p.y); e.preventDefault(); };
      const mv = e => { if(!draw)return; const p=pos(e); ctx.lineTo(p.x,p.y); ctx.stroke(); empty=false; if(ph)ph.style.display='none'; e.preventDefault(); };
      const en = () => draw=false;
      c.addEventListener('mousedown',st); c.addEventListener('mousemove',mv); c.addEventListener('mouseup',en); c.addEventListener('mouseout',en);
      c.addEventListener('touchstart',st); c.addEventListener('touchmove',mv); c.addEventListener('touchend',en);
      sigPad = { isEmpty:()=>empty, clear:()=>{ctx.clearRect(0,0,c.width,c.height);empty=true;if(ph)ph.style.display='block';}, toDataURL:()=>c.toDataURL('image/png') };
    }
    window.clearSig = () => sigPad && sigPad.clear();

    async function loadReceipt(id, fileIndex) {
      showLoading('โหลดใบเสร็จ...');
      try {
        const r = await fetchReceiptImage(id, session.Email, fileIndex);
        hideLoading();
        if (r.error) throw new Error(r.error);
        const img = document.getElementById('rcptImg');
        img.src = r.dataUrl; img.style.display = 'block';
        img.onclick = () => openImageViewer(r.dataUrl, 'แตะ 2 ครั้งเพื่อซูม');
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    }

    async function decide(id, decision) {
      const remark = (document.getElementById('remark')?.value || '').trim();
      let signatureBase64 = '';
      if (decision === 'Approved' && !mySig.hasSignature) {
        if (!sigPad || sigPad.isEmpty()) return showToast('กรุณาเซ็นชื่อก่อน', 'error');
        signatureBase64 = sigPad.toDataURL();
      }
      if (decision === 'Rejected' && !remark) return showToast('ระบุเหตุผล', 'error');
      if (!confirm(decision === 'Approved' ? 'ยืนยันอนุมัติ?' : 'Reject?')) return;
      showLoading('กำลังบันทึก...');
      try {
        // ⚠️ ต้องใช้ approve (legacyApprove) ไม่ใช่ seniorApprove ตรงๆ
        //    ใบ Pre-Approve ต้องเข้า managerApprove ไม่งั้น Status ถูกเขียนทับ ส่งบิลจริงไม่ได้อีกเลย
        const result = await approveRequest({ id, decision, remark, approverEmail: session.Email, signatureBase64 });
        hideLoading();
        if (result && result.error) throw new Error(result.error);
        showToast(decision === 'Approved' ? '🎉 อนุมัติแล้ว!' : '❌ ไม่อนุมัติ', 'success');
        closeModal();
        load();
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    }

    window.approveBatch = async (bid) => {
      const items = pending.filter(r => (r.BatchID || r.ID) === bid);
      const total = items.reduce((s,r) => s + (Number(r.Amount) || Number(r.PreApproveBudget) || 0), 0);
      const who = items[0] ? (items[0].StaffName || '') : '';
      if (!confirm(`อนุมัติ ${items.length} รายการของ ${who}\nรวม ${Math.round(total).toLocaleString()} บาท ?`)) return;
      try {
        await runBatch(items, r => approveRequest({ id: r.ID, decision: 'Approved', remark: '', approverEmail: session.Email }), 'อนุมัติ');
      } finally { load(); }
    };

    function closeModal() { document.getElementById('modal').classList.remove('show'); }
    document.getElementById('modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
    window.showDetail = showDetail; window.loadReceipt = loadReceipt; window.decide = decide; window.closeModal = closeModal;
    if (session) load();
  
if(typeof closeModal==='function')window.closeModal=closeModal;
if(typeof decide==='function')window.decide=decide;
if(typeof initSigPad==='function')window.initSigPad=initSigPad;
if(typeof load==='function')window.load=load;
if(typeof loadReceipt==='function')window.loadReceipt=loadReceipt;
if(typeof render==='function')window.render=render;
if(typeof showDetail==='function')window.showDetail=showDetail;
}}};
window.EXION_VIEWS["status.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" aria-label=\"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a\" onclick=\"location.href='index.html'\" id=\"backBtn\"></button>\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">\u0e04\u0e33\u0e02\u0e2d\u0e02\u0e2d\u0e07\u0e09\u0e31\u0e19</span></h1>\n  </div>\n\n  <div class=\"container\">\n    <div class=\"filter-toolbar\"><input type=\"search\" id=\"search\" aria-label=\"\u0e04\u0e49\u0e19\u0e2b\u0e32\u0e04\u0e33\u0e02\u0e2d\" placeholder=\"\u0e04\u0e49\u0e19\u0e2b\u0e32\u0e25\u0e39\u0e01\u0e04\u0e49\u0e32 \u0e23\u0e32\u0e22\u0e25\u0e30\u0e40\u0e2d\u0e35\u0e22\u0e14 \u0e2b\u0e23\u0e37\u0e2d\u0e40\u0e25\u0e02\u0e04\u0e33\u0e02\u0e2d\"><select id=\"filterStatus\" aria-label=\"\u0e2a\u0e16\u0e32\u0e19\u0e30\"><option value=\"\">\u0e17\u0e38\u0e01\u0e2a\u0e16\u0e32\u0e19\u0e30</option><option value=\"Pending\">\u0e23\u0e2d\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34</option><option value=\"Approved\">\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34\u0e41\u0e25\u0e49\u0e27</option><option value=\"Rejected\">\u0e44\u0e21\u0e48\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34</option></select></div>\n    <details class=\"card\" style=\"padding:16px;margin-bottom:18px\"><summary style=\"cursor:pointer;font-size:13px\">\u0e15\u0e31\u0e27\u0e01\u0e23\u0e2d\u0e07\u0e40\u0e1e\u0e34\u0e48\u0e21\u0e40\u0e15\u0e34\u0e21\u0e41\u0e25\u0e30\u0e14\u0e32\u0e27\u0e19\u0e4c\u0e42\u0e2b\u0e25\u0e14 Excel</summary><div class=\"form-grid\" style=\"margin-top:18px\"><div class=\"field\"><label for=\"dateFrom\">\u0e15\u0e31\u0e49\u0e07\u0e41\u0e15\u0e48\u0e27\u0e31\u0e19\u0e17\u0e35\u0e48</label><input type=\"date\" id=\"dateFrom\"></div><div class=\"field\"><label for=\"dateTo\">\u0e16\u0e36\u0e07\u0e27\u0e31\u0e19\u0e17\u0e35\u0e48</label><input type=\"date\" id=\"dateTo\"></div><div class=\"field\"><label for=\"filterCat\">\u0e1b\u0e23\u0e30\u0e40\u0e20\u0e17</label><select id=\"filterCat\"><option value=\"\">\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14</option></select></div><div class=\"field\" id=\"whoWrap\" style=\"display:none\"><label for=\"expWho\">\u0e1c\u0e39\u0e49\u0e43\u0e0a\u0e49\u0e07\u0e32\u0e19\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e2a\u0e48\u0e07\u0e2d\u0e2d\u0e01</label><select id=\"expWho\"></select></div></div><div class=\"btn-row\" id=\"exportCard\"><button class=\"btn btn-secondary btn-sm\" onclick=\"clearFilters()\">\u0e25\u0e49\u0e32\u0e07\u0e15\u0e31\u0e27\u0e01\u0e23\u0e2d\u0e07</button><button class=\"btn btn-secondary btn-sm\" id=\"expBtn\" onclick=\"doExportList()\">\u0e14\u0e32\u0e27\u0e19\u0e4c\u0e42\u0e2b\u0e25\u0e14 Excel \u0e15\u0e32\u0e21\u0e15\u0e31\u0e27\u0e01\u0e23\u0e2d\u0e07</button></div></details>\n\n    <div id=\"kpiZone\"></div>\n    <div id=\"list\" class=\"loading\"><div class=\"spinner\"></div></div>\n  </div>\n\n  <div id=\"editModal\" class=\"modal\">\n    <div class=\"modal-content\">\n      <div class=\"modal-head\"><h3>\u270f\ufe0f \u0e41\u0e01\u0e49\u0e44\u0e02\u0e04\u0e33\u0e02\u0e2d</h3><button class=\"modal-close\" aria-label=\"\u0e1b\u0e34\u0e14\" onclick=\"closeEdit()\">\u2715</button></div>\n      <div id=\"editContent\"></div>\n    </div>\n  </div>\n\n  <div id=\"detailModal\" class=\"modal\">\n    <div class=\"modal-content\">\n      <div class=\"modal-head\"><h3 id=\"detailTitle\">\u0e23\u0e32\u0e22\u0e25\u0e30\u0e40\u0e2d\u0e35\u0e22\u0e14</h3><button class=\"modal-close\" aria-label=\"\u0e1b\u0e34\u0e14\" onclick=\"closeDetail()\">\u2715</button></div>\n      <div id=\"detailContent\"></div>\n    </div>\n  </div>\n\n  \n  \n  \n  \n  \n  \n",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();
    let allReqs = [], categories = [], filteredReqs = [];

    const CAT_TH = catMap(true);   // 🔴 รวมไว้ที่ js/app.js แล้ว ห้ามก๊อปตารางมาไว้ในหน้าอีก
    // catLabel() อยู่ใน js/app.js แล้ว — ประกาศซ้ำจะพังทั้งหน้า

    const bb = document.getElementById('backBtn');
    if (bb && typeof icon === 'function') bb.innerHTML = icon('back');

    /* ── 📥 โหลดรายการคำขอเป็น Excel ── */
    async function loadExportPeople() {
      try {
        const list = await fetchExportableStaff(session.Email);
        if (!Array.isArray(list) || list.length <= 1) return;   // ไม่มีลูกทีม = ไม่ต้องโชว์
        const sel = document.getElementById('expWho');
        sel.innerHTML = list.map(p => `<option value="${p.email}">${p.name}</option>`).join('');
        document.getElementById('whoWrap').style.display = 'block';
      } catch (e) { /* โหลดรายชื่อไม่ได้ก็ยังโหลดของตัวเองได้ */ }
    }

    window.doExportList = async function () {
      const btn = document.getElementById('expBtn');
      const who = (document.getElementById('expWho') || {}).value || session.Email;
      btn.disabled = true; btn.textContent = '⏳ กำลังสร้างไฟล์...';
      try {
        const r = await exportRequestList({
          requesterEmail: session.Email,
          staffEmail: who,
          dateFrom: document.getElementById('dateFrom').value,
          dateTo:   document.getElementById('dateTo').value,
          status:   document.getElementById('filterStatus').value
        });
        if (r.error) throw new Error(r.error);
        if (!r.base64) throw new Error('ไม่มีข้อมูลไฟล์');
        const bytes = atob(r.base64);
        const arr = new Uint8Array(bytes.length);
        for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
        const blob = new Blob([arr], { type: r.mimeType ||
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = r.filename || 'requests.xlsx';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        showToast('โหลดแล้ว · ' + r.count + ' รายการ', 'success');
      } catch (err) {
        showToast(err.message, 'error');
      } finally {
        btn.disabled = false; btn.textContent = '📥 โหลด Excel';
      }
    };

    window.load = load;
    async function load() {
      try {
        const [reqs, cats] = await Promise.all([fetchMyRequests(session.Email), fetchCategories()]);
        allReqs = Array.isArray(reqs) ? reqs : [];
        categories = Array.isArray(cats) ? cats : [];
        const sel = document.getElementById('filterCat');
        sel.innerHTML = '<option value="">ทั้งหมด</option>';
        categories.forEach(c => { const o=document.createElement('option'); o.value=c.Code; o.textContent=catLabel(c.Code); sel.appendChild(o); });
        applyFilters();
        const linkedId=new URLSearchParams(location.search).get('id'); if(linkedId && !window.__openedLinkedRequest){window.__openedLinkedRequest=true;viewDetail(linkedId);}
        loadExportPeople();
      } catch (err) {
        document.getElementById('list').classList.remove('loading');
        document.getElementById('list').innerHTML = `<div class="empty"><div class="icon-wrap">⚠️</div>
          <div class="title">โหลดไม่สำเร็จ</div><div class="sub">${esc(err.message)}</div>
          <button class="btn btn-primary btn-sm" style="margin-top:14px;max-width:180px;" onclick="load()">🔄 ลองใหม่</button></div>`;
      }
    }

    function applyFilters() {
      const from = document.getElementById('dateFrom').value;
      const to = document.getElementById('dateTo').value;
      const cat = document.getElementById('filterCat').value;
      const st = document.getElementById('filterStatus').value;
      const q = document.getElementById('search').value.trim().toLowerCase();

      filteredReqs = allReqs.filter(r => {
        const d = r.ExpenseDate || r.Timestamp;
        if (!d) return false;
        const rd = new Date(d);
        if (from && rd < new Date(from)) return false;
        if (to) { const t = new Date(to); t.setHours(23,59,59,999); if (rd > t) return false; }
        if (cat && r.Category !== cat) return false;
        if (st && r.Status !== st) return false;
        if (q) {
          const hay = [r.ID, r.Customer, r.Venue, r.CustomerContact, r.Occasion, r.Destination].join(' ').toLowerCase();
          if (hay.indexOf(q) < 0) return false;
        }
        return true;
      }).sort((a,b) => new Date(b.ExpenseDate||b.Timestamp) - new Date(a.ExpenseDate||a.Timestamp));
      renderList();
    }
    window.applyFilters = applyFilters;

    function clearFilters() {
      ['dateFrom','dateTo','filterCat','filterStatus','search'].forEach(id => document.getElementById(id).value = '');
      applyFilters();
    }
    window.clearFilters = clearFilters;

    document.getElementById('search').addEventListener('input', applyFilters);
    // ทุกช่องกรองอัปเดตทันที ไม่ต้องกดปุ่มยืนยัน
    ['filterCat','filterStatus','dateFrom','dateTo'].forEach(id =>
      document.getElementById(id).addEventListener('change', applyFilters));

    function renderList() {
      const list = document.getElementById('list');
      list.classList.remove('loading');
      const kpi = document.getElementById('kpiZone');

      if (!filteredReqs.length) {
        kpi.innerHTML = '';
        const hasFilter = ['dateFrom','dateTo','filterCat','filterStatus','search'].some(id => document.getElementById(id).value);
        list.innerHTML = hasFilter
          ? `<div class="empty"><div class="icon-wrap">🔍</div><div class="title">ไม่พบคำขอที่ตรงกับตัวกรอง</div>
              <button class="btn btn-secondary btn-sm" style="margin-top:14px;max-width:200px;" onclick="clearFilters()">🗑 ล้างตัวกรอง</button></div>`
          : `<div class="empty"><div class="icon-wrap">📭</div><div class="title">ยังไม่มีคำขอเบิก</div>
              <div class="sub">เริ่มต้นด้วยการสร้างคำขอแรกของคุณ</div>
              <a href="submit.html" class="btn btn-primary btn-sm" style="margin-top:14px;max-width:220px;text-decoration:none;">➕ ขอเบิกใหม่</a></div>`;
        return;
      }

      const total = filteredReqs.reduce((s,r) => s + (Number(r.Amount)||0), 0);
      const pending = filteredReqs.filter(r => r.Status === 'Pending').length;
      const approved = filteredReqs.filter(r => r.Status === 'Approved').length;
      const rejected = filteredReqs.filter(r => r.Status === 'Rejected').length;

      kpi.innerHTML = `<div class="kpi-grid">
        <div class="kpi"><div class="n">${filteredReqs.length}</div><div class="l">รายการ</div></div>
        <div class="kpi warn"><div class="n">${pending}</div><div class="l">รออนุมัติ</div></div>
        <div class="kpi ok"><div class="n">${approved}</div><div class="l">อนุมัติแล้ว</div></div>
        <div class="kpi ${rejected?'bad':''}"><div class="n">${Math.round(total).toLocaleString()}</div><div class="l">THB รวม</div></div>
      </div>`;

      const byMonth = {};
      filteredReqs.forEach(r => {
        const d = new Date(r.ExpenseDate || r.Timestamp);
        const key = isNaN(d) ? 'ไม่ระบุ' : d.toLocaleDateString('th-TH', {year:'numeric', month:'long'});
        (byMonth[key] = byMonth[key] || []).push(r);
      });

      let html = '';
      Object.entries(byMonth).forEach(([month, reqs]) => {
        const sub = reqs.reduce((s,r) => s + (Number(r.Amount)||0), 0);
        html += `<div class="sec-label" style="display:flex;justify-content:space-between;align-items:baseline;">
          <span>${month}</span><span style="color:var(--accent);font-weight:800;">${Math.round(sub).toLocaleString()} ฿</span></div>`;
        reqs.forEach(r => html += renderItem(r));
      });
      list.innerHTML = html;
    }

    function renderItem(r) {
      const st = String(r.Status||'Pending');

      // 📋 Pre-Approve เป็นคนละเรื่องกับรายการเบิก — ต้องไปกรอกยอดจริงที่หน้าส่งบิล
      if (st === 'PreApprove' || st === 'Finalized') return renderPreApproveItem(r);

      const cls = st === 'Approved' ? 'ok' : st === 'Rejected' ? 'bad' : 'warn';
      const stTH = st === 'Approved' ? '✅ อนุมัติ' : st === 'Rejected' ? '❌ ไม่อนุมัติ' : '⏳ รออนุมัติ';
      const d = r.ExpenseDate ? new Date(r.ExpenseDate) : null;
      const date = d && !isNaN(d) ? d.toLocaleDateString('th-TH',{day:'numeric',month:'short'}) : '-';
      const meta = [date, r.Venue, r.Customer].filter(Boolean).join(' • ');
      return `<div class="req-card ${cls}">
        <div class="ri-top">
          <span class="ri-cat">${catLabel(r.Category)}</span>
          <span class="pill ${cls}">${stTH}</span>
          <span class="ri-amt">${Number(r.Amount||0).toLocaleString()} ฿</span>
        </div>
        <div class="ri-meta">${meta}</div>
        ${cleanRemark(r.Remark) ? `<div class="ri-meta" style="color:var(--gray-400);">💬 ${cleanRemark(r.Remark)}</div>` : ''}
        <div class="btn-row" style="margin-top:10px;gap:8px;">
          <button class="btn btn-secondary btn-sm" style="flex:1.5;" onclick="viewDetail('${esc(r.ID)}')">👁 ดูรายละเอียด</button>
          <button class="btn btn-secondary btn-sm" style="flex:1.1;color:#0891b2;border-color:#a5e5f0;" onclick="openEdit('${esc(r.ID)}')">✏️ แก้ไข</button>
          <button class="btn btn-secondary btn-sm" style="flex:0 0 52px;padding-left:0;padding-right:0;color:#b91c1c;border-color:#fecaca;" onclick="deleteReq('${esc(r.ID)}')" title="ลบคำขอนี้" aria-label="ลบคำขอนี้">🗑</button>
        </div>
      </div>`;
    }

    function renderPreApproveItem(r) {
      const ps = String(r.PreApproveStatus || 'Pending');
      const done = String(r.Status || '') === 'Finalized';   // ส่งบิลจริงไปแล้ว
      const ready = ps === 'Approved' && !done;
      const cls = ready ? 'ok' : ps === 'Rejected' ? 'bad' : 'warn';
      const badge = done ? '<span class="pill ok">✓ ส่งบิลแล้ว</span>'
        : ready ? '<span class="pill ok">✅ อนุมัติงบแล้ว</span>'
        : ps === 'Rejected' ? '<span class="pill bad">❌ ไม่อนุมัติงบ</span>'
        : '<span class="pill warn">⏳ รออนุมัติงบ</span>';
      const d = r.ExpenseDate ? new Date(r.ExpenseDate) : null;
      const date = d && !isNaN(d) ? d.toLocaleDateString('th-TH',{day:'numeric',month:'short'}) : '-';
      const meta = [date, r.Venue, r.Customer].filter(Boolean).join(' • ');
      return `<div class="req-card ${cls}">
        <div class="ri-top">
          <span class="ri-cat">📋 ขอวงเงิน · ${catLabel(r.Category)}</span>
          ${badge}
          <span class="ri-amt">${Number(r.PreApproveBudget||0).toLocaleString()} ฿</span>
        </div>
        <div class="ri-meta">${meta}</div>
        ${done
          ? `<div class="ri-meta" style="margin-top:8px;color:var(--gray-400);">✓ ส่งบิลใช้จริงไปแล้ว — ดูบิลได้ในรายการด้านล่าง</div>`
          : ready
          ? `<div class="ok-box" style="margin:9px 0 0;font-size:12.5px;">📤 อนุมัติงบแล้ว — เหลือกรอกยอดจริงพร้อม<b>แนบใบเสร็จ</b></div>
             <div class="btn-row" style="margin-top:9px;gap:8px;">
               <a href="finalize-claim.html?id=${esc(r.ID)}" class="btn btn-primary btn-sm" style="flex:1;text-decoration:none;">📤 ส่งบิล + ยอดจริง</a>
               <button class="btn btn-secondary btn-sm" style="flex:0 0 52px;padding-left:0;padding-right:0;color:#b91c1c;border-color:#fecaca;" onclick="cancelPre('${esc(r.ID)}')" title="ยกเลิกวงเงินนี้">🗑</button>
             </div>`
          : `<div class="btn-row" style="margin-top:10px;gap:8px;">
               <a href="pre-approves.html" class="btn btn-secondary btn-sm" style="flex:1;text-decoration:none;">👁 ดูที่หน้า Pre-Approve</a>
               <button class="btn btn-secondary btn-sm" style="flex:0 0 52px;padding-left:0;padding-right:0;color:#b91c1c;border-color:#fecaca;" onclick="cancelPre('${esc(r.ID)}')" title="ยกเลิกวงเงินนี้">🗑</button>
             </div>`}
      </div>`;
    }

    /*
     * ยกเลิกวงเงินที่ขอไว้แต่ไม่ได้ใช้
     * เดิมไม่มีปุ่มนี้ทั้งฝั่งพนักงานและหัวหน้า วงเงินเลยค้างในระบบตลอด
     * แล้วระบบก็เตือนทุกสัปดาห์ว่า "ถ้าไม่ได้ใช้แล้วกรุณาแจ้งหัวหน้าเพื่อยกเลิก" ไม่รู้จบ
     */
    window.cancelPre = async (id) => {
      const r = allReqs.find(x => x.ID === id);
      const what = r ? `${catLabel(r.Category)} งบ ${Number(r.PreApproveBudget||0).toLocaleString()} ฿` : 'วงเงินนี้';
      if (!confirm('ยกเลิก ' + what + ' ?\n\nยกเลิกแล้วกู้คืนไม่ได้ ถ้ายังต้องใช้ให้ขอใหม่')) return;
      showLoading('กำลังยกเลิก...');
      try {
        const res = await apiPost('deleteRequest', { id, requesterEmail: session.Email });
        hideLoading();
        if (res.error) throw new Error(res.error);
        showToast('ยกเลิกวงเงินแล้ว', 'success'); load();
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    window.viewDetail = (id) => {
      const r = allReqs.find(x => x.ID === id);
      if (!r) return;
      document.getElementById('detailTitle').textContent = catLabel(r.Category) + ' — ' + Number(r.Amount||0).toLocaleString() + ' ฿';
      const rows = [
        ['รหัส', r.ID], ['วันที่', toYMD(r.ExpenseDate) || '-'],
        ['สถานะ', statusTH(r.Status)], ['สถานที่ / รายละเอียด', r.Venue || '-'],
        ['ลูกค้า', r.Customer || '-'], ['ผู้ติดต่อ', r.CustomerContact || '-'],
        ['ต้นทาง', r.Origin || '-'], ['ปลายทาง', r.Destination || '-'],
        ['ระยะทาง', mileageOf(r) ? mileageOf(r) + ' กม.' : '-'],
        ['โอกาส', r.Occasion || '-'], ['ผู้ร่วม', r.Attendees || '-'],
        ['หมายเหตุ', cleanRemark(r.Remark) || '-'], ['ผู้อนุมัติ', r.ApprovedBy || '-']
      ];
      // แก้/ลบได้ทุกสถานะ — ระบบจะบล็อกเองถ้าเดือนนั้นปิดรอบ (ส่งบัญชีไปแล้ว)
      const canDelete = true;
      document.getElementById('detailContent').innerHTML =
        requestTimeline(r) + `<div class="detail-list">` + rows.map(([k,v]) =>
          `<div class="dl-row"><span class="k">${k}</span><span class="v">${esc(v)}</span></div>`).join('') + `</div>` +
        `<button class="btn btn-danger" style="margin-top:16px;" onclick="deleteReq('${esc(r.ID)}')">🗑 ลบคำขอนี้</button>`;
      document.getElementById('detailModal').classList.add('show');
    };
    window.closeDetail = () => document.getElementById('detailModal').classList.remove('show');

    let editFiles = [];   // ใบเสร็จที่เพิ่งเลือกในรอบแก้ไขนี้

    window.openEdit = (id) => {
      const r = allReqs.find(x => x.ID === id);
      if (!r) return;

      // 📋 Pre-Approve ที่อนุมัติงบแล้ว → ไปหน้าส่งบิลใช้จริง (บังคับแนบใบเสร็จ)
      if (r.Status === 'Finalized') {
        return showToast('ใบนี้ส่งบิลไปแล้ว — ดูบิลจริงในรายการด้านล่าง', 'error');
      }
      if (r.Status === 'PreApprove' && r.PreApproveStatus === 'Approved') {
        return location.href = 'finalize-claim.html?id=' + r.ID;
      }
      if (r.Status === 'PreApprove') {
        return showToast('ยังรอหัวหน้าอนุมัติงบอยู่ — แก้ไขที่หน้า Pre-Approve', 'error');
      }

      editFiles = [];
      const opts = categories.map(c => `<option value="${c.Code}" ${r.Category===c.Code?'selected':''}>${catLabel(c.Code)}</option>`).join('');
      const isFuel = r.Category === 'FUEL';
      let existing = [];
      try { existing = JSON.parse(r.ReceiptURLs || '[]'); } catch { existing = []; }
      if (!existing.length && r.ReceiptURL) existing = [r.ReceiptURL];

      document.getElementById('editContent').innerHTML = `
        <div class="warn-box">⚠️ ถ้าประเภทนี้ต้องอนุมัติ — หลังแก้ไขจะกลับเป็น <b>รออนุมัติ</b> ให้หัวหน้าอนุมัติใหม่<br>
          <span style="font-weight:400;font-size:12px;">เดือนที่ส่งบัญชีไปแล้ว (Export อนุมัติ) จะแก้ไม่ได้ ระบบจะแจ้งเตือน</span></div>
        <div class="field"><label>ประเภท</label><select id="e_cat">${opts}</select></div>
        <div class="field"><label>วันที่</label><input type="date" id="e_date" value="${toYMD(r.ExpenseDate)}"></div>
        <div class="field" id="e_kmField" style="display:${isFuel ? 'block' : 'none'};">
          <label>ระยะทาง (กม.) <span class="required">*</span></label>
          <input type="number" id="e_mileage" step="0.1" min="0" inputmode="decimal" value="${esc(r.Mileage_KM || '')}">
          <div class="hint">⛽ ค่าน้ำมันคิดจาก ระยะทาง × เรท — แก้ระยะทางแล้วยอดจะคำนวณใหม่ให้เอง</div>
        </div>
        <div class="field" id="e_amtField" style="display:${isFuel ? 'none' : 'block'};">
          <label>จำนวนเงิน (THB)</label>
          <input type="number" id="e_amount" step="0.01" inputmode="decimal" value="${esc(r.Amount || '')}">
        </div>
        <div class="field"><label>สถานที่ / รายละเอียด</label><input type="text" id="e_venue" value="${esc(r.Venue || '')}"></div>
        <div class="field"><label>ลูกค้า</label><input type="text" id="e_customer" value="${esc(r.Customer || '')}"></div>
        <div class="field"><label>เลข Job <span class="optional-tag">ไม่บังคับ</span></label>
          <input type="text" id="e_jobNo" value="${esc(r.JobNo || '')}" placeholder="เช่น J2026-0142"></div>
        <div class="field"><label>ผู้ติดต่อ</label><input type="text" id="e_contact" value="${esc(r.CustomerContact || '')}"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div class="field"><label>ต้นทาง</label><input type="text" id="e_origin" value="${esc(r.Origin || '')}"></div>
          <div class="field"><label>ปลายทาง</label><input type="text" id="e_dest" value="${esc(r.Destination || '')}"></div>
        </div>
        <div class="field">
          <label>ใบเสร็จ <span class="optional-tag">${existing.length ? 'มีอยู่แล้ว ' + existing.length + ' ไฟล์' : 'ยังไม่มี'}</span></label>
          <label for="e_files" class="upload-area">
            <input type="file" id="e_files" accept="image/*,application/pdf" multiple>
            <div class="icon-wrap">📎</div>
            <div class="text">แตะเพื่อแนบใบเสร็จเพิ่ม</div>
            <div class="sub">ภาพ/PDF · ไม่แนบก็ได้ ของเดิมจะอยู่เหมือนเดิม</div>
          </label>
          <div id="e_chips" style="margin-top:8px;"></div>
          ${existing.length ? `<label style="display:flex;align-items:center;gap:8px;margin-top:10px;font-size:12.5px;color:var(--gray-400);cursor:pointer;">
            <input type="checkbox" id="e_replace" style="width:auto;margin:0;"> ลบใบเสร็จเดิมทิ้ง แล้วใช้ไฟล์ใหม่แทน</label>` : ''}
        </div>
        <button class="btn btn-primary" onclick="saveEdit('${esc(r.ID)}')" style="margin-top:6px;">💾 บันทึกการแก้ไข</button>`;

      document.getElementById('e_files').addEventListener('change', onEditFiles);
      // เปลี่ยนประเภทเป็น/จาก FUEL แล้วต้องสลับช่องระยะทาง↔จำนวนเงิน
      document.getElementById('e_cat').addEventListener('change', function (e) {
        const fuel = e.target.value === 'FUEL';
        document.getElementById('e_kmField').style.display  = fuel ? 'block' : 'none';
        document.getElementById('e_amtField').style.display = fuel ? 'none' : 'block';
      });
      document.getElementById('editModal').classList.add('show');
    };

    async function onEditFiles(e) {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;
      if (editFiles.length + files.length > 10) return showToast('ไฟล์เกิน 10', 'error');
      for (const f of files) {
        if (f.size > 5 * 1024 * 1024) { showToast(f.name + ' ใหญ่เกิน 5 MB', 'error'); continue; }
        editFiles.push({ name: f.name, base64: await fileToBase64(f) });
      }
      e.target.value = '';
      renderEditChips();
    }

    function renderEditChips() {
      const c = document.getElementById('e_chips');
      if (!c) return;
      c.innerHTML = editFiles.map((f,i) =>
        `<span class="file-chip">📎 ${f.name.length>18?f.name.substr(0,15)+'...':f.name}<button type="button" onclick="removeEditFile(${i})">✕</button></span>`).join('');
    }
    window.removeEditFile = (i) => { editFiles.splice(i,1); renderEditChips(); };

    window.closeEdit = () => { editFiles = []; document.getElementById('editModal').classList.remove('show'); };

    window.saveEdit = async (id) => {
      const catNow = document.getElementById('e_cat').value;
      const kmEl = document.getElementById('e_mileage');
      if (catNow === 'FUEL' && !(parseFloat(kmEl && kmEl.value) > 0)) {
        return showToast('ใส่ระยะทางให้มากกว่า 0', 'error');
      }
      const updates = {
        Category: catNow,
        ExpenseDate: document.getElementById('e_date').value,
        Mileage_KM: parseFloat(kmEl && kmEl.value) || 0,
        Amount: parseFloat(document.getElementById('e_amount').value) || 0,
        Venue: document.getElementById('e_venue').value,
        Customer: document.getElementById('e_customer').value,
        CustomerContact: document.getElementById('e_contact').value,
        JobNo: (document.getElementById('e_jobNo') || {}).value || '',
        Origin: document.getElementById('e_origin').value,
        Destination: document.getElementById('e_dest').value
      };
      const repEl = document.getElementById('e_replace');
      const replaceReceipts = !!(repEl && repEl.checked);
      if (replaceReceipts && !editFiles.length) return showToast('เลือกไฟล์ใหม่ก่อน ถึงจะลบของเดิมได้', 'error');

      showLoading(editFiles.length ? 'กำลังอัปโหลดใบเสร็จ...' : 'กำลังบันทึก...');
      try {
        const r = await apiPost('updateRequest', {
          id, requesterEmail: session.Email, updates,
          newReceipts: editFiles, replaceReceipts
        });
        hideLoading();
        if (r.error) throw new Error(r.error);
        showToast('แก้ไขสำเร็จ ✅', 'success');
        closeEdit(); load();
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    window.deleteReq = async (id) => {
      const r = allReqs.find(x => x.ID === id);
      const d = r && r.ExpenseDate ? new Date(r.ExpenseDate).toLocaleDateString('th-TH',{day:'numeric',month:'short'}) : '';
      const what = r ? `${catLabel(r.Category)} ${Number(r.Amount||0).toLocaleString()} ฿ (${d})` : 'คำขอนี้';
      if (!confirm('ลบ ' + what + ' ?\n\nลบแล้วกู้คืนไม่ได้')) return;
      closeDetail();
      showLoading('กำลังลบ...');
      try {
        const r = await apiPost('deleteRequest', { id, requesterEmail: session.Email });
        hideLoading();
        if (r.error) throw new Error(r.error);
        showToast('ลบแล้ว', 'success'); load();
      } catch (err) { hideLoading(); showToast(err.message, 'error'); }
    };

    const linkedStatus=new URLSearchParams(location.search).get('status'); if(linkedStatus)document.getElementById('filterStatus').value=linkedStatus;
    if (session) { load(); renderBottomNav('status'); }
  
if(typeof applyFilters==='function')window.applyFilters=applyFilters;
if(typeof clearFilters==='function')window.clearFilters=clearFilters;
if(typeof load==='function')window.load=load;
if(typeof loadExportPeople==='function')window.loadExportPeople=loadExportPeople;
if(typeof onEditFiles==='function')window.onEditFiles=onEditFiles;
if(typeof renderEditChips==='function')window.renderEditChips=renderEditChips;
if(typeof renderItem==='function')window.renderItem=renderItem;
if(typeof renderList==='function')window.renderList=renderList;
if(typeof renderPreApproveItem==='function')window.renderPreApproveItem=renderPreApproveItem;
}}};
window.EXION_VIEWS["submit.html"]={html:"<header class=\"header\"><h1>\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e04\u0e33\u0e02\u0e2d</h1></header><main class=\"container\" id=\"pageContent\"></main>",css:"",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){
/* Per-user drafts include attachments. No background submission. */
const DraftStore={
 open(){return new Promise((resolve,reject)=>{const r=indexedDB.open('exion-workspace',1);r.onupgradeneeded=()=>r.result.createObjectStore('drafts');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});},
 async run(mode,key,value){const db=await this.open();return new Promise((resolve,reject)=>{const tx=db.transaction('drafts',mode),store=tx.objectStore('drafts');const r=mode==='readonly'?store.get(key):value===null?store.delete(key):store.put(value,key);let result;r.onsuccess=()=>result=r.result;tx.oncomplete=()=>{db.close();resolve(result);};tx.onerror=()=>{db.close();reject(tx.error);};});},
 get(key){return this.run('readonly',key);},put(key,value){return this.run('readwrite',key,value);},remove(key){return this.run('readwrite',key,null);}
};

;
(async()=>{
 const session=requireLogin();if(!session)return;renderWorkspaceNav('new');const root=document.getElementById('pageContent'),key='expense:'+session.Email.toLowerCase();
 let categories=[],rate=null,approver=null,items=[],pending=null,busy=false,metadataReady=false,saveChain=Promise.resolve();
 const fresh=()=>({id:crypto.randomUUID(),category:'',expenseDate:todayYMD(),amount:'',mileageKm:'',venue:'',origin:'',destination:'',customer:'',customerContact:'',jobNo:'',occasion:'',attendees:'',receipts:[]});
 root.innerHTML=pageHeading('สร้างคำขอเบิก','กรอกค่าใช้จ่าย แนบใบเสร็จ แล้วตรวจสอบก่อนส่ง')+'<div class="skeleton-box"></div>';

 let draft=null,storageError=false;try{draft=await DraftStore.get(key);}catch(e){storageError=true;}
 items=draft?.items?.length?draft.items:[fresh()];pending=draft?.pending||null;
 const legacy=localStorage.getItem('exion_draft_'+session.Email.toLowerCase());if(!draft&&legacy){try{const d=JSON.parse(legacy);if(d.items?.length){items=d.items.map(x=>({...fresh(),...x,receipts:[]}));showToast('กู้คืนร่างเดิมแล้ว กรุณาแนบใบเสร็จอีกครั้ง','info');}}catch(e){}}
 render();if(storageError)setSave('เครื่องนี้บันทึกร่างไม่ได้ กรุณาอย่าปิดหน้าระหว่างกรอก');else if(draft)setSave('กู้คืนร่างพร้อมไฟล์แนบ · '+new Date(draft.savedAt).toLocaleString('th-TH'));
 async function loadMetadata(){
 try{[categories,rate,approver]=await Promise.all([fetchCategories(),fetchFuelRate(session.Email),apiGet('getMyApprover')]);categories=categories.filter(c=>!['ENT','GOLF'].includes(c.Code));if(!categories.length)throw new Error('ยังไม่มีประเภทค่าใช้จ่าย กรุณาติดต่อผู้ดูแล');
 metadataReady=true;const focused=document.activeElement,id=focused?.id,start=focused?.selectionStart,end=focused?.selectionEnd;render();const next=id&&document.getElementById(id);if(next){next.focus();try{next.setSelectionRange(start,end);}catch(e){}}
 }catch(e){const box=document.getElementById('metadataState');if(box){box.textContent='โหลดประเภทและอัตราค่าใช้จ่ายไม่สำเร็จ ร่างยังอยู่ ';const retry=document.createElement('button');retry.type='button';retry.textContent='ลองใหม่';retry.onclick=()=>{retry.disabled=true;loadMetadata();};box.append(retry);}}
 }
 loadMetadata();
 function amount(it){return it.category==='FUEL'?Math.round(Number(it.mileageKm||0)*Number(rate?.rate||0)*100)/100:Number(it.amount||0);}
 function total(){return items.reduce((sum,it)=>sum+amount(it),0);}
 function setSave(text){const el=document.getElementById('saveState');if(el)el.textContent=text;}
 function save(){const snapshot={items:structuredClone(items),pending:pending?structuredClone(pending):null,savedAt:Date.now()};saveChain=saveChain.catch(()=>{}).then(()=>DraftStore.put(key,snapshot));saveChain.then(()=>setSave('บันทึกร่างและไฟล์แนบในเครื่องแล้ว · '+new Date().toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'}))).catch(()=>setSave('บันทึกร่างไม่สำเร็จ พื้นที่อาจเต็ม กรุณาอย่าปิดหน้านี้'));return saveChain;}
 function field(it,name,label,type='text',opts=''){return `<div class="field ${name==='venue'?'wide':''}"><label for="${it.id}-${name}">${label}</label><input id="${it.id}-${name}" data-field="${name}" type="${type}" value="${esc(it[name])}" ${opts}><div class="error" id="${it.id}-${name}-error"></div></div>`;}
 function card(it,index){const cat=categories.find(c=>c.Code===it.category),fuel=it.category==='FUEL';return `<details class="card expense-card" open data-item="${it.id}"><summary class="expense-card-head"><h2><span class="num">${String(index+1).padStart(2,'0')}</span>${esc(cat?catTH(cat.Code):'รายการค่าใช้จ่าย')}</h2><span><button type="button" class="icon-button" data-duplicate="${it.id}" aria-label="ทำสำเนารายการ ${index+1}">${icon('plus')} ทำสำเนา</button>${items.length>1?`<button type="button" class="icon-button" data-remove="${it.id}" aria-label="ลบรายการ ${index+1}">${icon('x')}</button>`:''}</span></summary><div class="form-grid"><div class="field"><label for="${it.id}-category">ประเภทค่าใช้จ่าย *</label><select id="${it.id}-category" data-field="category"><option value="">เลือกประเภท</option>${categories.map(c=>`<option value="${esc(c.Code)}" ${it.category===c.Code?'selected':''}>${esc(catTH(c.Code))}</option>`).join('')}</select><div class="error" id="${it.id}-category-error"></div></div>${field(it,'expenseDate','วันที่ใช้จ่าย *','date',`max="${todayYMD()}"`)}${fuel?field(it,'mileageKm','ระยะทาง (กม.) *','number','min="0.1" step="0.1" inputmode="decimal"'):field(it,'amount','จำนวนเงิน (บาท) *','number','min="0.01" step="0.01" inputmode="decimal" placeholder="0.00"')}${field(it,'jobNo','เลข Job (ถ้ามี)')}${field(it,'venue','รายละเอียดค่าใช้จ่าย','text','placeholder="เช่น ค่าทางด่วนไปพบลูกค้า"')}${fuel?field(it,'origin','ต้นทาง')+field(it,'destination','ปลายทาง'):''}${field(it,'customer','ลูกค้า (ถ้ามี)','text','list="customerSuggestions"')}${field(it,'customerContact','ผู้ติดต่อ (ถ้ามี)')}${cat?.NeedClaimForm==='YES'?field(it,'occasion','วัตถุประสงค์ / โอกาส *')+field(it,'attendees','รายชื่อผู้ร่วม *'):''}</div>${fuel?`<div class="form-hint">อัตราปัจจุบัน ${formatCurrency(rate?.rate)} บาท/กม. · <b>ยอดประมาณการ</b><br>ยอดที่บันทึกจริงคำนวณจากอัตราตามรอบของวันที่ใช้จ่าย และอาจปรับตามราคาน้ำมันประจำรอบ</div>`:''}<label class="upload-area" for="${it.id}-files"><input type="file" id="${it.id}-files" data-files="${it.id}" accept="image/jpeg,image/png,image/webp,application/pdf" multiple>${icon('camera')}<div class="text">แนบใบเสร็จ ${cat?.NeedReceipt==='YES'?'*':'(ถ้ามี)'}</div><div class="sub">เลือกไฟล์ / ถ่ายภาพ · JPG, PNG, WebP, PDF · ไม่เกิน 5 MB ต่อไฟล์</div></label><div class="error" id="${it.id}-files-error" style="color:var(--bad);font-size:12px"></div><div class="attachment-list">${it.receipts.map((f,i)=>`<div class="attachment">${f.base64.startsWith('data:image/')?`<img src="${esc(f.base64)}" alt="ตัวอย่างใบเสร็จ">`:icon('receipt')}<button type="button" class="icon-button" data-preview="${it.id}:${i}"><span>${esc(f.name)}</span></button><button class="icon-button" type="button" data-file-remove="${it.id}:${i}" aria-label="ลบไฟล์ ${esc(f.name)}">${icon('x')}</button></div>`).join('')}</div></details>`;}
 function render(){root.innerHTML=pageHeading('สร้างคำขอเบิก','เพิ่มได้หลายรายการ บันทึกร่างพร้อมใบเสร็จอัตโนมัติ')+`${!metadataReady?'<div class="warn-box" id="metadataState" role="status">กำลังโหลดประเภทและอัตราค่าใช้จ่าย · กรอกข้อมูลและแนบใบเสร็จรอได้</div>':''}<div class="stepper"><span class="active"><b>1</b> กรอกรายการ</span><i></i><span><b>2</b> ตรวจสอบ</span><i></i><span><b>3</b> ส่งคำขอ</span></div>${pending?'<div class="draft-banner" role="status"><div><b>รอตรวจสอบผลการส่งครั้งก่อน</b><small>ข้อมูลชุดนี้ถูกล็อกชั่วคราว กดตรวจสอบและส่งซ้ำด้วยรหัสเดิมเพื่อป้องกันรายการซ้ำ</small></div></div>':''}<div class="expense-layout"><section><div id="expenseItems">${items.map(card).join('')}</div><button type="button" id="addItem" class="btn btn-secondary" style="width:100%;border-style:dashed!important">${icon('plus')} เพิ่มรายการใหม่</button><div class="form-footer">ค่ารับรอง / กอล์ฟ ต้อง <a href="pre-approve.html">ขออนุมัติงบล่วงหน้า →</a></div></section><aside class="expense-summary"><div class="card"><h3>สรุปคำขอ</h3><div class="summary-line"><span>รายการค่าใช้จ่าย</span><b id="itemCount">${items.length} รายการ</b></div><div class="summary-line"><span>ใบเสร็จ</span><b id="fileCount">${items.reduce((a,it)=>a+it.receipts.length,0)} ไฟล์</b></div><div class="subtle" style="margin-top:18px">ยอดรวม${items.some(it=>it.category==='FUEL')?'ประมาณการ':''} (บาท)</div><div class="total" id="formTotal">${formatCurrency(total())}</div><button class="btn btn-primary" id="reviewBtn">${pending?'ตรวจสอบและส่งซ้ำ':'ตรวจสอบก่อนส่ง →'}</button><div class="save-indicator" id="saveState" role="status">ร่างบันทึกในเครื่องนี้ เฉพาะบัญชีของคุณ</div><button class="icon-button" id="clearDraft">ล้างร่างนี้</button></div><div class="card note-card"><strong>ผู้รับอนุมัติ</strong>${esc(approver?.name||approver?.email||'ตามประเภทค่าใช้จ่ายและสายอนุมัติ')}<br>ประเภทที่ไม่ต้องอนุมัติจะบันทึกสำเร็จทันที</div></aside></div><div class="mobile-submit-bar"><div><small>รวม${items.some(it=>it.category==='FUEL')?'ประมาณการ':''} (บาท)</small><strong id="mobileTotal">${formatCurrency(total())}</strong></div><button class="btn btn-primary" id="mobileReview">${pending?'ตรวจสอบการส่ง':'ตรวจสอบก่อนส่ง'}</button></div><datalist id="customerSuggestions"></datalist>`;
 root.querySelectorAll('[data-field]').forEach(el=>el.addEventListener(el.tagName==='SELECT'?'change':'input',()=>{const it=items.find(i=>i.id===el.closest('[data-item]').dataset.item);it[el.dataset.field]=el.value;if(el.dataset.field==='category'){render();}else {document.getElementById('formTotal').textContent=formatCurrency(total());document.getElementById('mobileTotal').textContent=formatCurrency(total());}save();}));
 document.getElementById('addItem').onclick=()=>{if(items.length>=50){showToast('ส่งได้ครั้งละไม่เกิน 50 รายการ','error');return;}items.push(fresh());render();save();root.querySelector('[data-item]:last-child input')?.focus();};
 root.querySelectorAll('[data-duplicate]').forEach(b=>b.onclick=e=>{e.preventDefault();if(items.length>=50){showToast('ส่งได้ครั้งละไม่เกิน 50 รายการ','error');return;}const it=items.find(x=>x.id===b.dataset.duplicate);items.push({...structuredClone(it),id:crypto.randomUUID(),receipts:[]});render();save();showToast('ทำสำเนาข้อมูลแล้ว กรุณาแนบใบเสร็จของรายการใหม่');});
 root.querySelectorAll('[data-remove]').forEach(b=>b.onclick=async e=>{e.preventDefault();if(!await confirmDialog('ลบรายการนี้?','ข้อมูลและไฟล์แนบของรายการนี้จะถูกนำออกจากร่าง','ลบรายการ'))return;items=items.filter(x=>x.id!==b.dataset.remove);render();save();});
 root.querySelectorAll('[data-files]').forEach(input=>input.onchange=async()=>{const it=items.find(x=>x.id===input.dataset.files);try{for(const file of input.files){if(!['image/jpeg','image/png','image/webp','application/pdf'].includes(file.type))throw new Error('รองรับ JPG, PNG, WebP และ PDF เท่านั้น');if(file.size>5*1024*1024)throw new Error('ไฟล์ '+file.name+' ใหญ่เกิน 5 MB');if(it.receipts.length>=8)throw new Error('แนบได้ไม่เกิน 8 ไฟล์ต่อรายการ');it.receipts.push({name:file.name,base64:await fileToBase64(file)});}render();await save();}catch(e){render();save();showToast(e.message,'error');}});
 root.querySelectorAll('[data-file-remove]').forEach(b=>b.onclick=()=>{const [id,n]=b.dataset.fileRemove.split(':');items.find(x=>x.id===id).receipts.splice(Number(n),1);render();save();});
 root.querySelectorAll('[data-preview]').forEach(b=>b.onclick=()=>{const[id,n]=b.dataset.preview.split(':'),f=items.find(x=>x.id===id).receipts[n];if(f.base64.startsWith('data:image/'))openImageViewer(f.base64);else{const bytes=Uint8Array.from(atob(f.base64.split(',')[1]),c=>c.charCodeAt(0)),url=URL.createObjectURL(new Blob([bytes],{type:'application/pdf'}));window.open(url,'_blank','noopener');setTimeout(()=>URL.revokeObjectURL(url),60000);}});
 document.getElementById('clearDraft').onclick=async()=>{if(await confirmDialog('ล้างร่างนี้?','รายการและไฟล์แนบในร่างนี้จะถูกลบ','ล้างร่าง')){await saveChain.catch(()=>{});await DraftStore.remove(key);localStorage.removeItem('exion_draft_'+session.Email.toLowerCase());items=[fresh()];render();}};
 document.getElementById('reviewBtn').onclick=()=>pending?send():review();document.getElementById('mobileReview').onclick=()=>pending?send():review();
 if(!metadataReady){root.querySelectorAll('[data-field=category],#reviewBtn,#mobileReview').forEach(x=>x.disabled=true);}
 if(pending)root.querySelectorAll('input,select,textarea,[data-remove],[data-duplicate],[data-file-remove],#addItem,#clearDraft').forEach(x=>x.disabled=true);
 }
 function validate(){root.querySelectorAll('.error').forEach(x=>x.textContent='');root.querySelectorAll('[aria-invalid]').forEach(x=>x.removeAttribute('aria-invalid'));let first=null;items.forEach(it=>{const cat=categories.find(c=>c.Code===it.category);const errors=[];if(!cat)errors.push(['category','เลือกประเภทค่าใช้จ่าย']);if(!it.expenseDate||it.expenseDate>todayYMD()||it.expenseDate<'2020-01-01')errors.push(['expenseDate','เลือกวันที่ใช้จ่ายจริง ไม่เกินวันนี้']);const field=it.category==='FUEL'?'mileageKm':'amount';if(!Number.isFinite(Number(it[field]))||Number(it[field])<=0)errors.push([field,'กรอกตัวเลขมากกว่า 0']);if(cat?.NeedReceipt==='YES'&&!it.receipts.length)errors.push(['files','ประเภทนี้ต้องแนบใบเสร็จ']);if(cat?.NeedClaimForm==='YES')['venue','occasion','attendees'].forEach(f=>{if(!String(it[f]||'').trim())errors.push([f,'กรอกข้อมูลนี้ให้ครบ']);});errors.forEach(([f,msg])=>{const el=document.getElementById(it.id+'-'+f);document.getElementById(it.id+'-'+f+'-error').textContent=msg;el.setAttribute('aria-invalid','true');el.setAttribute('aria-describedby',it.id+'-'+f+'-error');el.closest('details').open=true;if(!first)first=el;});});if(first){first.focus();first.scrollIntoView({block:'center',behavior:'smooth'});return false;}return true;}
 async function review(){if(!validate())return;const fileBytes=items.reduce((sum,it)=>sum+it.receipts.reduce((a,f)=>a+Math.floor(f.base64.split(',')[1].length*3/4),0),0);if(fileBytes>20*1024*1024){showToast('ไฟล์รวมเกิน 20 MB กรุณาลดขนาดไฟล์หรือแบ่งคำขอ','error');return;}const d=document.createElement('dialog');d.className='review-dialog';d.innerHTML=`<div class="eyebrow">REVIEW YOUR REQUEST</div><h2>ตรวจสอบก่อนส่ง</h2><p class="subtle">${esc(session.Name)} · ผู้รับอนุมัติ ${esc(approver?.name||approver?.email||'ตามประเภท')}</p><div class="review-list">${items.map(it=>`<div class="review-row"><div>${esc(catTH(it.category))}<small>${esc(it.expenseDate)} · ใบเสร็จ ${it.receipts.length} ไฟล์</small></div><b>${formatCurrency(amount(it))}</b></div>`).join('')}<div class="review-row review-total"><span>รวม${items.some(it=>it.category==='FUEL')?'ประมาณการ':''}</span><span>${formatCurrency(total())} บาท</span></div></div><div class="dialog-actions"><button class="btn btn-secondary" id="backToForm">กลับไปแก้ไข</button><button class="btn btn-primary" id="confirmSend">ยืนยันส่งคำขอ</button></div>`;document.body.append(d);d.querySelector('#backToForm').onclick=()=>d.close();d.onclose=()=>d.remove();d.querySelector('#confirmSend').onclick=async()=>{pending={batchId:'BATCH-'+crypto.randomUUID(),staffEmail:session.Email,items:structuredClone(items).map(({id,...it})=>it)};try{await save();}catch(e){pending=null;showToast('บันทึกร่างก่อนส่งไม่สำเร็จ กรุณาตรวจพื้นที่จัดเก็บแล้วลองอีกครั้ง','error');return;}d.close();render();send();};d.showModal();}
 async function send(){if(busy)return;if(!navigator.onLine){showToast('ยังออฟไลน์ กรุณาเชื่อมต่ออินเทอร์เน็ตแล้วส่งอีกครั้ง','error');return;}busy=true;document.getElementById('reviewBtn').disabled=true;document.getElementById('mobileReview').disabled=true;showLoading('กำลังบันทึกคำขอ กรุณารอสักครู่');try{const r=await submitBatch(pending);if(!r.ok||(r.items||[]).length!==pending.items.length)throw new Error('ผลการบันทึกยังไม่ครบ กรุณาติดต่อผู้ดูแลพร้อมรหัสชุด '+pending.batchId);const ids=r.items.map(x=>x.id);await saveChain.catch(()=>{});await DraftStore.remove(key);localStorage.removeItem('exion_draft_'+session.Email.toLowerCase());pending=null;hideLoading();root.innerHTML=`<div class="card result-success"><div class="success-mark">${icon('check')}</div><div class="eyebrow">REQUEST SUBMITTED</div><h1>ส่งคำขอเรียบร้อยแล้ว</h1><p>บันทึกครบ ${ids.length} รายการ<br>ติดตามผลและรายละเอียดได้ในคำขอของฉัน</p><div class="review-total">${formatCurrency(r.items.reduce((a,x)=>a+Number(x.amount||0),0))} บาท</div><p>${ids.map(esc).join('<br>')}</p><div class="dialog-actions"><a class="btn btn-secondary" href="submit.html">สร้างคำขอใหม่</a><a class="btn btn-primary" href="status.html">ติดตามคำขอ →</a></div></div>`;}catch(e){hideLoading();if(e.code==='VALIDATION'){pending=null;save();}render();showToast(e.message+' · ร่างและไฟล์แนบยังอยู่','error');}finally{busy=false;}}
})();

if(typeof amount==='function')window.amount=amount;
if(typeof card==='function')window.card=card;
if(typeof field==='function')window.field=field;
if(typeof loadMetadata==='function')window.loadMetadata=loadMetadata;
if(typeof render==='function')window.render=render;
if(typeof review==='function')window.review=review;
if(typeof save==='function')window.save=save;
if(typeof send==='function')window.send=send;
if(typeof setSave==='function')window.setSave=setSave;
if(typeof total==='function')window.total=total;
if(typeof validate==='function')window.validate=validate;
}}};
window.EXION_VIEWS["summary.html"]={html:"\n  <div class=\"header\">\n    <button class=\"back\" aria-label=\"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a\" onclick=\"location.href='index.html'\" id=\"backBtn\"></button>\n    <h1><img src=\"icons/logo.png\" alt=\"EXION\" class=\"logo\"><span style=\"font-size:13px;font-weight:700;margin-left:6px;\">\u0e2a\u0e23\u0e38\u0e1b\u0e20\u0e32\u0e1e\u0e23\u0e27\u0e21</span></h1>\n  </div>\n\n  <div class=\"container\">\n    <div class=\"card\" style=\"padding:14px;\">\n      <div style=\"display:flex;align-items:center;gap:10px;margin-bottom:9px;\">\n        <span class=\"sec-label\" style=\"margin:0;flex:1;\">\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e40\u0e14\u0e37\u0e2d\u0e19</span>\n        <select id=\"fYear\" style=\"width:auto;padding:7px 10px;font-size:12.5px;border-radius:10px;border:1.5px solid var(--gray-200);font-family:inherit;font-weight:700;\"></select>\n      </div>\n      <div class=\"mbar\" id=\"mbar\"></div>\n\n      <div id=\"scopeWrap\" style=\"display:none;\">\n        <div class=\"seg\" id=\"scopeSeg\">\n          <button type=\"button\" data-s=\"__self__\" class=\"on\">\ud83d\udc64 \u0e15\u0e31\u0e27\u0e40\u0e2d\u0e07</button>\n          <button type=\"button\" data-s=\"__all__\">\ud83d\udc65 \u0e17\u0e38\u0e01\u0e04\u0e19</button>\n        </div>\n        <div class=\"field\" style=\"margin:9px 0 0;\">\n          <select id=\"fPerson\"><option value=\"\">\u2014 \u0e2b\u0e23\u0e37\u0e2d\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e23\u0e32\u0e22\u0e1a\u0e38\u0e04\u0e04\u0e25 \u2014</option></select>\n        </div>\n      </div>\n\n      <div class=\"seg\" id=\"stSeg\">\n        <button type=\"button\" data-st=\"\" class=\"on\">\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14</button>\n        <button type=\"button\" data-st=\"Approved\">\u2705 \u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34</button>\n        <button type=\"button\" data-st=\"Pending\">\u23f3 \u0e23\u0e2d\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34</button>\n      </div>\n    </div>\n\n    <div id=\"loading\" class=\"loading\"><div class=\"spinner\"></div></div>\n    <div id=\"content\" style=\"display:none;\"></div>\n  </div>\n\n  <div id=\"fsOverlay\" class=\"fs-overlay\">\n    <div class=\"fs-head\">\n      <div><div class=\"t\">\ud83d\udccb \u0e15\u0e32\u0e23\u0e32\u0e07\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25</div><div class=\"s\" id=\"fsSub\">\u2014</div></div>\n      <button onclick=\"closeFs()\">\u2715</button>\n    </div>\n    <div class=\"rotate-hint\">\ud83d\udcf1 \u0e2b\u0e21\u0e38\u0e19\u0e08\u0e2d\u0e40\u0e1b\u0e47\u0e19\u0e41\u0e19\u0e27\u0e19\u0e2d\u0e19 \u0e08\u0e30\u0e40\u0e2b\u0e47\u0e19\u0e44\u0e14\u0e49\u0e01\u0e27\u0e49\u0e32\u0e07\u0e02\u0e36\u0e49\u0e19</div>\n    <div class=\"fs-body\" id=\"fsBody\"></div>\n  </div>\n\n  \n  \n  \n  \n  \n  \n",css:"\n    /* \u2500\u2500 \u0e41\u0e16\u0e1a\u0e40\u0e14\u0e37\u0e2d\u0e19 \u2500\u2500 */\n    .mbar { display:flex; gap:7px; overflow-x:auto; padding:2px 0 4px; -webkit-overflow-scrolling:touch; scrollbar-width:none; }\n    .mbar::-webkit-scrollbar { display:none; }\n    .mchip {\n      flex:0 0 auto; padding:8px 15px; border-radius:999px;\n      border:1.5px solid var(--gray-200); background:#fff;\n      font-size:12.5px; font-weight:700; color:var(--gray-600);\n      cursor:pointer; font-family:inherit; white-space:nowrap; min-height:40px; transition:all .14s;\n    }\n    .mchip.on { background:linear-gradient(135deg,#B7081D,#8B0616); color:#fff; border-color:transparent;\n                box-shadow:0 4px 12px rgba(183,8,29,.26); }\n\n\n    .trend {\n      display:inline-flex; align-items:center; gap:5px; margin-top:9px;\n      background:rgba(255,255,255,.2); border:1px solid rgba(255,255,255,.28);\n      padding:4px 12px; border-radius:999px; font-size:12px; font-weight:700; backdrop-filter:blur(8px);\n    }\n\n    /* \u2500\u2500 \u0e01\u0e23\u0e32\u0e1f\u0e08\u0e31\u0e14\u0e2d\u0e31\u0e19\u0e14\u0e31\u0e1a\u0e04\u0e19 \u2500\u2500 */\n    .rank-row { display:grid; grid-template-columns:34px 1fr auto; gap:10px; align-items:center;\n                padding:9px 0; cursor:pointer; border-bottom:1px solid var(--gray-100); }\n    .rank-row:last-child { border-bottom:none; }\n    .rank-row:active { background:var(--gray-50); }\n    .rk-badge { width:30px; height:30px; border-radius:10px; display:flex; align-items:center;\n                justify-content:center; font-size:12px; font-weight:800; color:#fff; flex-shrink:0; }\n    .rk-name { font-size:13px; font-weight:700; color:var(--gray-900); margin-bottom:5px;\n               overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }\n    .rk-track { height:9px; border-radius:999px; background:var(--gray-100); overflow:hidden; }\n    .rk-fill { height:100%; border-radius:999px; transition:width .6s cubic-bezier(.4,0,.2,1); }\n    .rk-right { text-align:right; }\n    .rk-amt { font-size:14px; font-weight:800; color:var(--gray-900); font-variant-numeric:tabular-nums; }\n    .rk-pct { font-size:11px; color:var(--gray-400); }\n\n    /* \u2500\u2500 \u0e01\u0e23\u0e32\u0e1f\u0e23\u0e32\u0e22\u0e27\u0e31\u0e19 \u2500\u2500 */\n    .daily { display:flex; align-items:flex-end; gap:2px; height:110px; margin-top:14px; }\n    .dcol { flex:1; display:flex; flex-direction:column; justify-content:flex-end; height:100%;\n            position:relative; cursor:pointer; }\n    .dbar { width:100%; border-radius:3px 3px 0 0; background:linear-gradient(180deg,#B7081D,#E11D48);\n            min-height:2px; transition:height .5s cubic-bezier(.4,0,.2,1); }\n    .dbar.zero { background:var(--gray-100); }\n    .daily-x { display:flex; gap:2px; margin-top:5px; }\n    .daily-x span { flex:1; text-align:center; font-size:11px; color:var(--gray-400); }\n    .dtip {\n      position:absolute; bottom:100%; left:50%; transform:translateX(-50%);\n      background:var(--gray-900); color:#fff; font-size:11px; font-weight:700;\n      padding:4px 8px; border-radius:6px; white-space:nowrap; display:none; z-index:5; margin-bottom:4px;\n    }\n    .dcol.show .dtip { display:block; }\n\n    /* \u2500\u2500 \u0e42\u0e14\u0e19\u0e31\u0e17 \u2500\u2500 */\n    .donut-wrap { display:flex; align-items:center; gap:16px; margin-top:14px; }\n    .donut { flex:0 0 128px; position:relative; }\n    .donut svg { transform:rotate(-90deg); display:block; }\n    .donut-mid { position:absolute; inset:0; display:flex; flex-direction:column;\n                 align-items:center; justify-content:center; pointer-events:none; }\n    .donut-mid .n { font-size:19px; font-weight:800; letter-spacing:-.03em; color:var(--gray-900); line-height:1.1; }\n    .donut-mid .l { font-size:11px; color:var(--gray-400); font-weight:600; }\n    .legend { flex:1; min-width:0; }\n    .lg-row { display:flex; align-items:center; gap:8px; margin-bottom:7px; font-size:12px; }\n    .lg-dot { width:11px; height:11px; border-radius:4px; flex-shrink:0; }\n    .lg-name { flex:1; color:var(--gray-700); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }\n    .lg-val { font-weight:800; color:var(--gray-900); font-variant-numeric:tabular-nums; }\n\n    /* \u2500\u2500 \u0e23\u0e32\u0e22\u0e0a\u0e37\u0e48\u0e2d\u0e25\u0e39\u0e01\u0e04\u0e49\u0e32 \u2500\u2500 */\n    .cust-row { display:flex; align-items:center; gap:10px; padding:9px 0;\n                border-bottom:1px solid var(--gray-100); font-size:12.5px; }\n    .cust-row:last-child { border-bottom:none; }\n    .cust-rank { width:22px; height:22px; border-radius:7px; background:var(--gray-100);\n                 color:var(--gray-600); display:flex; align-items:center; justify-content:center;\n                 font-size:11px; font-weight:800; flex-shrink:0; }\n    .cust-name { flex:1; color:var(--gray-800); font-weight:600; overflow:hidden;\n                 text-overflow:ellipsis; white-space:nowrap; }\n    .cust-amt { font-weight:800; color:var(--accent); font-variant-numeric:tabular-nums; }\n\n    /* \u2500\u2500 \u0e15\u0e32\u0e23\u0e32\u0e07 Excel (\u0e1e\u0e31\u0e1a\u0e44\u0e14\u0e49) \u2500\u2500 */\n    .foldable .fold-body { display:none; }\n    .foldable.open .fold-body { display:block; }\n    .fold-btn { display:flex; align-items:center; justify-content:center; gap:6px;\n                width:100%; margin-top:12px; padding:11px; min-height:44px;\n                background:var(--gray-50); border:1.5px solid var(--gray-200); border-radius:12px;\n                font-size:12.5px; font-weight:700; color:var(--gray-600); cursor:pointer; font-family:inherit; }\n    .foldable.open .fold-btn .arw { transform:rotate(180deg); }\n    .fold-btn .arw { transition:transform .2s; }\n\n    table.xl { min-width:900px; }\n    table.xl td.ctr, table.xl th.ctr { text-align:center; }\n    table.xl td.sm { font-size:11px; }\n    table.xl td, table.xl th { white-space:nowrap; }\n    table.xl td.sm, table.xl td:nth-child(4), table.xl td:nth-child(5) { white-space:normal; }\n    table.xl tr.person-hdr td { background:linear-gradient(90deg,#B7081D,#7A0512); color:#fff;\n      font-weight:800; padding:9px; font-size:12px; letter-spacing:-.01em; }\n\n    .tbl-bar { display:flex; gap:7px; align-items:center; flex-wrap:wrap; margin-bottom:10px; }\n    .tbl-bar button { padding:7px 12px; border:1.5px solid var(--gray-200); background:#fff;\n      border-radius:999px; font-size:11.5px; font-weight:700; color:var(--gray-600);\n      cursor:pointer; font-family:inherit; min-height:40px; }\n    .tbl-bar .spacer { flex:1; }\n\n    /* \u2500\u2500 \u0e40\u0e15\u0e47\u0e21\u0e08\u0e2d \u2500\u2500 */\n    .fs-overlay { position:fixed; inset:0; z-index:4000; background:#fff; display:none; flex-direction:column; }\n    .fs-overlay.show { display:flex; }\n    .fs-head { display:flex; align-items:center; gap:10px; padding:12px 14px;\n      background:linear-gradient(135deg,#B7081D,#8B0616); color:#fff; flex-shrink:0; }\n    .fs-head .t { font-weight:800; font-size:14px; }\n    .fs-head .s { font-size:11px; opacity:.85; }\n    .fs-head button { margin-left:auto; background:rgba(255,255,255,.2);\n      border:1px solid rgba(255,255,255,.3); color:#fff; width:44px; height:44px;\n      border-radius:50%; font-size:16px; font-weight:700; cursor:pointer; }\n    .fs-body { flex:1; overflow:auto; -webkit-overflow-scrolling:touch; padding:10px; }\n    .fs-body .xl-wrap { border:none; overflow:visible; }\n    .fs-body table.xl { min-width:100%; font-size:12.5px; }\n    .rotate-hint { background:#FEF3C7; color:#92400E; font-size:11.5px; font-weight:700;\n      padding:8px 12px; text-align:center; flex-shrink:0; }\n    @media (orientation:landscape) { .rotate-hint { display:none; } }\n  ",mount:function(window,document,location,history,setTimeout,clearTimeout,setInterval,clearInterval,MutationObserver){window.EXION_SHARED[0].apply(null,arguments);with(window){

    const session = requireLogin();
    const bb = document.getElementById('backBtn');
    if (bb && typeof icon === 'function') bb.innerHTML = icon('back');

    let raw = { scope:'self', myName:'', staffList:[], items:[] };
    let fStatus = '', selMonth = new Date().getMonth() + 1, scope = '__self__';
    let lastItems = [], lastGroupBy = false, lastSub = '';

    const MONTHS = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
    const MONTHS_FULL = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];

    const CAT_TH = catMap();   // 🔴 รวมไว้ที่ js/app.js แล้ว ห้ามก๊อปตารางมาไว้ในหน้าอีก
    const PALETTE = ['#B7081D','#2563EB','#16A34A','#D97706','#7C3AED',
                     '#0D9488','#DB2777','#0891B2','#65A30D','#E11D48','#4F46E5','#EA580C'];
    const CAT_COLORS = ['#B7081D','#F59E0B','#2563EB','#16A34A','#7C3AED',
                        '#0D9488','#DB2777','#64748B','#EA580C','#0891B2'];
    const personColor = {};   // ชื่อ → สีประจำตัว คงที่ทุกครั้งที่เปิด

    // ── ตัวเลือกปี / เดือน ──
    const ySel = document.getElementById('fYear');
    const now = new Date();
    for (let y = now.getFullYear(); y >= now.getFullYear() - 3; y--) {
      const o = document.createElement('option'); o.value = y; o.textContent = y;
      if (y === now.getFullYear()) o.selected = true; ySel.appendChild(o);
    }
    ySel.addEventListener('change', reload);

    function buildMonthBar() {
      const bar = document.getElementById('mbar');
      bar.innerHTML = MONTHS.map((m,i) =>
        `<button type="button" class="mchip ${i+1===selMonth?'on':''}" data-m="${i+1}">${m}</button>`).join('');
      bar.querySelectorAll('.mchip').forEach(b => b.addEventListener('click', () => {
        selMonth = parseInt(b.dataset.m);
        bar.querySelectorAll('.mchip').forEach(x => x.classList.remove('on'));
        b.classList.add('on');
        reload();
      }));
      setTimeout(() => {
        const on = bar.querySelector('.mchip.on');
        if (on) bar.scrollLeft = on.offsetLeft - bar.clientWidth/2 + on.clientWidth/2;
      }, 50);
    }

    // ── ปุ่มสถานะ ──
    document.getElementById('stSeg').querySelectorAll('button').forEach(b => {
      b.addEventListener('click', () => {
        fStatus = b.dataset.st;
        document.getElementById('stSeg').querySelectorAll('button').forEach(x => x.classList.remove('on'));
        b.classList.add('on');
        render();
      });
    });

    async function load() {
      buildMonthBar();
      try {
        const [r, cats] = await Promise.all([
          apiGet('getVisibleRequests', { email: session.Email, year: ySel.value, month: selMonth }),
          fetchCategories().catch(() => [])
        ]);
        if (r.error) throw new Error(r.error);
        raw = r;
        (Array.isArray(cats) ? cats : []).forEach(c => { if (c.NameTH) CAT_TH[c.Code] = c.NameTH; });

        if (raw.scope === 'team' || raw.scope === 'all') {
          document.getElementById('scopeWrap').style.display = 'block';
          const pSel = document.getElementById('fPerson');
          pSel.innerHTML = '<option value="">— หรือเลือกรายบุคคล —</option>';
          (raw.staffList || []).forEach(n => {
            const o = document.createElement('option'); o.value = n; o.textContent = '👤 ' + n; pSel.appendChild(o);
          });
          pSel.addEventListener('change', () => {
            if (pSel.value) {
              scope = pSel.value;
              document.getElementById('scopeSeg').querySelectorAll('button').forEach(x => x.classList.remove('on'));
            }
            render();
          });
          document.getElementById('scopeSeg').querySelectorAll('button').forEach(b => {
            b.addEventListener('click', () => {
              scope = b.dataset.s;
              pSel.value = '';
              document.getElementById('scopeSeg').querySelectorAll('button').forEach(x => x.classList.remove('on'));
              b.classList.add('on');
              render();
            });
          });
        }
        (raw.staffList || []).forEach((n,i) => personColor[n] = PALETTE[i % PALETTE.length]);
        render();
      } catch (err) { fail(err.message); }
    }

    /** เปลี่ยนเดือน/ปี → ดึงใหม่จาก server (กรองฝั่ง server) */
    async function reload() {
      /*
       * 🔴 เปลี่ยนเดือน/ปี ต้องคำนวณช่วงวันใหม่ด้วย
       *    เดิมไม่รีเซ็ต rangeReady → กดเดือนอื่นแล้วช่วงวันยังค้างเดือนเก่า
       *    ตารางเลยว่างเปล่าทั้งที่มีข้อมูล
       */
      rangeReady = false;
      const ld = document.getElementById('loading');
      document.getElementById('content').style.display = 'none';
      ld.style.display = ''; ld.classList.add('loading');
      ld.innerHTML = '<div class="spinner"></div>';
      try {
        const r = await apiGet('getVisibleRequests', { email: session.Email, year: ySel.value, month: selMonth });
        if (r.error) throw new Error(r.error);
        raw = r;
        (raw.staffList || []).forEach((n,i) => { if (!personColor[n]) personColor[n] = PALETTE[i % PALETTE.length]; });
        render();
      } catch (err) { fail(err.message); }
    }

    function fail(msg) {
      const ld = document.getElementById('loading');
      ld.classList.remove('loading');
      ld.innerHTML = `<div class="empty"><div class="icon-wrap">⚠️</div>
        <div class="title">โหลดข้อมูลไม่สำเร็จ</div><div class="sub">${msg}</div>
        <button class="btn btn-primary btn-sm" style="margin-top:14px;max-width:180px;" onclick="location.reload()">🔄 ลองใหม่</button></div>`;
    }

    /* ══════════════════════════════════════════════════════════
     *  ช่วงวันที่จะเบิก — เลือกเองทั้งวันเริ่มและวันจบ
     * ──────────────────────────────────────────────────────────
     *  กฎเดียว ไม่มีข้อยกเว้น:
     *      เลือกตั้งแต่วันไหน ถึงวันไหน → เอาทุกรายการในช่วงนั้น
     *  เลือกถึงวันที่ 26 ก็ได้ของวันที่ 26 ด้วย ทุกประเภทเหมือนกันหมด
     *
     *  ตัวเลขบนหน้านี้ = ตัวเลขในไฟล์ Excel เสมอ เพราะใช้ช่วงวันเดียวกัน
     * ══════════════════════════════════════════════════════════ */
    let dFrom = '', dTo = '', extraItems = [], rangeReady = false;

    /** 2026-08-26 → 26 ส.ค. 2569 */
    function fmtTH(v) {
      if (!v) return '-';
      const d = new Date(String(v).length === 10 ? v + 'T00:00:00' : v);
      if (isNaN(d)) return '-';
      return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + (d.getFullYear() + 543);
    }

    /** ดูอยู่คนเดียวหรือเปล่า — เลือกช่วงวันได้เฉพาะรายคน เพราะแต่ละคนรอบไม่เหมือนกัน */
    function currentStaffEmail() {
      if (scope === '__all__') return '';
      if (scope === '__self__') return session.Email;
      const hit = (raw.items || []).find(r => r.StaffName === scope);
      return hit ? String(hit.StaffEmail || '') : '';
    }

    /** ตั้งค่าเริ่มต้นของช่วงวันจากรอบที่ระบบแนะนำ (ผู้ใช้แก้ทับได้) */
    async function ensureRange(force) {
      const em = currentStaffEmail();
      if (!em) { dFrom = dTo = ''; extraItems = []; rangeReady = false; return; }
      if (!force && rangeReady && dFrom && dTo) return loadMonthsForRange();
      try {
        const p = await apiGet('getPeriodInfo', { email: em, year: ySel.value, month: selMonth });
        dFrom = (p && p.rangeStart) || '';
        dTo   = (p && p.rangeEnd)   || '';
      } catch (e) { dFrom = dTo = ''; }
      if (!dFrom || !dTo) {
        const y = parseInt(ySel.value);
        dFrom = y + '-' + String(selMonth).padStart(2,'0') + '-01';
        dTo   = toYMD(new Date(y, selMonth, 0));
      }
      rangeReady = true;
      await loadMonthsForRange();
    }

    /** ดึงข้อมูลทุกเดือนที่ช่วงวันคาบเกี่ยว ไม่งั้นรายการต้นช่วง/ท้ายช่วงหายไปเฉยๆ */
    async function loadMonthsForRange() {
      extraItems = [];
      if (!dFrom || !dTo) return;
      const s = new Date(dFrom + 'T00:00:00'), e = new Date(dTo + 'T00:00:00');
      if (isNaN(s) || isNaN(e)) return;
      const want = [];
      const cur = new Date(s.getFullYear(), s.getMonth(), 1);
      while (cur <= e && want.length < 14) {
        const y = cur.getFullYear(), m = cur.getMonth() + 1;
        if (!(y === parseInt(ySel.value) && m === selMonth)) want.push({ y: y, m: m });
        cur.setMonth(cur.getMonth() + 1);
      }
      for (const w of want) {
        try {
          const r = await apiGet('getVisibleRequests', { email: session.Email, year: w.y, month: w.m });
          if (r && Array.isArray(r.items)) extraItems = extraItems.concat(r.items);
        } catch (e2) {}
      }
    }

    async function render() { await ensureRange(false); renderNow(); }

    /** อ่านช่วงวันจากช่องบนหน้าจอ — ยึดสิ่งที่ผู้ใช้เห็นเป็นความจริงเสมอ */
    function liveRange() {
      const a = document.getElementById('dFrom'), b = document.getElementById('dTo');
      return { from: (a && a.value) || dFrom, to: (b && b.value) || dTo };
    }

    /** เปลี่ยนวันในช่องแล้วคำนวณใหม่ทันที ไม่ต้องกดปุ่มอะไร */
    window.applyRange = async function () {
      const r = liveRange();
      if (!r.from || !r.to) return;
      if (r.to < r.from) return showToast('วันจบอยู่ก่อนวันเริ่ม', 'error');
      dFrom = r.from; dTo = r.to; rangeReady = true;
      await loadMonthsForRange();
      renderNow();
    };

    /** กลับไปใช้ช่วงที่ระบบแนะนำ */
    window.resetRange = async function () { await ensureRange(true); renderNow(); };

    function getFiltered() {
      const use = !!(dFrom && dTo && currentStaffEmail());
      const ps = use ? new Date(dFrom + 'T00:00:00') : null;
      const pe = use ? new Date(dTo + 'T23:59:59') : null;
      const y = parseInt(ySel.value);

      // รวมข้อมูลเดือนข้างเคียงที่ดึงมา · ตัด ID ซ้ำออก
      let pool = raw.items;
      if (use && extraItems.length) {
        const seen = {};
        pool = raw.items.concat(extraItems).filter(r => {
          const k = r.ID; if (!k || seen[k]) return false; seen[k] = 1; return true;
        });
      }

      return pool.filter(r => {
        /*
         * 🔴 ตัดแถว "ขอวงเงิน" ออกจากตารางค่าใช้จ่าย
         *    PreApprove = ใบขอวงเงิน ยังไม่ใช่เงินที่จ่ายจริง
         *    Finalized  = ใบขอวงเงินที่ส่งบิลแล้ว — ตัวเงินจริงอยู่ในแถวบิลใหม่
         *    finalizeClaim เขียนยอดรวมกลับลงแถวเดิมด้วย ถ้าไม่ตัดออกจะเห็นซ้ำ 2 บรรทัด
         *    และยอดรวมจะเบิ้ล (Excel ตัดออกอยู่แล้วเพราะเอาเฉพาะ Approved)
         */
        const st = String(r.Status || '');
        if (st === 'PreApprove' || st === 'Finalized') return false;
        const d = new Date(r.ExpenseDate || r.Timestamp);
        if (isNaN(d)) return false;
        if (use) {
          if (d < ps || d > pe) return false;              // กฎเดียว — อยู่ในช่วงที่เลือกเท่านั้น
        } else if (d.getFullYear() !== y || d.getMonth() + 1 !== selMonth) return false;
        if (fStatus && r.Status !== fStatus) return false;
        if (scope === '__self__') return String(r.StaffEmail||'').toLowerCase() === session.Email.toLowerCase();
        if (scope === '__all__') return true;
        return r.StaffName === scope;
      }).sort((a,b) => new Date(a.ExpenseDate||a.Timestamp) - new Date(b.ExpenseDate||b.Timestamp));
    }

    function renderNow() {
      const ld = document.getElementById('loading');
      ld.classList.remove('loading'); ld.style.display = 'none';
      const c = document.getElementById('content');
      c.style.display = 'block';

      const y = parseInt(ySel.value);
      const items = getFiltered();
      const total = items.reduce((s,r) => s + (Number(r.Amount)||0), 0);
      const approved = items.filter(r => r.Status === 'Approved');
      const pending  = items.filter(r => r.Status === 'Pending');
      const isAll = scope === '__all__';
      const scopeLbl = isAll ? 'ทุกคนที่ดูแล' : (scope === '__self__' ? (raw.myName || 'ตัวเอง') : scope);

      const onePerson = currentStaffEmail();
      const periodBar = onePerson ? `
        <div class="card" style="padding:13px 14px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:9px;">
            <div class="sec-label" style="margin:0;">📅 ช่วงวันที่จะเบิก</div>
            <span style="flex:1;"></span>
            <a href="javascript:void(0)" onclick="resetRange()"
               style="font-size:11.5px;color:var(--gray-500);text-decoration:underline;">↺ ค่าแนะนำ</a>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div class="field" style="margin:0;"><label>ตั้งแต่วันที่</label>
              <input type="date" id="dFrom" value="${dFrom}" onchange="applyRange()"></div>
            <div class="field" style="margin:0;"><label>ถึงวันที่</label>
              <input type="date" id="dTo" value="${dTo}" onchange="applyRange()"></div>
          </div>
          <div class="hint" style="margin-top:8px;">
            เอาทุกรายการที่อยู่ในช่วงนี้ · ตัวเลขตรงกับไฟล์ Excel เสมอ
          </div>
        </div>` : '';

      const heroLbl = (onePerson && dFrom && dTo)
        ? (scopeLbl + ' · ' + fmtTH(dFrom) + ' – ' + fmtTH(dTo))
        : (scopeLbl + ' · ' + MONTHS_FULL[selMonth-1] + ' ' + y);

      let html = periodBar + `
        <div class="count-hero">
          <div class="lbl">${heroLbl}</div>
          <div class="num">${Math.round(total).toLocaleString()}</div>
          <div class="sub">บาท · ${items.length} รายการ</div>
        </div>

        <div class="kpi-grid">
          <div class="kpi ok"><div class="n">${approved.length}</div><div class="l">อนุมัติแล้ว</div></div>
          <div class="kpi warn"><div class="n">${pending.length}</div><div class="l">รออนุมัติ</div></div>
          <div class="kpi"><div class="n">${Math.round(approved.reduce((s,r)=>s+(Number(r.Amount)||0),0)).toLocaleString()}</div><div class="l">อนุมัติ (บาท)</div></div>
          <div class="kpi ${pending.length?'warn':''}"><div class="n">${Math.round(pending.reduce((s,r)=>s+(Number(r.Amount)||0),0)).toLocaleString()}</div><div class="l">รออนุมัติ (บาท)</div></div>
        </div>`;

      if (items.length === 0) {
        html += `<div class="card"><div class="empty" style="padding:32px 12px;">
          <div class="icon-wrap">📭</div>
          <div class="title">ไม่มีข้อมูลใน${MONTHS_FULL[selMonth-1]} ${y}</div>
          <div class="sub">${fStatus ? 'ลองเลือกสถานะ "ทั้งหมด" ดู' : 'ลองเลือกเดือนอื่น'}</div>
        </div></div>`;
        c.innerHTML = html;
        lastItems = []; return;
      }

      // ═══ [ทุกคน] กราฟจัดอันดับรายคน ═══
      if (isAll) {
        const byPerson = {};
        items.forEach(r => {
          const n = r.StaffName || '?';
          if (!byPerson[n]) byPerson[n] = { total:0, count:0 };
          byPerson[n].total += Number(r.Amount)||0;
          byPerson[n].count++;
        });
        const people = Object.keys(byPerson).sort((a,b) => byPerson[b].total - byPerson[a].total);
        const maxP = Math.max(...people.map(n => byPerson[n].total), 1);

        html += `<div class="card">
          <div class="card-head"><span class="ib ib-red">🏆</span>
            <div><div class="ch-title">จัดอันดับรายคน</div>
            <div class="ch-sub">${people.length} คน · แตะเพื่อดูเฉพาะคนนั้น</div></div>
          </div>
          <div style="margin-top:12px;">
          ${people.map((n,i) => {
            const st = byPerson[n];
            const col = personColor[n] || PALETTE[i % PALETTE.length];
            const medal = i===0?'🥇':i===1?'🥈':i===2?'🥉':(i+1);
            return `<div class="rank-row" data-person="${n}">
              <div class="rk-badge" style="background:${col};">${medal}</div>
              <div>
                <div class="rk-name">${n}</div>
                <div class="rk-track"><div class="rk-fill" style="width:${(st.total/maxP*100).toFixed(1)}%;background:${col};"></div></div>
              </div>
              <div class="rk-right">
                <div class="rk-amt">${Math.round(st.total).toLocaleString()}</div>
                <div class="rk-pct">${(st.total/total*100).toFixed(0)}% · ${st.count} ใบ</div>
              </div>
            </div>`;
          }).join('')}
          </div>
        </div>`;
      }

      // ═══ กราฟรายวัน ═══
      const daysInMonth = new Date(y, selMonth, 0).getDate();
      const byDay = new Array(daysInMonth).fill(0);
      items.forEach(r => {
        const d = new Date(r.ExpenseDate || r.Timestamp);
        if (!isNaN(d)) byDay[d.getDate()-1] += Number(r.Amount)||0;
      });
      const maxDay = Math.max(...byDay, 1);
      const busiest = byDay.indexOf(Math.max(...byDay)) + 1;

      html += `<div class="card">
        <div class="card-head"><span class="ib ib-teal">📅</span>
          <div><div class="ch-title">ใช้จ่ายรายวัน</div>
          <div class="ch-sub">สูงสุดวันที่ ${busiest} · ${Math.round(Math.max(...byDay)).toLocaleString()} บาท</div></div>
        </div>
        <div class="daily">
          ${byDay.map((v,i) => `<div class="dcol" data-day="${i+1}" data-amt="${Math.round(v)}">
            <div class="dtip">${i+1} ${MONTHS[selMonth-1]} · ${Math.round(v).toLocaleString()} ฿</div>
            <div class="dbar ${v?'':'zero'}" style="height:${v ? Math.max(4,(v/maxDay*100)).toFixed(1) : 2}%;"></div>
          </div>`).join('')}
        </div>
        <div class="daily-x">
          ${byDay.map((v,i) => `<span>${(i+1)%5===0||i===0 ? (i+1) : ''}</span>`).join('')}
        </div>
      </div>`;

      // ═══ โดนัทแยกประเภท ═══
      const byCat = {};
      items.forEach(r => {
        const k = r.Category || 'OTHER';
        if (!byCat[k]) byCat[k] = { cat:k, amt:0, cnt:0 };
        byCat[k].amt += Number(r.Amount)||0; byCat[k].cnt++;
      });
      const cats = Object.values(byCat).sort((a,b) => b.amt - a.amt);

      html += `<div class="card">
        <div class="card-head"><span class="ib ib-orange">🍩</span>
          <div><div class="ch-title">แยกตามประเภท</div><div class="ch-sub">${cats.length} ประเภท</div></div>
        </div>
        ${donutHtml(cats, total)}
      </div>`;

      // ═══ ลูกค้าที่ใช้จ่ายมากสุด ═══
      const byCust = {};
      items.forEach(r => {
        const cu = String(r.Customer || '').replace(/^\[.+?\]\s*/, '').trim();
        if (!cu) return;
        byCust[cu] = (byCust[cu] || 0) + (Number(r.Amount)||0);
      });
      const custs = Object.keys(byCust).map(k => ({ name:k, amt:byCust[k] }))
        .sort((a,b) => b.amt - a.amt).slice(0, 8);

      if (custs.length) {
        html += `<div class="card">
          <div class="card-head"><span class="ib ib-purple">🏢</span>
            <div><div class="ch-title">ลูกค้าที่ใช้จ่ายมากสุด</div>
            <div class="ch-sub">${Object.keys(byCust).length} ราย</div></div>
          </div>
          <div style="margin-top:12px;">
          ${custs.map((cu,i) => `<div class="cust-row">
            <span class="cust-rank">${i+1}</span>
            <span class="cust-name">${cu.name}</span>
            <span class="cust-amt">${Math.round(cu.amt).toLocaleString()}</span>
          </div>`).join('')}
          </div>
        </div>`;
      }

      // ═══ ตาราง Excel (พับไว้) ═══
      lastItems = items;
      lastGroupBy = isAll;
      lastSub = `${scopeLbl} · ${MONTHS_FULL[selMonth-1]} ${y} · ${items.length} รายการ`;

      html += `<div class="card foldable" id="tblCard">
        <div class="card-head"><span class="ib ib-blue">📋</span>
          <div><div class="ch-title">ตารางข้อมูล (แบบ Excel)</div>
          <div class="ch-sub">${items.length} รายการ · ตรงกับไฟล์ที่ส่งบัญชี</div></div>
        </div>
        <button type="button" class="fold-btn" id="foldBtn">
          <span id="foldTxt">ดูตารางทั้งหมด</span> <span class="arw">▼</span>
        </button>
        <div class="fold-body" style="margin-top:12px;">
          <div class="tbl-bar">
            <span style="font-size:11.5px;color:var(--gray-500);">เลื่อนซ้าย–ขวาเพื่อดูคอลัมน์เพิ่ม</span>
            <span class="spacer"></span>
            <button onclick="openFs()">⛶ ดูเต็มจอ</button>
          </div>
          ${renderTable(items, isAll)}
          ${onePerson ? `
          <button type="button" class="btn btn-primary" id="xlsBtn"
                  onclick="exportExcel()" style="margin-top:14px;">📥 ดาวน์โหลด Excel</button>
          <div class="hint" style="margin-top:7px;text-align:center;">
            ไฟล์ตัวจริงตามฟอร์มบริษัท · <span id="xlsRange">${dFrom && dTo
              ? fmtTH(dFrom) + ' – ' + fmtTH(dTo)
              : MONTHS_FULL[selMonth-1] + ' ' + y}</span>
          </div>` : `
          <div class="hint" style="margin-top:12px;text-align:center;">
            เลือกรายบุคคลด้านบน เพื่อดาวน์โหลด Excel
          </div>`}
        </div>
      </div>`;

      c.innerHTML = html;
      bindInteractions();
    }

    function bindInteractions() {
      // แตะแถวอันดับ → ดูเฉพาะคนนั้น
      document.querySelectorAll('.rank-row[data-person]').forEach(row => {
        row.addEventListener('click', () => {
          scope = row.dataset.person;
          const pSel = document.getElementById('fPerson');
          if (pSel) pSel.value = scope;
          document.getElementById('scopeSeg').querySelectorAll('button').forEach(x => x.classList.remove('on'));
          render();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
      // แตะแท่งรายวัน → โชว์ยอด
      document.querySelectorAll('.dcol').forEach(col => {
        col.addEventListener('click', () => {
          const wasOn = col.classList.contains('show');
          document.querySelectorAll('.dcol').forEach(x => x.classList.remove('show'));
          if (!wasOn) col.classList.add('show');
        });
      });
      // พับ/กางตาราง
      const fb = document.getElementById('foldBtn');
      if (fb) fb.addEventListener('click', () => {
        const card = document.getElementById('tblCard');
        card.classList.toggle('open');
        document.getElementById('foldTxt').textContent =
          card.classList.contains('open') ? 'ซ่อนตาราง' : 'ดูตารางทั้งหมด';
      });
    }

    /** โดนัท SVG ล้วน ไม่ต้องโหลดไลบรารีเพิ่ม */
    function donutHtml(cats, total) {
      const R = 52, C = 2 * Math.PI * R;
      let offset = 0;
      const arcs = cats.slice(0,8).map((c,i) => {
        const len = (c.amt / total) * C;
        const seg = `<circle cx="64" cy="64" r="${R}" fill="none"
          stroke="${CAT_COLORS[i % CAT_COLORS.length]}" stroke-width="21"
          stroke-dasharray="${len.toFixed(2)} ${(C-len).toFixed(2)}"
          stroke-dashoffset="${(-offset).toFixed(2)}"></circle>`;
        offset += len;
        return seg;
      }).join('');
      const legend = cats.slice(0,8).map((c,i) => `
        <div class="lg-row">
          <span class="lg-dot" style="background:${CAT_COLORS[i % CAT_COLORS.length]};"></span>
          <span class="lg-name">${CAT_TH[c.cat] || c.cat}</span>
          <span class="lg-val">${Math.round(c.amt).toLocaleString()}</span>
          <span style="color:var(--gray-400);font-size:11px;min-width:32px;text-align:right;">${(c.amt/total*100).toFixed(0)}%</span>
        </div>`).join('');
      return `<div class="donut-wrap">
        <div class="donut">
          <svg width="128" height="128" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r="${R}" fill="none" stroke="#F1F5F9" stroke-width="21"></circle>
            ${arcs}
          </svg>
          <div class="donut-mid"><div class="n">${Math.round(total).toLocaleString()}</div><div class="l">บาท</div></div>
        </div>
        <div class="legend">${legend}</div>
      </div>`;
    }

    // ── ดูเต็มจอ ──
    function openFs() {
      document.getElementById('fsSub').textContent = lastSub;
      document.getElementById('fsBody').innerHTML = renderTable(lastItems, lastGroupBy);
      document.getElementById('fsOverlay').classList.add('show');
      document.body.style.overflow = 'hidden';
    }
    function closeFs() {
      document.getElementById('fsOverlay').classList.remove('show');
      document.body.style.overflow = '';
    }
    window.openFs = openFs; window.closeFs = closeFs;
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeFs(); });

    /* ═══ ดาวน์โหลด Excel ตัวจริงจากหน้านี้เลย ═══ */
    window.exportExcel = async function () {
      const em = currentStaffEmail();
      if (!em) return showToast('เลือกรายบุคคลก่อน แล้วค่อยดาวน์โหลด', 'error');
      const btn = document.getElementById('xlsBtn');
      if (btn) { btn.disabled = true; btn.textContent = '⏳ กำลังสร้างไฟล์...'; }
      try {
        // อ่านจากช่องบนหน้าจอตรงๆ — ไฟล์ต้องตรงกับที่ผู้ใช้เห็นเสมอ
        const rg = liveRange();
        if (!rg.from || !rg.to) return showToast('เลือกช่วงวันก่อน', 'error');
        if (rg.to < rg.from) return showToast('วันจบอยู่ก่อนวันเริ่ม', 'error');
        const r = await apiPost('exportStaffReport', {
          staffEmail: em, year: parseInt(ySel.value), month: selMonth, requesterEmail: session.Email,
          periodStart: rg.from, periodEnd: rg.to     // เลือกถึงวันไหน ไฟล์ก็ถึงวันนั้น
        });
        if (r.error) throw new Error(r.error);
        if (!r.base64) throw new Error('ไม่มีข้อมูลไฟล์');
        const bytes = atob(r.base64);
        const arr = new Uint8Array(bytes.length);
        for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
        const blob = new Blob([arr], { type: r.mimeType ||
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = r.filename || 'export.xlsx';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        showToast('ดาวน์โหลดแล้ว · ' + (r.periodLabel || ''), 'success');
      } catch (err) {
        showToast(err.message, 'error');
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = '📥 ดาวน์โหลด Excel'; }
      }
    };

    function renderTable(items, groupByPerson) {
      const cell = v => v ? Math.round(v).toLocaleString() : '';
      const amtIf = (r, ok) => ok ? cell(Number(r.Amount)||0) : '';

      const COLS = [
        { k:'no',    label:'No.',      cls:'ctr', get:(r,n) => n },
        { k:'date',  label:'วันที่',    cls:'ctr', get:r => r.ExpenseDate ? new Date(r.ExpenseDate).toLocaleDateString('en-GB',{day:'2-digit',month:'short'}) : '-' },
        { k:'cat',   label:'ประเภท',    cls:'ctr', get:r => CAT_TH[r.Category] || r.Category },
        { k:'cust',  label:'Customer',  cls:'',    get:r => r.Customer || '' },
        { k:'ctc',   label:'Contact',   cls:'',    get:r => r.CustomerContact || '' },
        { k:'dist',  label:'Distance',  cls:'num', get:r => r.Category==='FUEL' ? (Number(r.Mileage_KM)||'') : '' },
        { k:'mile',  label:'Mile ฿',    cls:'num', get:r => amtIf(r, r.Category==='FUEL') },
        { k:'exp',   label:'Express ฿', cls:'num', get:r => amtIf(r, r.Category==='EXPRESS') },
        { k:'ent',   label:'Ent ฿',     cls:'num', get:r => amtIf(r, r.Category==='ENT' || r.Category==='GOLF') },
        { k:'job',   label:'Job',       cls:'sm',  get:r => {
            if (['TRAVEL','OTHER','CAR','MOBILE','OVERSEAS','APT'].indexOf(r.Category) < 0) return '';
            const base = (r.Origin && r.Destination) ? r.Origin + '→' + r.Destination
                       : (r.Occasion || r.Venue || CAT_TH[r.Category] || r.Category);
            return base + ' ' + Math.round(Number(r.Amount)||0).toLocaleString();
          }},
        { k:'hotel', label:'Hotel ฿',   cls:'num', get:r => amtIf(r, r.Category==='HOTEL') },
        { k:'park',  label:'Park ฿',    cls:'num', get:r => amtIf(r, r.Category==='PARK') },
        { k:'rmk',   label:'Remark',    cls:'sm',  get:r => r.Venue || '' },
        { k:'st',    label:'Status',    cls:'ctr', get:r => {
            const c = r.Status==='Approved' ? '#16A34A' : r.Status==='Rejected' ? '#DC2626' : '#F59E0B';
            const t = r.Status==='Approved' ? 'อนุมัติ' : r.Status==='Rejected' ? 'ไม่อนุมัติ'
                    : r.Status==='Finalized' ? 'ส่งบิลแล้ว' : r.Status==='PreApprove' ? 'ขอวงเงิน' : 'รออนุมัติ';
            return '<span style="color:' + c + ';font-weight:800;font-size:11px;">' + t + '</span>';
          }}
      ];
      const cols = COLS;

      const th = '<tr>' + cols.map(c =>
        '<th class="' + (c.cls==='num'?'num':c.cls==='ctr'?'ctr':'') + '">' + c.label + '</th>').join('') + '</tr>';
      const rowHtml = (r,n) => '<tr>' + cols.map(c =>
        '<td class="' + c.cls + '">' + (c.get(r,n) || '') + '</td>').join('') + '</tr>';

      let body = '';
      if (groupByPerson) {
        const groups = {};
        items.forEach(r => { const k = r.StaffName || '?'; (groups[k] = groups[k] || []).push(r); });
        Object.keys(groups).forEach(name => {
          const rows = groups[name];
          const sub = rows.reduce((s,r) => s + (Number(r.Amount)||0), 0);
          body += '<tr class="person-hdr"><td colspan="' + cols.length + '">👤 ' + name +
                  ' — ' + rows.length + ' รายการ — ' + Math.round(sub).toLocaleString() + ' บาท</td></tr>';
          rows.forEach((r,i) => body += rowHtml(r, i+1));
        });
      } else {
        items.forEach((r,i) => body += rowHtml(r, i+1));
      }

      const grand = items.reduce((s,r) => s + (Number(r.Amount)||0), 0);
      const sumOf = k => {
        const col = COLS.filter(c => c.k === k)[0];
        return items.reduce((s,r) => s + (parseFloat(String(col.get(r,0)||'').replace(/,/g,'')) || 0), 0);
      };
      const MONEY = ['dist','mile','exp','ent','hotel','park'];
      let foot = '<tr>';
      cols.forEach((c,i) => {
        if (i === 0) { foot += '<td class="ctr">Σ</td>'; return; }
        if (MONEY.indexOf(c.k) >= 0) {
          const v = sumOf(c.k);
          foot += '<td class="num">' + (v ? Math.round(v).toLocaleString() : '') + '</td>'; return;
        }
        if (c.k === 'cat') { foot += '<td class="ctr">รวมทั้งหมด</td>'; return; }
        if (c.k === 'st')  { foot += '<td class="ctr" style="color:#B7081D;white-space:nowrap;">' + Math.round(grand).toLocaleString() + ' ฿</td>'; return; }
        foot += '<td></td>';
      });
      foot += '</tr>';

      return '<div class="xl-wrap"><table class="xl"><thead>' + th + '</thead><tbody>' + body + '</tbody><tfoot>' + foot + '</tfoot></table></div>';
    }

    if (session) { load(); renderBottomNav('summary'); }
  
if(typeof bindInteractions==='function')window.bindInteractions=bindInteractions;
if(typeof buildMonthBar==='function')window.buildMonthBar=buildMonthBar;
if(typeof closeFs==='function')window.closeFs=closeFs;
if(typeof currentStaffEmail==='function')window.currentStaffEmail=currentStaffEmail;
if(typeof donutHtml==='function')window.donutHtml=donutHtml;
if(typeof ensureRange==='function')window.ensureRange=ensureRange;
if(typeof fail==='function')window.fail=fail;
if(typeof fmtTH==='function')window.fmtTH=fmtTH;
if(typeof getFiltered==='function')window.getFiltered=getFiltered;
if(typeof liveRange==='function')window.liveRange=liveRange;
if(typeof load==='function')window.load=load;
if(typeof loadMonthsForRange==='function')window.loadMonthsForRange=loadMonthsForRange;
if(typeof openFs==='function')window.openFs=openFs;
if(typeof reload==='function')window.reload=reload;
if(typeof render==='function')window.render=render;
if(typeof renderNow==='function')window.renderNow=renderNow;
if(typeof renderTable==='function')window.renderTable=renderTable;
}}};