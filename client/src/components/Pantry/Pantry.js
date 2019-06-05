import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../UI/Spinner';
import Item from '../Items/Item';
import * as actions from '../../actions';

class Pantry extends Component {
  removeFromPantryHandler = (event, pantryItem) => {
    event.preventDefault();
    this.props.onRemoveFromPantry(this.props.currentUser, pantryItem);
  }

  handleGetOnePantryItem = (pantryItem) => {
    this.props.getPantryItem(this.props.currentUser, pantryItem)
  }

  componentDidMount() {
    this.props.onGetPantry(this.props.currentUser);
  }

  render() {
    let items = <Spinner />

    const pantryItems = [];

    this.props.pantry.forEach(p => this.props.items.forEach(i => {
       if (p._item === i._id) {
         return pantryItems.push({ ...i, key: p._id});
       }
    }));

    if (!this.props.loading) {
      items = pantryItems.map(item => (
        <Item
          key={item.key}
          id={item.key}
          itemName={item.itemName}
          storage={item.storage}
          category={item.category}
          exp={item.expiration}
          onList={true}
          datePurchased={item.datePurchased}
          removeFromPantry={(event) => this.removeFromPantryHandler(event, item)}
        />
      ));
    }

    return (
      <div style={{ marginTop: "60px" }}>
        {items}
      </div>
    )
  }
}

const mapStateToProps = ({ items, pantry, auth }) => ({
  items: items.items,
  pantry: pantry.pantry,
  loading: pantry.loading,
  error: pantry.error,
  currentUser: auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  onGetPantry: (pantryId, currentUser) => dispatch(actions.getPantry(pantryId, currentUser)),
  onRemoveFromPantry: (currentUser, pantryItem) => dispatch(actions.removeFromPantry(currentUser, pantryItem)),
  onUpdateItem: (itemId, currentUser) => dispatch(actions.updateItem(itemId, currentUser)),
  onGetPantryItem: (currentUser, pantryItem) => dispatch(actions.getPantryItem(currentUser, pantryItem))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pantry);
