import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import Item from './Item';
import Spinner from '../UI/Spinner';

class Items extends Component {
  componentDidMount() {
    this.props.onGetItems();
  }

  addItemToPantry = (itemId) => {
    const currentUser = this.props.currentUser;
    console.log("\n\nItems.js addItemToPantry:\ncurrentUser = " + currentUser);
    this.props.onAddToPantry(currentUser, itemId);
    console.log(currentUser);
  }

  render() {
    let items = <Spinner />

    if (!this.props.loading) {
      items = this.props.items.map(item => (
        <Item
          key={item._id}
          itemName={item.itemName}
          storage={item.storage}
          category={item.category}
          exp={item.expiration}
          datePurchased={item.datePurchased}
          addToPantry={() => this.addItemToPantry(item._id)}
        />
      ));
    }

    if (!this.props.items) {
      items = <h4>Unable to load items</h4>;
    }

    return (
      <div style={{ marginTop: "60px" }}>
        <div className="fixed-action-btn">
          <Link to="/items/new" className="btn-floating btn-large green">
            <i className="material-icons">add</i>
          </Link>
        </div>
        {items}
      </div>
    );
  }
}

const mapStateToProps = ({ items, auth }) => ({
  items: items.items,
  loading: items.loading,
  error: items.error,
  onList: items.onList,
  currentUser: auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  onGetItems: () => dispatch(actions.getItems()),
  onAddToPantry: (currentUser, itemId) => dispatch(actions.addToPantry(currentUser, itemId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);