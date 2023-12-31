export default function decorate(block) {
  const allPossibleTables = ['or-options'];
  const tables = block.querySelectorAll('table');
  const parentBlock = block.closest('.section');
  const metaData = parentBlock.dataset;
  const {
    type, video, imageCover, titleColor,
  } = metaData;
  const bannerItems = [...block.children];

  if (titleColor) block.querySelector('h1').style.color = titleColor;

  if (type === 'carousel') {
    block.innerHTML = `
  <div id="myCarousel" class="container carousel slide" data-bs-ride="carousel">
    <ol class="carousel-indicators">
      ${bannerItems.length && bannerItems.map((_, index) => `
        <li data-bs-target="#myCarousel" data-bs-slide-to="${index}" ${index === 0 ? 'class="active"' : ''}></li>
      `).join('')}
    </ol>
    <div class="carousel-inner">
      ${bannerItems.length && bannerItems.map((slide, index) => {
    const [content, image] = [...slide.children];
    return `<div class="carousel-item ${index === 0 ? 'active' : ''}">
      <img src="${image.querySelector('img').getAttribute('src').split('?')[0]}" class="d-block w-100" alt="Slide">
      <div class="carousel-caption d-block rows col-5 col-md-5">
        ${content.innerHTML}
      </div>
    </div>`;
  }).join('')}
    </div>
  </div>`;
  } else {
    block.classList.add('ps-0', 'ps-md-5', 'py-md-5', 'py-3');

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
        dropDownBox.className = 'dropdownTable';
        //dropDownBox.classList.add('open');

        const [alias, triggerText, contentText, closeText] = Array.from(table.querySelectorAll('tr')).map(row => row.innerHTML.trim());

        dropDownBox.innerHTML = `<div class="triggerText">${triggerText}</div>`;
        dropDownBox.innerHTML += `<div class="contentText">${contentText} <div class="closeText">${closeText}</div></div>`;

        table.appendChild(dropDownBox);

        

      }

      if (allPossibleTables.includes(aliasRowText)) {
        table.classList.add(aliasRowText);
        const secondRow = table.querySelector('tr:first-child');
      }
    });

    block.innerHTML = `
    <div class="container-fluid">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-xs-11 col-sm-11${leftContentClasses} ps-4">
            ${contentLeft.innerHTML}
          </div>

          <div class="col-xs-11 col-sm-11${rightContentClasses} text-right img-box">
            ${video ? `<video controls>
              <source src="${video}" type="application/x-mpegURL">
              Your browser does not support the video tag.
            </video>` : ''}
            ${contentRight && contentRight.innerHTML !== '' && contentRight.innerHTML}
          </div>

          <div class="col-12">${outsideOfContent && outsideOfContent.innerHTML !== '' && outsideOfContent.innerHTML}</div>
        </div>
    </div>`;

    // only for dropdown
    block.querySelector('.triggerText') && block.querySelector('.triggerText').addEventListener('click', (e) => {
      e.target.closest('.dropdownTable').classList.toggle('open');
    });

    block.querySelector('.closeText') && block.querySelector('.closeText').addEventListener('click', (e) => {
      e.target.closest('.dropdownTable').classList.remove('open');
    });
  }
}
