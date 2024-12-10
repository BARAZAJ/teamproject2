// navbar.js

// Handle search form submission
function handleSearch(event) {
    event.preventDefault(); // Prevent form from submitting traditionally
    const query = document.getElementById('search-input').value.trim(); // Get the search query
  
    // Redirect to the product list page with the search query
    if (query) {
      window.location.href = `/product-listing/index.html?search=${encodeURIComponent(query)}`;
    }
  }
  