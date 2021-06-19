import React, { useReducer, useCallback } from 'react';

import { ListGroup, Badge } from 'react-bootstrap';

import State from 'core/hooks/State';
import './Categories.scss';

const { Item } = ListGroup;

const initialState = {
  activeCategory: undefined,
};

const Categories = ({ categories, onSelectCategory }) => {
  const [state, setState] = useReducer(State, initialState);
  const { activeCategory } = state;

  // IS CATEGORY ACTIVE
  const isCategoryActive = useCallback(
    category => {
      return category === activeCategory;
    },
    [activeCategory],
  );

  // HANDLE SELECT CATEGORY
  const handleSelectCategory = category => {
    setState({ activeCategory: category === activeCategory ? undefined : category });
    onSelectCategory(category);
  };

  return (
    <aside data-component="categories">
      <ListGroup>
        {categories.map(({ name, posts }) => (
          <Item
            key={name}
            active={isCategoryActive(name)}
            className="d-flex justify-content-between align-items-center"
            onClick={() => handleSelectCategory(name)}
          >
            {name}
            <Badge pill variant="primary">
              {posts}
            </Badge>
          </Item>
        ))}
      </ListGroup>
    </aside>
  );
};

export default Categories;
