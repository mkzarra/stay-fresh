import React from 'react';

export default ({ onList, addToPantry, removeFromPantry, id }) => (
  <>
    <form onSubmit={!onList? addToPantry : removeFromPantry}>
      <input type="hidden" value={JSON.stringify(id)} name="itemId" />
      <button onClick={!onList ? addToPantry : removeFromPantry} className={!onList ? "#00e676 green accent-3 btn-flat white-text" : "#d32f2f red accent-2 btn-flat white-text"}>
        {!onList ? "Add to" : "Remove from"} Pantry
      </button>
    </form>
  </>      
);

