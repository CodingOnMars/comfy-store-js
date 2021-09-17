import { getElement } from '../utils.js';
import display from '../displayProducts.js';
const setupSearch = (store) => {
  const form = getElement('.input-form');
  const nameInput = getElement('.search-input');
  form.addEventListener('keyup', function () {
    const value = nameInput.value;
    if (value) {
      const newStore = store.filter((product) => {
        let { name } = product;
        // console.log(name); // returns is a list of product names
        // NOTE: converting string to lower case is a good practice as names are not necessary will be in lower case
        name = name.toLowerCase();
        if (name.startsWith(value)) {
          return product;
        }
      });
      // console.log(newStore); // returns an array with object(s) if there are products match search request (search input value)

      // Display product items that match search request (if there are any)
      display(newStore, getElement('.products-container'));
      // If there are no products that match search request and search input is not empty, display an error message
      if (newStore.length < 1) {
        const products = getElement('.products-container');
        products.innerHTML = `<h3 class="filter-error">Sorry, no products match your search</h3>`;
      }
    } else {
      // If input is empty, show default product items
      display(store, getElement('.products-container'));
    }
  });
};

export default setupSearch;
