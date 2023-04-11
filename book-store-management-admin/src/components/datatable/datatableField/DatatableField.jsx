import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TableBody, TableCell, TableRow, InputAdornment } from "@mui/material";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import React, { useEffect, useState } from "react";
import FieldForm from "../../../pages/Fields/FieldForm";
import AuthService from "../../../services/auth.service";
import ActionButton from "../../form/ActionButton";
import Button from "../../form/Button";
import ConfirmDialog from "../../form/ConfirmDialog";
import Popup from "../../form/Popup";
import Notification from "../../Notification";
import useTable from "../useTable";
import "./style/datatableField.scss";
import { Search } from "@mui/icons-material";
import Input from "../../form/Input";
const headCells = [
  { id: "fieldID", label: "ID" },
  { id: "fieldName", label: "Field name" },
  { id: "fieldDescription", label: "Description" },
  { id: "action", label: "Action", disableSorting: true },
];

const DatatableField = ({ onError }) => {
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const user = AuthService.getCurrentUser();

  const url = "https://localhost:7091/Field/GetAll";

  const fetchField = () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log("result", json);
        setRecords(json);
      })
      .catch(() => onError());
  };

  const postField = (field) => {
    fetch("https://localhost:7091/Field", {
      method: "POST",
      headers: {
        accept: "*/*",
        Authorization: "bearer " + user.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fieldID: field.fieldID,
        fieldName: field.fieldName,
        fieldDescription: field.fieldDescription,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("Field add", json);
        setRecord(json);
      })
      .catch(() => onError());
  };

  const putField = (field) => {
    fetch(`https://localhost:7091/Field/Update/${field.fieldID}`, {
      method: "PUT",
      headers: {
        accept: "*/*",
        Authorization: "bearer " + user.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fieldID: field.fieldID,
        fieldName: field.fieldName,
        fieldDescription: field.fieldDescription,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("field update", json);
        setRecordForEdit(json);
      })
      .catch((e) => console.log(e));
  };

  const deleteField = (field) => {
    fetch(`https://localhost:7091/Field/Delete/${field}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: "bearer " + user.token,
      },
      body: JSON.stringify({
        fieldID: field.fieldID,
        fieldName: field.fieldName,
        fieldDescription: field.fieldDescription,
      }),
    })
      .then(() => {
        setRecord(fetchField());
      })

      .catch((e) => console.log(e));
  };

  const addField = (field, resetForm) => {
    if (field.fieldID === 0) {
      postField(field);
    } else {
      putField(field);
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  const onDelete = (field) => {
    deleteField(field);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  useEffect(() => {
    fetchField();
  }, [record, recordForEdit]);

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.fieldName.toLowerCase().includes(target.value)
          );
      },
    });
  };
  return (
    <>
      <div className="datatableField">
        <div className="title">
          List Field
          <Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            size="small"
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
            color="addNewAuthor"
          />
        </div>

        <div className="searchField">
        <Input
            className="searchInput"
            label="Search Field"
            other={{
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
            onChange={handleSearch}
          />
        </div>

        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.fieldID} className="rowAuthor">
                <TableCell className="cellID">{item.fieldID}</TableCell>
                <TableCell className="cellName">{item.fieldName}</TableCell>
                <TableCell className="cellDes">
                  {item.fieldDescription}
                </TableCell>

                <TableCell className="action">
                  <div className="tip">
                    <TooltipComponent content="Edit" position="BottomCenter">
                      <ActionButton
                        color="edit"
                        onClick={() => {
                          openInPopup(item);
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </ActionButton>
                    </TooltipComponent>
                    <TooltipComponent content="Delete" position="BottomCenter">
                      {item.books.length === 0 ? (
                        <ActionButton
                          color="delete"
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "Are you sure to delete this record?",
                              subTitle: "You can't undo this operation",
                              onConfirm: () => {
                                onDelete(item.fieldID);
                              },
                            });
                          }}
                        >
                          <DeleteIcon />
                        </ActionButton>
                      ) : (
                        <ActionButton
                          color="disable"
                          onClick={() => {
                            setNotify({
                              isOpen: true,
                              message: "This book has been ordered",
                              type: "warning",
                            });
                          }}
                        >
                          <DeleteIcon />
                        </ActionButton>
                      )}
                    </TooltipComponent>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination className="pagination" />
      </div>

      <Popup
        title="Field form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <FieldForm recordForEdit={recordForEdit} addField={addField} />
      </Popup>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default DatatableField;
