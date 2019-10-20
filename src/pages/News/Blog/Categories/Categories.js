import React, { useState } from 'react';

import { ListGroup, Badge } from 'react-bootstrap';

const Categories = ({ categories, onSelectCategory }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
    onSelectCategory(category);
  };

  return (
    <aside data-component="categories">
      <ListGroup>
        {categories.map((category, index) =>
          <ListGroup.Item
            key={index}
            className="d-flex justify-content-between align-items-center"
            active={activeCategory === category.name}
            onClick={() => handleSelectCategory(category.name)}
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
