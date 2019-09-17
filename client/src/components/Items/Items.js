import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import * as actions from '../../actions';
import Item from './Item';
import Spinner from '../UI/Spinner';
// import classes from './Message.module.css';

class Items extends Component {
  componentDidMount() {
    this.props.onGetItems();
  }

  addItemToPantry = (itemId, itemName) => {
    this.props.onAddToPantry(this.props.currentUser, itemId, this.props.items, itemName + " added to pantry");
  }

  render() {
    let items = <Spinner />

    if (!this.props.items) {
      items = <h4>Unable to load items</h4>;
    }

    if (!this.props.loading) {
      items = this.props.items.map((item) => (
        <Item
          key={item._id}
          itemName={item.itemName}
          storage={item.storage}
          category={item.category}
          addToPantry={this.props.handleSubmit(() => this.addItemToPantry(item))}
        />
      ));
    }

    // let message = <h5 className={classes.Message}>{this.props.message}</h5>

    // if (!this.props.message) {
    //   message = null;
    // }

    return (
      <div style={{ marginTop: "60px", textAlign: 'center' }}>
        <div className="fixed-action-btn">
          <Link to="/items/new" className="btn-floating btn-large green">
            <i className="material-icons">add</i>
          </Link>
        </div>
        {/* {message} */}
        {items}
      </div>
    );
  }
}

const mapStateToProps = ({ items, auth }) => ({
  items: items.items,
  message: items.message,
  loading: items.loading,
  error: items.error,
  onList: items.onList,
  currentUser: auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  onGetItems: () => dispatch(actions.getItems()),
  onAddToPantry: (currentUser, item, items, message) => dispatch(actions.addToPantry(currentUser, item, items, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'itemForm' })(Items));