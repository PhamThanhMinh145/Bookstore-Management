import React from "react";
import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@mui/material";

const convertToDefEventPara = (name, value) => ({
  target: {
    name,
    value,
  },
});
const Checkbox = ({ name, label, value, onChange }) => {
  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) =>
              onChange(convertToDefEventPara(name, e.target.checked))
            }
          />
        }
        label={label}
      ></FormControlLabel>
    </FormControl>
  );
};

export default Checkbox;
