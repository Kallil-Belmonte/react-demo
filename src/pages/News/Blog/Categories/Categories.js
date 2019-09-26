import React from 'react';

const Categories = ({ data, onClick }) => {
  return (
    <aside data-component="categories">
      <div className="list-group">
        {data.map((category, index) =>
          <button key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" type="button" data-name={category.name} onClick={(event) => onClick(event)}>
            {category.name}
            <span className="badge badge-primary badge-pill">{category.posts}</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Categories;
