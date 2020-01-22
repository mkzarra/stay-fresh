import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from './Backdrop';

export default class Modal extends Component {
  componentDidMount() {
    console.log("Modal.js props:", this.props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("nextProps: ", nextProps);
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    return (
      <>
        <Backdrop show={this.props.show} clicked={this.props.modalClose} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
        </div>
      </>
    );
  }
}