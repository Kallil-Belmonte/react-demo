import { PROJECT_TITLE } from '@/shared/files/consts';

/**
 * @function setPageTitle
 */

const setPageTitle = (title: string) => {
  document.title = `${PROJECT_TITLE} | ${title}`;
};

export default setPageTitle;
