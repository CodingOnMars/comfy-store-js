import { formatPrice } from './utils.js';
import { addToCart } from './cart/setupCart.js';
const display = (products, element, filters) => {
  // console.log(products, element); // checking if we get an array with featured items and div with class 'featured-center'

  // Display products
  element.innerHTML = products
    .map((product) => {
      const { id, name, image, price } = product;
      return `<article class="product">
    <div class="product-container">
      <img class="product-img img" src="${image}" alt="Product photo">
      <div class="product-icons">
        <a class="product-icon" href="product.html?id=${id}">
          <i class="fas fa-search"></i>
        </a>
        <button class="product-cart-btn product-icon" data-id=${id}>
          <i class="fas fa-shopping-cart"></i>
        </button>
      </div>
    </div>
    <footer>
      <p class="product-name">${name}</p>
      <h4 class="product-price">${formatPrice(price)}</h4>
    </footer>
  </article>
  `;
    })
    .join('');
  if (filters) return;
  element.addEventListener('click', function (e) {
    // const parent = e.target;
    // console.log(parent); // returns icon
    // If we just write e.target, it returns an icon, but we need its parent:
    const parent = e.target.parentElement;
    // console.log(parent); // returns button
    if (parent.classList.contains('product-cart-btn')) {
      addToCart(parent.dataset.id);
    }
  });
};

export default display;
