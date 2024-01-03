export default function decorate(block) {
  const blockItems = [...block.firstElementChild.children];
  const [contentLeft, contentRight] = blockItems;

  const leftColumn = document.createElement('div');
  const rightColumn = document.createElement('div');

  leftColumn.className = 'col-md-6 col-sm-12';
  rightColumn.className = 'col-md-6 col-sm-12 bg-grey';
  block.classList.add('row');

  block.appendChild(leftColumn);
  leftColumn.append(...contentLeft.childNodes);
  const isMobile = window.innerWidth < 600;
  let imgLink = 'https://www.knowpneumonia.com/images/shape-new-arrow.png';
  if (isMobile) {
    imgLink = 'https://www.knowpneumonia.com/images/whiteArrow-test1.png';
  }
  if (contentRight) {
    block.appendChild(rightColumn);
    rightColumn.innerHTML = `
      <div class='row'>
      <div class='col-md-4 col-sm-0 p-0'> <img  style='height: ${isMobile ? 'auto' : '40rem'}' src='${imgLink}' /></div>
      <div class='col-md-8 col-sm-12 '> ${contentRight.innerHTML} </div>
      </div>
    `;
  }

  block.querySelectorAll('h2').forEach((it) => {
    it.style.color = '#783384';
  });
  // emptying out innerHTML
  contentLeft.innerHTML = '';
  contentRight.innerHTML = '';
}
