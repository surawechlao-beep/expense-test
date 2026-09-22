/* Per-user drafts include attachments. No background submission. */
const DraftStore={
 open(){return new Promise((resolve,reject)=>{const r=indexedDB.open('exion-workspace',1);r.onupgradeneeded=()=>r.result.createObjectStore('drafts');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});},
 async run(mode,key,value){const db=await this.open();return new Promise((resolve,reject)=>{const tx=db.transaction('drafts',mode),store=tx.objectStore('drafts');const r=mode==='readonly'?store.get(key):value===null?store.delete(key):store.put(value,key);let result;r.onsuccess=()=>result=r.result;tx.oncomplete=()=>{db.close();resolve(result);};tx.onerror=()=>{db.close();reject(tx.error);};});},
 get(key){return this.run('readonly',key);},put(key,value){return this.run('readwrite',key,value);},remove(key){return this.run('readwrite',key,null);}
};
