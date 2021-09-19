// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';

// set items
const cratItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

// getStorageItem returns an empty array if there was no data provided
let cart = getStorageItem('cart');

export const addToCart = (id) => {
  console.log(id);
  openCart();
};

const init = () => {
  // console.log(cart); // if there is no data, returns an empty array
};

init();
