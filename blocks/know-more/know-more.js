export default function decorate(block) {
  const parentBlock = block.closest('.section');
  const metaData = parentBlock.dataset;
  const { headingcolor, paragraphcolor } = metaData;
  const elements = block.children[0].children[0];
  block.style = 'margin-left: 1rem;';
  elements.children[0].style = `color: ${headingcolor}`;
  if (window.innerWidth < 768) {
    elements.children[1].style = `width: 100%; color: ${paragraphcolor}`;
  } else {
    elements.children[1].style = `width: 65%; color: ${paragraphcolor}`;
  }
}
