export default function decorate(block) {
  /* const parentBlockStyle = block.closest('.section').style;
  const blockStyle = block.style; */
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
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        ${bannerItems.length && bannerItems.map((_, index) => `
          <li data-target="#myCarousel" data-slide-to="${index}" ${index === 0 ? 'class="active"' : ''}></li>
        `).join('')}
      </ol>
      <div class="carousel-inner">
      ${bannerItems.length && bannerItems.map((slide, index) => {
    const [content, image] = [...slide.children];
    return `<div class="carousel-item ${index === 0 ? 'active' : ''}">
        <img class="d-block w-100" src="${image.querySelector('img').getAttribute('src').split('?')[0]}" alt="Slide">
        <div class="carousel-caption d-none d-md-block rows col-xs-12 col-sm-7 col-md-5 col-lg-5">
          ${content.innerHTML}
        </div>
      </div>`;
  }).join('')}
    </div>
      <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>`;
  } else {
    const [contentLeft, contentRight, contentImage] = bannerItems;
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
      const firstRow = table.querySelector('tr:first-child');
      const firstRowContent = firstRow.innerText.trim();

      if (allPossibleTables.includes(firstRowContent)) {
        table.classList.add(firstRowContent);
        firstRow.style.display = 'none';
      }
    });

    block.innerHTML = `
    <div class="container-fluid">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-xs-12 col-sm-12${leftContentClasses} ps-4">
            ${contentLeft.innerHTML}
          </div>

          <div class="col-xs-12 col-sm-12${rightContentClasses} text-right img-box">
            ${video ? `<video controls>
              <source src="${video}" type="application/x-mpegURL">
              Your browser does not support the video tag.
            </video>` : ''}
            ${contentRight && contentRight.innerHTML !== '' && contentRight.innerHTML}
          </div>
        </div>
    </div>`;
  }
}
