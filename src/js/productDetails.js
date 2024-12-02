import ProductData from "../js/ProductData.mjs";
import { getParams } from "../js/utils.mjs";

const productId = getParams("product");
const productData = new ProductData("tents");

// Fetch cart data from local storage
function getCartItems() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Save cart data to local storage
function saveCartItems(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to the cart
function addToCart(product) {
  const cart = getCartItems();

  // Check if the product is already in the cart
  const existingItem = cart.find((item) => item.id === product.Id);
  if (existingItem) {
    existingItem.quantity += 1; // Increment quantity
  } else {
    // Add new product to the cart
    cart.push({
      id: product.Id,
      name: product.Name,
      image: product.image,
      color: product.color || "Default Color",
      price: product.FinalPrice,
      quantity: 1,
    });
  }

  saveCartItems(cart); // Save updated cart to local storage
  alert("Product added to cart!");
}

// Render product details to the page
async function renderProductDetails() {
  try {
    const product = await productData.findProductById(productId);

    if (!product) {
      document.querySelector(".product-details").innerHTML = `
        <h3>Error: Product not found. Please select a valid product.</h3>
      `;
      return;
    }

    // Render product details
    document.querySelector(".product-details").innerHTML = `
      <h1>${product.Name}</h1>
      <img src="${product.Image}" alt="${product.Name}" />
      <p>${product.DescriptionHtmlSimple}</p>
      <p><strong>Price:</strong> $${product.FinalPrice.toFixed(2)}</p>
      <button id="add-to-cart">Add to Cart</button>
    `;

    // Attach the Add to Cart event
    document
      .getElementById("add-to-cart")
      .addEventListener("click", () => addToCart(product));
  } catch (error) {
    console.error("Error rendering product details:", error);
    document.querySelector(".product-details").innerHTML = `
      <h3>Error loading product details. Please try again later.</h3>
    `;
  }
}

// Initialize the product details page
document.addEventListener("DOMContentLoaded", renderProductDetails);
