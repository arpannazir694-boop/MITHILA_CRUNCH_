const PRODUCTS_API =
  "https://script.google.com/macros/s/AKfycbw2prFyE0NrF_eiWEkjVukUMZwr4M5mmuXBIl22Gd-JfyZnqOc-uiYzPfNrLwriWNaT/exec?type=products";

document.addEventListener("DOMContentLoaded", fetchProducts);

function fetchProducts() {
  fetch(PRODUCTS_API)
    .then(res => res.text())
    .then(text => {
      console.log("RAW PRODUCTS RESPONSE:", text);
      const products = JSON.parse(text);
      renderProducts(products);
    })
    .catch(err => console.error(err));
}

function renderProducts(products) {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name || "Thekua"}</h3>
      <p class="weight">${p.weight || ""}</p>
      <p class="price">${isNaN(p.price) ? p.price : "₹" + p.price}</p>
      <button class="primary-btn">Order Now</button>
    `;

    grid.appendChild(card);
  });
}
