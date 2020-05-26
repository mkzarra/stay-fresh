import React from 'react';

export default ({ onList, addToPantry, getItemDetails, id }) => (
  <>
    <form onSubmit={!onList? addToPantry : getItemDetails}>
      <input type="hidden" value={JSON.stringify(id)} name="itemId" />
      <button style={{ margin: "12px" }} onClick={!onList ? addToPantry : getItemDetails} className={!onList ? "#00e676 green accent-3 btn-flat white-text" : "#d32f2f red accent-2 btn-flat white-text"}>
        {!onList ? "Save" : "Show More"}
      </button>
    </form>
  </>      
);

