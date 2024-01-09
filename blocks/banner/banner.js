export default function decorate(block) {
  const tables = block.querySelectorAll('table');
  const parentBlock = block.closest('.section');
  const metaData = parentBlock.dataset;
  const {
    type, functionality, video, imageCover, titleColor,
  } = metaData;
  const bannerItems = [...block.children];

  if (titleColor) block.querySelector('h1').style.color = titleColor;

  if (type && type === 'carousel') {
    const bottomAnchor = document.createElement('div');
    const anchorButton = block.querySelector('p.button-container');

    anchorButton.querySelector('a').classList.add('append-right-arrow');
    const clonedAnchor = anchorButton.cloneNode(true);
    clonedAnchor.classList.add('button-under-carousel', 'text-center');
    bottomAnchor.appendChild(clonedAnchor);

    block.innerHTML = `
  <div id="my-carousel" class="container carousel slide carousel-fade" data-bs-ride="carousel">
    <ol class="carousel-indicators">
      ${bannerItems.length && bannerItems.map((_, index) => `
        <li data-bs-target="#myCarousel" data-bs-slide-to="${index}" ${index === 0 ? 'class="active"' : ''}></li>
      `).join('')}
    </ol>
    <div class="carousel-inner">
      ${bannerItems.length && bannerItems.map((slide, index) => {
    const [content, image] = [...slide.children];
    return `<div class="carousel-item ${index === 0 ? 'active' : ''}">
      ${image.innerHTML}
      <div class="carousel-caption d-block rows col-5 col-md-5">
        ${content.innerHTML}
      </div>
    </div>`;
  }).join('')}
    </div>
  </div>
  ${bottomAnchor.innerHTML}
  `;
  } else {
    const [contentLeft, contentRight, contentImage, contentImageMobile, outsideOfContent] = bannerItems;

    let leftContentClasses = 'col-12 col-sm-5 col-lg-5';
    if (type && type === 'half') {
      leftContentClasses = 'col-12 col-sm-6 col-lg-6';
    } else if (type && type === 'bigger') {
      leftContentClasses = 'col-12 col-sm-7 col-lg-7';
    }

    let rightContentClasses = 'col-12 col-sm-7 col-lg-7';
    if (type && type === 'half') {
      rightContentClasses = 'col-12 col-sm-6 col-lg-6';
    } else if (type && type === 'bigger') {
      rightContentClasses = 'col-12 col-sm-5 col-lg-5';
    }

    // searchng for tables:
    tables.forEach((table) => {
      const aliasRow = table.querySelector('tr:first-child');
      const aliasRowText = aliasRow.innerText.trim();

      if (aliasRowText === 'dropdown') {
        table.style.display = 'none';
        const dropDownBox = document.createElement('div');
        dropDownBox.className = 'dropdown-table';

        /* eslint-disable no-unused-vars */
        const [alias, triggerText, contentText, closeText] = Array.from(table.querySelectorAll('tr')).map((row) => row.innerHTML.trim());
        /* eslint-disable no-unused-vars */

        dropDownBox.innerHTML = `<div class="trigger-text">${triggerText}</div>`;
        dropDownBox.innerHTML += `<div class="content-text">${contentText} <div class="close-text">${closeText}</div></div>`;

        table.appendChild(dropDownBox);
      }

      block.closest('.block').classList.add(`${aliasRowText}-box`);
      table.classList.add(aliasRowText);
    });

    block.innerHTML = `
    <div class="container-fluid">
        <div class="d-block d-md-flex justify-content-center align-items-center">
          <div class="${leftContentClasses} text-left">
            ${contentLeft.innerHTML}
          </div>

          <div class="${rightContentClasses} text-right img-box">
            ${video ? `<div class="col-12 col-sm-10 float-right"><video controls autoplay>
              <source src="${video}" type="application/x-mpegURL">
              Your browser does not support the video tag.
            </video></div>` : ''}

            <div class="content-right">
              ${functionality && functionality === 'tabs' ? `<div class="trigger-points">
                <span class="red-point"></span>
                <span class="green-point"></span>
                <span class="blue-point"></span>
              </div>` : ''}
              ${contentRight && contentRight.innerHTML !== '' && contentRight.innerHTML}
            </div>
          </div>
        </div>
        ${outsideOfContent ? `<div class="col-12">${outsideOfContent.innerHTML}</div>` : ''}
        <div class="col-12 content-below">${contentLeft.innerHTML}</div>
    </div>`;

    // adding cover images
    if (imageCover === 'background') {
      const setBackgroundImage = () => {
        const imageCoverBox = block.querySelector('.d-md-flex');
        imageCoverBox.style.background = `url(${contentImage.querySelector('img').getAttribute('src')}) no-repeat top / cover transparent`;

        if (window.innerWidth <= 768 && contentImageMobile) {
          imageCoverBox.style.background = `url(${contentImageMobile.querySelector('img').getAttribute('src')}) no-repeat right top  / cover transparent`;
        }
      };

      setBackgroundImage();

      // Add event listener for resize events
      window.addEventListener('resize', setBackgroundImage);
    }

    // only for dropdown
    if (block.querySelector('.trigger-text')) {
      block.querySelector('.trigger-text').addEventListener('click', (e) => {
        e.target.closest('.dropdown-table').classList.toggle('open');
      });
    }

    if (block.querySelector('.close-text')) {
      block.querySelector('.close-text').addEventListener('click', (e) => {
        e.target.closest('.dropdown-table').classList.remove('open');
      });
    }

    if (functionality && functionality === 'tabs') {
      block.classList.add('banner-with-tabs');
      const triggerPoints = block.querySelectorAll('.trigger-points span');

      triggerPoints.forEach((point) => {
        point.addEventListener('click', (e) => {
          block.querySelectorAll('.content-right picture').forEach((element) => {
            element.style.display = 'none';
          });

          block.querySelectorAll('.text-left ul').forEach((element) => {
            element.className = '';
          });

          if (e.target.classList.contains('red-point')) {
            block.querySelector('.content-right picture:nth-of-type(2)').style.display = 'block';
            block.querySelector('.text-left ul:nth-of-type(1)').className = 'greyed';
          }
          if (e.target.classList.contains('green-point')) {
            block.querySelector('.content-right picture:nth-of-type(3)').style.display = 'block';
            block.querySelector('.text-left ul:nth-of-type(2)').className = 'greyed';
          }
          if (e.target.classList.contains('blue-point')) {
            block.querySelector('.content-right picture:nth-of-type(4)').style.display = 'block';
            block.querySelector('.text-left ul:nth-of-type(3)').className = 'greyed';
          }
        });
      });
    }
  }
}
