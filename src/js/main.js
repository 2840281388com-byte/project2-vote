const debounce = (fn, delay=200) => {
  let t; return (...args)=>{clearTimeout(t); t=setTimeout(()=>fn(...args), delay)}
}
const throttle = (fn, wait=300) => {
  let last=0; return (...args)=>{const now=Date.now(); if(now-last>=wait){last=now; fn(...args)}}
}
// Typewriter slogan
const sloganText = '阳光干净，认真热爱，做更好的自己'
const typewriterEl = document.getElementById('typewriter')
if(typewriterEl){
  let i=0
  const tick = ()=>{ if(i<=sloganText.length){ typewriterEl.textContent = sloganText.slice(0,i++); requestAnimationFrame(tick) } }
  requestAnimationFrame(tick)
}
// Share buttons with Web Share API + QR fallback
const shareButtons = document.querySelectorAll('.btn-share')
const qrCanvas = document.getElementById('qrCanvas')
const shareData = {
  title: '唐煜涵 · 班草',
  text: '重庆第二师范学院 2024 级计科3班',
  url: location.href
}
shareButtons.forEach(btn=>{
  btn.addEventListener('click', async ()=>{
    if(navigator.share){
      try{ await navigator.share(shareData) }catch(e){}
    }else{
      if(window.QRCode && qrCanvas){
        const ctx = qrCanvas.getContext('2d')
        ctx.clearRect(0,0,qrCanvas.width, qrCanvas.height)
        QRCode.toCanvas(qrCanvas, location.href, {width:128}, (error)=>{})
        qrCanvas.parentElement?.setAttribute('aria-hidden', 'false')
      }else{
        navigator.clipboard?.writeText(location.href)
        alert('已复制链接，可在社交平台分享')
      }
    }
  })
})
// Lightbox with basic pinch zoom
const lightbox = document.getElementById('lightbox')
const lightboxImg = document.getElementById('lightbox-img')
document.querySelectorAll('#gallery img').forEach(img=>{
  img.addEventListener('click', ()=>{
    lightboxImg.src = img.getAttribute('data-src') || img.src
    lightbox.hidden = false
    currentScale=1
    lightboxImg.style.transform='scale(1)'
  })
})
document.querySelector('.lightbox-close')?.addEventListener('click', ()=>{lightbox.hidden=true})
let pointers = new Map(); let currentScale=1
const getDistance = ()=> {
  const pts = Array.from(pointers.values())
  if(pts.length<2) return 0
  const [a,b]=pts; return Math.hypot(a.clientX-b.clientX, a.clientY-b.clientY)
}
lightboxImg?.addEventListener('pointerdown', (e)=>{pointers.set(e.pointerId,e); lightboxImg.setPointerCapture(e.pointerId)})
lightboxImg?.addEventListener('pointermove', (e)=>{
  if(pointers.has(e.pointerId)){ pointers.set(e.pointerId,e)
    if(pointers.size===2){
      const d=getDistance(); if(d>0){ const scale = Math.min(3, Math.max(1, d/120)); currentScale=scale; lightboxImg.style.transform=`scale(${scale})` }
    }
  }
})
lightboxImg?.addEventListener('pointerup', (e)=>{pointers.delete(e.pointerId)})
// Fade-up on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target) }
  })
},{threshold:0.2})
document.querySelectorAll('.fade-up').forEach(el=>io.observe(el))
// Back to top
const backToTop = document.getElementById('backToTop')
const onScroll = throttle(()=>{
  if(window.scrollY>300) backToTop?.classList.add('show')
  else backToTop?.classList.remove('show')
}, 200)
window.addEventListener('scroll', onScroll, {passive:true})
backToTop?.addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}))
// Comments anti-spam: 30s per client
const canPost = ()=>{
  const last = parseInt(localStorage.getItem('lastPostTs')||'0',10)
  return Date.now()-last>30000
}
window.addEventListener('message', (e)=>{
  const ok = canPost()
  if(!ok){
    alert('发表评论过于频繁，请稍后再试（30秒）')
    return
  }
  localStorage.setItem('lastPostTs', String(Date.now()))
})
// Register Service Worker
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('/js/sw.js').catch(()=>{})
  })
}
