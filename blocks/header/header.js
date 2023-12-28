import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/en/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  const nav = document.createElement('nav');
  nav.id = 'nav';
  // nav.classList = 'navbar navbar-expand-lg navbar-light bg-light';

  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const sectionList = {};
  [...nav.children].forEach((section) => {
    const classList = [...section.classList];
    const firstClass = classList.shift();
    const currentSection = classList.shift();
    sectionList[currentSection] = {};
    if (currentSection === 'navbar-brand') {
      const brand = section.querySelector('.default-content-wrapper p a');
      const url = brand.getAttribute('href');
      const picture = brand.querySelector('picture');
      sectionList[currentSection] = {
        url,
        picture,
      };
    }
    if (currentSection === 'navbar-top') {
      const nav = section.querySelector('.default-content-wrapper ul');
      sectionList[currentSection] = parseListToJson(nav);
    }
    if (currentSection === 'navbar-main') {
      const nav = section.querySelector('.default-content-wrapper ul');
      sectionList[currentSection] = parseListToJson(nav);
    }
    sectionList[currentSection].dataset = section.dataset;
  });
  console.log(nav, sectionList);

  setNavBar(block, sectionList);
}

function parseListToJson(ulElement) {
  function parseListItem(li) {
    const item = {
      text: li.firstChild.textContent.trim(),
    };
    // if text is not the only child then we need to find the text node
    li.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
        item.text = node.textContent.trim();
      }
    });
    const link = li.querySelector('a');
    if (link) {
      item.link = link.href;
    }

    const picture = li.querySelector('picture');
    if (picture) {
      item.picture = picture;
    }

    const sublist = li.querySelector('ul');
    if (sublist) {
      item.children = parseList(sublist);
    }

    return item;
  }

  function parseList(list) {
    return Array.from(list.children).map((child) => parseListItem(child));
  }

  return parseList(ulElement);
}

function setNavBar(block, sectionList) {
  const header = `
  <div class="">
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container">
      <div class="row w-100 p-0 m-0">
			<div class="d-flex col-sm-12 col-lg-2 p-0">
					<a class="navbar-brand" href="${sectionList['navbar-brand'].url}" ${getMetadataStyleProps(sectionList['navbar-brand'])}>
						${sectionList['navbar-brand'].picture.innerHTML || ''}
					</a>
					<button class="ms-auto navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
			</div>
			<div class="d-lg-none p-0">
			<a class="nav-link p-0 m-0 text-primary fw-bold" href="${sectionList['navbar-top'][0].text}">${sectionList['navbar-top'][0].text} <i class="fa-solid fa-caret-right"></i><i class="fa-solid fa-caret-right"></i> </a>
			</div>
      ${generateTopNavigation(sectionList['navbar-top'])}
      ${generateMainMenu(sectionList['navbar-main'])}
      </div>
			
    </div>
		
  </nav>
	<div class="container border border-2 border-primary w-100 d-lg-none"></div>
  </div>`;
  block.innerHTML = header;
}
function getMetadataStyleProps(section) {
  const { dataset } = section;
  if (dataset) {
    const styleProps = [];
    if (dataset.marginTop) {
      styleProps.push(`margin-top: ${dataset.marginTop}`);
    }
    if (dataset.marginBottom) {
      styleProps.push(`margin-bottom: ${dataset.marginBottom}`);
    }
    if (dataset.marginLeft) {
      styleProps.push(`margin-left: ${dataset.marginLeft}`);
    }
    if (dataset.marginRight) {
      styleProps.push(`margin-right: ${dataset.marginRight}`);
    }
    if (dataset.paddingTop) {
      styleProps.push(`padding-top: ${dataset.paddingTop}`);
    }
    if (dataset.paddingBottom) {
      styleProps.push(`padding-bottom: ${dataset.paddingBottom}`);
    }
    if (dataset.paddingLeft) {
      styleProps.push(`padding-left: ${dataset.paddingLeft}`);
    }
    if (dataset.paddingRight) {
      styleProps.push(`padding-right: ${dataset.paddingRight}`);
    }
    return `style="${styleProps.join(';')}"`;
  }
  return '';
}
function generateTopNavigation(section) {
  return `
  <div class="col-lg-10 p-0 collapse navbar-collapse" id="navbarSupportedContent" ${getMetadataStyleProps(section)}>
      
  <ul class="language-dropdown navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
    ${section
    .map(
      (item) => `${
        !item.children
          ? `<li class="nav-item">
        <a class="nav-link" aria-current="page" href="${item.link}">
					${item.picture?.innerHTML || ''}
					${item?.text}
				</a>
        </li>`
          : ''
      }
      ${
  item.children
    ? `<li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="${
  item.children[0].text
}" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          ${item.picture?.innerHTML || ''}
					${item.text}
          </a>
          <ul class="dropdown-menu w-100" aria-labelledby="${
  item.children[0].text
}">
            ${item.children
    .map(
      (subMenu) => `
            <li class="w-100" ><a class="dropdown-item" href="${subMenu.link}">
						${subMenu.picture?.innerHTML || ''}
						${subMenu.text}
						</a></li>
            `,
    )
    .join('')}
          </ul>
        </li>`
    : ''
}
        `,
    )
    .join('')}
  </ul>
</div>
  `;
}
function generateMainMenu(menu) {
  const borderColors = menu.dataset.menuBorderColors
    .split(',')
    .map((color) => color.trim());
  return `
  <div class="col-lg-12 p-0 collapse navbar-collapse" id="navbarSupportedContent" ${getMetadataStyleProps(menu)}>
  <ul class="bottom-navbar navbar-nav me-auto mb-2 mb-lg-0 d-flex w-100 text-center gap-1 justify-content-strech">
  ${menu
    .map(
      (item, index) => `${
        !item.children
          ? `<li class="nav-item border-bottom border-4 border-${borderColors[index]} p-0 w-35">
      <a class="nav-link p-3 mb-1" aria-current="page" href="${item.link}">${
  item.text ? item.text : item.picture.innerHTML
}</a>
      </li>`
          : ''
      }
    ${
  item.children
    ? `<li class="nav-item border-bottom border-4 border-${borderColors[index]} p-0 dropdown">
        <a class="nav-link p-3 mb-1 dropdown-toggle" href="#" id="${
  item.children[0].text
}" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        ${item.text}
        </a>
        <ul class="dropdown-menu" aria-labelledby="${item.children[0].text.trim()}">
          ${item.children
    .map(
      (subMenu) => `<li class="w-100" ><a class="dropdown-item" href="${subMenu.link}">${subMenu.text}</a></li>`,
    )
    .join('')}
        </ul>
      </li>`
    : ''
}
      `,
    )
    .join('')}
</ul></div>`;
}
