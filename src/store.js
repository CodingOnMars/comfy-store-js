import { getStorageItem, setStorageItem } from './utils.js';
// Make sure that there are items in local storage
let store = getStorageItem('store');

// We could use getStorageItem and setStorageItem functionality directly in setupStore. BUT, We invoke setupStore only in index.js, that's why we set up these functions separately.
const setupStore = (products) => {
  store = products.map((product) => {
    // console.log(product); // check if we get the right data (objects)

    // Using destructuring to get specific data from product object
    const {
      id,
      fields: { featured, name, price, company, colors, image: img },
    } = product;
    // img is an allias for image array
    const image = img[0].thumbnails.large.url;
    return { id, featured, name, price, company, colors, image };
  });
  setStorageItem('store', store);
};
// console.log(store); // [], NOTE: returns an empty array, because we did not invoke setupStore() here. This note was actual in the beginning, when let store was equal to []

// console.log(store); // now returns data from local storage. This data can be used across pages

const findProduct = (id) => {
  let product = store.find((product) => product.id === id);
  return product;
};

/* NOTE: this is also valid way to export:
export let store;
export const setupStore;
export findProduct;

But, since we have a bunch of exports, it's simpler to export them together, instead of looking in the file what was exported.
*/
export { store, setupStore, findProduct };
