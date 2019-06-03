import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Payments from './Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null: return;
      case false: return <li><a href="/auth/google">Login With Google</a></li>;
      default: return [
        <li key="1"><Payments /></li>,
        <li key="3" style={{margin: '0 10px'}}>
          Credits: {this.props.auth.credits}
        </li>,
        <li key="2"><a href="/api/logout">Logout</a></li>
      ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper green">
          <Link
            to={this.props.auth ? '/items' : '/'}
            className="left brand-logo"
          >
            <div style={{padding: "0 16px"}}>Stay Fresh</div>
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth }
};

export default connect(mapStateToProps)(Header);