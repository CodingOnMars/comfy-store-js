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
const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

// getStorageItem returns an empty array if there was no data provided
let cart = getStorageItem('cart');

export const addToCart = (id) => {
  // console.log(id);
  let item = cart.find((cartItem) => cartItem.id === id);
  if (!item) {
    let product = findProduct(id);
    // console.log(product); // returns an object with product data
    // Add item to the cart
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    // Add item to the DOM - we also need to update info in DOM
    addToCartDOM(product);
    // console.log(cart); // returns an array with object (amount, product data)
  } else {
    // Update values
  }

  // Add one to the item count
  displayCartItemCount();
  // Display cart totals
  displayCartTotal();
  // Set cart in local storage
  setStorageItem('cart', cart);

  // NOTE: no matter if we have items in the cart or not, we want to open the cart when clicking on 'Add to cart'
  openCart();
};

function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
}

function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);
  cartTotalDOM.textContent = `Total: ${formatPrice(total)}`;
}

function displayCartItemsDOM() {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
}

function setupCartFunctionality() {}

const init = () => {
  // console.log(cart); // if there is no data, returns an empty array

  // Display amount of cart items
  displayCartItemCount();
  // Display total
  displayCartTotal();
  // Add all cart items to the DOM
  displayCartItemsDOM();
  // Setup cart functionality
  setupCartFunctionality();
};

init();
