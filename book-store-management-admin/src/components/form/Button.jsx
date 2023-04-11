import React from 'react'
import { Button as MuiButton } from "@mui/material";
const Button = ({ text, size, color, variant, onClick, ...other}) => {
  return (
    <MuiButton variant={variant || "contained"} size={size} onClick={onClick} className={color} {...other}>
      {text}
    </MuiButton>
  )
}

export default Button