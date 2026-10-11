const reader=document.getElementById('reader');
const pages=[...document.querySelectorAll('.page')];
const progressFill=document.getElementById('progressFill');
const counterFill=document.getElementById('counterFill');
const currentPage=document.getElementById('currentPage');
const contents=document.getElementById('contents');
const themeButton=document.getElementById('themeBtn');
let active=0;

function reducedMotion(){return window.matchMedia('(prefers-reduced-motion: reduce)').matches}
function goTo(index){
  index=Math.max(0,Math.min(pages.length-1,index));
  reader.scrollTo({left:pages[index].offsetLeft,top:0,behavior:reducedMotion()?'auto':'smooth'});
  closeContents();
}
function setActive(index){
  active=index;
  pages.forEach((page,n)=>page.classList.toggle('active',n===index));
  const pct=((index+1)/pages.length)*100;
  progressFill.style.width=pct+'%';
  counterFill.style.width=pct+'%';
  currentPage.textContent=String(index+1).padStart(2,'0');
  document.title=String(index+1).padStart(2,'0')+' — '+pages[index].dataset.title+' | LevTech';
}
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting)setActive(pages.indexOf(entry.target));
  });
},{root:reader,threshold:.60});
pages.forEach(page=>observer.observe(page));

document.getElementById('prevBtn').addEventListener('click',()=>goTo(active-1));
document.getElementById('nextBtn').addEventListener('click',()=>goTo(active+1));
document.getElementById('fullBtn').addEventListener('click',async()=>{
  try{
    if(!document.fullscreenElement)await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  }catch(error){/* Fullscreen may be unavailable in some browsers. */}
});

function applyTheme(theme){
  const isLight=theme==='light';
  document.body.classList.toggle('light',isLight);
  themeButton.textContent=isLight?'☾':'☼';
  themeButton.setAttribute('aria-label',isLight?'Switch to dark mode':'Switch to light mode');
  themeButton.setAttribute('title',isLight?'Switch to dark mode':'Switch to light mode');
  themeButton.setAttribute('aria-pressed',String(isLight));
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.setAttribute('content',isLight?'#f6f4ee':'#06111f');
  try{localStorage.setItem('levtech-magazine-theme',theme)}catch(error){/* Storage may be disabled. */}
}
let savedTheme='dark';
try{savedTheme=localStorage.getItem('levtech-magazine-theme')||'dark'}catch(error){}
applyTheme(savedTheme);
themeButton.addEventListener('click',()=>applyTheme(document.body.classList.contains('light')?'dark':'light'));

function openContents(){contents.classList.add('open');contents.setAttribute('aria-hidden','false')}
function closeContents(){contents.classList.remove('open');contents.setAttribute('aria-hidden','true')}
document.getElementById('contentsBtn').addEventListener('click',openContents);
document.getElementById('closeContents').addEventListener('click',closeContents);
contents.querySelectorAll('[data-page]').forEach(button=>button.addEventListener('click',()=>goTo(Number(button.dataset.page)-1)));

document.addEventListener('keydown',event=>{
  if(contents.classList.contains('open')){if(event.key==='Escape')closeContents();return}
  if(['ArrowRight','PageDown',' '].includes(event.key)){event.preventDefault();goTo(active+1)}
  if(['ArrowLeft','PageUp'].includes(event.key)){event.preventDefault();goTo(active-1)}
  if(event.key==='Home')goTo(0);
  if(event.key==='End')goTo(pages.length-1);
  if(event.key.toLowerCase()==='o')openContents();
  if(event.key.toLowerCase()==='t')applyTheme(document.body.classList.contains('light')?'dark':'light');
});

let touchX=0,touchY=0;
reader.addEventListener('touchstart',event=>{touchX=event.changedTouches[0].screenX;touchY=event.changedTouches[0].screenY},{passive:true});
reader.addEventListener('touchend',event=>{
  const dx=event.changedTouches[0].screenX-touchX;
  const dy=event.changedTouches[0].screenY-touchY;
  if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.25)goTo(active+(dx<0?1:-1));
},{passive:true});

setActive(0);
