(()=>{
 const views=new Map(),outlet=document.getElementById('spaOutlet');let active=null,revision=0,identity=getSession()?.token||'',navigations=0;
 const base=new URL('.',location.href);const publicPages=new Set(['index.html','reset-password.html']);
 const keyFor={ 'index.html':'home','submit.html':'new','status.html':'status','approvals.html':'approvals','periods.html':'periods','profile.html':'profile','summary.html':'summary','my-team.html':'team','menu.html':'more'};
 function parse(value){const u=new URL(value,base);if(u.origin!==base.origin||!u.pathname.startsWith(base.pathname))return null;const name=u.pathname.slice(base.pathname.length)||'index.html';return EXION_VIEWS[name]?{name,search:u.search,key:name+u.search}:null;}
 function fromHash(){return parse(location.hash.startsWith('#/')?location.hash.slice(2):'index.html'+location.search)||parse('index.html');}
 function go(value,replace=false){const r=parse(value);if(!r){location.href=value;return;}const url='#/'+r.key;if(location.hash===url){activate(r);return;}(replace?history.replaceState:history.pushState).call(history,null,'',url);activate(r);}
 function discard(v){v.disposed=true;v.clean.forEach(f=>f());v.node.remove();views.delete(v.route.key);}
 function reset(){for(const v of [...views.values()])discard(v);active=null;}
 function shell(r){const s=getSession();document.body.classList.toggle('spa-guest',!s);document.getElementById('spaHeader').hidden=!s;if(s)renderWorkspaceNav(keyFor[r.name]||(r.name.startsWith('pc-')?'petty':'home'));}
 function mount(route){
  const def=EXION_VIEWS[route.name],node=document.createElement('section');node.className='spa-view';node.dataset.route=route.key;node.innerHTML=def.html;if(def.css){const style=document.createElement('style');style.textContent=def.css;node.prepend(style);}outlet.append(node);
  const v={route,node,clean:[],revision,scroll:0,createdAt:Date.now(),disposed:false};views.set(route.key,v);const ready=[],listeners=[],globals=Object.create(null),timeouts=new Set(),intervals=new Set();
  const timeout=(fn,ms,...args)=>{const id=setTimeout(()=>{timeouts.delete(id);fn(...args);},ms);timeouts.add(id);return id;};
  const interval=(fn,ms,...args)=>{const id=setInterval(fn,ms,...args);intervals.add(id);return id;};
  v.clean.push(()=>{timeouts.forEach(clearTimeout);intervals.forEach(clearInterval);});
  const routeLocation={get pathname(){return base.pathname+route.name;},get search(){return route.search;},get origin(){return base.origin;},get hash(){return '';},get href(){return new URL(route.key,base).href;},set href(value){if(!v.disposed)go(value);},assign:value=>{if(!v.disposed)go(value);},replace:value=>{if(!v.disposed)go(value,true);},reload:()=>{if(!v.disposed){discard(v);activate(route);}}};
  const add=(target,type,fn,options)=>{if(type==='DOMContentLoaded'||type==='load'){ready.push(fn);return;}const guarded=e=>{if(type==='exion:data-status'||type==='storage'||active===v)fn.call(proxy,e);};target.addEventListener(type,guarded,options);listeners.push({target,type,fn,guarded,options});v.clean.push(()=>target.removeEventListener(type,guarded,options));};
  const remove=(target,type,fn)=>{for(const r of listeners)if(r.target===target&&r.type===type&&r.fn===fn)target.removeEventListener(type,r.guarded,r.options);};
  const doc=new Proxy(document,{get(target,key){if(key==='body')return node;if(key==='getElementById')return id=>node.querySelector('#'+CSS.escape(id));if(key==='querySelector')return sel=>node.querySelector(sel);if(key==='querySelectorAll')return sel=>node.querySelectorAll(sel);if(key==='addEventListener')return (t,f,o)=>add(node,t,f,o);if(key==='removeEventListener')return(t,f)=>remove(node,t,f);if(key==='activeElement')return node.contains(document.activeElement)?document.activeElement:null;const value=Reflect.get(target,key,target);return typeof value==='function'?value.bind(target):value;}});
  const proxy=new Proxy(globals,{get(target,key){if(key===Symbol.unscopables)return undefined;if(key==='window'||key==='self')return proxy;if(key==='document')return doc;if(key==='location')return routeLocation;if(key==='setTimeout')return timeout;if(key==='setInterval')return interval;if(key==='MutationObserver')return Observer;if(key==='dispatchEvent')return event=>event.type==='exion:data-status'?node.dispatchEvent(event):window.dispatchEvent(event);if(key==='addEventListener')return(t,f,o)=>add(t==='exion:data-status'?node:window,t,f,o);if(key==='removeEventListener')return(t,f)=>remove(t==='exion:data-status'?node:window,t,f);if(key in target)return target[key];const value=window[key];return typeof value==='function'&&!value.prototype?value.bind(window):value;},set(target,key,value){if(key==='location'){go(value);return true;}target[key]=value;return true;},has(target,key){return key in target||key in window;}});
  class Observer extends MutationObserver{constructor(fn){super(fn);v.clean.push(()=>this.disconnect());}}
  // Legacy inline event handlers run in their own view namespace.
  for(const type of ['click','change','input','submit','keydown'])node.addEventListener(type,event=>{
   let el=event.target.closest?.('[on'+type+']');if(!el||!node.contains(el))return;const code=el.getAttribute('on'+type);el.removeAttribute('on'+type);event.stopImmediatePropagation();
   const handler=Function('window','event','with(window){'+code+'}');const run=e=>{if(handler.call(el,proxy,e)===false)e.preventDefault();};el.addEventListener(type,run);run(event);
  },true);
  def.mount(proxy,doc,routeLocation,{back:()=>history.back(),replaceState:()=>{},pushState:()=>{}},timeout,clearTimeout,interval,clearInterval,Observer);
  ready.forEach(fn=>fn.call(proxy,new Event('DOMContentLoaded')));return v;
 }
 function activate(route){
  const token=getSession()?.token||'';if(token!==identity){identity=token;reset();}
  if(!token&&!publicPages.has(route.name)){sessionStorage.setItem('exion_return_to',route.key);go('index.html',true);return;}
  if(active){active.scroll=scrollY;active.node.hidden=true;}
  let v=views.get(route.key);
  // Keep unfinished forms; rebuild read views after a write so they cannot show a retained old result.
  if(v&&(['approve.html','export-review.html','pc-approve.html','finalize-claim.html'].includes(route.name)||((v.revision!==revision||Date.now()-v.createdAt>120000)&&!['submit.html','pre-approve.html','pc-request.html','profile.html'].includes(route.name)))){discard(v);v=null;}
  active=v||mount(route);active.node.hidden=false;if(v&&getSession()){const owner=getSession().token;fetchMyRole(getSession().Email).then(role=>{if(getSession()?.token===owner){setSession({...getSession(),...role});}}).catch(()=>{});}shell(route);scrollTo(0,active.scroll);navigations++;
  // Retain at most eight views, never evict an expense draft.
  if(views.size>8)for(const item of views.values()){if(item!==active&&!item.node.querySelector('form,.expense-card,input[type=file]')){discard(item);break;}}
 }
 document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||a.getAttribute('href').startsWith('#')||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target||a.hasAttribute('download'))return;const r=parse(a.getAttribute('href'));if(!r)return;e.preventDefault();go(r.key);});
 window.addEventListener('popstate',()=>activate(fromHash()));window.addEventListener('hashchange',()=>activate(fromHash()));
 window.addEventListener('exion:write',()=>{revision++;});
 window.addEventListener('storage',e=>{if(e.key?.endsWith(':changed'))revision++;});
 window.addEventListener('exion:session',()=>{const token=getSession()?.token||'';if(token!==identity){identity=token;reset();go(fromHash().key,true);}});
 const prefetched=new Set();
 function prefetch(route){if(!getSession()||navigator.connection?.saveData||route!=='submit.html')return;const key=getSession().token+route;if(prefetched.has(key))return;prefetched.add(key);Promise.allSettled([fetchCategories(),fetchFuelRate(getSession().Email),apiGet('getMyApprover')]);}
 document.addEventListener('pointerover',e=>{const a=e.target.closest('a[href]');if(a)prefetch(parse(a.getAttribute('href'))?.name);},{passive:true});
 document.addEventListener('focusin',e=>{const a=e.target.closest('a[href]');if(a)prefetch(parse(a.getAttribute('href'))?.name);});
 window.EXION_SPA={go,stats:()=>({navigations,retained:views.size,route:active?.route.key})};
 activate(fromHash());
})();
