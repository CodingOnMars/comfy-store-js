// global imports
// NOTE: used across all pages
import './src/toggleSidebar.js';
import './src/cart/toggleCart.js';
import './src/cart/setupCart.js';
// specific imports
// NOTE: specific for a page
import fetchProducts from './src/fetchProducts.js';
import { setupStore, store } from './src/store.js';
import display from './src/displayProducts.js';
import { getElement } from './src/utils.js';

const init = async () => {
  const products = await fetchProducts();
  console.log(products);
};

window.addEventListener('DOMContentLoaded', init);
