import { metaDataToStylesArray } from '../../scripts/utils.js';

export default function decorate(block) {
  const parentBlock = block.closest('.section');
  parentBlock.classList.add('p-0');
  const metaData = parentBlock.dataset;
  const styles = metaDataToStylesArray(metaData);
  parentBlock.style = styles.join('; ');
  parentBlock.firstElementChild.classList.add('container');
  block.classList.add('row');
  const blockItems = [...block.children];
  const blockLastIndex = blockItems.length - 1;
  blockItems.forEach((child, index) => {
    child.classList.add('col-12');
    child.classList.add('col-sm-12');
    child.classList.add('col-xs-12');
    if (child.firstElementChild.textContent.toLowerCase() === 'or') {
      child.classList.add('col-lg-1');
      child.classList.add('or-container');
    } else if (index === 0) {
      child.classList.add('col-lg-4');
      const arrow = document.createElement('div');
      arrow.classList.add('bg-holder-sm');
      arrow.classList.add('d-lg-none');
      arrow.classList.add('d-sm-flex');

      const arrowRight = document.createElement('div');
      arrowRight.classList.add('bg-holder-lg');
      arrowRight.classList.add('d-none');
      arrowRight.classList.add('d-lg-flex');
      child.prepend(arrowRight);
      child.prepend(arrow);
    } else {
      if (index === blockLastIndex) {
        child.classList.add('col-lg-4');
      } else {
        child.classList.add('col-lg-3');
      }

      child.querySelector('.button').classList.add('append-right-arrow');
    }
  });
}
