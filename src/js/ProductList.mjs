function productCardTemplate(product) {
  const price = product.Price ? product.Price.toFixed(2) : "N/A"; // Default to "N/A" if Price is undefined
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.NameWithoutBrand}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${price}</p>
    </a>
  </li>`;
}


export default class ProductListing {
  constructor(categoryOrPath, dataSource, listElement) {
    this.categoryOrPath = categoryOrPath;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      console.log("Initializing ProductListing...");
      const products = await this.dataSource.getData();
      console.log("Products fetched:", products);
      this.renderList(products);
    } catch (error) {
      console.error("Error initializing ProductListing:", error);
    }
  }

  renderList(products) {
    const productCards = products.map(productCardTemplate).join("");
    this.listElement.innerHTML = productCards;
  }
}
