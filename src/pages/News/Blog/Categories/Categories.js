import React from 'react';

// import './Categories.css';

const Categories = (props) => {
  return (
    <aside data-component="categories">
      <div className="list-group">
        {props.data.map((category, index) =>
          <button key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" type="button" data-name={category.name} onClick={props.click}>
            {category.name}
            <span className="badge badge-primary badge-pill">{category.posts}</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Categories;
