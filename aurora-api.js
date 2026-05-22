// Minimal API for product pages — mirrors demo dataset in script.js
(function(){
  const products = [
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
  function readCart(){ return JSON.parse(localStorage.getItem('cart')||'[]') }
  function saveCart(cart){ localStorage.setItem('cart', JSON.stringify(cart)) }
  function addToCart(id){ const p = products.find(x=>x.id===id); if(!p) return; let c = readCart(); const it=c.find(i=>i.id===id); if(it) it.qty++; else c.push({id:p.id,title:p.title,price:p.price,qty:1}); saveCart(c); return c }
  function toggleWishlist(id){ let w = JSON.parse(localStorage.getItem('wishlist')||'[]'); const i=w.indexOf(id); if(i===-1) w.push(id); else w.splice(i,1); localStorage.setItem('wishlist', JSON.stringify(w)); return w }
  window.Aurora = {products, readCart, addToCart, toggleWishlist}
})();
