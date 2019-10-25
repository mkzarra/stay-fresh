import React from 'react';
import classes from './Backdrop.module.css'

export default ({ show, clicked }) =>
  show ? <div className={classes.Backdrop} onClick={clicked}></div> : null;