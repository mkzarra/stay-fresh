import React from 'react';

import ItemEdit from '../Items/ItemEdit';
import ListAction from './ListAction';
import translateDate from '../../utilities/translateDate';
import classes from './Item.module.css';

export default ({ itemName, category, storage, datePurchased, exp, onList, id, addToPantry, removeFromPantry, ageState, handleEditSubmit, toggleModal, showModal, handleSubmit }) => {
  const showEditItemForm = onList ? <button onClick={toggleModal} className="#1de9b6 teal accent-3 white-text btn-flat" style={{marginBottom: '12px'}}>Edit</button> : '';


  return showModal ? <ItemEdit id={id} itemName={itemName} category={category} datePurchased={datePurchased} exp={exp} storage={storage} handleEditSubmit={() => handleEditSubmit({ id, itemName, category, storage, datePurchased, exp })} />
    : (
    <div className={[classes.Item, classes[ageState], "col", "s1", "m3", "l1", "offset-4"].join(" ")}>
      <h5><strong>{itemName}</strong></h5>
      <p>Storage: {storage}</p>
      <p>Category: {category}</p>
      {onList ? <p>Purchased on: {translateDate(datePurchased)}</p> : null}
      {onList ? <p>Expires on: {translateDate(exp)}</p> : null}
      <ListAction addToPantry={addToPantry} id={id} removeFromPantry={removeFromPantry} onList={onList} />
      {showEditItemForm}
    </div>
  );
}