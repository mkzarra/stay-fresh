import React from 'react';

import translateDate from '../../utilities/translateDate';
import classes from './Item.module.css';

export default ({ itemName, category, storage, datePurchased, exp, onList, id, addToPantry, removeFromPantry, showItemEdit }) => {
  const listAction = (
    <div style={{ marginBottom: "10px"}}>
      <form onSubmit={!onList? addToPantry : removeFromPantry}>
        <input type="hidden" value={id} />
        <button className={!onList ? "#00e676 green accent-3 btn-flat white-text" : "#d32f2f red accent-2 btn-flat white-text"}>
          {!onList ? "Add to" : "Remove from"} Pantry
        </button>
      </form>
    </div>      
  );

  const showEditItemForm = onList ? <button className="#1de9b6 teal accent-3 white-text btn-flat">Show Update Form</button> : null;
  
  return (
    <div className={classes.Item}>
      <h5><strong>{itemName}</strong></h5>
      <p>Storage: {storage}</p>
      <p>Category: {category}</p>
      <p>Expiration: {translateDate(exp)}</p>
      {onList ? <p>Purchased on: {translateDate(datePurchased)}</p> : null}
      {listAction}
      {/* {showEditItemForm} */}
    </div>
  );
}
