import type { Status } from '@/shared/files/types';

/**
 * @function getIcon
 * @description Gets the status icon name.
 * @param status - The status to get the icon name from.
 */

const getIcon = (status: Status) => {
  if (status === 'success') return 'CheckCircle';
  if (status === 'warning' || status === 'danger') return 'Warning';
  return 'Info';
};

export default getIcon;
