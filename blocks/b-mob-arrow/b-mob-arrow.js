export default function decorate(block) {
  block.classList.add(
    'd-flex',
    'flex-column',
    'flex-md-row',
    'common-menu',
    'container',
  );

  const rows = [...block.children];
  block.innerHTML = rows
    .map((row) => {
      const [image, link, colorCode] = [...row.children];
      return `
        <div class="d-flex p-3 align-items-center">
          <div class="flex-shrink-0">
            ${image.innerHTML}
          </div>
          <div class="common-menu-text">
            <a class="button" href="${link.children[0].getAttribute('href')}" title="${link.children[0].getAttribute('title')}">
              ${link.children[0].getAttribute('title')}
            </a>
            <div class="triangle ms-1" style="border-left-color: ${colorCode.innerHTML}"></div>
            <div class="triangle" style="border-left-color: ${colorCode.innerHTML}"></div>
          </div>
        </div>
        <div class="divhr mx-lg-4"></div>`;
    })
    .join('');
}
