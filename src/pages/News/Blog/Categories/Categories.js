import React from 'react';

import { ListGroup, Badge } from 'react-bootstrap';

const Categories = ({ categories, onClick }) => {
  return (
    <aside data-component="categories">
      <ListGroup>
        {categories.map((category, index) =>
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center" data-name={category.name} onClick={(event) => onClick(event)}>
            {category.name}
            <Badge pill variant="primary">{category.posts}</Badge>
          </ListGroup.Item>
        )}
      </ListGroup>
    </aside>
  );
};

export default Categories;
