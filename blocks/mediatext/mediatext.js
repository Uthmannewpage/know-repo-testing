export default function decorate(block) {
  const metadata = block.closest('.section').dataset;
  const { type, backgroundColor, headingcolor } = metadata;
  const blockItems = [...block.firstElementChild.children];
  const [contentLeft, contentRight] = blockItems;

  if (backgroundColor) block.style.backgroundColor = backgroundColor;
  if (headingcolor) block.querySelector('h2').style.backgroundColor = headingcolor;

  if (type === 'video') {
    contentLeft.innerHTML = `<video controls class="ratio ratio-16x9">
        <source src="${contentLeft.innerHTML}">
        Your browser does not support the video tag.
      </video>`;
  }
  block.innerHTML = `
  <div class="container p-2">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-xs-12 col-sm-6">
          ${contentLeft.innerHTML}
        </div>
        <div class="col-xs-12 col-sm-6 ps-4">
          ${contentRight.innerHTML}
        </div>
       
      </div>
  </div>`;
}
