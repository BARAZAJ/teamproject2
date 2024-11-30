function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(categoryOrPath) {
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

