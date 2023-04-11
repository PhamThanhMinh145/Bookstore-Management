import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LoopIcon from "@mui/icons-material/Loop";
import { TableBody, TableCell, TableRow, InputAdornment } from "@mui/material";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import ActionButton from "../../form/ActionButton";
import ConfirmDialog from "../../form/ConfirmDialog";
import Notification from "../../Notification";
import "../datatableEmployee/style/employee.scss";
import { Search } from "@mui/icons-material";
import Input from '../../form/Input'
import useTable from "../useTable";

const headCells = [
  { id: "accountID", label: "ID" },
  { id: "image", label: "Avatar" },
  { id: "owner", label: "Full Name" },
  { id: "roleID", label: "Role" },
  { id: "accountEmail", label: "Email" },
  { id: "phone", label: "Contact" },
  { id: "country", label: "Country" },
  { id: "status", label: "Status" },
  { id: "action", label: "Action", disableSorting: true },
];

const DatatableEmployee = () => {
  const user = AuthService.getCurrentUser();
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState(null);
  const [recordStatus, setRecordStatus] = useState();
  const [changeStatus, setchangeStatus] = useState(true);
  const [filterFn,setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
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

  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      Authorization: "bearer " + user.token,
    },
  };

  const navigate = useNavigate();

  useEffect(() => {
    const onGridReady = async () => {
      try {
        await axios
          .get("https://localhost:7091/Account/GetByRole/1", config)
          .then((response) => {
            const resData = response.data;
            setRecords([...records, ...resData]);
          });
      } catch (e) {
        console.log(e);
      }
      try {
        await axios
          .get("https://localhost:7091/Account/GetByRole/3", config)
          .then((response) => {
            const resData = response.data;
            setRecords((records) => [...records, ...resData]);
          });
      } catch (e) {
        console.log(e);
      }
    };
    onGridReady();
  }, []);

  console.log(records);

  const changeStatusEmployee = async () => {
    try {
      await axios
        .put(
          `https://localhost:7091/Account/ChangeStatus?id=${recordStatus}`,
          { status: changeStatus },
          config
        )
        .then((respone) => {
          console.log("Status changed", respone.data);
          window.location.reload();
        });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteEmployee = async () => {
    try {
      await axios
        .delete(`https://localhost:7091/Account/Delete/${record}`, config)
        .then((respone) => {
          console.log("Employee Delete", respone.data);
          window.location.reload();
          setNotify({
            isOpen: true,
            message: "Deleted Successfully",
            type: "error",
          });
        });
    } catch (e) {
      console.log(e);
    }
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
              x.accountEmail.toLowerCase().includes(target.value)
            );
        },
      });
    };

  return (
    <>
      <div className="datatableEmployee">
        <div className="title">
          List Employees
          <Link
            to="newemployee"
            style={{ textDecoration: "none" }}
            className="link"
          >
            <AddIcon />
            ADD NEW
          </Link>
        </div>

        <div className="searchEmployee">
        <Input
            className="searchInput"
            label="Search Employee"
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
              <TableRow key={item.accountID} className="rowEmployee">
                <TableCell className="cellID">
                  <div>{item.accountID}</div>
                </TableCell>
                <TableCell className="cellImg">
                  <div className="Img">
                    <img
                      src={
                        item?.image !== null
                          ? item?.image
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                    />
                  </div>
                </TableCell>
                <TableCell className="cellName">
                  <div>{item.owner}</div>
                </TableCell>

                <TableCell className="cellRole">
                  <div>{item.roleID === 1 ? "Admin" : "Staff"}</div>
                </TableCell>

                <TableCell className="cellEmail">
                  <div>{item.accountEmail}</div>
                </TableCell>
                <TableCell className="cellPhone">
                  <div>{item.phone}</div>
                </TableCell>
                <TableCell className="cellCountry">
                  <div>{item.country}</div>
                </TableCell>
                <TableCell className="cellStatus">
                  {item.status === true ? (
                    <div className="active">Active</div>
                  ) : (
                    <div className="disable">Disable</div>
                  )}
                </TableCell>

                <TableCell className="action">
                  <div className="tip">
                    <ActionButton
                      color="edit"
                      onClick={() => {
                        navigate(`/employee/editemployee/${item.accountID}`);
                      }}
                    >
                      <EditIcon />
                    </ActionButton>

                    <ActionButton
                      onMouseOver={() => {
                        setRecordStatus(item.accountID);
                        setchangeStatus(!item.status);
                      }}
                      color="changeSta"
                      onClick={() => {
                        changeStatusEmployee();
                      }}
                    >
                      <LoopIcon />
                    </ActionButton>

                    {item.status === true ? (
                      <ActionButton color="disable" disabled={true}>
                        <DeleteIcon />
                      </ActionButton>
                    ) : (
                      <ActionButton
                        onMouseOver={() => {
                          setRecord(item.accountID);
                        }}
                        disabled={false}
                        color="delete"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              deleteEmployee();
                            },
                          });
                        }}
                      >
                        <DeleteIcon />
                      </ActionButton>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination className="pagination" />
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default DatatableEmployee;
