import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TableBody, TableCell, TableRow,  InputAdornment } from "@mui/material";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import React, { useEffect, useState } from "react";
import PublisherForm from "../../../pages/Publishers/PushlisherForm";
import AuthService from "../../../services/auth.service";
import ActionButton from "../../form/ActionButton";
import Button from "../../form/Button";
import ConfirmDialog from "../../form/ConfirmDialog";
import Popup from "../../form/Popup";
import Notification from "../../Notification";
import "../datatablePublisher/style/datatablePublisher.scss";
import useTable from "../useTable";
import { Search } from "@mui/icons-material";
import Input from '../../form/Input'
const headCells = [
  { id: "publisherID", label: "ID" },
  { id: "publisherName", label: "Publisher name" },
  { id: "fieldAddress", label: "Address" },
  { id: "action", label: "Action", disableSorting: true },
];
const DatatablePublisher = ({ onError }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
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

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const user = AuthService.getCurrentUser();

  const urlGet = "https://localhost:7091/Publisher/Get";

  const fetchPublisher = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "bearer " + user.token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      //redirect: "follow",
    };

    fetch(urlGet, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log("result", json);
        setRecords(json);
      })
      .catch(() => onError());
  };

  const urlPost = "https://localhost:7091/Publisher/Create";
  const postPublisher = (publisher) => {
    fetch(urlPost, {
      method: "POST",
      headers: {
        accept: "*/*",
        Authorization: "bearer " + user.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publisherID: publisher.publisherID,
        publisherName: publisher.publisherName,
        fieldAddress: publisher.fieldAddress,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("publisher add", json);
        setRecord(json);
      })
      .catch(() => onError());
  };

  const putPublisher = (publisher) => {
    fetch(
      `https://localhost:7091/Publisher/Update/${publisher.publisherID}`,
      {
        method: "PUT",
        headers: {
          accept: "*/*",
          Authorization: "bearer " + user.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publisherID: publisher.publisherID,
          publisherName: publisher.publisherName,
          fieldAddress: publisher.fieldAddress,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log("publisher update", json);
        setRecordForEdit(json);
      })
      .catch((e) => console.log(e));
  };

  const deletePublisher = (publisher) => {
    fetch(`https://localhost:7091/Publisher/Delete/${publisher}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: "bearer " + user.token,
      },
      body: JSON.stringify({
        publisherID: publisher.publisherID,
        publisherName: publisher.publisherName,
        fieldAddress: publisher.fieldAddress,
      }),
    })
      .then(() => {
        setRecord(fetchPublisher());
      })

      .catch((e) => console.log(e));
  };

  const addOrEditPublisher = (publisher, resetForm) => {
    if (publisher.publisherID === 0) {
      postPublisher(publisher);
    } else {
      putPublisher(publisher);
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

  const onDelete = (publisher) => {
    deletePublisher(publisher);
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
    fetchPublisher();
  }, [record, recordForEdit]);

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.publisherName.toLowerCase().includes(target.value)
          );
      },
    });
  };


  return (
    <>
      <div className="table">
        <div className="title">
          List Publisher
          <Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            size="small"
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
            color="addNewPublisher"
          />
        </div>

        <div className="searchPublisher">
        <Input
            className="searchInput"
            label="Search Publish name"
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
              <TableRow key={item.publisherID} className="rowPublisher">
                <TableCell className="cellID">{item.publisherID}</TableCell>
                <TableCell className="cellName">{item.publisherName}</TableCell>
                <TableCell className="cellAdd">{item.fieldAddress}</TableCell>
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
                                onDelete(item.publisherID);
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
        title="Publisher form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <PublisherForm
          recordForEdit={recordForEdit}
          addOrEditPublisher={addOrEditPublisher}
        />
      </Popup>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default DatatablePublisher;
