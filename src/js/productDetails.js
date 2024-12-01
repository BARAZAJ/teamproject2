import ProductData from '../js/ProductData.mjs';
import { getParams } from '../js/utils.mjs';



async function loadProductDetails() {
  const container = document.getElementById('product-details-container');
  const productId = getParams('product'); // Extract the 'id' query parameter
  console.log('Product ID:', productId);

  if (!productId) {
    container.innerHTML = '<p>Error: Product not found. Please select a valid product.</p>';
    return;
  }

  try {
    const dataSource = new ProductData('tents'); // Specify category
    const product = await dataSource.findProductById(productId);

    if (!product) {
      container.innerHTML = '<p>Product not found. Please try again.</p>';
      return;
    }

    // Render product details
    container.innerHTML = `
      <div class="product-details">
        <img src="${product.Image}" alt="${product.Name}" class="product-image">
        <h2>${product.Name}</h2>
        <p>${product.DescriptionHtmlSimple}</p>
        <p><strong>Price:</strong> $${product.FinalPrice.toFixed(2)}</p>
        <button id="add-to-cart">Add to Cart</button>
      </div>
    `;

    // Add to cart functionality
    document.getElementById('add-to-cart').addEventListener('click', () => {
      addToCart(product);
    });
  } catch (error) {
    console.error('Error loading product details:', error);
    container.innerHTML = '<p>There was an error loading the product details. Please try again later.</p>';
  }
}

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.Name} has been added to your cart.`);
}

// Load product details on page load
document.addEventListener('DOMContentLoaded', loadProductDetails);





