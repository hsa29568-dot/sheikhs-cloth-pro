let products = [];
let cart = [];

// Load products from products.json
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

  list.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.style.opacity = 0; // for fade-in
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <div class="price">৳${p.price}</div>
      <a class="btn" onclick="addToCart('${p.name}',${p.price})">Add to Cart</a>
    `;
    container.appendChild(div);

    // Fade-in animation
    setTimeout(() => {
      div.style.transition = "opacity 0.6s ease, transform 0.3s ease";
      div.style.opacity = 1;
      div.style.transform = "translateY(0)";
    }, 100 * index);
  });
}

// Add to cart
function addToCart(name, price) {
  const index = cart.findIndex(item => item.name === name);
  if (index >= 0) cart[index].qty++;
  else cart.push({name, price, qty:1});
  renderCart();
}

// Remove from cart
function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  renderCart();
}

// Render cart
function renderCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} x ${item.qty}</span>
      <span>৳${item.price * item.qty} <button onclick="removeFromCart('${item.name}')">❌</button></span>
    `;
    container.appendChild(div);
  });

  document.getElementById("cart-total").innerText = total;

  // WhatsApp checkout link
  document.getElementById("checkout-btn").href = 
    "https://wa.me/8801796001923?text=" + encodeURIComponent(
      cart.map(i => i.name + " x"+i.qty).join(", ") + " | Total: ৳"+total
    );
}

// Live Search
document.getElementById("search").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(term));
  renderProducts(filtered);
});

// Optional: smooth scroll to top button
const scrollBtn = document.createElement("button");
scrollBtn.innerText = "↑";
scrollBtn.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #ff7e5f;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 50%;
  cursor: pointer;
  display: none;
  z-index: 9999;
`;
document.body.appendChild(scrollBtn);

scrollBtn.addEventListener("click", () => window.scrollTo({top:0, behavior:'smooth'}));

window.addEventListener("scroll", () => {
  if(window.scrollY > 200) scrollBtn.style.display = "block";
  else scrollBtn.style.display = "none";
});
