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

  
}
