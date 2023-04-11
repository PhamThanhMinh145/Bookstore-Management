import { TableBody, TableCell, TableRow } from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx/xlsx.js";
import useTable from "../../components/datatable/useTable";
import ActionButton from "../../components/form/ActionButton";
import { addExcel } from "../../redux/apiCalls";
import AuthService from "../../services/auth.service";
import "./style/import.scss";
import { useNavigate } from "react-router-dom";
// import { DataGrid } from "@mui/x-data-grid";
const EXTENSIONS = ["xlsx", "xls"];

const Import = () => {
  const user = AuthService.getCurrentUser();
  const nagative = useNavigate();
  const [file, setFile] = useState("");
  const [fileExtentions, setFileExtentions] = useState("");
  const [headCells, setHeadCells] = useState([]);
  const [data, setData] = useState([]);
  const [filterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(data, headCells, filterFn);

  const convertToJson = (headers, data) => {
    const rows = [];
    data.forEach((row) => {
      let rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };

  const getExtention = (file) => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension);
  };

  // console.log("file:", file);

  const showImportExcel = (e) => {
    setFile(e.target.files[0]); // lữu trữ để post

    const files = e.target.files[0]; // lưu trữ để show data trc post
    setFileExtentions(files.name.split(".").pop()); // cắt chuỗi ra xlxs
    console.log("files:", files);
    const render = new FileReader();

    render.onload = (event) => {
      // parse data

      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, {
        cellText: false,
        cellDates: true,
        type: "binary",
        cellDates: true,
        dateNF: 'dd"."mm"."yyyy',
        locale: "vi",
      });

      //get first sheet
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      // convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, {
        header: 1,
        raw: false,
      });
      //set header in state
      const headers = fileData[0];

      const heads = headers.map((head) => ({ id: head, label: head }));
      console.log("heads: ", heads);
      setHeadCells(heads);

      // removing header
      fileData.splice(0, 1);
      console.log("data: ", fileData);
      setData(convertToJson(headers, fileData));
    };

    if (files) {
      if (getExtention(files)) {
        render.readAsBinaryString(files);
      } else {
        alert("import file input, select excel file");
      }
    } else {
      setData([]);
      setHeadCells([]);
    }
  };

  const postExcel = (e) => {
    e.preventDefault();

    console.log("dd", fileExtentions);
    console.log(file);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("name", file.name);

    if (fileExtentions.toLowerCase() === "xlsx") {
      axios({
        url: "https://localhost:7091/Book/Import",
        method: "POST",
        headers: {
          accept: "text/plain",
          Authorization: `bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      }).then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
      nagative("/books");
      window.location.reload();
    } else {
      console.log("Invalid File");
    }
  };

  console.log("head:", headCells);

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl">
        <div className="containerImport">
          <div className="title">Import File</div>

          <div className="flex-input">
            <div className="fileName">
              {fileExtentions === "xlsx" && file !== null ? file.name : ""}
            </div>
            <div className="uploadButton">
              <ActionButton color="upload">
                <label htmlFor="file">Upload</label>
              </ActionButton>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={showImportExcel}
              />
            </div>
          </div>
          {fileExtentions === "xlsx" && file !== null ? (
            <>
              <div className="overflow-auto md:overflow-x-scroll">
                <TblContainer>
                  <TblHead />
                  <TableBody>
                    {recordsAfterPagingAndSorting().map((item) => (
                      <TableRow key={item.BookName} className="rowBook">
                        <TableCell className="cellName">
                          {item.BookName}
                        </TableCell>
                        <TableCell className="cellPrice">
                          <NumericFormat
                            disabled
                            value={item.Price}
                            thousandSeparator=","
                            style={{
                              background: "none",
                              width: "120px",
                            }}
                          />
                        </TableCell>

                        <TableCell className="cellQuatity">
                          <NumericFormat
                            disabled
                            value={item.Quantity}
                            thousandSeparator=","
                            style={{
                              background: "none",
                              width: "100px",

                              wordWrap: "break-word",
                            }}
                          />
                        </TableCell>
                        <TableCell className="cellImg">
                          <div className="image">
                            <img
                              className="rounded-full h-24 w-24"
                              src={`${item.Image}`}
                              alt="Book"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="cellDescription">
                          <div className="content">{item.Description}</div>
                        </TableCell>
                        <TableCell className="cellName">
                          {item.FieldName}
                        </TableCell>
                        <TableCell className="cellName">
                          {item.AuthorName}
                        </TableCell>
                        <TableCell className="cellName">
                          {item.PublisherName}
                        </TableCell>

                        <TableCell className="cellDate">
                          {item.DateOfPublisher}
                        </TableCell>

                        <TableCell className="cellStripID">
                          <div className="contentStrip">{item.StripID}</div>
                        </TableCell>
                      </TableRow>

                      //  show detail
                    ))}
                  </TableBody>
                </TblContainer>
                <TblPagination className="pagination" />
              </div>
              {headCells.map((item) => (
                <div>
                  {item.id === "BookName" ? (
                    <div className="submit">
                      <ActionButton color="btnSubmit" onClick={postExcel}>
                        Submit
                      </ActionButton>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </>
          ) : (
            <div>Not data</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Import;
