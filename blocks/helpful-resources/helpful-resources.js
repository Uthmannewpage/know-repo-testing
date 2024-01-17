export default function decorate(block) {
  const parentBlock = block.closest('.section');
  const metaData = parentBlock.dataset;
  const { colorcode } = metaData;
  parentBlock.classList.add('p-0');
  block.classList.add('p-4', 'row');

  for (let i = 0; i < block.children.length; i += 1) {
    const child = block.children.item(i);
    child.classList.add('col-md-6', 'col-sm-12', 'col-xs-12', 'mb-4');

    const grandChildren = Array.from(child.children);

    if (grandChildren.length === 2) {
      // First child is a picture
      const firstElement = grandChildren[0];
      firstElement.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'col-md-4', 'col-sm-12');

      // Second child has h2 and p
      const secondElement = grandChildren[1];
      const innerElements = Array.from(secondElement.children);

      innerElements.forEach((innerEl) => {
        if (innerEl.tagName === 'H3' || innerEl.tagName === 'P') {
          innerEl.classList.add('d-block');
        }
        if (innerEl.tagName === 'H3') {
          innerEl.innerHTML += ` <div class="triangle ms-1" style="border-left-color: ${colorcode}"></div>
            <div class="triangle" style="border-left-color: ${colorcode}"></div>`;
        }
      });

      secondElement.classList.add('d-flex', 'flex-column', 'justify-content-start', 'col-md-8', 'col-sm-12');
      if (window.innerWidth > 768) {
        secondElement.classList.add('w-62');
      }
      const element = document.createElement('div');
      element.classList.add('row');
      element.appendChild(firstElement);
      element.appendChild(secondElement);

      child.appendChild(element);
    }
  }
}
