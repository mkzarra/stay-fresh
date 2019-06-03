import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import Item from './Item';
import Spinner from '../UI/Spinner';

class Items extends Component {
  componentDidMount() {
    console.log(this.props.items);
    this.props.onGetItems();
  }

  addItemToPantry = () => {
    const currentUser = this.props.onFetchUser();
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
          onList={item.onList}
          addToPantry={this.addItemToPantry}
        />
      ));
    }

    // if (!this.props.items) {
    //   items = null;
    // }

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

const mapStateToProps = ({ items }) => ({
  items: items.items,
  loading: items.loading,
  error: items.error,
});

const mapDispatchToProps = dispatch => ({
  onGetItems: () => dispatch(actions.getItems()),
  onAddToPantry: (data) => dispatch(actions.addToPantry(data)),
  onFetchUser: () => dispatch(actions.fetchUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);