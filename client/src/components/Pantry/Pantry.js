import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Spinner from '../UI/Spinner';
import Item from '../Items/Item';
import * as actions from '../../actions';

class Pantry extends Component {
  state = { showModal: false }

  removeFromPantryHandler = (pantryItem) => {
    this.props.onRemoveFromPantry(this.props.currentUser, pantryItem);
  }

  handleGetOnePantryItem = (pantryItem) => {
    this.props.getPantryItem(this.props.currentUser, pantryItem);
  }

  componentDidMount() {
    this.props.onGetPantry(this.props.currentUser, this.props.pantry);
  }

  showModalHandler = () => {
    console.log(this.state);
    if (this.state.showModal) {
      this.setState({ showModal: false});
    }
    this.setState({ showModal: true });

    this.props.history.push('/pantry/edit');
  }

  handleEditSubmit = (pantryItem) => {
    this.props.onEditPantryItem(this.props.currentUser, pantryItem);
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
            handleEditSubmit={() => this.handleEditSubmit(item)}
            onList={true}
            datePurchased={item.datePurchased}
            removeFromPantry={handleSubmit(() => this.removeFromPantryHandler(item))}
            toggleModal={() => this.showModalHandler()}
            showModal={this.state.showModal}
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
  onEditPantryItem: (currentUser, pantryItem) => dispatch(actions.editPantryItem(currentUser, pantryItem)),
  onGetPantryItem: (currentUser, pantryItem) => dispatch(actions.getPantryItem(currentUser, pantryItem))
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'pantryForm' })(Pantry));
