import { PROJECT_TITLE } from 'shared/files/consts';

/**
 * setPageTitle
 * @param { string } title
 */

export const setPageTitle = title => {
  document.title = `${PROJECT_TITLE} | ${title}`;
};

export default setPageTitle;
