import React from 'react';

import { IconProps } from '../AppIcon';

const AppUser = ({ className, style, fill }: IconProps) => {
  return (
    <figure data-element="icon" className={`icon-user ${className}`} style={style}>
      <svg
        aria-hidden="true"
        role="img"
        focusable="false"
        width="100%"
        height="100%"
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
      </svg>
    </figure>
  );
};

export default AppUser;
