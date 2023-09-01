import { FunctionComponent, CSSProperties, useState, useMemo, useCallback, useEffect } from 'react';

import type { Icons } from './types';
import './Icon.scss';

export type IconProps = {
  className: string;
  style: CSSProperties;
  ariaLabel: string;
  color: string;
};

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  name: Icons;
  size?: string;
  color?: string;
};

const Icon: FunctionComponent<Props> = props => {
  const { style: propStyle = {}, name, size, color, ...otherProps } = props;

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
    fetch(`/images/icons/${name}.svg`)
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
