import { getElement } from '../utils.js';

const cartOverlay = getElement('.cart-overlay');
const cartIcon = getElement('.toggle-cart');
const cartClose = getElement('.cart-close');

cartIcon.addEventListener('click', () => {
  cartOverlay.classList.add('show');
});

cartClose.addEventListener('click', () => {
  cartOverlay.classList.remove('show');
});

export const openCart = () => {
  cartOverlay.classList.add('show');
};
