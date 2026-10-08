(function(S){
 const e=S.escape;
 S.art=s=>s.speciesImage;
 S.status=s=>`<span class="status ${s.status.toLowerCase()}">${e(s.status)}</span>`;
 S.card=s=>`<button class="species-card" data-species="${e(s.id)}" aria-label="Open ${e(s.ticker)} species"><div class="card-art"><span class="art-id">SPECIMEN / ${String(s.number).padStart(5,'0')}</span><span class="generation">GEN ${S.roman(s.generation)}</span><img src="${e(S.art(s))}" alt="${e(s.scientificName)} digital organism" loading="lazy"><div class="dna-hover">DNA // ${s.secondaryTraits.map(e).join(' · ')}<br>${s.mutationCount} MUTATIONS · ${s.extinctionEventsSurvived} EVENTS SURVIVED</div></div><div class="card-body"><div class="card-title"><h3>$${e(s.ticker)}</h3>${S.status(s)}</div><p class="scientific">${e(s.scientificName)}</p><div class="card-stats"><span>MC <b>${S.money(s.marketCap)}</b></span><span>HEALTH <b>${s.health}%</b></span></div><div class="health-track"><span style="width:${s.health}%;${s.health<25?'background:var(--orange)':''}"></span></div><div class="card-foot"><span class="trait-pill">${e(s.primaryTrait)}</span><span>${s.evolutionProgress}% EVOLVED</span></div><div class="progress-track card-evolution"><span style="width:${s.evolutionProgress}%"></span></div><p class="card-next">NEXT EVOLUTION: ${S.money(s.nextEvolutionRequirement)} MC</p></div></button>`;
 S.filters=['TRENDING','NEWLY DISCOVERED','MOST EVOLVED','MUTATING','CRITICAL','ANCIENT'];
 S.filtered=(tab,query='')=>{let all=S.all().filter(s=>s.status!=='EXTINCT');if(tab==='MUTATING')all=all.filter(s=>s.status==='MUTATING');if(tab==='CRITICAL')all=all.filter(s=>s.health<25);if(tab==='ANCIENT')all=all.filter(s=>s.age>=730||s.primaryTrait==='ANCIENT');if(tab==='MOST EVOLVED')all.sort((a,b)=>b.generation-a.generation||b.evolutionProgress-a.evolutionProgress);if(tab==='NEWLY DISCOVERED')all.sort((a,b)=>Date.parse(b.discoveredAt)-Date.parse(a.discoveredAt));if(tab==='TRENDING')all.sort((a,b)=>b.volume24h-a.volume24h);return all.filter(s=>(s.ticker+' '+s.tokenName+' '+s.scientificName+' '+s.contractAddress).toLowerCase().includes(query.toLowerCase()));};
 S.tabs=(labels,active,attribute='data-filter')=>`<div class="tabs" role="tablist">${labels.map(t=>`<button role="tab" aria-selected="${t===active}" class="${t===active?'active':''}" ${attribute}="${e(t)}">${e(t)}</button>`).join('')}</div>`;
 S.empty=(text,action='DISCOVER A SPECIES')=>`<div class="empty"><h3>NO SIGNS OF LIFE. YET.</h3><p>${text}</p><button class="button" data-discover>${action} ↗</button></div>`;
 S.originalMeme=s=>{
 const image=s.demo?s.originalImage:s.originalImage?.startsWith('data:image/')?s.originalImage:null;
 return `<div class="original-meme">${image?`<button class="original-meme-image" data-original-image="${e(s.id)}" aria-label="View original ${e(s.tokenName)} image"><img src="${e(image)}" alt="Original ${e(s.tokenName)} token image"><span aria-hidden="true">↗</span></button>`:'<div class="original-meme-missing" aria-hidden="true">⌁</div>'}<div><span class="eyebrow">ORIGINAL MEME</span><strong>${e(s.tokenName)} <span>$${e(s.ticker)}</span></strong><p>${image?'The token that became this species.':s.demo?'Archive organism. No source token image.':'No token image uploaded.'}</p></div></div>`;
 };

})(window.SpeciesApp);
/* Bake uploaded pixels into a repeatable specimen treatment used by every surface. */
(function(S){
 S.createSpecimenArt=async species=>{
 if(!species.originalImage?.startsWith('data:image/'))return species;
 const load=src=>new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=reject;image.src=src;});
 const [organism,token]=await Promise.all([load(species.speciesImage),load(species.originalImage)]);
 const canvas=document.createElement('canvas');canvas.width=canvas.height=512;const ctx=canvas.getContext('2d');ctx.drawImage(organism,0,0,512,512);const seed=S.hash(species.contractAddress+'|'+species.ticker);const x=256,y=251,r=55;
 ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.clip();ctx.filter=`sepia(.65) hue-rotate(${25+seed%35}deg) saturate(.75) contrast(1.25)`;const scale=Math.max(r*2/token.width,r*2/token.height);ctx.drawImage(token,x-token.width*scale/2,y-token.height*scale/2,token.width*scale,token.height*scale);ctx.filter='none';ctx.fillStyle='#b4ee5a18';ctx.fillRect(x-r,y-r,r*2,r*2);ctx.strokeStyle='#c1f55a35';ctx.lineWidth=.7;for(let i=y-r;i<y+r;i+=6){ctx.beginPath();ctx.moveTo(x-r,i);ctx.lineTo(x+r,i);ctx.stroke();}ctx.restore();ctx.strokeStyle='#b1d971';ctx.lineWidth=1;ctx.beginPath();ctx.arc(x,y,r+5,0,Math.PI*2);ctx.stroke();ctx.strokeStyle='#b1d97144';ctx.beginPath();ctx.arc(x,y,r+11,0,Math.PI*2);ctx.stroke();for(let i=0;i<12;i++){const a=i/12*Math.PI*2;ctx.beginPath();ctx.moveTo(x+Math.cos(a)*(r+10),y+Math.sin(a)*(r+10));ctx.lineTo(x+Math.cos(a)*(r+20),y+Math.sin(a)*(r+20));ctx.stroke();}
 return {...species,speciesImage:canvas.toDataURL('image/png'),customArt:true,evolutionHistory:species.evolutionHistory.map(ev=>({...ev,image:null}))};
 };
})(window.SpeciesApp);
