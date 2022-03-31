import React, { CSSProperties, useState, useCallback, useEffect } from 'react';

import { Icons } from './types';
import './AppIcon.scss';

type Props = {
  className?: string;
  icon: Icons;
  size?: string;
  fill?: string;
};

export type IconProps = {
  className?: string;
  style: CSSProperties;
  fill?: string;
};

const AppIcon = (props: Props) => {
  const { className = '', icon, size, fill } = props;

  const [iconComponent, setIconComponent] = useState(null);

  const setComponent = useCallback(async () => {
    const moduleProps = {
      className: `${className} d-flex align-items-center justify-content-center`,
      style: size ? { width: size, height: size } : {},
      fill: fill || 'currentColor',
    };

    try {
      const module = await import(`./Icons/App${icon}.tsx`);
      setIconComponent(module.default(moduleProps));
    } catch (error) {
      console.error(error);
    }
  }, [props]);

  // LIFECYCLE HOOKS
  useEffect(() => {
    setComponent();
  }, [icon]);

  return iconComponent;
};

export default AppIcon;
