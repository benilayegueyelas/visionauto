/* ── CURSOR ── */
const cd=document.getElementById('cd'),cr=document.getElementById('cr');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cd.style.left=mx+'px';cd.style.top=my+'px';});
(function loop(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;cr.style.left=rx+'px';cr.style.top=ry+'px';requestAnimationFrame(loop);})();

/* ── LOADER ── */
let p=0;const ldf=document.getElementById('ldf'),ldp=document.getElementById('ldp');
const ldiv=setInterval(()=>{p+=Math.random()*11+4;if(p>=100){p=100;clearInterval(ldiv);setTimeout(()=>{document.getElementById('loader').classList.add('gone');heroIn();},350);}ldf.style.width=p+'%';ldp.textContent=Math.floor(p)+'%';},75);

/* ── HERO IN ── */
function heroIn(){['hk','hh','hs','hc','hr','hs2','hscrl'].forEach((id,i)=>setTimeout(()=>{const el=document.getElementById(id);if(el)el.classList.add('in');},i*110+80));}

/* ── NAV ── */
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('solid',scrollY>60));

/* ── THREE.JS ── */
(()=>{
  const canvas=document.getElementById('c3d');
  const R=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  R.setSize(innerWidth,innerHeight);R.setPixelRatio(Math.min(devicePixelRatio,2));
  const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.1,200);
  C.position.z=6;
  const N=2200,PA=new Float32Array(N*3),CA=new Float32Array(N*3);
  for(let i=0;i<N;i++){
    PA[i*3]=(Math.random()-.5)*28;PA[i*3+1]=(Math.random()-.5)*28;PA[i*3+2]=(Math.random()-.5)*16;
    const t=Math.random();
    if(t<.22){CA[i*3]=.91;CA[i*3+1]=.40;CA[i*3+2]=.10;}
    else if(t<.5){CA[i*3]=.11;CA[i*3+1]=.17;CA[i*3+2]=.37;}
    else{CA[i*3]=.25;CA[i*3+1]=.28;CA[i*3+2]=.38;}
  }
  const G=new THREE.BufferGeometry();
  G.setAttribute('position',new THREE.BufferAttribute(PA,3));
  G.setAttribute('color',new THREE.BufferAttribute(CA,3));
  const pts=new THREE.Points(G,new THREE.PointsMaterial({size:.016,vertexColors:true,transparent:true,opacity:.5}));
  S.add(pts);
  [[3.5,.007,.055],[5.5,.006,.038],[7.5,.005,.022],[10,.004,.012]].forEach(([r,t,op],i)=>{
    const m=new THREE.Mesh(new THREE.TorusGeometry(r,t,6,100),new THREE.MeshBasicMaterial({color:i<2?0xE8671A:0x1B2C5E,transparent:true,opacity:op}));
    m.rotation.x=Math.PI/(2.5+i*.5);m.rotation.y=Math.PI/(4+i*.3);m.userData.s=.00012+i*.00004;S.add(m);
  });
  let ox=0,oy=0;
  document.addEventListener('mousemove',e=>{ox=(e.clientX/innerWidth-.5)*.5;oy=(e.clientY/innerHeight-.5)*.3;});
  window.addEventListener('resize',()=>{R.setSize(innerWidth,innerHeight);C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix();});
  (function tick(){requestAnimationFrame(tick);const t=Date.now()*.0002;pts.rotation.y=t*.04+ox*.22;pts.rotation.x=oy*.16;S.children.forEach(o=>{if(o.userData.s){o.rotation.z+=o.userData.s;o.rotation.x+=o.userData.s*.55;}});R.render(S,C);})();
})();

/* ── SCROLL REVEAL ── */
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('up');io.unobserve(e.target);}}),{threshold:.08});
document.querySelectorAll('.sr').forEach(el=>io.observe(el));

