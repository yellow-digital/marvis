if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const l=e=>s(e,t),c={module:{uri:t},exports:o,require:l};i[t]=Promise.all(n.map((e=>c[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-e1498109"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-aB-Raf1H.css",revision:null},{url:"assets/index-CKnG4BjM.js",revision:null},{url:"index.html",revision:"369655087d0efaf22c50cd512761b6c3"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"./pwa-192x192.png",revision:"9b715efb951664d842cca9b99ee63518"},{url:"manifest.webmanifest",revision:"30e9d9a1a45e2d224ec00cf033d0f2bb"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
