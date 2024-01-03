import { getMetadataStyleProps } from '../../scripts/utils.js';

export default function decorate(block) {
  // Function to create HTML content for link block column
  function createLinkBlockColumn(linkBlock) {
    return `
      <div>
        <a class="button link-findout" href="${linkBlock.children[2].innerHTML}">${linkBlock.children[1].innerHTML}</a>
      </div>
    `;
  }
  // Function to create HTML content for options column
  function createOptionsColumn() {
    return `
      <div class="col-lg-4 col-xs-12 col-sm-12 mb-lg-0 mb-5 text-lg-left text-center  ">
        <div class="row font-roboto-slab font-weight-600">
          <span class="col-lg-6  opt-true"><span class="true-false-option"></span> True </span>
          <span class="col-lg-6 opt-false"><span class="true-false-option"></span> False </span>
        </div>
      </div>
    `;
  }
  // Function to create HTML content for each row
  function createRowContent(child, index, linkBlock) {
    return `
      <div class="row d-flex justify-content-center align-items-center ${index === 0 ? '' : 'd-none'}"> 
        <div class="${index === 0 ? 'col-8' : 'col'}">
          ${Array.from(child.children).map((elem, idx) => `
            ${idx === 0 ? `<strong>${elem.innerHTML}</strong>` : `<p class="${idx === 2 ? 'text-dark' : ''}" >${elem.innerHTML}</p>`}
          `).join('')}
        </div>
        ${index === 0 ? createOptionsColumn() : createLinkBlockColumn(linkBlock)}
      </div>
    `;
  }
  // Function to toggle options visibility
  function toggleOptions(selectedOption) {
    const bodyContent = block.querySelector('.body-content');

    // Remove 'd-none' from the selected option's corresponding content
    bodyContent.children[selectedOption.classList.contains('opt-true') ? 1 : 2].classList.remove('d-none');
    bodyContent.children[selectedOption.classList.contains('opt-true') ? 1 : 2].classList.add('mb-5');

    // Hide the main content
    bodyContent.children[0].classList.add('d-none');

    // Show the link block
    bodyContent.children[3].classList.remove('d-none');
  }
  // Function to add click event listener to options
  function addOptionClickListener(selector) {
    const option = block.querySelector(selector);
    option.addEventListener('click', () => toggleOptions(option));
  }

  // Extract link block from the end of children
  const linkBlock = block.lastElementChild;
  const blockItems = Array.from(block.children).slice(0, -1); // Exclude the last link block
  const parentBlock = block.closest('.section');
  // Dynamically create the HTML content
  block.innerHTML = `
    <div class="container" ${getMetadataStyleProps(parentBlock)}>
      <div class="row">
        <div class="col-lg-1 d-lg-flex d-none left-arrow"></div>
        <div class="col-lg-11 body-content">
          ${blockItems.map((child, index) => createRowContent(child, index, linkBlock)).join('')}
        </div>
      </div>
    </div>
  `;

  // Event listeners for True and False options
  addOptionClickListener('.opt-true');
  addOptionClickListener('.opt-false');
}
