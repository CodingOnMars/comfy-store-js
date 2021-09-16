import { allProductsUrl } from './utils.js';

// NOTE: by default async function returns a promise
const fetchProducts = async () => {
  // Waiting for a response from URL, catching errors and displaying in console
  const response = await fetch(allProductsUrl).catch((err) => console.log(err));
  // If response is succesfull, apply json()
  if (response) {
    return response.json();
  }
  // If not, return response
  return response;
};

export default fetchProducts;
