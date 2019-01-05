import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.scss';

const NotFound = (props) => {
  // Set page title
  document.title = 'React Demo | Error 404';

  return (
    <main data-component="NotFound">
      <div className="atom-wrapper">
        <p className="number">4</p>
        <div className="atom">
          <div className="particle">
            <svg>
              <circle cx='100' cy='100' fill='none' r='80' strokeWidth='5'></circle>
            </svg>
          </div>
          <div className="particle">
            <svg>
              <circle cx='100' cy='100' fill='none' r='80' strokeWidth='5'></circle>
            </svg>
          </div>
          <div className="particle">
            <svg>
              <circle cx='100' cy='100' fill='none' r='80' strokeWidth='5'></circle>
            </svg>
          </div>
          <div className="particle">
            <svg>
              <circle cx='100' cy='100' fill='none' r='80' strokeWidth='5'></circle>
            </svg>
          </div>
        </div>
        <p className="number">4</p>
      </div>

      <h1 className="page-title text-center">Page not found</h1>
      <div className="d-flex justify-content-center">
        <Link to="/" className="btn btn-primary mt-4">Go back to the home page</Link>
      </div>
    </main>
  );
};

export default NotFound;
