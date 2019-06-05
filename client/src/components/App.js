import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Pantry from './Pantry/Pantry';
import Items from './Items/Items';
import NewItem from './Items/NewItem';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  
  render() {
    return (
      <BrowserRouter>
        <Header currentUser={this.props.currentUser} />
        <div className="container">
          <Route exact path="/" component={Landing} />
          <Route exact path="/pantry" component={Pantry} />
          <Route exact path="/items" component={Items} />
          <Route path="/items/new" component={NewItem} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ currentUser: auth.currentUser });

export default connect(mapStateToProps, actions)(App);
