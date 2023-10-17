import { type FunctionComponent, useState, useMemo, useCallback, useEffect } from 'react';

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

  const [svg, setSvg] = useState('');
  const [mounted, setMounted] = useState(true);

  const style = useMemo(() => ({ '--size': size, '--color': color, ...propStyle }), []);

  const setIcon = useCallback(async () => {
    const module = await import(`/icons/${category}/${name}.svg`);
    const request = new Request(module.default);
    const cache = await caches.open('react-demo-icons');
    let response = await cache.match(request);
    let svgHTML = '';

    if (response) {
      svgHTML = await response.text();
    } else {
      await cache.add(request);
      response = await cache.match(request);
      svgHTML = (await response?.text()) || '';
    }

    if (mounted) setSvg(svgHTML);
  }, [category, name, mounted]);

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
      dangerouslySetInnerHTML={{ __html: svg }}
      {...otherProps}
    ></figure>
  );
};

export default Icon;
