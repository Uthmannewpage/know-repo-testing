export default function decorate(block) {
  const metadata = block.closest('.section').dataset;
  const { type, headingcolor } = metadata;

  const blockItems = [...block.firstElementChild.children];

  const [contentLeft, contentRight] = blockItems;
  const text = contentRight.innerHTML.split('<br>');
  const h2 = `${text[0].split('\n')[1].trim().split(',').join('<br>')}</h2>`;
  let p = text[1];
  // eslint-disable-next-line prefer-destructuring
  p = p.split('</h2>')[0];
  let media = '';
  if (type === 'video') {
    media = `<video controls class="ratio ratio-16x9">
        <source src="${contentLeft.innerHTML}">
        Your browser does not support the video tag.
      </video>`;
  } else if (type === 'image') {
    media = contentLeft.innerHTML;
  }
  block.innerHTML = `
  <div class="container-fluid p-2" style='background-color: #f9f9f8'>
      <div class="row d-flex justify-content-center align-items-center">
      <div class="col-xs-12 col-sm-6">
      ${media}
    </div>
        <div class="col-xs-12 col-sm-4 ps-4">
          <div style='color: ${headingcolor} !important;'>${h2}</div>
          <p>${p}</p>
        </div>
       
      </div>
  </div>`;
}
