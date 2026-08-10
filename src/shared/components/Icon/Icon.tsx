import { type FunctionComponent, useEffect, useState } from 'react';

import type { ObjectType } from '@/shared/files/types';
import './Icon.scss';
import type { Category, Icons } from './types';

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
    color = 'inherit',
    ...otherProps
  } = props;

  const [icons, setIcons] = useState<ObjectType>({});

  const style = { '--size': size, '--color': color, ...propStyle };

  let controller: null | AbortController = null;

  const setIcon = async () => {
    if (icons[category]?.[name]) return;

    controller = new AbortController();
    const response = await fetch(`/icons/${category}/${name}.svg`, { signal: controller.signal });
    const svgHTML = await response.text();
    setIcons((prevValue: ObjectType) => ({
      ...prevValue,
      [category]: { ...prevValue[category], [name]: svgHTML },
    }));
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    setIcon();
  }, [category, name]); // eslint-disable-line

  useEffect(() => {
    // Unmount
    return () => {
      if (controller) controller.abort();
    };
  }, []); // eslint-disable-line

  return (
    <div
      data-component="Icon"
      data-category={category}
      data-name={name}
      style={style}
      dangerouslySetInnerHTML={{ __html: icons[category]?.[name] }}
      {...otherProps}
    />
  );
};

export default Icon;
