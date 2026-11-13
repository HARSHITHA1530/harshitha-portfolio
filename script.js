document.documentElement.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,$=s=>document.querySelector(s),root=document.documentElement;
// theme
$('#theme').onclick=()=>{const l=getComputedStyle(root).colorScheme==='light';root.dataset.theme=l?'dark':'light';cv()};
// typed roles
const R=['Open to Any Role','DevOps Engineer','Cloud Security Engineer','Software Developer'];let ri=0,ci=0,del=false;const T=$('#t');
(function tp(){const w=R[ri];if(RM){T.textContent=w;return}ci+=del?-1:1;T.textContent=w.slice(0,ci);let d=del?35:70;if(!del&&ci===w.length){del=true;d=1600}else if(del&&ci===0){del=false;ri=(ri+1)%R.length;d=350}setTimeout(tp,d)})();
// reveal + counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');e.target.querySelectorAll('[data-n]').forEach(c=>{const n=+c.dataset.n,d=+(c.dataset.d||0),s=c.dataset.s||'',t0=performance.now();(function f(t){const p=Math.min((t-t0)/1400,1),v=n*(1-Math.pow(1-p,3));c.textContent=v.toFixed(d)+s;if(p<1)requestAnimationFrame(f)})(t0)});io.unobserve(e.target)}),{threshold:.15});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
if(RM)document.querySelectorAll('[data-n]').forEach(c=>c.textContent=(+c.dataset.n).toFixed(+(c.dataset.d||0))+(c.dataset.s||''));
// tilt + glow
document.querySelectorAll('.tilt').forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%');if(!RM&&e.pointerType==='mouse'){c.style.setProperty('--ry',((x-.5)*7)+'deg');c.style.setProperty('--rx',((.5-y)*7)+'deg')}});c.addEventListener('pointerleave',()=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')})});
// scroll progress + timeline fill
const bar=$('#bar'),tl=$('#tl'),fill=$('#fill');
function sc(){const h=root.scrollHeight-innerHeight;bar.style.transform='scaleX('+(h>0?scrollY/h:0)+')';const r=tl.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight*.7-r.top)/r.height));fill.style.height=(p*(r.height-12))+'px'}
addEventListener('scroll',sc,{passive:true});sc();
// network canvas
const cn=$('#net'),x=cn.getContext('2d');let W,H,P=[],m={x:-999,y:-999},col;
function cv(){const s=getComputedStyle(root);col=[s.getPropertyValue('--a').trim(),s.getPropertyValue('--b').trim()]}
function rs(){const d=devicePixelRatio||1;W=innerWidth;H=innerHeight;cn.width=W*d;cn.height=H*d;x.setTransform(d,0,0,d,0,0);P=Array.from({length:Math.min(80,Math.floor(W*H/17000))},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35}))}
addEventListener('resize',rs);addEventListener('pointermove',e=>{m.x=e.clientX;m.y=e.clientY});cv();rs();
function dr(){x.clearRect(0,0,W,H);x.globalAlpha=.55;for(const p of P){if(!RM){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1}x.fillStyle=col[0];x.beginPath();x.arc(p.x,p.y,1.8,0,6.3);x.fill()}
for(let i=0;i<P.length;i++){for(let j=i+1;j<P.length;j++){const a=P[i],b=P[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<130){x.globalAlpha=(1-d/130)*.35;x.strokeStyle=col[1];x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}
const q=P[i],dm=Math.hypot(q.x-m.x,q.y-m.y);if(dm<170){x.globalAlpha=(1-dm/170)*.7;x.strokeStyle=col[0];x.beginPath();x.moveTo(q.x,q.y);x.lineTo(m.x,m.y);x.stroke()}}
if(!RM)requestAnimationFrame(dr)}
dr();
// contact form: sends the message straight to the inbox (FormSubmit), falls back to the email app
(function(){const f=document.getElementById('cf');if(!f)return;const st=document.getElementById('fs'),btn=f.querySelector('button[type=submit]'),TO='harshitaanchan2004@gmail.com';
f.addEventListener('submit',async e=>{e.preventDefault();if(f.elements['_honey'].value)return;
const d={name:document.getElementById('cf-name').value.trim(),email:document.getElementById('cf-email').value.trim(),message:document.getElementById('cf-msg').value.trim(),_subject:'New message from your portfolio website',_captcha:'false',_template:'table'};
btn.disabled=true;btn.textContent='Sending…';st.className='fstat';st.textContent='';
try{const r=await fetch('https://formsubmit.co/ajax/'+TO,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(d)});const j=await r.json();
if(!r.ok||String(j.success)!=='true')throw new Error('send failed');
st.textContent='Thank you! Your message has been sent. I will reply soon.';st.classList.add('ok');f.reset()}
catch(err){st.classList.add('err');st.textContent='Sorry, the message could not be sent. ';const a=document.createElement('a');a.textContent='Email me instead';a.href='mailto:'+TO+'?subject='+encodeURIComponent('Message from portfolio')+'&body='+encodeURIComponent(d.message+'\n\n'+d.name+' ('+d.email+')');st.appendChild(a)}
finally{btn.disabled=false;btn.textContent='Send Message'}})})();

// resume download: saves the PDF reliably (falls back to opening it in a new tab)
document.querySelectorAll('a[download]').forEach(a=>a.addEventListener('click',async e=>{
  e.preventDefault();
  const name=a.getAttribute('download')||'Resume.pdf';
  try{
    let blob;
    if(window.__RESUME_B64){const bin=atob(window.__RESUME_B64),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);blob=new Blob([u],{type:'application/pdf'})}
    else{const r=await fetch(a.href);if(!r.ok)throw new Error('missing');blob=await r.blob()}
    const dl=window.claude&&await claude.use('downloads');
    if(dl){await dl.save({filename:name,data:blob});return}
    const url=URL.createObjectURL(blob),t=document.createElement('a');t.href=url;t.download=name;document.body.appendChild(t);t.click();t.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
  }catch(err){if(err&&err.code==='declined')return;window.open(a.href,'_blank')}
}));
