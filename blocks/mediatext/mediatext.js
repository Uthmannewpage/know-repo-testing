export default function decorate(block) {
  block.closest('.section').id = 'media-section';
  const metadata = block.closest('.section').dataset;
  const { type, backgroundColor, headingcolor } = metadata;
  const blockItems = [...block.firstElementChild.children];
  const [contentLeft, contentRight] = blockItems;

  if (backgroundColor) block.style.backgroundColor = backgroundColor;
  if (headingcolor) block.querySelector('h2').style.color = headingcolor;

  let leftBoxSize = 'col-sm-6';
  let rightBoxSize = 'col-sm-6';
  if (type === 'image-small-left') {
    leftBoxSize = 'col-sm-3 ';
    rightBoxSize = 'col-sm-8';
  }

  if (type === 'video') {
    contentLeft.innerHTML = `<video controls>
    <source src="${contentLeft.innerHTML}" type="video/mp4">
    Your browser does not support the video tag.
  </video>`;
  }
  block.innerHTML = `
  <div class="container p-2">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-xs-12 ${leftBoxSize}">
          ${contentLeft.innerHTML}
        </div>
        <div class="col-xs-12 ${rightBoxSize} ps-4">
          ${contentRight.innerHTML}
        </div>
       
      </div>
  </div>`;
}
