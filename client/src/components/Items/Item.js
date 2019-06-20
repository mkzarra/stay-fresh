import React from 'react';

import ListAction from './ListAction';
import translateDate from '../../utilities/translateDate';
import classes from './Item.module.css';

export default ({ itemName, category, storage, datePurchased, exp, onList, id, addToPantry, removeFromPantry, /* showEditForm */}) => {

  // const showEditItemForm = onList ? <button onClick={() => showEditForm(id)} className="#1de9b6 teal accent-3 white-text btn-flat">Edit</button> : null;
  
  return (
    <div className={classes.Item}>
      <h5><strong>{itemName}</strong></h5>
      <p>Storage: {storage}</p>
      <p>Category: {category}</p>
      {onList ? <p>Expiration: {translateDate(exp)}</p> : null}
      {onList ? <p>Purchased on: {translateDate(datePurchased)}</p> : null}
      <ListAction addToPantry={addToPantry} id={id} removeFromPantry={removeFromPantry} onList={onList} />
      {/* {showEditItemForm} */}
    </div>
  );
}