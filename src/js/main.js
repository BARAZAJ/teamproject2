import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

// Define the JSON file or category
const category = "tents"; // Replace with a category name like "backpacks" if needed
// OR use the full path to a JSON file
// const category = "./data/products.json"; 

// Create an instance of ProductData
const dataSource = new ProductData(category);

// Get the container element where the product list will be rendered
const productListContainer = document.getElementById("product-list");

// Create an instance of ProductListing
const productListing = new ProductListing(category, dataSource, productListContainer);

// Initialize the product listing
productListing.init();
