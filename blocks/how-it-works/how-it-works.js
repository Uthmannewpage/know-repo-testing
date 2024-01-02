import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  block.classList.add('d-flex', 'flex-column', 'flex-md-row');

  [...block.children].forEach((row, index) => {
    row.classList.add(
      'd-flex',
      'flex-column',
      'align-items-center',
      'how-it-works-column',
      `column-${index + 1}`
    );
    const children = [...row.children];
    const pictureDiv = children[0];

    const iconContainer = document.createElement('div');
    iconContainer.classList.add('how-it-works-icon', 'd-flex');

    pictureDiv
      .querySelectorAll('img')
      .forEach((img) =>
        iconContainer.append(
          createOptimizedPicture(img.src, img.alt, false, [{ width: '110' }])
        )
      );

    const numericalDiv = document.createElement('div');
    numericalDiv.classList.add('how-it-works-number', 'my-4');
    numericalDiv.innerHTML = index + 1;

    const imagesContainer = document.createElement('div');
    imagesContainer.classList.add(
      'how-it-works-image-conatiner',
      'flex-column',
      'd-flex',
      'align-items-center'
    );

    imagesContainer.append(iconContainer);
    imagesContainer.append(numericalDiv);

    const columnWrapper = document.createElement('div');
    columnWrapper.classList.add('how-it-works-column-wrapper');
    columnWrapper.append(imagesContainer);

    columnWrapper.append(imagesContainer);

    const textContentDiv = document.createElement('div');
    const textContentP = document.createElement('p');
    textContentP.innerHTML = children[1].innerHTML;
    textContentDiv.append(textContentP);
    textContentDiv.classList.add('how-it-works-content');

    columnWrapper.append(textContentDiv);

    row.innerHTML = columnWrapper.outerHTML;
  });
}
