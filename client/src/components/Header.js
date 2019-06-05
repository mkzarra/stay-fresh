import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  componentDidMount(){
    console.log("\n\nthis.props.currentUser Header.js:\n" + this.props.currentUser);
  }
  renderContent() {
    return this.props.currentUser ?
     [
        <li key="1">
          <Link to="/pantry">
            <strong>
              My Pantry
            </strong>
          </Link>
        </li>,
        <li key="2"><a href="/api/logout">Logout</a></li>
      ]
    : <li><a href="/auth/google">Login With Google</a></li>
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

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Header);