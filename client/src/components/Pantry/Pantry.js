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
    this.props.onGetPantry(this.props.currentUser, this.props.pantry);
  }

  render() {
    const { pantry, loading, handleSubmit } = this.props;
    console.log(this.props);
    let pantryItems = <Spinner />
    
    if (!loading) {
      pantryItems = pantry.map(item => {
        let ageState = '';
        const date = new Date(Date.now());
        const expire = new Date(item.expiration);
        const expProximity = expire - date;
        if (expProximity < 0) ageState = "Expired";
        else if (expProximity < 3600000 * 24 * 3) ageState = "Aging";
        return (
          <Item
            key={item._id}
            id={item._id}
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

    if (this.props.currentUser && !pantry.length && !loading) {
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
  pantry: state.pantry.pantry,
  loading: state.pantry.loading,
  error: state.pantry.error,
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  onGetPantry: (currentUser, pantry) => dispatch(actions.getPantry(currentUser, pantry)),
  onRemoveFromPantry: (currentUser, pantryItem) => dispatch(actions.removeFromPantry(currentUser, pantryItem)),
  onUpdateItem: (itemId, currentUser) => dispatch(actions.updateItem(itemId, currentUser)),
  onGetPantryItem: (currentUser, pantryItem) => dispatch(actions.getPantryItem(currentUser, pantryItem))
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'pantryForm' })(Pantry));
