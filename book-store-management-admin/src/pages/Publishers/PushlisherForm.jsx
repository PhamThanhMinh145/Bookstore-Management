import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import "./style/publisherForm.scss";

const initialFValues = {
  publisherID: 0,
  publisherName: "",
  fieldAddress: "",
};

const PublisherForm = ({ addOrEditPublisher, recordForEdit }) => {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const validationOnChange = true;

  const validation = (fieldValues = values) => {
    let temp = { ...errors };
    if ("publisherName" in fieldValues)
      temp.publisherName = fieldValues.publisherName
        ? ""
        : "This field is required";

        
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
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
      addOrEditPublisher(values, resetForm);
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
    { recordForEdit }
  );

  return (
    <div className="containerPublisher">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container className="grid">
          <div className="gridInput">
            <div>
              <Input
                className="size"
                name="publisherName"
                label="Publisher name"
                value={values.publisherName}
                onChange={handleInputChange}
                error={errors.publisherName}
              />
            </div>

            <div>
              <Input
                className="size"
                name="fieldAddress"
                label="Address"
                value={values.fieldAddress}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="btnAction">
           
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

export default PublisherForm;
