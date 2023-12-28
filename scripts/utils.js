export function getLocalizedResourceUrl(resourceName) {
  const { pathname } = window.location;
  const lastChartFromUrl = pathname.charAt(pathname.length - 1);
  const pagwIsInFolder = lastChartFromUrl === '/';

  let pathnameAsArray = pathname.split('/');

  if (pagwIsInFolder) return `${pathnameAsArray.join('/')}${resourceName}`;

  const basePathIndex = pathname.startsWith('/pgwa/') ? 3 : 2;
  pathnameAsArray = pathnameAsArray.slice(0, basePathIndex + 1);

  return `${pathnameAsArray.join('/')}${resourceName}`;
}

export function getDefaultLanguage() {
  const localisationList = ['en', 'es'];
  const currentPathUrl = window.location.pathname;
  const foundLanguage = localisationList.find((item) => currentPathUrl.indexOf(`/${item}/`) !== -1);

  return foundLanguage || 'en';
}
