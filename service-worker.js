/* Versioned app shell only. API requests and attachments never enter CacheStorage. */
const CACHE_NAME='exion-workspace-v8-4';
const STATIC_ASSETS=['./','index.html','submit.html','status.html','approvals.html','periods.html','menu.html','profile.html','pre-approve.html','pre-approves.html','finalize-claim.html','approve.html','export-review.html','inbox.html','manager-inbox.html','senior-inbox.html','my-team.html','all-requests.html','summary.html','dashboard.html','pc-home.html','pc-request.html','pc-list.html','pc-fund.html','pc-approve.html','pc-msbc.html','reset-password.html','css/style.css','css/experience.css','js/config.js','js/api.js','js/app.js','js/icons.js','js/experience.js','js/home.js','js/drafts.js','js/expense-form.js','js/approvals.js','js/account.js','js/payments.js','icons/logo.png','icons/icon-192.png','icons/icon-512.png','manifest.json','fonts/Kanit-Regular.ttf','fonts/Kanit-Medium.ttf'];
const ASSET_PATHS=new Set(STATIC_ASSETS.map(x=>new URL(x,self.registration.scope).pathname));
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(STATIC_ASSETS))));
// A waiting worker activates only after old tabs close: no mid-form reload or mixed asset versions.
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>(k.startsWith('exionth-expense-')||k.startsWith('exion-workspace-'))&&k!==CACHE_NAME).map(k=>caches.delete(k))))));
self.addEventListener('fetch',event=>{
 const u=new URL(event.request.url);if(event.request.method!=='GET'||u.origin!==self.location.origin||!ASSET_PATHS.has(u.pathname))return;
 event.respondWith(caches.open(CACHE_NAME).then(async cache=>{const cached=await cache.match(u.pathname);if(cached)return cached;const response=await fetch(event.request);if(response.ok)await cache.put(u.pathname,response.clone());return response;}));
});
