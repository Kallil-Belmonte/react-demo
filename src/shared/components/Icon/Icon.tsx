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
  const { style: propStyle = {}, category = 'UI', name, size, color, ...otherProps } = props;

  const [svg, setSvg] = useState('');

  const style = useMemo(() => {
    const result = { ...propStyle };

    if (size) {
      result.width = size;
      result.height = size;
    }

    if (color) result.color = color;

    return result;
  }, []);

  const setImage = useCallback(() => {
    fetch(`/images/icons/${category}/${name}.svg`)
      .then(response => response.text())
      .then(svgText => setSvg(svgText));
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
