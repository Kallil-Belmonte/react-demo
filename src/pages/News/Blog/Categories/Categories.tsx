import type { FunctionComponent } from 'react';

import type { Category } from '@/core/services/news/types';
import type { CategoriesProps, CategoriesState } from '@/pages/News/Blog/_files/types';
import { useCustomState } from '@/shared/hooks';
import './Categories.scss';

const initialState: CategoriesState = {
  activeCategory: '',
};

const Categories: FunctionComponent<CategoriesProps> = ({ categories, onSelectCategory }) => {
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
