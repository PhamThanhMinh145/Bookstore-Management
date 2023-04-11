import React from "react";

import {
    TextField,
  } from "@mui/material";
const Input = ({ name, label, value,type, error = null ,size ,onChange, ...other }) => {
  return (
    <TextField
      className={size}
      variant="outlined"
      label={label}
      type= {type}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && {error: true, helperText: error})}
    />
  );
};

export default Input;
