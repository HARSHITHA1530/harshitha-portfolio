document.documentElement.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,$=s=>document.querySelector(s),root=document.documentElement;
// theme
$('#theme').onclick=()=>{const l=getComputedStyle(root).colorScheme==='light';root.dataset.theme=l?'dark':'light';cv()};
// typed roles
const R=['Aspiring Cloud Support Associate','Python & Java Developer','Database Enthusiast','Always learning'];let ri=0,ci=0,del=false;const T=$('#t');
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