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

  const style = useMemo(() => ({ '--size': size, '--color': color, ...propStyle }), []);

  const setImage = useCallback(async () => {
    const response = await fetch(`/images/icons/${category}/${name}.svg`);
    const svgContent = await response.text();
    setSvg(svgContent);
  }, []);

  // LIFECYCLE HOOKS
  useEffect(() => {
    setImage();
  }, []);

  return (
    <figure
      data-component="Icon"
      data-name={name}
      style={style}
      dangerouslySetInnerHTML={{ __html: svg }}
      {...otherProps}
    ></figure>
  );
};

export default Icon;
