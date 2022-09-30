import { CSSProperties, useState, useMemo, useCallback, useEffect } from 'react';

import { firstLetterToUpperCase } from '@/shared/helpers';
import { Icons } from './types';

export type IconProps = {
  className: string;
  style: CSSProperties;
  ariaLabel: string;
  fill: string;
};

type Props = {
  className?: string;
  name: Icons;
  size?: string;
  fill?: string;
};

const Icon = (props: Props) => {
  const { className = '', name, size, fill = 'currentColor' } = props;

  const [iconComponent, setIconComponent] = useState(null);

  const iconClass = useMemo(() => {
    const convertLetters = (letter: string, index: number) => {
      const result = index && letter.match(/[A-Z]/) ? `-${letter}` : letter;
      return result.toLowerCase();
    };
    const iconName = name.split('').map(convertLetters).join('');
    return `${iconName}-icon`;
  }, []);

  const ariaLabel = useMemo(() => {
    const className = iconClass.replaceAll('-', ' ');
    return firstLetterToUpperCase(className);
  }, [iconClass]);

  const setComponent = useCallback(async () => {
    const moduleProps = {
      className: `${iconClass} ${className} flex-center`,
      style: size ? { width: size, height: size } : {},
      ariaLabel,
      fill,
    };

    try {
      const module = await import(`./Icons/${name}Icon.tsx`);
      setIconComponent(module.default(moduleProps));
    } catch (error) {
      console.error(error);
    }
  }, [props]);

  // LIFECYCLE HOOKS
  useEffect(() => {
    setComponent();
  }, [name]);

  return iconComponent;
};

export default Icon;
