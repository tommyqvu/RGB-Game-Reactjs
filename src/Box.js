import React from 'react';
import classes from './App.module.css';

const Box = ({ rgbString, onBoxClick , clickable}) => (
  <div onClick={rgbString !== "rgb(35,35,35)" && clickable ?  onBoxClick  : null  } className={classes.square} style={{ background: rgbString }} />
);

export default Box;
