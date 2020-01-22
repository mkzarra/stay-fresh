import React, { Component } from 'react';
import Modal from '../UI/Modal';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class ItemEdit extends Component {
  componentDidMount() {
    console.log("this.props.show:", this.props.show);
    console.log("this.props.handleEditSubmit:", this.props.handleEditSubmit);
    console.log("this.props.handleSubmit:", this.props.handleSubmit);
    
  }

  handleEditSubmit = (pantryItem) => {
    this.props.onEditPantryItem(this.props.currentUser, pantryItem);
  }
  
  render() { 
    return (
      <Modal show={this.props.show}>
        <div>
          <h5><strong>{this.props.itemName}</strong></h5>
          <p>Storage: {this.props.storage}</p>
          <p>Category: {this.props.category}</p>
          <form onSubmit={() => this.props.handleEditSubmit({ ...this.props.itemName, ...this.props.storage, ...this.props.category, ...this.props.id, ...this.props.datePurchased, ...this.props.exp })}>
          {/* <form> */}
            <label>Purchased on</label>
            <input type="date" placeholder={this.props.datePurchased} />
            <label>Expires on</label>
            <input type="date" placeholder={this.props.exp} />
            <button className="#00e676 green accent-3 btn-flat right white-text" type="submit">Save Changes</button>
          </form>
        </div>
      </Modal>);
  }
}

function mapStateToProps(state) {
  return {
    pantry: state.pantry.pantry,
    loading: state.pantry.loading,
    error: state.pantry.error,
    currentUser: state.auth.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onEditPantryItem: (currentUser, pantryItem) => dispatch(actions.editPantryItem(currentUser, pantryItem))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'pantryForm', destroyOnUnmount: false })(ItemEdit));