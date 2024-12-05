import { type FunctionComponent, useState, useEffect } from 'react';

import type { ObjectType } from '@/shared/files/types';
import { PROJECT_DOMAIN } from '@/shared/files/consts';
import type { Category, Icons } from './types';
import './Icon.scss';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
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

  const style = { '--size': size, '--color': color, ...propStyle };

  const setIcon = async () => {
    const request = new Request(`/icons/${category}/${name}.svg`);
    let svgHTML = '';

    if ('caches' in window) {
      const cache = await caches.open(`${PROJECT_DOMAIN}-icons`);
      let response = await cache.match(request);

      if (!response) {
        await cache.add(request);
        response = await cache.match(request);
      }

      svgHTML = (await response?.text()) || '';
    } else if (!svgs[name]) {
      const response = await fetch(request);
      svgHTML = await response.text();
    }

    if (svgHTML && mounted) {
      setSvgs(prevValue => ({ ...prevValue, [name]: svgHTML }));
    }
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    setIcon();

    // Unmount
    return () => {
      setMounted(false);
    };
  }, [setIcon]);

  return (
    <div
      data-component="Icon"
      data-category={category}
      data-name={name}
      style={style}
      dangerouslySetInnerHTML={{ __html: svgs[name] }}
      {...otherProps}
    />
  );
};

export default Icon;
