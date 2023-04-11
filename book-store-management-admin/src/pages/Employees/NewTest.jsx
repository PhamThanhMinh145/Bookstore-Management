import React, { useState } from "react";
import "./style/new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Grid } from "@mui/material";
import Input from "../../components/form/Input";
import RadioGroupp from "../../components/form/RadioGroup";
import Select from "../../components/form/Select";
import Checkbox from "../../components/form/Checkbox";
import Button from "../../components/form/Button";
import * as dummy from "../../data/dummy";

const initialFValues = {
  id: 0,
  fullname: "",
  email: "",
  password: "",
  image: "",
  phone: "",
  gender: "male",
  role: "",
  country: "",
  status: false,
};

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const NewTest = ({ title }) => {
  const [file, setFile] = useState("");
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const validationOnChange = true;

  const validation = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullname" in fieldValues)
      temp.fullname = fieldValues.fullname ? "" : "This field is required";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid";
    if ("password" in fieldValues)
      temp.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/.test(fieldValues.password)
        ? ""
        : "4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.";
    if ("phone" in fieldValues)
      temp.phone =
      /^[0-9]{10}$/.test(fieldValues.phone) ? "" : "Maximum 10 numbers required";
    if ("role" in fieldValues)
      temp.role = fieldValues.role.length !== 0 ? "" : "This field is required";
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
    }
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return (
    <div className="newContainer">
      <div className="top">
        <h1>{title}</h1>
      </div>

      <div className="bottom">
        <div className="left">
          <div className="img">
            <img
            alt=""
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
            />
          </div>
        </div>
        <div className="right">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={6} className="gridInput">
                <div className="imageUpload">
                  <label htmlFor="file">
                    {" "}
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="image"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>

                <div className="input">
                  <Input
                    className="size"
                    name="fullname"
                    label="Full name"
                    value={values.fullname}
                    onChange={handleInputChange}
                    error={errors.fullname}
                  />
                </div>

                <div className="input">
                  <Input
                  className="size"
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleInputChange}
                    error={errors.email}
                  />
                </div>

                <div className="input">
                  <Input
                  className="size"
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleInputChange}
                    error={errors.password}
                  />
                </div>

                <div className="input">
                  <Input
                  className="size"
                    name="phone"
                    type="number"
                    label="Phone"
                    value={values.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                  />
                </div>
              </Grid>

              <Grid item xs={6} className="gridInput">
                <div className="input">
                  <Input
                  className="size"
                    name="country"
                    label="Country"
                    value={values.country}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="radio">
                  <RadioGroupp
                  
                    name="gender"
                    label="Gender"
                    value={values.gender}
                    onChange={handleInputChange}
                    items={genderItems}
                  />
                </div>

                <div className="select">
                  <Select
                    name="role"
                    label="Role"
                    value={values.roleId}
                    onChange={handleInputChange}
                    options={dummy.getRoleCollection()}
                    error={errors.role}
                  />
                </div>

                <div className="checkbox">
                  <Checkbox
                    name="status"
                    label="Status employee"
                    value={values.status}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="btn">
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
      </div>
    </div>
  );
};

export default NewTest;
