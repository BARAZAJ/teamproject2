// Fetch cart data from local storage
function getCartItems() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Save cart data to local storage
function saveCartItems(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Generate HTML for a single cart item
function generateCartItemHTML(item) {
  return `
    <li class="cart-card divider">
      <a href="/product_pages/index.html?product=${item.id}" class="cart-card__image">
        <img src="${item.Image}" alt="${item.name}" />
      </a>
      <a href="/product_pages/index.html?product=${item.id}">
        <h2 class="card__name">${item.name}</h2>
      </a>
      <p class="cart-card__color">${item.color || 'Color not specified'}</p>
      <p class="cart-card__quantity">qty: ${item.quantity}</p>
      <p class="cart-card__price">$${(item.price * item.quantity).toFixed(2)}</p>
    </li>
  `;
}

// Render the cart items
function renderCart() {
  const cartList = document.getElementById('cart-list');
  const totalPriceElement = document.getElementById('total-price');
  const cartItems = getCartItems();

  // If the cart is empty, display a message
  if (cartItems.length === 0) {
    cartList.innerHTML = '<p>Your cart is empty.</p>';
    totalPriceElement.textContent = '';
    return;
  }

  // Generate HTML for each cart item and calculate the total price
  let totalPrice = 0;
  cartList.innerHTML = cartItems.map((item) => {
    totalPrice += item.price * item.quantity;
    return generateCartItemHTML(item);
  }).join('');

  // Display the total price
  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Clear the cart
function clearCart() {
  localStorage.removeItem('cart');
  renderCart();
}

// Initialize the cart page
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  document.getElementById('clear-cart').addEventListener('click', clearCart);
});
