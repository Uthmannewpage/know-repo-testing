import { metaDataToStylesArray } from '../../scripts/utils.js';

export default function decorate(block) {
  const parentBlock = block.closest('.section');
  const metaData = parentBlock.dataset;
  const styles = metaDataToStylesArray(metaData);
  parentBlock.style = styles.join('; ');
  parentBlock.firstElementChild.classList.add('container');
  parentBlock.firstElementChild.classList.add('p-0');
  block.classList.add('row');
  [...block.children].forEach((child, index) => {
    child.classList.add('col');
    child.classList.add('col-sm-12');
    if (child.firstElementChild.textContent.toLowerCase() === 'or') {
      child.classList.add('col-lg-2');
      child.classList.add('or-container');
    } else if (index === 0) {
      child.classList.add('col-lg-4');
      const arrow = document.createElement('div');
      arrow.classList.add('bg-holder-sm');
      arrow.classList.add('d-lg-none');
      arrow.classList.add('d-sm-flex');

      const arrowRight = document.createElement('div');
      arrowRight.classList.add('bg-holder-lg');
      arrowRight.classList.add('d-lg-flex');
      arrowRight.classList.add('d-sm-none');
      child.prepend(arrowRight);
      child.prepend(arrow);
    } else {
      child.classList.add('col-lg-3');
      child.querySelector('.button').classList.add('append-right-arrow');
    }
  });
}