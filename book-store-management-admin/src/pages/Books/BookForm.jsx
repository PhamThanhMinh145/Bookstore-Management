import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Grid } from "@mui/material";
import {
    getDownloadURL, getStorage,
    ref,
    uploadBytesResumable
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/form/Button";
import DatePickers from "../../components/form/DatePicker";
import Editor from "../../components/form/Editor";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import app from "../../firebase2";
import { addBook } from "../../redux/apiCalls";
import AuthService from "../../services/auth.service";
import "./style/bookForm.scss";

const initialFValues = {
  authorID: "",
  bookID: 0,
  bookName: "",
  dateOfPublished: new Date(),
  description: "",
  fieldID: "",
  price: 0,
  publisherID: "",
  quantity: 0,
  stripeID: "",
};

const config = {
  buttons: [
    "bold",
    "italic",
    "underline",
    "link",
    "unlink",
    "source",
    "align",
    "undo",
    "redo",
    "fontsize",
  ],
};

const BookForm = ({ title }) => {
  const history = useNavigate();
  const [file, setFile] = useState("");
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const validationOnChange = true;
  const validation = (fieldValues = values) => {
    let temp = { ...errors };
    if ("bookName" in fieldValues)
      temp.bookName = fieldValues.bookName ? "" : "This field is required";
    if ("price" in fieldValues)
      temp.price = /^[0-9]{1,10}$/.test(fieldValues.price)
        ? ""
        : "Price is required";

    if ("quantity" in fieldValues)
      temp.quantity = /^[0-9]{1,10}$/.test(fieldValues.quantity)
        ? ""
        : "quantity is required";

    if ("fieldID" in fieldValues)
      temp.field =
        fieldValues.fieldID.length !== 0 ? "" : "This field is required";

    if ("publisherID" in fieldValues)
      temp.publisherID =
        fieldValues.publisherID.length !== 0 ? "" : "This field is required";

    if ("authorID" in fieldValues)
      temp.authorID =
        fieldValues.authorID.length !== 0 ? "" : "This field is required";
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

  const [recordsField, setRecordsField] = useState([]);
  const [recordsPublisher, setRecordsPubliser] = useState([]);
  const [recordsAuthor, setRecordsAuthor] = useState([]);
  const user = AuthService.getCurrentUser();
  const urlAuthor = "https://localhost:7091/Author/Get";
  const urlField = "https://localhost:7091/Field/GetAll";
  const urlPublisher = "https://localhost:7091/Publisher/Get";
  // get data author
  const fetchAuthor = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "bearer " + user.token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      //redirect: "follow",
    };
    fetch(urlAuthor, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        // sort data
        json = json.sort((a, b) => {
          return a.authorName < b.authorName ? -1 : 1;
        });

        setRecordsAuthor(json);
      })
      .catch((e) => console.log(e));
  };

  // get data field
  const fetchField = () => {
    fetch(urlField)
      .then((response) => response.json())
      .then((json) => {
        // console.log("result", json);
        // sort data
        json = json.sort((a, b) => {
          return a.fieldName < b.fieldName ? -1 : 1;
        });
        setRecordsField(json);
      })
      .catch((e) => console.log(e));
  };

  // get daya publisher
  const fetchPublisher = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "bearer " + user.token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      //redirect: "follow",
    };

    fetch(urlPublisher, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        // console.log("publisher", json);
        json = json.sort((a, b) => {
          return a.publisherName < b.publisherName ? -1 : 1;
        });
        setRecordsPubliser(json);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchAuthor();
    fetchField();
    fetchPublisher();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validation()) {
      if (values.bookID === 0) {
        // const date = JSON.stringify(values.dateOfPublished);
        // setValues(() => (values.dateOfPublished = date));
        const fileName = file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              //  const product = { ...inputs, img: downloadURL, categories: cat };
              // addProduct(product, dispatch);
              const book = { ...values, image: downloadURL };
              addBook(book, dispatch);
              history("/books");
              resetForm();
            });
          }
        );
      }
    }
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  console.log(file);

  return (
    <div className="newContainer">
      <div className="top">
        <h1>{title}</h1>
      </div>

      <div className="bottom">
        <div className="left">
          <div className="i">
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
                    name="bookName"
                    label="Book name"
                    value={values.bookName}
                    onChange={handleInputChange}
                    error={errors.bookName}
                  />
                </div>

                <div className="input">
                  <Input
                    className="size"
                    name="price"
                    label="Price"
                    type="number"
                    value={values.price}
                    onChange={handleInputChange}
                    error={errors.price}
                  />
                </div>

                <div className="input">
                  <Input
                    className="size"
                    name="quantity"
                    label="Quantity"
                    type="number"
                    value={values.quantity}
                    onChange={handleInputChange}
                    error={errors.quantity}
                  />
                </div>
              </Grid>

              <Grid item xs={6} className="gridInput">
                <div className="date">
                  <DatePickers
                    size="size"
                    name="dateOfPublished"
                    label="Publish Date"
                    value={values.dateOfPublished}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="select">
                  <Select
                    name="authorID"
                    label="Author"
                    value={values.authorID}
                    onChange={handleInputChange}
                    options={recordsAuthor}
                    error={errors.authorID}
                  />
                </div>

                <div className="select">
                  <Select
                    name="publisherID"
                    label="Publisher"
                    value={values.publisherID}
                    onChange={handleInputChange}
                    options={recordsPublisher}
                    error={errors.publisherID}
                  />
                </div>

                <div className="select">
                  <Select
                    name="fieldID"
                    label="Field"
                    value={values.fieldID}
                    onChange={handleInputChange}
                    options={recordsField}
                    error={errors.fieldID}
                  />
                </div>
                <div className="input">
                  <Input
                    className="size"
                    name="stripeID"
                    label="Stripe ID"
                    type="text"
                    value={values.stripeID}
                    onChange={handleInputChange}
                    // error={errors.quantity}
                  />
                </div>
              </Grid>

              <Grid item xs={10}>
                <Editor
                  name="description"
                  value={values.description}
                  config={config}
                  onChange={handleInputChange}
                />

                {/* <div>{parse(values.describe)}</div> */}
              </Grid>

              <Grid item xs={10} className="gridInput">
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

export default BookForm;
