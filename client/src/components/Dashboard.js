import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      Dashboard
      <div className="fixed-action-btn">
        <Link to="/item/new" className="btn-floating btn-large green">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
}