import {
    BrightnessAuto,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid
} from "@mui/icons-material";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Grid } from "@mui/material";
import axios from "axios";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable
} from "firebase/storage";
import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import * as dummy from "../../data/dummy";
import app from "../../firebase2";
import "../../pages/Employees/style/edit.scss";
import AuthService from "../../services/auth.service";

const initialFValues = {
  owner: "",
  accountEmail: "",
  phone: "",
  accountAddress: "",
  image: "",
  country: "",
  roleID: 0,
};

const EditEmployee = () => {
  const user = AuthService.getCurrentUser();
  const [file, setFile] = useState("");
  const [values, setValues] = useState(initialFValues);
  const [per, setPerc] = useState(null);
  const { accountID } = useParams();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      console.log(name);
      const storage = getStorage(app);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setValues((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const validationOnChange = true;

  const validation = (fieldValues = values) => {
    let temp = { ...errors };
    if ("owner" in fieldValues)
      temp.owner = fieldValues.owner ? "" : "This field is required";
    if ("accountEmail" in fieldValues)
      temp.accountEmail = /$^|.+@.+..+/.test(fieldValues.accountEmail)
        ? ""
        : "Email is not valid";
    if ("phone" in fieldValues)
      temp.phone = /^[0-9]{10}$/.test(fieldValues.phone)
        ? ""
        : "Maximum 10 numbers required";
    if ("roleID" in fieldValues)
      temp.roleID = fieldValues.roleID !== 0 ? "" : "This field is required";
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

  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      Authorization: "bearer " + user.token,
    },
  };

  useEffect(() => {
    const getEmployee = async () => {
      try {
        await axios
          .get(
            `https://localhost:7091/Account/GetById/${accountID}`,
            config
          )
          .then((response) => {
            const resData = response.data;
            setValues(resData);
          });
      } catch (e) {
        console.log(e);
      }
    };
    getEmployee();
  }, [accountID]);

  console.log(values);

  const editEmployee = async () => {
    try {
      await axios
        .put(
          `https://localhost:7091/Account/Update/${accountID}`,
          values,
          config
        )
        .then((respone) => {
          console.log("Employee Update", respone.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      editEmployee();
      navigate("/employee");
    }
  };

  return (
    <div className="employee">
      <div className="employeeTitleContainer">
        <h1 className="employeeTitle">Edit Employee</h1>
      </div>

      <div className="employeeContainer">
        <div className="show">
          <div className="showTop">
            <img
              src={
                values?.image !== null
                  ? values?.image
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="avatar"
              className="employeeShowImg"
            />

            <div className="showTopTitle">
              <span className="showUserName">
                {values.owner !== null ? values.owner : "Unknown"}
              </span>
              <span className="showRole">
                {values.roleID === 1 ? "Admin" : "Staff"}
              </span>
            </div>
          </div>

          <div className="showBottom">
            <span className="showTitle">Account Details</span>

            <div className="showInfo">
              <PermIdentity className="showIcon" />
              <span className="showInfoTitle">
                {values.owner !== null ? values.owner : "Unknown"}
              </span>
            </div>

            <span className="showTitle">Contact Details</span>

            <div className="showInfo">
              <MailOutline className="showIcon" />
              <span className="showInfoTitle">
                {values.accountEmail !== null ? values.accountEmail : "Unknown"}
              </span>
            </div>

            <div className="showInfo">
              <PhoneAndroid className="showIcon" />
              <span className="showInfoTitle">
                {values.phone !== null ? values.phone : "Unknown"}
              </span>
            </div>

            <div className="showInfo">
              <LocationSearching className="showIcon" />
              <span className="showInfoTitle">
                {values.accountAddress !== null
                  ? values.accountAddress
                  : "Unknown"}
              </span>
            </div>

            <div className="showInfo">
              <BrightnessAuto className="showIcon" />
              <span className="showInfoTitle">
                {values.status ? "Active" : "Disable"}
              </span>
            </div>
          </div>
        </div>
        <div className="update">
          <span className="updateTitle">Edit Employee</span>

          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={6} className="gridInput">
                <div className="input">
                  <Input
                    className="size"
                    name="owner"
                    label="Full name"
                    value={values.owner}
                    onChange={handleInputChange}
                    error={errors.owner}
                  />
                </div>

                <div className="input">
                  <Input
                    className="size"
                    name="accountEmail"
                    label="Email"
                    value={values.accountEmail}
                    onChange={handleInputChange}
                    error={errors.accountEmail}
                  />
                </div>

                <div className="input">
                  <Input
                    className="size"
                    name="accountAddress"
                    label="Address"
                    value={values.accountAddress}
                    onChange={handleInputChange}
                    error={errors.accountAddress}
                  />
                </div>

                <div className="input">
                  <Input
                    className="size"
                    name="phone"
                    label="Phone"
                    value={values.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                  />
                </div>

                <div className="input">
                  <Input
                    className="size"
                    name="country"
                    label="Country"
                    value={values.country}
                    onChange={handleInputChange}
                  />
                </div>
              </Grid>

              <Grid item xs={6} className="gridInput">
                <div className="select">
                  <Select
                    name="roleID"
                    label="Role"
                    value={values.roleID}
                    onChange={handleInputChange}
                    options={dummy.getRoleCollection()}
                    error={errors.roleID}
                  />
                </div>

                <div className="imgUpload">
                  <div className="image">
                    <img
                      src={
                        values?.image !== null
                          ? values?.image
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                    />
                  </div>

                  <div className="buttonUpload">
                    <label htmlFor="file">
                      {" "}
                      <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="image"
                      style={{ display: "none" }}
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                </div>

                <div className="btn">
                  <Button
                    type="submit"
                    size="large"
                    text="Submit"
                    className="submit"
                    disabled={per !== null && per < 100}
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

export default EditEmployee;
