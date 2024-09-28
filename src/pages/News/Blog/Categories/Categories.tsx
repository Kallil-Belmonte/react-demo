import { type FunctionComponent, useState } from 'react';

import type { Category } from '@/core/services/news/types';
import './Categories.scss';

type Props = {
  categories: Category[];
  onSelectCategory: (category: Category['name']) => void;
};

const Categories: FunctionComponent<Props> = ({ categories, onSelectCategory }) => {
  const [activeCategory, setActiveCategory] = useState<Category['name']>('');

  const isActive = (category: Category['name']) => category === activeCategory;

  const handleSelect = (category: Category['name']) => {
    setActiveCategory(category === activeCategory ? '' : category);
    onSelectCategory(category);
  };

  return (
    <aside data-component="Categories">
      <ul>
        {categories.map(({ name }) => (
          <li v-for="category in categories" key={name}>
            <button
              className={isActive(name) ? 'active' : ''}
              type="button"
              onClick={isActive(name) ? undefined : () => handleSelect(name)}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Categories;
