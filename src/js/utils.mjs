// Wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Retrieve data from localStorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Helper to get a query parameter value from the URL
export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Function to render a list of objects as HTML into the DOM
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = ""; // Clear the parent element's content if specified
  }
  const htmlStrings = list.map(templateFn).join("");
  parentElement.insertAdjacentHTML(position, htmlStrings);
}

// Function to render an HTML template into the DOM with optional data and callback
export function renderWithTemplate(template, parentElement, data = null, callback = null) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback && typeof callback === "function") {
    callback(data); // Invoke the callback with data if provided
  }
}

// Load an HTML template from a given path
async function loadTemplate(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) {
      throw new Error(`Failed to load template from ${path}: ${res.status}`);
    }
    return await res.text();
  } catch (error) {
    console.error("Error loading template:", error);
    return ""; // Return an empty string on failure
  }
}

// Dynamically load the header and footer into a page
export async function loadHeaderFooter() {
  try {
    const [headerTemplate, footerTemplate] = await Promise.all([
      loadTemplate("../partials/header.html"),
      loadTemplate("../partials/footer.html"),
    ]);

    const headerElement = qs("#main-header");
    const footerElement = qs("#main-footer");

    if (headerElement) {
      renderWithTemplate(headerTemplate, headerElement);
    } else {
      console.warn("Header element not found in the DOM.");
    }

    if (footerElement) {
      renderWithTemplate(footerTemplate, footerElement);
    } else {
      console.warn("Footer element not found in the DOM.");
    }
  } catch (error) {
    console.error("Error loading header or footer:", error);
  }
}

// Set a listener for both touchend and click events
export function setClick(selector, callback) {
  const element = qs(selector);
  if (!element) {
    console.warn(`Element with selector "${selector}" not found.`);
    return;
  }

  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}
// utils.mjs

export function getParams(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
