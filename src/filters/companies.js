import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupCompanies = (store) => {
  // let companies = store.map((product) => product.company);
  // console.log(companies); // returns an array with 12 company names, some names are repeating

  // NOTE: we need to get unique names, using only map() is not enough, that's why we're using Set() method to get only unique values.
  // let companies = new Set(store.map((product) => product.company));
  // console.log(companies); // now returns an object with 4 unique names

  // NOTE: that's not all, Set() returns an object and we need an array.
  // How to get the array? By using spread operator.
  // Also, we added string 'all' as in search filters we have All button
  let companies = ['all', ...new Set(store.map((product) => product.company))];
  // console.log(companies); // now returns an array with string 'all' and 4 unique names

  // Now we want to iterate over the array with companies and add their names as buttons in search filter.
  // Since this is an array and values separated with commas, we use join() with an empty string to get rid of those commas
  const companiesDOM = getElement('.companies');
  companiesDOM.innerHTML = companies
    .map((company) => {
      return `<button class="company-btn">${company}</button>`;
    })
    .join('');

  companiesDOM.addEventListener('click', function (e) {
    // NOTE: in displayProducts.js we were targeting parent element, because, we were clicking on icon. In this case, company buttons don't have icons so we target them directly
    const element = e.target;
    if (element.classList.contains('company-btn')) {
      let newStore = [];
      // Display all products of all companies when clicking 'All' button
      if (element.textContent === 'all') {
        newStore = [...store];
      } else {
        // Display all products of a company when clicking the company name
        newStore = store.filter(
          (product) => product.company === e.target.textContent
        );
      }
      display(newStore, getElement('.products-container'), true);
    }
  });
};

export default setupCompanies;
