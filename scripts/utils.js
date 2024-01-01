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