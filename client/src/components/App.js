import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Pantry from './Pantry/Pantry';
import Items from './Items/Items';
import NewItem from './Items/NewItem';
import ItemEdit from './Items/ItemEdit';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  
  render() {
    const { currentUser } = this.props;
    return (
      <BrowserRouter>
        <Header currentUser={currentUser} />
        <div className="row" style={{ width: "95%" }}>
          <Route exact path="/" component={Landing} currentUser={currentUser} />
          <Route exact path="/pantry" component={Pantry} />
          <Route exact path="/items" component={Items} />
          <Route path="/items/new" component={NewItem} />
          <Route path="/pantry/edit" component={ItemEdit} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ currentUser: auth.currentUser });

export default connect(mapStateToProps, actions)(App);
