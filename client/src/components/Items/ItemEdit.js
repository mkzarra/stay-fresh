import React, { Component } from 'react';
import Modal from '../UI/Modal';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import formatDate from '../../utilities/formatDate';

class ItemEdit extends Component {
  state = {
    purchase_date: formatDate(this.props.datePurchased),
    exp_date: formatDate(this.props.exp)
  }

  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  }

  handleSubmit = () => {
    const { id, itemName, storage, category, handleEditSubmit } = this.props;
    const dtPurchased = new Date(this.state.purchase_date);
    const dtExp = new Date(this.state.exp_date);
    handleEditSubmit({ id, itemName, storage, category, datePurchased: dtPurchased, expiration: dtExp});
  }
  
  render() {
    return (
      <Modal show={this.props.show} modalClose={this.props.modalClose}>
        <div>
          <p className="right black-text" style={{cursor: 'pointer'}} onClick={this.props.modalClose}>x</p>
          <h5><strong>{this.props.itemName}</strong></h5>
          <p>Storage: {this.props.storage}</p>
          <p>Category: {this.props.category}</p>
          <form onSubmit={this.handleSubmit}>
            <label>Purchased on</label>
            <input type="date" placeholder={this.state.purchase_date} value={this.state.purchase_date} onChange={(event) => this.handleChange(event, "purchase_date")} />
            <label>Expires on</label>
            <input type="date" placeholder={this.state.exp_date} value={this.state.exp_date} onChange={(event) => this.handleChange(event, "exp_date")} />
            <button className="#00e676 green accent-3 btn-flat right white-text" type="button" onClick={this.handleSubmit} >Save Changes</button>
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
    currentUser: state.auth.currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onEditPantryItem: (currentUser, pantryItem) => dispatch(actions.editPantryItem(currentUser, pantryItem))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'pantryForm' })(ItemEdit));