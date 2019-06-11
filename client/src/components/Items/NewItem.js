import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import ItemFormReview from './ItemFormReview';
import ItemForm from './ItemForm';

class NewItem extends Component {
  state = { showItemReview: false }

  renderContent() {
    if (this.state.showItemReview) {
      return <ItemFormReview onCancel={() => this.setState({ showItemReview: false })} />
    }
    return <ItemForm onItemSubmit={() => this.setState({ showItemReview: true })} />
  }

  render() {
    return (
      <>
        {this.renderContent()}
      </>
    );
  }
}

export default reduxForm({ form: 'itemForm' })(NewItem);