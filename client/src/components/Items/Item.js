import React from 'react';

import classes from './Item.module.css';

export default ({ itemName, category, storage, datePurchased, exp, onList, id, addToPantry, removeFromPantry, showItemEdit }) => {
  const listAction = (
    <div>
      <form onSubmit={!onList? addToPantry : removeFromPantry}>
        <input type="hidden" value={id} />
        <button className={!onList ? "#00e676 green accent-3 z-depth-3" : "#d32f2f red darken-2 z-depth-3"}>
          {!onList ? "ADD TO" : "REMOVE FROM"} PANTRY
        </button>
      </form>
    </div>      
  );

  const showEditItemForm = onList ? <button className="#1de9b6 teal accent-3"></button> : null;

  return (
    <div className={classes.Item}>
      <p><strong>{itemName}</strong></p>
      <p>Storage: {storage}</p>
      <p>Category: {category}</p>
      <p>Expiration: {exp}</p>
      <p>Purchased on: {datePurchased}</p>
      {listAction}
      {showEditItemForm}
    </div>
  );
}
