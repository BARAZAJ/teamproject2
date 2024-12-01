// cart.js

// Utility function to get cart data from localStorage
function getCart() {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : []; // Return an empty array if cart is null
}

// Utility function to render cart contents
function renderCart() {
  const cartContainer = document.getElementById("cart-container");
  const cart = getCart();

  if (cart.length === 0) {
    // If the cart is empty, display a message
    cartContainer.innerHTML = `<p>Your cart is empty. Start shopping <a href="index.html">here</a>.</p>`;
    return;
  }

  // Generate HTML for cart items
  const cartItems = cart.map((item) => `
    <li class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
    </li>
  `).join("");

  // Insert the cart items into the container
  cartContainer.innerHTML = `<ul class="cart-list">${cartItems}</ul>`;
}

// Call renderCart when the page loads
document.addEventListener("DOMContentLoaded", renderCart);


