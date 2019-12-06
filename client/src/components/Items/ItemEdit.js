import React, { Component } from 'react';
import Modal from '../UI/Modal';
import { reduxForm } from 'redux-form';

class ItemEdit extends Component {
  componentDidMount() {
    console.log(this.props.handleSubmit);
  }
  
  render() { 
    return (
      <Modal>
        <div>
          <h5><strong>{this.props.itemName}</strong></h5>
          <p>Storage: {this.props.storage}</p>
          <p>Category: {this.props.category}</p>
          <form onSubmit={() => this.props.handleSubmit(this.props.handleEditSubmit)}>
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

export default reduxForm({ form: 'pantryForm', destroyOnUnmount: false })(ItemEdit);