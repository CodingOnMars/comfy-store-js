// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from '../utils.js';

// selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

// cart product
let productID;

// show product when page loads
window.addEventListener('DOMContentLoaded', async function () {
  // NOTE: location.search returns a query string including the initial ?
  const urlID = window.location.search;
  // console.log(urlID); // for example, ?id=recmg2a1ctaEJNZhu
  // const urlID = '?id=hello'; // checking if our try/catch is working

  try {
    // Get info about a specific product by adding product id (urlID) to singleProductUrl
    const response = await fetch(`${singleProductUrl}${urlID}`);
    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json();
      // console.log(product); // if response is successful, returns object with product info

      // Grab data. ID is necessary as we will add the item to the cart
      const { id, fields } = product;
      productID = id;
      const { name, company, price, colors, description } = fields;
      const image = fields.image[0].thumbnails.large.url;

      // Set values
      // Display product name in document title
      document.title = `${name.toUpperCase()} | Comfy`;
      // Display product name in hero title
      pageTitleDOM.textContent = `Home / ${name}`;
      // Display values in product card
      imgDOM.src = image;
      titleDOM.textContent = name;
      companyDOM.textContent = company;
      // Format price before displaying
      priceDOM.textContent = formatPrice(price);
      descDOM.textContent = description;

      // NOTE: If we display colors as is, we will display only color values
      // colorsDOM.textContent = colors;
      // console.log(colors); // returns an array with color values in hex format

      // Using forEach() to create a span for each color, set styles for it and move it to the end of parent div (single-product-colors)
      colors.forEach((color) => {
        const span = document.createElement('span');
        span.classList.add('product-color');
        span.style.backgroundColor = color;
        colorsDOM.appendChild(span);
      });
    } else {
      console.log(response.status, response.statusText);
      centerDOM.innerHTML = `
      <div>
        <h3 class="error">Sorry, something went wrong</h3>
        <a class="btn" href="index.html">Back Home</a>
      </div>
      `;
    }
  } catch (error) {
    // !NOTE: when we use catch with fetch(), it is only catching network errors
    console.log(error);
  }

  loading.style.display = 'none';
});

// Pass productID and open cart when clicking on 'Add to cart' button
cartBtn.addEventListener('click', function () {
  addToCart(productID);
});
