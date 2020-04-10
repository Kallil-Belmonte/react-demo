import React, { useReducer, useCallback } from 'react';

import { ListGroup, Badge } from 'react-bootstrap';

import Reducer from 'core/Hooks/Reducer';

const { Item } = ListGroup;

const initialState = {
  activeCategory: undefined,
};

const Categories = ({ categories, onSelectCategory }) => {
  const [state, setState] = useReducer(Reducer, initialState);

  const { activeCategory } = state;

  const isCategoryActive = useCallback((category) => {
    return category === activeCategory;
  }, [activeCategory]);

  const handleSelectCategory = (category) => {
    setState({ activeCategory: category});
    onSelectCategory(category);
  };

  return (
    <aside data-component="categories">
      <ListGroup>
        {categories.map(({ name, posts }) =>
          <Item
            key={name}
            active={isCategoryActive(name)}
            className="d-flex justify-content-between align-items-center"
            onClick={() => isCategoryActive(name) ? undefined : handleSelectCategory(name)}
          >
            {name}
            <Badge pill variant="primary">{posts}</Badge>
          </Item>
        )}
      </ListGroup>
    </aside>
  );
};

export default Categories;
