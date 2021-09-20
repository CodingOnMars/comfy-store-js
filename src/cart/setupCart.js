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
    const amount = increaseAmount(id);
    // const items = cartItemsDOM.querySelectorAll('.cart-item-amount');
    // console.log(items); // returns node list with items

    // NOTE: we can't use find() on a node list, that's why we turn it into an array first, using spread operator
    const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
    // console.log(items); // now returns an array

    // NOTE: we looking for dataset.id because we have data-id="${id} in DOM cart item (<p class="cart-item-amount data-id="${id}">${amount}</p>)
    const newAmount = items.find((value) => value.dataset.id === id);
    newAmount.textContent = amount;
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

function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

// Remove item from the cart, but not from DOM
function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}

function setupCartFunctionality() {
  cartItemsDOM.addEventListener('click', function (e) {
    const element = e.target;
    // NOTE: in this case we have buttons with icons, that's why we need to target parent element as well
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;

    // Remove
    if (element.classList.contains('cart-item-remove-btn')) {
      removeItem(id);
      // NOTE: we want to remove article tag with all its content, that's why we traverse DOM to select the article:
      // element.parentElement.parentElement.remove();
      // Because we setup parent variable, we can use shorter syntax:
      parent.parentElement.remove();
    }
    // Increase
    if (parent.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
    }
    // Decrease amount and remove item if amount is 0
    if (parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount === 0) {
        removeItem(parentID);
        // remove article tag
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }

    displayCartItemCount();
    displayCartTotal();
    // Synchronize with local storage
    setStorageItem('cart', cart);
  });
}

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
