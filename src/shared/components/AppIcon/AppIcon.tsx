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
  const [iconComponent, setIconComponent] = useState(null);

  const setComponent = useCallback(async () => {
    const moduleProps = {
      className: props.className || '',
      style: props.size ? { width: props.size, height: props.size } : {},
      fill: props.fill || 'currentColor',
    };

    try {
      const module = await import(`./Icons/App${props.icon}`);
      setIconComponent(module.default(moduleProps));
    } catch (error) {
      console.error(error);
    }
  }, [props]);

  // LIFECYCLE HOOKS
  useEffect(() => {
    setComponent();
  }, []);

  return iconComponent;
};

export default AppIcon;
