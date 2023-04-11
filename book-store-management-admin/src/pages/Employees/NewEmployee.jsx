import React, { useState } from "react";
import "./style/new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Dropdown from "../../components/dropdown/Dropdown";

const NewEmployee = ({ inputs, title }) => {
  const [file, setFile] = useState("");

  const [selected, setSelected] = useState("");

  return (
    <div className="newContainer">
      <div className="top">
        <h1>{title}</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <img
          alt=""
            src={
              file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
          />
        </div>
        <div className="right">
          <form>
            <div className="formInput">
              <label htmlFor="file">
                {" "}
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            {inputs.map((input) => (
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  min={input.min}
                  max={input.max}
                  maxLength={input.maxLength}
                />
              </div>
            ))}
           
            <Dropdown selected={selected} setSelected={setSelected} />
            <button>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewEmployee;
