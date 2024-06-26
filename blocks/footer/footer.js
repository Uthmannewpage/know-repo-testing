import { loadFragment } from '../fragment/fragment.js';
import { allLanguages, getLocalizedResourceUrl } from '../../scripts/utils.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  block.textContent = '';

  // load footer fragment
  const footerPath = getLocalizedResourceUrl('footer');
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  const footer = document.createElement('div');
  while (fragment?.firstElementChild) footer.append(fragment.firstElementChild);

  // create language selector
  const languageSelector = footer.querySelector('ul:last-of-type');
  const labelElement = document.createElement('label');
  labelElement.setAttribute('for', 'langSelector');

  const selectElement = document.createElement('select');
  selectElement.id = 'langSelector';
  selectElement.setAttribute('name', 'langSelector');

  languageSelector?.querySelectorAll('li').forEach((li) => {
    const optionElement = document.createElement('option');

    optionElement.value = li.textContent.trim().toLowerCase();
    optionElement.innerHTML = `<strong>${li.textContent.trim()}</strong>`;

    selectElement.add(optionElement);
  });

  languageSelector?.parentNode.appendChild(labelElement);
  languageSelector?.parentNode.replaceChild(selectElement, languageSelector);

  selectElement.addEventListener('change', (e) => {
    const selectedValue = e.target.value;
    if (allLanguages[selectedValue]) {
      window.location.href = `${window.location.protocol}/${allLanguages[selectedValue]}`;
    }
  });

  const filesDiv = document.createElement('div');
  filesDiv.innerHTML = `
  <!-- adding Lato font -->
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap"   rel="stylesheet">
    
   `;
  footer.append(filesDiv);
  block.append(footer);
}
