let products = [
  {"name":"Blue Checkered Shirt","price":1200,"image":"https://i.ibb.co/6H3qQkD/blue1.jpg","description":"Classic cotton checkered shirt."},
  {"name":"Black Palm Shirt","price":1500,"image":"https://i.ibb.co/0Fj1hH0/black-palm.jpg","description":"Stylish palm print shirt."},
  {"name":"Grey Formal Shirt","price":1800,"image":"https://i.ibb.co/D4RSPsm/grey.jpg","description":"Elegant formal grey shirt."},
  {"name":"Light Grey T-Shirt","price":900,"image":"https://i.ibb.co/zrQfhC5/light-grey.jpg","description":"Comfortable cotton t-shirt."},
  {"name":"Blue Striped Shirt","price":1600,"image":"https://i.ibb.co/QvZ6X2X/blue-striped.jpg","description":"Modern striped shirt."},
  {"name":"Red Plaid Shirt","price":1700,"image":"https://i.ibb.co/9tXhjDJ/red-plaid.jpg","description":"Red plaid shirt for casual wear."},
  {"name":"Black Formal Shirt","price":1900,"image":"https://i.ibb.co/cNnV3BQ/black-formal.jpg","description":"Premium black formal shirt."},
  {"name":"Plain Black T-Shirt","price":800,"image":"https://i.ibb.co/6FzVqTb/black-plain.jpg","description":"Classic plain black t-shirt."}
];

let cart = [];

// Render products
function renderProducts(list){
  const container = document.getElementById("products");
  container.innerHTML = '';
  list.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <div class="price">৳${p.price}</div>
      <a class="btn" onclick="addToCart('${p.name}',${p.price})">Add to Cart</a>
    `;
    div.addEventListener("click", () => showModal(p));
    container.appendChild(div);
  });
}

renderProducts(products);

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
    div.innerHTML = `<span>${item.name} x ${item.qty}</span><span>৳${item.price*item.qty} <button onclick="removeFromCart('${item.name}')">❌</button></span>`;
    container.appendChild(div);
  });
  document.getElementById("cart-total").innerText = total;
  document.getElementById("checkout-btn").href =
    "https://wa.me/8801796001923?text=" + encodeURIComponent(cart.map(i=>i.name+" x"+i.qty).join(", ") + " | Total: ৳"+total);
}

// Search
document.getElementById("search").addEventListener("input", e=>{
  const term = e.target.value.toLowerCase();
  const filtered = products.filter(p=>p.name.toLowerCase().includes(term));
  renderProducts(filtered);
});

// Modal for details
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalPrice = document.getElementById("modal-price");
const modalDesc = document.getElementById("modal-desc");
const modalClose = document.getElementById("modal-close");

function showModal(p){
  modalImg.src = p.image;
  modalName.innerText = p.name;
  modalPrice.innerText = "Price: ৳" + p.price;
  modalDesc.innerText = "Description: " + p.description;
  modal.style.display = "flex";
}

modalClose.onclick = function(){ modal.style.display="none"; }
window.onclick = function(e){ if(e.target==modal) modal.style.display="none"; }
