import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  block.classList.add('d-flex', 'flex-column', 'flex-lg-row', 'common-menu','container');

  [...block.children].forEach((row) => {
    row.classList.add('d-flex', 'p-3', 'align-items-center');
    const children = [...row.children];

    const pictureDiv = children[0];
    const linkButton = children[1];
    const colorCode = children[2];

    pictureDiv.classList.add('flex-shrink-0');
    pictureDiv
      .querySelectorAll('img')
      .forEach((img) =>
        img
          .closest('picture')
          .replaceWith(
            createOptimizedPicture(img.src, img.alt, false, [{ width: '110' }])
          )
      );

    const triangle1 = document.createElement('span');
    triangle1.classList.add('triangle', 'ms-2', 'me-1');
    triangle1.style['border-left-color'] = colorCode.getInnerHTML();

    const triangle2 = document.createElement('span');
    triangle2.classList.add('triangle');
    triangle2.style['border-left-color'] = colorCode.getInnerHTML();

    linkButton.append(triangle1);
    linkButton.append(triangle2);

    linkButton.classList.add('common-menu-text');

    colorCode.remove();

    const divhr = document.createElement('div');
    divhr.classList.add('divhr', 'mx-lg-4');

    row.after(divhr);
  });
}
