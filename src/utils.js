const allProductsUrl = 'https://course-api.com/javascript-store-products';
// temporary single product
// 'https://course-api.com/javascript-store-single-product?id=rec43w3ipXvP28vog'
const singleProductUrl =
  'https://course-api.com/javascript-store-single-product';

const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

// NOTE: in our JSON price values have no division on dollars and cents. Usually, when we pass info to payment systems like Stripe, our price should be in cents. To avoid bugs, it's better to format price values and display formatted value on the page (i.e. in HTML), than make a mistake during sending data to payment systems.

// We could format price like this ${price / 100} and add it as heading value, but a proper way is to set up a function that uses international number format
const formatPrice = (price) => {
  let formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format((price / 100).toFixed(2));
  return formattedPrice;
};

// NOTE: we set up these functions separately, becuase we will use them not only in store, but in cart as well. This functionality is useful when we deal with multiple pages.
const getStorageItem = (item) => {
  let storageItem = localStorage.getItem(item);
  if (storageItem) {
    storageItem = JSON.parse(localStorage.getItem(item));
  } else {
    storageItem = [];
  }
  return storageItem;
};
const setStorageItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

export {
  allProductsUrl,
  singleProductUrl,
  getElement,
  formatPrice,
  getStorageItem,
  setStorageItem,
};
