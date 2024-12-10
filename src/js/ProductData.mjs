const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(categoryOrPath) {
    // Ensure categoryOrPath is a valid string before calling includes
    if (typeof categoryOrPath !== 'string' || !categoryOrPath) {
      throw new Error('Invalid categoryOrPath provided');
    }

    if (categoryOrPath.includes(".json")) {
      // Use the full path directly if a file path is provided
      this.path = categoryOrPath;
    } else {
      // Construct the path based on the category
      this.path = `/json/${categoryOrPath}.json`;
    }
    console.log(`Fetching data from: ${this.path}`);
  }

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data)
      .catch((error) => {
        console.error(`Error fetching data from path: ${this.path}`, error);
        throw error;
      });
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}

async function fetchAndLog(url) {
  try {
    const response = await fetch(url);
    return await convertToJson(response);
  } catch (error) {
    console.error("Error in fetch:", error);
    throw error;
  }
}

