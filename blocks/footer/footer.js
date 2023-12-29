import { loadFragment } from '../fragment/fragment.js';
import { getLocalizedResourceUrl } from '../../scripts/utils.js';

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
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // create language selector
  const languageSelector = footer.querySelector('ul:last-of-type');
  const selectElement = document.createElement('select');
  languageSelector.querySelectorAll('li').forEach((li) => {
    const optionElement = document.createElement('option');

    optionElement.value = li.textContent.trim().toLowerCase();
    optionElement.innerHTML = `<strong>${li.textContent.trim()}</strong>`;

    selectElement.add(optionElement);
  });

  languageSelector.parentNode.replaceChild(selectElement, languageSelector);

  selectElement.addEventListener('change', () => {
    // const selectedValue = this.value;
  });
  const filesDiv = document.createElement('div');
  filesDiv.innerHTML = `
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" defer async rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;900&display=swap" defer async rel="stylesheet">
    <link rel="stylesheet" defer async href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" defer async rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" defer async integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="/styles/styles.css"/>`;
  footer.append(filesDiv);
  block.append(footer);
}
