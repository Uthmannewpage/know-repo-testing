export default function decorate(block) {
  const allPossibleTables = ['or-options'];
  const tables = block.querySelectorAll('table');
  const parentBlock = block.closest('.section');
  const metaData = parentBlock.dataset;
  const {
    type, functionality, video, imageCover, titleColor,
  } = metaData;
  const bannerItems = [...block.children];

  if (titleColor) block.querySelector('h1').style.color = titleColor;

  if (type && type === 'carousel') {
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
      <img src="${image.querySelector('img').getAttribute('src').split('?')[0]}" class="d-block w-100" alt="Slide" width="${image.querySelector('img').getAttribute('width')}" height="${image.querySelector('img').getAttribute('height')}">
      <div class="carousel-caption d-block rows col-5 col-md-5">
        ${content.innerHTML}
      </div>
    </div>`;
  }).join('')}
    </div>
  </div>`;
  } else {
    const [contentLeft, contentRight, contentImage, outsideOfContent] = bannerItems;
    if (imageCover === 'background') {
      block.style.background = `url(${contentImage.querySelector('img').getAttribute('src').split('?')[0]}) no-repeat top / cover transparent`;
    }

    let leftContentClasses = ' col-sm-5 col-lg-5';
    if (type && type === 'half') {
      leftContentClasses = ' col-sm-6 col-lg-6';
    } else if (type && type === 'bigger') {
      leftContentClasses = ' col-sm-7 col-lg-7';
    }

    let rightContentClasses = ' col-sm-7 col-lg-7';
    if (type && type === 'half') {
      rightContentClasses = ' col-sm-6 col-lg-6';
    } else if (type && type === 'bigger') {
      rightContentClasses = ' col-sm-5 col-lg-5';
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

      if (allPossibleTables.includes(aliasRowText)) {
        table.classList.add(aliasRowText);
      }
    });

    block.innerHTML = `
    <div class="container-fluid">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-xs-12 col-sm-11${leftContentClasses} text-left p-0">
            ${contentLeft.innerHTML}
          </div>

          <div class="col-xs-12 col-sm-11${rightContentClasses} text-right img-box p-0">
            ${video ? `<video controls autoplay>
              <source src="${video}" type="application/x-mpegURL">
              Your browser does not support the video tag.
            </video>` : ''}

            <div class="content-right">
              ${functionality && functionality === 'tabs' ? `<div class="trigger-points">
                <span class="red-point"></span>
                <span class="green-point"></span>
                <span class="blue-point"></span>
              </div>` : ''}
              ${contentRight && contentRight.innerHTML !== '' && contentRight.innerHTML}
            </div>
          </div>

          ${outsideOfContent ? `<div class="col-12">${outsideOfContent.innerHTML}</div>` : ''}
        </div>
    </div>`;

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
