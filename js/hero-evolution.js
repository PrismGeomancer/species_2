/* A one-shot, four-form SVG morph. It illustrates evolution without changing saved market data. */
(function(S){
 const paths={
  head:[
   'M250 230Q215 227 208 257Q204 280 221 296L234 308Q250 317 266 308L279 296Q296 280 292 257Q285 227 250 230Z',
   'M250 195Q194 190 181 236Q175 264 197 283L220 300Q250 313 280 300L303 283Q325 264 319 236Q306 190 250 195Z',
   'M250 175Q180 170 166 226Q161 258 188 281L216 300Q250 319 284 300L312 281Q339 258 334 226Q320 170 250 175Z',
   'M250 164Q170 160 157 225Q151 262 184 283L211 303Q250 324 289 303L316 283Q349 262 343 225Q330 160 250 164Z'
  ],
  body:[
   'M229 280Q225 290 233 302L229 310 241 309 246 303 254 303 259 309 271 310 267 302Q275 290 271 280Z',
   'M214 280Q194 309 210 330L199 350 226 346 239 332 261 332 274 346 301 350 290 330Q306 309 286 280Z',
   'M194 277Q170 314 190 350L165 383 220 379 239 353 261 353 280 379 335 383 310 350Q330 314 306 277Z',
   'M180 274Q151 312 178 366L144 408 216 403 239 364 261 364 284 403 356 408 322 366Q349 312 320 274Z'
  ],
  leftEar:[
   'M229 259Q220 243 230 240L241 251',
   'M194 244Q166 200 184 181L221 212',
   'M182 226Q131 151 167 129L225 197',
   'M176 220Q98 118 154 91L231 190'
  ],
  rightEar:[
   'M271 259Q280 243 270 240L259 251',
   'M306 244Q334 200 316 181L279 212',
   'M318 226Q369 151 333 129L275 197',
   'M324 220Q402 118 346 91L269 190'
  ]
 };
 const shapes=Object.fromEntries(Object.entries(paths).map(([name,forms])=>[name,forms.map(d=>d.match(/-?\d+(?:\.\d+)?/g).map(Number))]));
 const smooth=v=>v*v*(3-2*v),lerp=(a,b,t)=>a+(b-a)*t;
 const interpolate=(name,phase,t)=>{let i=0;return paths[name][0].replace(/-?\d+(?:\.\d+)?/g,()=>lerp(shapes[name][phase][i],shapes[name][phase+1][i++],t).toFixed(2));};
 const timings=[{start:1200,duration:2600},{start:4500,duration:2800},{start:7900,duration:3000}],duration=11600;
 S.heroEvolution={dispose:null,mount(container,species){
  this.dispose?.();if(!container)return;
  const finalImage=container.querySelector('img.hero-organism'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const stageLabels=['CELL / BIRTH','EMERGENT / GEN I','ADAPTING / GEN III',`MATURE / GEN ${S.roman(species.generation)}`];
  const wrapper=document.createElement('div');wrapper.className='hero-evolution-controls';wrapper.innerHTML=`<div class="hero-evolution-heading"><span class="eyebrow">EVOLUTION / LIFE CYCLE</span><button class="hero-evolution-toggle" type="button" aria-label="Pause hero evolution">PAUSE Ⅱ</button></div><div class="hero-evolution-stages">${['BIRTH','GEN I','GEN III','GEN '+S.roman(species.generation)].map((label,i)=>`<span data-phase="${i}">${label}</span>`).join('')}</div><div class="hero-evolution-track"><span></span></div><span class="hero-evolution-state" aria-live="polite">CELL / BIRTH</span>`;container.append(wrapper);
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 500 500');svg.setAttribute('role','img');svg.setAttribute('aria-label','BONK evolving from a cell into its mature specimen');svg.classList.add('hero-organism','hero-morph');svg.innerHTML=`<defs><radialGradient id="hero-life-body"><stop stop-color="#b2dd66" stop-opacity=".65"/><stop offset=".55" stop-color="#36442b"/><stop offset="1" stop-color="#121b12"/></radialGradient><radialGradient id="hero-life-glow"><stop stop-color="#b2dd66" stop-opacity=".18"/><stop offset="1" stop-color="#b2dd66" stop-opacity="0"/></radialGradient><filter id="hero-eye-glow"><feGaussianBlur stdDeviation="4"/></filter></defs><ellipse cx="250" cy="279" rx="195" ry="190" fill="url(#hero-life-glow)"/><g fill="none" stroke="#b2dd66" opacity=".16"><ellipse cx="250" cy="279" rx="175" ry="170"/><ellipse cx="250" cy="279" rx="195" ry="188" stroke-dasharray="2 14"/></g><g fill="url(#hero-life-body)" stroke="#b2dd66" stroke-opacity=".6"><path data-organ="body"/><path data-organ="leftEar"/><path data-organ="rightEar"/><path data-organ="head"/></g><g class="hero-genetic-lines" fill="none" stroke="#b2dd66" stroke-width=".75" opacity=".27">${Array.from({length:15},(_,j)=>`<path d="M${180+j*10} 283Q${120+j*11} ${310+j*4} ${163+j*10} 376"/>`).join('')}${Array.from({length:10},(_,j)=>`<path d="M250 240Q${140+j*19} ${140+j*8} ${158+j*18} ${208+Math.round(Math.sin(j)*30)}"/>`).join('')}</g><g class="hero-face"><g fill="#b2dd66"><path d="m183 229 43 4-8 12-28-2Z"/><path d="m317 229-43 4 8 12 28-2Z"/></g><g filter="url(#hero-eye-glow)" fill="#b2dd66" opacity=".55"><ellipse cx="205" cy="237" rx="14" ry="4"/><ellipse cx="295" cy="237" rx="14" ry="4"/></g><path d="M214 266Q250 294 286 266M250 252V279" stroke="#b2dd66" stroke-width="2" fill="none"/><path d="m236 245 14 12 14-12" fill="#151f12"/></g><g class="hero-cell-nucleus"><circle cx="250" cy="273" r="14" fill="#b2dd6628" stroke="#b2dd66" stroke-opacity=".6"/><path d="M244 266Q257 268 244 280M256 266Q243 268 256 280M245 269h10M245 276h10" stroke="#c1f55a" fill="none" stroke-width="1.2"/></g>`;
  container.insertBefore(svg,finalImage);container.classList.add('hero-is-evolving');
  const organs=Object.fromEntries([...svg.querySelectorAll('[data-organ]')].map(path=>[path.dataset.organ,path]));const face=svg.querySelector('.hero-face'),lines=svg.querySelector('.hero-genetic-lines'),nucleus=svg.querySelector('.hero-cell-nucleus'),button=wrapper.querySelector('button'),track=wrapper.querySelector('.hero-evolution-track span'),label=wrapper.querySelector('.hero-evolution-state');const phases=[...wrapper.querySelectorAll('[data-phase]')];
  let frame=0,elapsed=0,lastTime=0,paused=false,complete=false,visible=true,active=true,lastPhase=-1;
  function paint(ms){let phase=0,t=0;for(let i=0;i<timings.length;i++){const interval=timings[i];if(ms>=interval.start){phase=i;t=smooth(Math.min(1,(ms-interval.start)/interval.duration));}}
   for(const [name,path] of Object.entries(organs))path.setAttribute('d',interpolate(name,phase,t));
   const maturity=phase+t,bodyGrowth=smooth(Math.min(1,maturity/.85)),facialGrowth=smooth(Math.max(0,Math.min(1,(maturity-.35)/1.4)));
   organs.body.style.opacity=bodyGrowth;organs.leftEar.style.opacity=Math.min(1,maturity);organs.rightEar.style.opacity=Math.min(1,maturity);face.style.opacity=facialGrowth;const faceScale=lerp(.45,1,Math.min(1,maturity/2.7));const faceY=lerp(33,0,Math.min(1,maturity/2.7));face.setAttribute('transform',`translate(250 ${237+faceY}) scale(${faceScale}) translate(-250 -237)`);lines.style.opacity=Math.min(.27,maturity*.09);lines.setAttribute('transform',`translate(250 275) scale(${lerp(.3,1,maturity/3)}) translate(-250 -275)`);nucleus.style.opacity=Math.max(0,1-maturity);
   const handover=smooth(Math.max(0,Math.min(1,(ms-10400)/1100)));svg.style.opacity=1-handover;finalImage.style.opacity=handover;
   track.style.width=(Math.min(1,ms/duration)*100).toFixed(2)+'%';const current=Math.min(3,Math.floor(maturity+.015));if(current!==lastPhase){lastPhase=current;label.textContent=stageLabels[current];phases.forEach((p,i)=>{p.classList.toggle('reached',i<=current);p.classList.toggle('current',i===current);});}
  }
  function updateButton(){button.textContent=reduced.matches||complete?'REPLAY ↺':paused?'PLAY ▷':'PAUSE Ⅱ';button.setAttribute('aria-label',reduced.matches?'Show mature species':complete?'Replay hero evolution':paused?'Resume hero evolution':'Pause hero evolution');button.disabled=reduced.matches;}
  function finish(){elapsed=duration;complete=true;paint(duration);updateButton();}
  function tick(time){if(!active)return;if(!visible||paused||document.hidden){frame=0;lastTime=0;return;}if(lastTime)elapsed+=Math.min(64,time-lastTime);lastTime=time;paint(elapsed);if(elapsed>=duration){finish();frame=0;return;}frame=requestAnimationFrame(tick);}
  function startFrame(){if(!frame&&active&&!complete&&!paused&&visible&&!document.hidden){lastTime=0;frame=requestAnimationFrame(tick);}}
  button.onclick=()=>{if(reduced.matches)return;if(complete){elapsed=0;complete=false;paused=false;lastPhase=-1;paint(0);startFrame();}else{paused=!paused;lastTime=0;if(paused){cancelAnimationFrame(frame);frame=0;}else startFrame();}updateButton();};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;lastTime=0;if(!visible){cancelAnimationFrame(frame);frame=0;}else startFrame();},{threshold:.12});observer.observe(container);
  const onMotion=()=>{if(reduced.matches){cancelAnimationFrame(frame);frame=0;finish();}updateButton();};reduced.addEventListener('change',onMotion);const onVisibility=()=>{lastTime=0;if(document.hidden){cancelAnimationFrame(frame);frame=0;}else startFrame();};document.addEventListener('visibilitychange',onVisibility);
  if(reduced.matches)finish();else{paint(0);updateButton();startFrame();}
  this.dispose=()=>{active=false;cancelAnimationFrame(frame);observer.disconnect();reduced.removeEventListener('change',onMotion);document.removeEventListener('visibilitychange',onVisibility);wrapper.remove();svg.remove();container.classList.remove('hero-is-evolving');finalImage.style.opacity='';this.dispose=null;};
 }};
})(window.SpeciesApp);
