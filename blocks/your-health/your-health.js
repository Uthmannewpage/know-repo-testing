export default function decorate(block) {
  const blockItems = [...block.firstElementChild.children];
  const [contentLeft, contentRight] = blockItems;

  const leftColumn = document.createElement('div');
  const rightColumn = document.createElement('div');

  leftColumn.className = 'col-md-6 col-sm-12';
  rightColumn.className = 'col-md-6 col-sm-12 bg-grey';
  block.classList.add('row');

  // Clear the block's inner HTML to avoid duplication
  block.innerHTML = '';

  // Append columns to the block
  block.appendChild(leftColumn);
  block.appendChild(rightColumn);

  // Append children of contentLeft to leftColumn
  leftColumn.append(...contentLeft.childNodes);

  // Function to set image and right column content
  const setImage = () => {
    const isMobile = window.innerWidth < 768;
    let imgLink = 'https://www.knowpneumonia.com/images/shape-new-arrow.png';
    if (isMobile) {
      imgLink = 'https://www.knowpneumonia.com/images/whiteArrow-test1.png';
    }

    if (contentRight) {
      rightColumn.innerHTML = `
        <div class='row h-100'>
          <div class='col-md-4 col-sm-0 p-0'> 
            <img style='height: ${isMobile ? 'auto' : '100%'}' src='${imgLink}' />
          </div>
          <div class='col-md-8 col-sm-12 '> ${contentRight.innerHTML} </div>
        </div>
      `;
    }
  };

  // Initialize and set resize event listener
  setImage();
  window.addEventListener('resize', setImage);

  // Style h2 elements
  block.querySelectorAll('h2').forEach((it) => {
    it.style.color = 'var(--color-primary)';
    it.style.fontSize = '28px';
  });
}
