export default function decorate(block) {
  const children = [...block.children];
  children.forEach((row) => {
    const isLink = ![...row.children][0].querySelector('picture');
    if (!isLink) {
      row.classList.add('story-item');
    } else {
      row.classList.add('text-center');
      const link = row.querySelector('a.button');
      link.classList.add('share-link');
      link.classList.remove('button');
    }
  });
}
