import { getStorageItem, setStorageItem } from './utils.js';
let store = [];
const setupStore = (products) => {
  store = products.map((product) => {
    console.log(product); // check if we get the right data (objects)

    // Using destructuring to get specific data from product object
    const {
      id,
      fields: { featured, name, price, company, colors, image: img },
    } = product;
    // img is an allias for image array
    const image = img[0].thumbnails.large.url;
    return { id, featured, name, price, company, colors, image };
  });
};
// console.log(store); // [], NOTE: returns an empty array, because we did not invoke setupStore() here

const findProduct = () => {};

/* NOTE: this is also valid way to export:
export let store;
export const setupStore;
export findProduct;

But, since we have a bunch of exports, it's simpler to export them together, instead of looking in the file what was exported.
*/
export { store, setupStore, findProduct };
