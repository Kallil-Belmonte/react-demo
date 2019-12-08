import React, { useState } from 'react';

import { ListGroup, Badge } from 'react-bootstrap';

const Categories = ({ categories, onSelectCategory }) => {
  const [activeCategory, setActiveCategory] = useState(undefined);

  const isCategoryActive = (category) => activeCategory === category;

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
    onSelectCategory(category);
  };

  return (
    <aside data-component="categories">
      <ListGroup>
        {categories.map((category) =>
          <ListGroup.Item
            key={category.name}
            active={isCategoryActive(category.name)}
            className="d-flex justify-content-between align-items-center"
            onClick={() => isCategoryActive(category.name) ? undefined : handleSelectCategory(category.name)}
          >
            {category.name}
            <Badge pill variant="primary">{category.posts}</Badge>
          </ListGroup.Item>
        )}
      </ListGroup>
    </aside>
  );
};

export default Categories;
