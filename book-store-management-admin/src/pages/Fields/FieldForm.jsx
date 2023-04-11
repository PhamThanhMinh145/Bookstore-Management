import React, { useEffect, useState } from "react";

import { Grid } from "@mui/material";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import './style/newField.scss';

const initialFValues = {
  fieldID: 0,
  fieldName: "",
  fieldDescription: "",
};

const FieldForm = ({addField, recordForEdit}) => {

 
  
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const validationOnChange = true;

  const validation = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fieldName" in fieldValues)
      temp.fieldName = fieldValues.fieldName ? "" : "This field is required";

    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (validationOnChange) validation({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
       addField(values, resetForm);
    }
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

   // code for edit
   useEffect(
    () => {
      if (recordForEdit != null)
        setValues({
          ...recordForEdit,
        });
        console.log(recordForEdit);
    },
    {recordForEdit} 
  );

  return (
    <div className="containerField">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container className="grid">
          <div className="gridInput">
            <div>
              <Input
              className="size"
                name="fieldName"
                label="Field name"
                value={values.fieldName}
                onChange={handleInputChange}
                error={errors.fieldName}
              />
            </div>

            <div>
              <Input
              className="size"
                name="fieldDescription"
                label="Description"
                value={values.fieldDescription}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="btnField">
            <Button
              type="submit"
              size="small"
              text="Submit"
              className="submit"
            />

            <Button
              text="Reset"
              size="small"
              className="reset"
              onClick={resetForm}
            />
          </div>
        </Grid>
      </form>
    </div>
  );
};

export default FieldForm;
