/* Hagari 공통 모바일 언어 선택·TOP 버튼 (가옥 리스트는 표시하지 않음) */
// 남색 공통 플로팅 언어 선택 + TOP
(function(){
 const style=document.createElement('style');
 style.textContent=`
 body{padding-bottom:76px}
 .floating-tools{position:fixed;bottom:calc(8px + env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);z-index:9999;width:min(calc(100% - 24px),380px);display:flex;align-items:stretch;gap:7px;padding:6px;background:#f7f9fc;border:1px solid #dce3ed;border-radius:13px;box-shadow:0 4px 16px rgba(11,30,53,.16);font-family:inherit}
 .floating-tools button{font:700 14px/1.3 inherit;cursor:pointer;touch-action:manipulation}
 .floating-lang-wrap{position:relative;flex:1;min-width:0}
 .floating-lang-toggle{width:100%;display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:42px;padding:9px 12px;border:1px solid #cbd7e4;border-radius:9px;background:#fff;color:#172e4c;font-size:14px;font-weight:700}
 .floating-lang-toggle .globe{font-size:16px;line-height:1}.floating-lang-toggle .lang-current{flex:1;text-align:left}.floating-lang-toggle .chevron{font-size:12px;opacity:.8}
 .floating-top{flex:0 0 72px;align-self:stretch;border:0;border-radius:9px;background:#172e4c;color:#fff;font-size:14px;font-weight:800}
 .floating-lang-options{display:none;position:absolute;bottom:calc(100% + 7px);left:0;right:0;padding:6px;border:1px solid #dce4ee;border-radius:14px;background:#fff;box-shadow:0 8px 25px rgba(11,30,53,.2)}
 .floating-lang-wrap.open .floating-lang-options{display:grid;gap:3px}
 .floating-lang-options button{display:flex;justify-content:space-between;align-items:center;width:100%;padding:11px;border:0;border-radius:9px;background:transparent;color:#1d3553;text-align:left;font-size:16px;font-weight:650}
 .floating-lang-options button.active{background:#eaf0f7;color:#132e50}
 .floating-lang-options button.active:after{content:'✓';font-weight:800}
 @media(max-width:360px){.floating-tools{width:calc(100% - 18px);gap:6px;padding:5px}.floating-top{flex-basis:68px}.floating-lang-toggle{padding:8px 10px;min-height:42px}.floating-lang-options button{padding:11px}}
 `;document.head.appendChild(style);
 const dock=document.createElement('nav');dock.className='floating-tools';dock.setAttribute('aria-label','언어 선택 및 상단 이동');
 const wrap=document.createElement('div');wrap.className='floating-lang-wrap';
 const toggle=document.createElement('button');toggle.type='button';toggle.className='floating-lang-toggle';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','언어 선택');
 toggle.innerHTML='<span class="globe" aria-hidden="true">◎</span><span class="lang-current">Language</span><span class="chevron" aria-hidden="true">▾</span>';
 const opts=document.createElement('div');opts.className='floating-lang-options';
 const languages=[['zh','中文'],['ja','日本語']];
 languages.forEach(([code,label])=>{const b=document.createElement('button');b.type='button';b.dataset.langChoice=code;b.textContent=label;b.addEventListener('click',()=>{if(typeof setLang==='function')setLang(code);wrap.classList.remove('open');toggle.setAttribute('aria-expanded','false');});opts.appendChild(b)});
 toggle.addEventListener('click',()=>{const open=wrap.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
 document.addEventListener('click',e=>{if(!wrap.contains(e.target)){wrap.classList.remove('open');toggle.setAttribute('aria-expanded','false');}});
 const top=document.createElement('button');top.type='button';top.className='floating-top';top.textContent='↑ TOP';top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
 wrap.append(toggle,opts);dock.append(wrap,top);document.body.appendChild(dock);
 window.updateFloatingLanguage=function(lang){toggle.querySelector('.lang-current').textContent='Language';opts.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.langChoice===lang));};
 let floatingInitLang='zh';try{floatingInitLang=localStorage.getItem('hagariLang')||'zh'}catch(e){}window.updateFloatingLanguage(floatingInitLang);
 // footerText.textContent가 언어 전환 시 바뀌어도 저작권은 유지되도록 별도 요소로 삽입
 const footer=document.querySelector('footer');
 if(footer && !document.querySelector('.woodline-copyright')){
   const credit=document.createElement('div');
   credit.className='woodline-copyright';
   credit.textContent='© Copyright WOODLINE. All rights reserved.';
   credit.style.cssText='margin:12px auto 0;padding:12px 12px 4px;border-top:1px solid #d9dde3;font-size:12px;line-height:1.6;letter-spacing:.01em;color:#697586;text-align:center;';
   footer.insertAdjacentElement('afterend',credit);
 }


})();
