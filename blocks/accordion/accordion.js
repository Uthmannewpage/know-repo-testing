export default async function decorate(block) {
  // decorate accordion item.
  [...block.children].forEach((row) => {
    row.classList.add('accordion-item');
    const classes = ['question', 'answer'];
    classes.forEach((classTxt, index) => {
      const section = row.children[index];
      if (section) {
        section.classList.add(`accordion-${classTxt}`);

        // decorate accordion content
        if (index === 1) {
          const getHTML = section.innerHTML;
          const newHTML = `<div class="accordion-content">${getHTML}</div>`;
          section.innerHTML = newHTML;
        }
      }
    });
  });

  // accordion click function
  const accordionElm = document.querySelectorAll('.accordion-question');
  accordionElm.forEach((item) => {
    item.ariaExpanded = 'false';
    item.role = 'button';
    item.addEventListener('click', () => {
      item.parentElement.classList.toggle('active');
      const accordionContent = item.nextElementSibling;
      if (accordionContent.style.maxHeight) {
        item.ariaExpanded = 'false';
        accordionContent.style.maxHeight = null;
      } else {
        item.ariaExpanded = 'true';
        accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
      }
    });
  });

  // resize observer
  const boxes = document.querySelectorAll('.accordion-item');
  const accResizeObserver = new ResizeObserver((entries) => {
    Object(entries).forEach((entry) => {
      if (window.innerWidth < 600) {
        const questionElm = entry.target.children[0].clientHeight;
        const borderElm = `${Math.round((questionElm + 4) / 2)}px`;
        entry.target.style.borderRadius = borderElm;
      } else {
        entry.target.style.borderRadius = null;
      }

      // update scroll height on resize
      const activeClassElm = entry.target.children[0].classList.contains('active');
      if (activeClassElm) {
        const answerElm = entry.target.children[1];
        const getScrollHeight = entry.target.children[1].scrollHeight;
        answerElm.style.maxHeight = `${getScrollHeight}px`;
      }
    });
  });

  // observe one or multiple elements
  boxes.forEach((box) => {
    accResizeObserver.observe(box);
  });
}
