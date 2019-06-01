import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Items from './Items/Items';
import NewItem from './Items/NewItem';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  
  render() {
    return (
      <BrowserRouter>
        <Header />
        <div className="container">
          <Route exact path="/" component={Landing} />
          <Route exact path="/pantry" component={Dashboard} />
          <Route exact path="/items" component={Items} />
          <Route path="/items/new" component={NewItem} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
