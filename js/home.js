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
 // Login already returns current roles. On later visits refresh alongside data, not before it.
 renderWorkspaceNav('home');
 document.getElementById('headerDate').textContent=new Date().toLocaleDateString('th-TH',{day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Bangkok'});
 const results=await Promise.allSettled([fetchMyRequests(s.Email),apiGet('getMyExportRequests',{email:s.Email}),fetchPendingApprovals(s.Email),freshLogin===true?Promise.resolve(s):fetchMyRole(s.Email)]);
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
