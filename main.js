const BASE_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

function fetchProducts() {
  fetch(`${BASE_URL}/products`)
    .then((res) => res.json())
    .then((products) => {
      const productSection = document.getElementById("productsSection");
      products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
       
          <div class="image-container">
            <img src=".${product.image}" alt="" class="product-image" />
          </div>
          <div class="product-title">${product.title}</div>
          <div class="product-price">$${product.price}</div>
          <div class="product-description">
            ${product.description}
          </div>
          <button class="add-to-cart">Add to Cart</button>
        
          
          `;
        productSection.appendChild(productDiv);
      });
    });
}
