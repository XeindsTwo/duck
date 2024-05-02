import {links} from "./links.js";
import {ecosystem} from "./ecosystem.js";

links();
ecosystem();

const button = document.querySelector('.home__subname');
const contractParagraph = document.querySelector('.home__item p');
const tooltip = document.querySelector('.home__tooltip');

button.addEventListener('click', function () {
  const contractAddress = contractParagraph.textContent;

  navigator.clipboard.writeText(contractAddress)
    .then(() => {
      tooltip.classList.add('visible');
      setTimeout(() => {
        tooltip.classList.remove('visible');
      }, 2000);
      button.blur();
    })
    .catch((error) => {
      console.error('Error when copying contract address:', error);
    });
});