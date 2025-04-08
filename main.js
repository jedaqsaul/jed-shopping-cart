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
            <img src="
            ${product.image}" alt="" class="product-image" />
          </div>
          <div class="product-title">${product.title}</div>
          <div class="product-price">$${product.price}</div>
          <div class="product-description">
            ${product.description}
          </div>
          <button class="add-to-cart">Add to Cart</button>
        
          
          `;
        // grab the button inside this div and attach the event listener
        const addButton = productDiv.querySelector(".add-to-cart");
        addButton.addEventListener("click", () => {
          addToCart(product.id);
        });
        productSection.appendChild(productDiv);
      });
    })
    .catch((err) => {
      console.error("Error fetching products: ", err);
    });
}

function addToCart(productId) {
  fetch(`${BASE_URL}/products/${productId}`)
    .then((res) => res.json())
    .then((product) => {
      fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((cartItem) => {
          alert(`${cartItem.name} added to the cart!`);
        });
    })
    .catch((err) => {
      console.error("Error adding to the cart", err);
    });
}
