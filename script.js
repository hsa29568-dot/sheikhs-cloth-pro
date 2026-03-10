let products = [];
let cart = [];

// Load products
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts(products);
  });

// Render products
function renderProducts(list) {
  const container = document.getElementById("products");
  container.innerHTML = '';
  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <div class="price">৳${p.price}</div>
      <a class="btn" onclick="addToCart('${p.name}',${p.price})">Add to Cart</a>
    `;
    container.appendChild(div);
  });
}

// Add to cart
function addToCart(name, price){
  const index = cart.findIndex(item=>item.name===name);
  if(index>=0) cart[index].qty++;
  else cart.push({name, price, qty:1});
  renderCart();
}

// Remove from cart
function removeFromCart(name){
  cart = cart.filter(item=>item.name!==name);
  renderCart();
}

// Render cart
function renderCart(){
  const container = document.getElementById("cart-items");
  container.innerHTML = '';
  let total = 0;
  cart.forEach(item=>{
    total += item.price*item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} x ${item.qty}</span>
      <span>৳${item.price*item.qty} <button onclick="removeFromCart('${item.name}')">❌</button></span>
    `;
    container.appendChild(div);
  });
  document.getElementById("cart-total").innerText = total;
  document.getElementById("checkout-btn").href = 
    "https://wa.me/8801796001923?text=" + encodeURIComponent(
      cart.map(i=>i.name + " x"+i.qty).join(", ") + " | Total: ৳"+total
    );
}

// Search functionality
document.getElementById("search").addEventListener("input", e=>{
  const term = e.target.value.toLowerCase();
  const filtered = products.filter(p=>p.name.toLowerCase().includes(term));
  renderProducts(filtered);
});
