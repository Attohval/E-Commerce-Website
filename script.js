// AuroraShop — script.js
// Minimal reusable JS for hero slider, cart, wishlist, UI interactions, and animations

const App = (()=>{
  const state = {
    cart: JSON.parse(localStorage.getItem('cart')||'[]'),
    wishlist: JSON.parse(localStorage.getItem('wishlist')||'[]'),
    products: []
  }

  /* Small products dataset for demo */
  function seedProducts(){
    state.products = [
      {id:'p1',title:'Wireless Headphones',price:129.99,old:199.99,rate:4.6,category:'electronics',img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'},
      {id:'p2',title:'Smartwatch Pro',price:89.99,old:149.99,rate:4.4,category:'electronics',img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'},
      {id:'p3',title:'Running Shoes',price:69.99,old:89.99,rate:4.5,category:'fashion',img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'},
      {id:'p4',title:'Ceramic Vase',price:39.99,old:null,rate:4.2,category:'home',img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'},
      {id:'p5',title:'Gaming Mouse',price:49.99,old:79.99,rate:4.7,category:'electronics',img:'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80'},
      {id:'p6',title:'Minimal Backpack',price:54.99,old:74.99,rate:4.5,category:'fashion',img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'},
      {id:'p7',title:'Modern Table Lamp',price:44.99,old:null,rate:4.3,category:'home',img:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'},
      {id:'p8',title:'Classic Sunglasses',price:34.99,old:49.99,rate:4.4,category:'fashion',img:'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'},
      {id:'p9',title:'Skincare Essentials',price:58.99,old:82.99,rate:4.6,category:'beauty',img:'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'},
      {id:'p10',title:'Bluetooth Speaker',price:74.99,old:99.99,rate:4.5,category:'electronics',img:'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80'},
      {id:'p11',title:'Coffee Maker',price:119.99,old:159.99,rate:4.7,category:'home',img:'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80'},
      {id:'p12',title:'Leather Tote Bag',price:79.99,old:109.99,rate:4.5,category:'fashion',img:'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80'}
    ]
  }

  // DOM helpers
  const $ = s=>document.querySelector(s)
  const $$ = s=>Array.from(document.querySelectorAll(s))

  /* Hero slider */
  function initHero(){
    const slides = $$('#hero-slider .slide')
    const indicators = $('#hero-indicators')
    const slider = $('#hero-slider')
    if(!slides.length || !indicators || !slider) return
    slides.forEach((s,i)=>{
      const btn=document.createElement('button')
      btn.dataset.index=i
      if(i===0)btn.classList.add('active')
      indicators.appendChild(btn)
      btn.addEventListener('click', ()=>{ goTo(i) })
    })
    let idx=0, timer
    function goTo(i){ slides[idx].classList.remove('active'); indicators.children[idx].classList.remove('active'); idx=i; slides[idx].classList.add('active'); indicators.children[idx].classList.add('active') }
    function next(){ goTo((idx+1)%slides.length) }
    timer = setInterval(next,5000)
    slider.addEventListener('mouseenter', ()=>clearInterval(timer))
    slider.addEventListener('mouseleave', ()=>timer=setInterval(next,5000))
  }

  /* Render features cards */
  function renderFeatured(){
    const grid = $('#featured-grid')
    if(!grid) return
    grid.innerHTML = state.products.map(p=>`
      <article class="card" data-id="${p.id}">
        <img src="${p.img}" alt="${p.title}">
        <div class="meta">
              <div class="product-card-head"><strong>${p.title}</strong><span class="badge-discount">${p.old?Math.round((1 - p.price/p.old)*100)+'%':''}</span></div>
          <div class="product-card-foot">
            <div>
              <div class="price">$${p.price.toFixed(2)} ${p.old?`<small class="muted">$${p.old.toFixed(2)}</small>`:''}</div>
              <div class="muted">⭐ ${p.rate}</div>
            </div>
            <div class="card-actions">
              <button class="btn" data-action="wish">♡</button>
              <button class="btn primary" data-action="add">Add</button>
            </div>
          </div>
        </div>
      </article>
    `).join('')

    // attach events
    $$('[data-action="add"]').forEach(btn=>btn.addEventListener('click', (e)=>{
      const id = e.target.closest('.card').dataset.id; addToCart(id)
    }))
    $$('[data-action="wish"]').forEach(btn=>btn.addEventListener('click', (e)=>{
      const id = e.target.closest('.card').dataset.id; toggleWishlist(id)
    }))
  }

  /* Cart & wishlist */
  function save(){ localStorage.setItem('cart', JSON.stringify(state.cart)); localStorage.setItem('wishlist', JSON.stringify(state.wishlist)); updateUICounts() }
  function updateUICounts(){
    const cartCount = $('#cart-count')
    const wishCount = $('#wish-count')
    if(cartCount) cartCount.textContent = state.cart.reduce((s,i)=>s+i.qty,0)
    if(wishCount) wishCount.textContent = state.wishlist.length
  }
  function addToCart(id){
    const product = state.products.find(p=>p.id===id); if(!product) return
    const item = state.cart.find(i=>i.id===id)
    if(item) item.qty++
    else state.cart.push({id:product.id,title:product.title,price:product.price,qty:1})
    save(); showToast('Added to cart')
  }
  function toggleWishlist(id){ const idx=state.wishlist.indexOf(id); if(idx===-1) state.wishlist.push(id); else state.wishlist.splice(idx,1); save(); showToast('Wishlist updated') }

  /* Toast */
  let toastTimer
  function showToast(msg){
    const t = $('#toast')
    if(!t) return
    t.textContent=msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'),2500)
  }

  /* Hamburger & dark mode */
  function initUI(){
    const hamburger = $('#hamburger')
    const mainNav = $('#main-nav') || $('.main-nav')
    if(hamburger && mainNav){
      hamburger.addEventListener('click', ()=>{
        mainNav.classList.toggle('open')
        const links = mainNav.querySelector('.nav-links')
        if(links) links.classList.toggle('show')
      })
    }
    const darkToggle = $('#dark-toggle')
    if(darkToggle) darkToggle.addEventListener('click', ()=>{
      document.body.classList.toggle('dark')
      localStorage.setItem('dark', document.body.classList.contains('dark'))
    })
    if(localStorage.getItem('dark')==='true') document.body.classList.add('dark')
    const backToTop = $('#back-to-top')
    if(backToTop){
      backToTop.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}))
      window.addEventListener('scroll', ()=>{ backToTop.style.display = window.scrollY>300 ? 'block' : 'none' })
    }
    const notif = $('#notif-btn')
    if(notif) notif.addEventListener('click', ()=>showToast('No new notifications'))
  }

  /* Newsletter */
  function bindNewsletter(){ const f = $('#newsletter-form'); if(!f) return; f.addEventListener('submit', (e)=>{ e.preventDefault(); const em = $('#newsletter-email'); if(em.value && em.checkValidity()){ showToast('Thanks for subscribing'); em.value=''} else showToast('Please enter a valid email') }) }

  /* Simple scroll reveal */
  function initReveal(){ if(!('IntersectionObserver' in window)) return; const obs = new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('reveal'); obs.unobserve(e.target) } }) },{threshold:0.12})
    $$('.card, .feature, .testimonial-grid, .brand-item, .flash-card').forEach(el=>obs.observe(el)) }

  /* Page load */
  function ready(){ seedProducts(); renderFeatured(); initHero(); initUI(); bindNewsletter(); initReveal(); updateUICounts(); // trending sample
    const trending = $('#trending-list'); if(trending) trending.innerHTML = state.products.slice(0,4).map(p=>`<li><a href="product.html?id=${p.id}">${p.title}</a></li>`).join('')
    const loading = document.getElementById('loading')
    if(loading) setTimeout(()=>{loading.classList.add('hidden')},600)
  }

  return {ready}
})()

document.addEventListener('DOMContentLoaded', ()=>{App.ready()})
