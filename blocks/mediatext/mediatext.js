export default function decorate(block) {
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
    contentLeft.innerHTML = `<iframe width="560" height="315" src="${contentLeft.innerHTML}" title="Know Pneumonia" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      `;
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
