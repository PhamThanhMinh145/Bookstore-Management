import DeleteIcon from "@mui/icons-material/Delete";
import LoopIcon from "@mui/icons-material/Loop";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { TableBody, TableCell, TableRow, InputAdornment } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import ActionButton from "../../form/ActionButton";
import ConfirmDialog from "../../form/ConfirmDialog";
import Notification from "../../Notification";
import "../datatableCustomer/style/datatableCus.scss";
import useTable from "../useTable";
import { Search } from "@mui/icons-material";
import Input from '../../form/Input'


const headCells = [
  { id: "accountID", label: "ID" },
  { id: "image", label: "Avatar", disableSorting: true },
  { id: "accountEmail", label: "Email" },
  { id: "status", label: "Status" },
  { id: "action", label: "Action", disableSorting: true },
];

const DatatableCus = () => {
  const user = AuthService.getCurrentUser();
  const [records, setRecords] = useState([]);
  const [recordForDelete, setRecordForDelete] = useState(null);
  const [recordStatus, setRecordStatus] = useState();
  const [changeStatus, setchangeStatus] = useState(true);
  const [filterFn, setFilterFn] = useState({
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

  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      Authorization: "bearer " + user.token,
    },
  };

  useEffect(() => {
    const onGridReady = async () => {
      try {
        await axios
          .get("https://localhost:7091/Account/GetByRole/2", config)
          .then((response) => {
            const resData = response.data;
            setRecords([...records, ...resData]);
          });
      } catch (e) {
        console.log(e);
      }
    };
    onGridReady();
  }, []);

  console.log(records);

  const changeStatusCustomer = async () => {
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

  const deleteCustomer = async () => {
    try {
      await axios
        .delete(
          `https://localhost:7091/Account/Delete/${recordForDelete}`,
          config
        )
        .then((respone) => {
          console.log("Customer Delete", respone.data);
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
      <div className="datatableCustomer">
        <div className="title">List Customer</div>
        <div className="searchCus">
        <Input
            className="searchInput"
            label="Search Customer"
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
          <TblHead sx={{ height: "40px" }} />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.accountID} className="rowCustomer">
                <TableCell className="cellID">
                  <div>{item.accountID}</div>
                </TableCell>
                <TableCell className="cellImg">
                  <img
                    src={
                      item?.image !== null
                        ? item?.image
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                  />
                </TableCell>
                <TableCell className="cellEmail">
                  <div>{item.accountEmail}</div>
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
                      color="view"
                      onClick={() => {
                        navigate(`/customer/${item.accountID}`);
                      }}
                    >
                      <PermContactCalendarIcon />
                    </ActionButton>

                    <ActionButton
                      onMouseOver={() => {
                        setRecordStatus(item.accountID);
                        setchangeStatus(!item.status);
                      }}
                      color="changeSta"
                      onClick={() => {
                        changeStatusCustomer();
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
                          setRecordForDelete(item.accountID);
                        }}
                        color="delete"
                        disabled={false}
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              deleteCustomer();
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
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </>
  );
};

export default DatatableCus;
