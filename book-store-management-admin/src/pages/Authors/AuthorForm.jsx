import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import "./style/authorForm.scss";

const initialFValues = {
  authorID: 0,
  authorName: "",
};

const AuthorForm = ({addAuthor, recordForEdit}) => {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const validationOnChange = true;

  const validation = (fieldValues = values) => {
    let temp = { ...errors };
    if ("authorName" in fieldValues)
      temp.name = fieldValues.authorName ? "" : "This field is required";

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
      // addOrEdit(values, resetForm);
       addAuthor(values, resetForm)
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
    <div className="containerAuthor">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container className="gridInput">
          <Grid item xs={6} className="grid">
            <Input
              className="size"
              name="authorName"
              label="Author name"
              value={values.authorName}
              onChange={handleInputChange}
              error={errors.name}
            />
          </Grid>

          <Grid item xs={6} className="grid">
            <div className="btnAuthor">
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
        </Grid>
      </form>
    </div>
  );
};

export default AuthorForm;
