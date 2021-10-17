import React from 'react';

import { Category } from '@/core/services/news/types';
import { CategoriesProps, CategoriesState } from '@/pages/News/Blog/_files/types';
import { useCustomState } from '@/shared/hooks';
import './Categories.scss';

const initialState: CategoriesState = {
  activeCategory: '',
};

const Categories = ({ categories, onSelectCategory }: CategoriesProps) => {
  const [state, setState] = useCustomState<CategoriesState>(initialState);
  const { activeCategory } = state;

  const isActive = (category: Category['name']) => {
    return category === activeCategory;
  };

  const handleSelectCategory = (category: Category['name']) => {
    setState({ activeCategory: category === activeCategory ? undefined : category });
    onSelectCategory(category);
  };

  return (
    <aside data-component="Categories">
      <ul className="list-group">
        {categories.map(({ name, posts }) => (
          <li
            key={name}
            className={`d-flex justify-content-between align-items-center ${
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
