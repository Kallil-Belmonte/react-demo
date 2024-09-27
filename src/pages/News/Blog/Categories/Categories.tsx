import { type FunctionComponent, useState } from 'react';

import type { Category } from '@/core/services/news/types';
import './Categories.scss';

type Props = {
  categories: Category[];
  onSelectCategory: (category: Category['name']) => void;
};

const Categories: FunctionComponent<Props> = ({ categories, onSelectCategory }) => {
  const [activeCategory, setActiveCategory] = useState<Category['name']>('');

  const isActive = (category: Category['name']) => {
    return category === activeCategory;
  };

  const handleSelectCategory = (category: Category['name']) => {
    setActiveCategory(category === activeCategory ? '' : category);
    onSelectCategory(category);
  };

  return (
    <aside data-component="Categories">
      <ul className="list-group">
        {categories.map(({ name, posts }) => (
          <li
            key={name}
            className={`list-group-item d-flex align-items-center justify-content-between ${
              isActive(name) ? 'active' : ''
            }`}
            onClick={() => handleSelectCategory(name)}
          >
            {name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Categories;
