import React, { useState, useCallback, useEffect } from 'react';

type Props = {
  className?: string;
  icon: string;
  width?: string;
  height?: string;
  fill?: string;
};

export type IconProps = Omit<Props, 'icon'>;

const AppIcon = (props: Props) => {
  const [iconComponent, setIconComponent] = useState(null);

  const setComponent = useCallback(async () => {
    try {
      const module = await import(`./Icons/App${props.icon}`);
      setIconComponent(module.default(props));
    } catch (error) {
      console.error(error);
    }
  }, []);

  // LIFECYCLE HOOKS
  useEffect(() => {
    setComponent();
  }, []);

  return iconComponent;
};

export default AppIcon;
