import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Spinner from '../UI/Spinner';
import Item from '../Items/Item';
import * as actions from '../../actions';

class Pantry extends Component {
  removeFromPantryHandler = (pantryItem) => {
    this.props.onRemoveFromPantry(this.props.currentUser, pantryItem);
  }

  handleGetOnePantryItem = (pantryItem) => {
    this.props.getPantryItem(this.props.currentUser, pantryItem);
  }

  componentDidMount() {
    this.props.onGetPantry(this.props.currentUser);
  }

  render() {
    const { pantry, items, loading, handleSubmit } = this.props;
    let pantryItems = <Spinner />
    const listItems = [];
    const pantryArr = pantry ? Object.keys(pantry).map(p => pantry[p]) : [];
    const itemArr = items ? Object.keys(items).map(i => items[i]) : [];
    
    pantryArr.forEach(p => itemArr.forEach(i => {
       if (p._item === i._id) {
         return listItems.push({
            ...i,
            key: p._id,
            datePurchased: p.datePurchased,
            expiration: p.expiration
          });
        }
    }));

    
    if (!loading) {
      pantryItems = listItems.map(item => {
        let ageState = '';
        const date = new Date(Date.now());
        const expire = new Date(item.expiration);
        const expProximity = expire - date;
        if (expProximity < 0) ageState = "Expired";
        else if (expProximity < 3600000 * 24 * 3) ageState = "Aging";
        return (
          <Item
            key={item.key}
            id={item.key}
            ageState={ageState}
            itemName={item.itemName}
            storage={item.storage}
            category={item.category}
            exp={item.expiration}
            onList={true}
            datePurchased={item.datePurchased}
            removeFromPantry={handleSubmit(() => this.removeFromPantryHandler(item))}
          />
        )
      });
    }

    if (this.props.currentUser && !pantryArr.length && !loading) {
      pantryItems = (
        <>
          <h3>Your pantry is empty!</h3>
          <Link to="/items">Browse Items</Link>
        </>
      );
    }
    return (
      <div style={{ marginTop: "60px", textAlign: "center" }}>
        {pantryItems}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.items.items,
  pantry: state.pantry.pantry,
  loading: state.pantry.loading,
  error: state.pantry.error,
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  onGetPantry: (pantryId, currentUser) => dispatch(actions.getPantry(pantryId, currentUser)),
  onRemoveFromPantry: (currentUser, pantryItem) => dispatch(actions.removeFromPantry(currentUser, pantryItem)),
  onUpdateItem: (itemId, currentUser) => dispatch(actions.updateItem(itemId, currentUser)),
  onGetPantryItem: (currentUser, pantryItem) => dispatch(actions.getPantryItem(currentUser, pantryItem))
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'pantryForm' })(Pantry));
