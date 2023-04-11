import { Button } from "@mui/material";
import React from "react";
const ActionButton = ({ color, children, onClick, disabled, onMouseOver }) => {
  return (
    <Button
      onClick={onClick}
      className={color}
      disabled={disabled}
      onMouseOver={onMouseOver}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
