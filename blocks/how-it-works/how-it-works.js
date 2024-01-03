export default function decorate(block) {
  block.classList.add('d-flex', 'flex-column', 'flex-md-row');

  const rows = [...block.children];
  block.innerHTML = rows.map((row, index) => {
    const [image, content] = [...row.children];
    const buttonContainer = content.querySelector('.button-container');
    if (buttonContainer) {
      buttonContainer.children[0].classList.remove('button');

      const triangle1 = document.createElement('span');
      triangle1.classList.add('triangle', 'ms-2', 'me-1');

      const triangle2 = document.createElement('span');
      triangle2.classList.add('triangle');

      buttonContainer.append(triangle1);
      buttonContainer.append(triangle2);
    }
    const colItem = `
    <div class="d-flex flex-column align-items-center how-it-works-column column-${index + 1}">
      <div class="how-it-works-column-wrapper">
        <div class="d-flex flex-column align-items-center how-it-works-image-conatiner">
          <div class="d-flex how-it-works-icon>
            ${image.innerHTML}
          </div>
          <div class="how-it-works-number my-4">
            ${index + 1}
          </div>
        </div>
        <div class="how-it-works-content">
          ${content.innerHTML}
        </div>
      </div>
    </div>
    `;

    return colItem;
  });
}
