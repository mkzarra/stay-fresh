import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.css';

export default class Header extends Component {
  renderContent() {
    return this.props.currentUser ?
     [
        <li key="0">
          <Link to="/items">
            <strong>
              Items
            </strong>
          </Link>
        </li>,
        <li key="1">
          <Link to="/pantry">
            <strong>
              My Pantry
            </strong>
          </Link>
        </li>,
        <li key="2"><a href="/api/logout">Logout</a></li>
      ]
      : [
          <li key="0">
            <Link to="/items">
              <strong>
                Items
              </strong>
            </Link>
          </li>,
          <li key="1">
            <a href="/auth/google">Login With Google</a>
          </li>
      ]
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper green">
          <Link
            to="/"
            className={[classes.StayFresh, "left brand-logo"].join(" ")}
          >
            <p>Stay Fresh</p>
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}