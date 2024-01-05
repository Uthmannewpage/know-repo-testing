export default function decorate(block) {
  block.classList.add('d-flex', 'flex-column', 'flex-md-row');

  const rows = [...block.children];
  block.innerHTML = rows.map((row, index) => {
    const [image, content] = [...row.children];
    const buttonContainer = content.querySelector('.button-container');

    let updatedButton = '';

    if (buttonContainer) {
      const anchor = buttonContainer.children[0];
      updatedButton = `
        <p class="mb-0">
          ${content.children[0].innerHTML}
        </p>
        <p>
          <a href="${anchor.getAttribute('href')}" title="${anchor.getAttribute('title')}" target="_blank">${anchor.getAttribute('title')}</a>
          <span class="triangle ms-1"></span>
          <span class="triangle"></span>
        </p>
      `;
    }
    const colItem = `
    <div class="d-flex flex-column align-items-center how-it-works-column column-${index + 1}">
      <div class="how-it-works-column-wrapper">
        <div class="d-flex flex-column align-items-center how-it-works-image-conatiner">
          <div class="d-flex how-it-works-icon">
            ${image.innerHTML}
          </div>
          <div class="how-it-works-number my-4">
            ${index + 1}
          </div>
        </div>
        <div class="how-it-works-content">
          ${buttonContainer ? updatedButton : content.innerHTML}
        </div>
      </div>
    </div>
    `;

    return colItem;
  }).join('');
}
