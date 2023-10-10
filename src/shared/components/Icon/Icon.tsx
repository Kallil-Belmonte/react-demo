import { type FunctionComponent, useState, useMemo, useCallback, useEffect } from 'react';

import type { ObjectType } from '@/shared/files/types';
import type { Category, Icons } from './types';
import './Icon.scss';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  category?: Category;
  name: Icons;
  size?: string;
  color?: string;
};

const Icon: FunctionComponent<Props> = props => {
  const {
    style: propStyle = {},
    category = 'UI',
    name,
    size = '100%',
    color,
    ...otherProps
  } = props;

  const [svgs, setSvgs] = useState<ObjectType>({});
  const [mounted, setMounted] = useState(true);

  const style = useMemo(() => ({ '--size': size, '--color': color, ...propStyle }), []);

  const setIcon = useCallback(async () => {
    const response = await fetch(`/icons/${category}/${name}.svg`);
    const svgHTML = await response.text();
    if (mounted && !svgs[name]) setSvgs(prevValue => ({ ...prevValue, [name]: svgHTML }));
  }, [category, name, mounted, svgs]);

  // LIFECYCLE HOOKS
  useEffect(() => {
    setIcon();

    // Unmount
    return () => {
      setMounted(false);
    };
  }, [setIcon]);

  return (
    <figure
      data-component="icon"
      data-category={category}
      data-name={name}
      style={style}
      dangerouslySetInnerHTML={{ __html: svgs[name] }}
      {...otherProps}
    ></figure>
  );
};

export default Icon;