/* ── HERO CAR SWITCH ── */
const cars=[
  {img:'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=900&q=85&fit=crop',tag:'Featured This Month',name:'Toyota Land Cruiser V8'},
  {img:'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=85&fit=crop',tag:'Premium Rental',name:'BMW Série 7 740i'},
  {img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85&fit=crop',tag:'Available Now',name:'Porsche Cayenne S'},
];
function switchCar(i){
  const c=cars[i],img=document.getElementById('hfImg');
  img.style.cssText='opacity:0;transform:scale(1.08);transition:opacity .5s,transform .7s;';
  setTimeout(()=>{img.src=c.img;document.getElementById('hfTag').textContent=c.tag;document.getElementById('hfName').textContent=c.name;img.style.cssText='opacity:1;transform:scale(1);transition:opacity .6s,transform .8s;';},300);
  document.querySelectorAll('.htmb').forEach((t,j)=>t.classList.toggle('on',j===i));
}

/* ── MODE ── */
function setMode(m){
  document.querySelectorAll('.mtab').forEach(b=>b.classList.remove('on'));
  const map={achat:'tA',location:'tL',all:'tAl'};
  document.getElementById(map[m]).classList.add('on');
  filterCars(m==='all'?'all':m,null);
}

/* ── FILTER ── */
function filterCars(t,btn){
  if(btn){document.querySelectorAll('.cf').forEach(b=>b.classList.remove('on'));btn.classList.add('on');}
  document.querySelectorAll('.car-card').forEach(c=>{const ct=c.dataset.type;c.style.display=(t==='all'||ct===t||ct==='both')?'block':'none';});
}

/* ── PRICE CALC ── */
function calcPrice(){
  const r=parseInt(document.getElementById('rfV').value);
  const s=document.getElementById('rfS').value,e=document.getElementById('rfE').value;
  let d=1;if(s&&e){const df=(new Date(e)-new Date(s))/86400000;if(df>0)d=df;}
  document.getElementById('rfT').textContent='$'+(r*d).toLocaleString('en-US');
  document.getElementById('rfD').textContent=d+(d>1?' days':' day');
}

/* ── MODALS ── */
function openBuy(n){document.getElementById('buyName').textContent=n;document.getElementById('mBuy').classList.add('open');}
function openRent(n){document.getElementById('rentName').textContent=n;document.getElementById('mRent').classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}
document.querySelectorAll('.modal-bg').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('open');}));

/* ── SUBMIT ── */
async function doSubmit(t){
  let data = { type: t };
  if (t === 'buy') {
    data.vehicle = document.getElementById('buyName').textContent;
    data.firstName = document.getElementById('b-fn').value;
    data.lastName = document.getElementById('b-ln').value;
    data.phone = document.getElementById('b-ph').value;
    data.email = document.getElementById('b-em').value;
    data.message = document.getElementById('b-msg').value;
  } else {
    data.vehicle = document.getElementById('rentName').textContent;
    data.firstName = document.getElementById('r-fn').value;
    data.lastName = document.getElementById('r-ln').value;
    data.startDate = document.getElementById('mds').value;
    data.endDate = document.getElementById('mde').value;
    data.location = document.getElementById('r-loc').value;
    data.phone = document.getElementById('r-ph').value;
  }
  
  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      closeModal(t==='buy'?'mBuy':'mRent');
      document.getElementById('toastMsg').textContent=t==='buy'?'Request received — we will contact you within 2 hours.':'Reservation confirmed — delivery scheduled!';
      const toast=document.getElementById('toast');toast.classList.add('show');
      setTimeout(()=>toast.classList.remove('show'),5000);
      
      // Reset forms
      const forms = document.querySelectorAll('.mform');
      forms.forEach(f => f.reset());
    } else {
      alert('Failed to submit request. Please try again.');
    }
  } catch (err) {
    console.error('Submit error', err);
    alert('Network error. Please try again.');
  }
}

/* ── FAV ── */
function toggleFav(b){b.textContent=b.textContent==='🤍'?'❤️':'🤍';}

/* ── DATE MIN ── */
const td=new Date().toISOString().split('T')[0];
document.querySelectorAll('input[type=date]').forEach(i=>i.min=td);

/* ── MOBILE MENU ── */
function toggleMobileMenu(){
  const menu=document.getElementById('mobileMenu');
  const burger=document.getElementById('hamburger');
  const isOpen=menu.classList.toggle('open');
  burger.classList.toggle('open',isOpen);
  document.body.style.overflow=isOpen?'hidden':'';
}
function closeMobileMenu(){
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.body.style.overflow='';
}
// Close on resize to desktop
window.addEventListener('resize',()=>{ if(innerWidth>1024) closeMobileMenu(); });
