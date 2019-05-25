import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <div className="container">
          <Route exact path="/" component={Landing} />
          <Route exact path="/pantry/" component={Dashboard} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
