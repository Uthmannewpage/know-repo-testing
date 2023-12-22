export default function decorate(block) {
  /* const parentBlock = block.closest('.section');
  const parentBlockStyle = block.closest('.section').style;
  const blockStyle = block.style;
  const metaData = parentBlock.dataset; */
  const bannerItems = [...block.children];

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
}
