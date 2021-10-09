import { PROJECT_TITLE } from '@/shared/files/consts';

/**
 * @name setPageTitle
 */

const setPageTitle = (title: string) => {
  document.title = `${PROJECT_TITLE} | ${title}`;
};

export default setPageTitle;
