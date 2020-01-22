import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import asyncComponent from './hoc/asyncComponent';
import Header from './Header';
import Landing from './Landing';

const asyncPantry = asyncComponent(() => import('./Pantry/Pantry'));
const asyncItems = asyncComponent(() => import('./Items/Items'));
const asyncNewItem = asyncComponent(() => import('./Items/NewItem'));
const asyncItemEdit = asyncComponent(() => import('./Items/ItemEdit'));

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
          <Route exact path="/pantry" component={asyncPantry} />
          <Route exact path="/items" component={asyncItems} />
          <Route path="/items/new" component={asyncNewItem} />
          <Route path="/pantry/edit" component={asyncItemEdit} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ currentUser: auth.currentUser });

export default connect(mapStateToProps, actions)(App);
