import { metaDataToStylesArray } from '../../scripts/utils.js';

export default function decorate(block) {
  const parentBlock = block.closest('.section');
  parentBlock.classList.add('p-0');
  const metaData = parentBlock.dataset;
  const styles = metaDataToStylesArray(metaData);
  parentBlock.style = styles.join('; ');

  // Create a new container div
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'p-0');

  // Append the new container div to the parent block
  parentBlock.children[0].appendChild(containerDiv);
  // Move the .row class to the container div
  block.classList.add('row');
  containerDiv.appendChild(block);

  const blockItems = [...block.children];
  const blockLastIndex = blockItems.length - 1;

  blockItems.forEach((child, index) => {
    child.classList.add('col-12');

    if (child.firstElementChild.textContent.toLowerCase() === 'or') {
      child.classList.add('col-md-1', 'or-container');
    } else if (index === 0) {
      child.classList.add('col-md-4');

      const arrow = document.createElement('div');
      arrow.classList.add('bg-holder-sm', 'd-md-none', 'd-sm-flex');

      const arrowRight = document.createElement('div');
      arrowRight.classList.add('bg-holder-md', 'd-none', 'd-md-flex');

      child.prepend(arrowRight, arrow);
    } else {
      child.classList.add(index === blockLastIndex ? 'col-md-4' : 'col-md-3');
      child.querySelector('.button').classList.add('append-right-arrow');
    }
  });
}
