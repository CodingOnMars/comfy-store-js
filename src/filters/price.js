import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupPrice = (store) => {
  const priceInput = getElement('.price-filter');
  const priceValue = getElement('.price-value');

  // Setup filter
  let maxPrice = store.map((product) => product.price);
  // console.log(maxPrice); // returns an array with prices (price values for each product)

  // NOTE: Return maximum value using Math.max(). Since we can't use arrays with Math.max, we're using spread to get values themselves, outside an array
  maxPrice = Math.max(...maxPrice);
  // console.log(maxPrice); // returns max price in cents

  // Since we have prices in cents, we need to round them using Math.ceil()
  maxPrice = Math.ceil(maxPrice / 100);
  // Set default filter (input) value to maxPrice
  priceInput.value = maxPrice;
  // Set input maximum value to maxPrice
  priceInput.max = maxPrice;
  // Set input minimum value to zero
  priceInput.min = 0;
  // Display price value
  priceValue.textContent = `Value : $${maxPrice}`;

  // NOTE: the input event fires when the value of an input, select or textarea has been changed.
  // LINK: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
  priceInput.addEventListener('input', function () {
    // const value = priceInput.value;
    // console.log(typeof value); // returns string

    // To get a number:
    const value = parseInt(priceInput.value);
    // console.log(typeof value); // now returns a number

    // Display price value when changing range
    priceValue.textContent = `Value : $ ${value}`;

    // Return a product that have price less or equal to the value. We divide by 100 otherwise values always will be bigger
    let newStore = store.filter((product) => product.price / 100 <= value);

    // Display products based on price range value
    display(newStore, getElement('.products-container'));
    // Display the error message if there are no products that match price filter
    if (newStore.length < 1) {
      const products = getElement('.products-container');
      products.innerHTML = `<h3 class="filter-error">Sorry, no products matched your search</h3>`;
    }
  });
};

export default setupPrice;
