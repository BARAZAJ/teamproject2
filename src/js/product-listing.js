import ProductData from './ProductData.mjs';

// Get the category from the URL query string (if exists)
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category'); // e.g., 'sleeping-bags'

// Check if category exists, then create ProductData instance for category
if (category) {
  const productData = new ProductData(category);

  // Fetch products for "Top Products"
  productData.getData().then((data) => {
    // Process the data here and render it to the page
    console.log(data); // This logs the product data

    // Select the container where the top products will be displayed
    const topProductsList = document.getElementById('top-products-list');
    
    if (data && Array.isArray(data)) {
      // Limit the products to a subset for the top products (e.g., first 5)
      const topProducts = data.slice(0, 5); // You can adjust this to show more or fewer products

      // Iterate over the top products and create HTML elements for each
      topProducts.forEach((product) => {
        const productElement = document.createElement('li'); // Use <li> for list items
        productElement.classList.add('product');

        // You can customize the structure as needed
        productElement.innerHTML = `
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>Price: $${product.price}</p>
        `;

        // Append the product element to the top products list
        topProductsList.appendChild(productElement);
      });
    }
  }).catch((error) => {
    console.error("Error fetching products:", error);
  });

  // For search results (if needed)
  // You can reuse the same code or create a separate function to render search results
} else {
  console.error("No category found in the URL.");
}
