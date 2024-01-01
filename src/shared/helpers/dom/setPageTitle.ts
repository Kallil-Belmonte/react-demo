import { PROJECT_TITLE } from '@/shared/files/consts';

/**
 * @function setPageTitle
 */

const setPageTitle = (title: string) => {
  document.title = `${title} | ${PROJECT_TITLE}`;
};

export default setPageTitle;
