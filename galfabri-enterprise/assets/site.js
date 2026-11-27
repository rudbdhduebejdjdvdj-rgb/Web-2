const menu=document.querySelector('.mobiletoggle'),nav=document.querySelector('.nav');
if(menu&&nav)menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open')?'true':'false')});
document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems=[...document.querySelectorAll('.reveal')];
if('IntersectionObserver' in window){
 const io=new IntersectionObserver(items=>items.forEach(entry=>{
  if(entry.isIntersecting){
   const siblings=[...entry.target.parentElement.querySelectorAll(':scope > .reveal')];
   const index=Math.max(0,siblings.indexOf(entry.target));
   entry.target.style.transitionDelay=reduceMotion?'0ms':Math.min(index*100,350)+'ms';
   entry.target.classList.add('visible');
   io.unobserve(entry.target);
  }
 }),{threshold:.12,rootMargin:'0px 0px -5% 0px'});
 revealItems.forEach(el=>io.observe(el));
}else revealItems.forEach(el=>el.classList.add('visible'));

let ticking=false;
function onScroll(){
 if(ticking)return;
 ticking=true;
 requestAnimationFrame(()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const progress=max>0?window.scrollY/max:0;
  document.documentElement.style.setProperty('--scroll-progress',progress);
  const heroImage=document.querySelector('.heroimg');
  if(heroImage&&!reduceMotion&&window.innerWidth>800){
   const r=heroImage.getBoundingClientRect();
   if(r.bottom>0&&r.top<innerHeight)heroImage.style.setProperty('--parallax-y',((r.top-innerHeight*.35)*-.055)+'px');
  }
  ticking=false;
 });
}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();

// Make image cards respond subtly as they enter and leave the viewport.
if(!reduceMotion&&'IntersectionObserver' in window){
 const cards=document.querySelectorAll('.photoCard');
 const cardObserver=new IntersectionObserver(entries=>entries.forEach(e=>{
  const img=e.target.querySelector('img');
  if(img)img.style.transform=e.isIntersecting?'scale(1.035)':'scale(1)';
 }),{threshold:0,rootMargin:'-10% 0px -10% 0px'});
 cards.forEach(card=>cardObserver.observe(card));
}
