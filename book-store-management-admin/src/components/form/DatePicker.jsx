import React from "react";

import {  TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
const DatePickers = ({name, label, value, onChange, size }) => {
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker 
          className={size}
          name = {name}
          label={label}
          inputFormat="dd-MM-yyyy"
          value={value}
          renderInput={(params) => <TextField {...params} />}
          onChange={date => onChange(convertToDefEventPara(name, date))}
        />
    </LocalizationProvider>
  );
};

export default DatePickers;
