import { getMetadata } from './aem.js';

export const allLanguages = {
  english: 'en',
  spanish: 'es',
};

export function getDefaultLanguage() {
  const localisationList = ['en', 'es'];
  const currentPathUrl = window.location.pathname;
  const foundLanguage = localisationList.find((item) => currentPathUrl.indexOf(`/${item}/`) !== -1);

  return foundLanguage || 'en';
}

export function getLocalizedResourceUrl(resourceName) {
  return `/${getDefaultLanguage()}/${resourceName}`;
}

export function getMetadataStyleProps(section) {
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

export function camelToSnake(key) {
  const result = key.replace(/([A-Z])/g, ' $1');
  return result.split(' ').join('-').toLowerCase();
}

export function metaDataToStylesArray(metaData) {
  delete metaData.sectionStatus;
  const styles = Object.keys(metaData).map((key) => `${camelToSnake(key)}: ${metaData[key]}`);
  return styles;
}
function renderBlocks(elements, classList) {
  if (elements.length) {
    return `<div class="${classList} ${elements.map((item) => item.classList).join(' ')}">${elements.map((item) => item.innerHTML).join('')}</div>`;
  }
  return '';
}
export function generateMultiColumnLayout(main) {
  const layoutId = getMetadata('page-layout');

  if (layoutId === 'main-sidebar-right') {
    main.classList.add('section', 'multi-column-layout');
    const allSections = main.querySelectorAll('.section');
    const groupedSections = Array.from(allSections).reduce((groups, section) => {
      const position = section.dataset.position || 'full-page';
      groups[position] = groups[position] || [];
      groups[position].push(section);
      return groups;
    }, {});

    document.getElementsByTagName('main')[0].innerHTML = `
      <div>
        <div class="container">
          <div class="row">
            ${renderBlocks(groupedSections['full-page'], 'col-12')}
          </div>
          <div class="row">
            ${renderBlocks(groupedSections.main, 'col-12 col-lg-7')}
            ${renderBlocks(groupedSections['sidebar-right'], 'col-12 col-lg-5')}
          </div>
        </div>
      </div>
    `;
  }
}
