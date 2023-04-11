import AddIcon from "@mui/icons-material/Add";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    InputAdornment
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, getBooks } from "../../../redux/apiCalls";
import ActionButton from "../../form/ActionButton";
import Button from "../../form/Button";
import useTable from "../useTable";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import parse from "html-react-parser";
import Moment from "react-moment";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import ConfirmDialog from "../../form/ConfirmDialog";
import Popup from "../../form/Popup";
import Notification from "../../Notification";
import { Search } from "@mui/icons-material";
import Input from '../../form/Input'
import "./style/books.scss";

const headCells = [
  { id: "bookID", label: "ID" },
  { id: "image", label: "Image", disableSorting: true },
  { id: "bookName", label: "Book name" },
  { id: "dateOfPublished", label: "Date" },

  { id: "price", label: "Price" },
  { id: "quantity", label: "Quantity" },
  { id: "action", label: "Action", disableSorting: true },
];

const Books = ({ onError }) => {
  const books = useSelector((state) => state.book.products);

  const [openPopup, setOpenPopup] = useState(false);
  const [detailData, setDetailData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(books, headCells, filterFn);

  // const user = AuthService.getCurrentUser();

  const dispatch = useDispatch();
  useEffect(() => {
    getBooks(dispatch);
  }, [dispatch]);

  //   console.log("Book: ", books);

  const showDetail = (bookID) => {
    fetch(`https://localhost:7091/Book/GetById/${bookID}`)
      .then((response) => response.json())
      .then((json) => {
        // console.log("result", json);
        setDetailData(json);
      })
      .catch(() => onError());
  };
  const openInPopup = (id) => {
    showDetail(id);
    setOpenPopup(true);
  };
  const handleDelete = (id) => {
    deleteBook(id, dispatch);
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

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.bookName.toLowerCase().includes(target.value)
          );
      },
    });
  };


  console.log("detail", detailData);
  return (
    <>
      <div className="datatableBooks">
        <div className="title">
          List Books
          <div>
            <Link to={"/books/newbook"}>
              <Button
                text="Add New"
                variant="outlined"
                startIcon={<AddIcon />}
                size="small"
                color="addNewBook"
              />
            </Link>
            <Link to={"/books/import"}>
              <Button
                text="Import"
                variant="outlined"
                startIcon={<ImportExportOutlinedIcon />}
                size="small"
                color="addNewBook"
              />
            </Link>
          </div>
        </div>

        <div className="searchBook">
        <Input
            className="searchInput"
            label="Search Book"
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
              <TableRow key={item.bookID} className="rowBook">
                <TableCell className="cellID">{item.bookID}</TableCell>
                <TableCell className="cellImg">
                  {item.image === "" ? (
                    <div className="image">
                      <img
                        className="rounded-full h-24 w-24"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5CJmdN6MPlykajhKOifHiPudu3nSgspz0FGd3UPHXdXcBRak4nWbuTuJh4O2eJFhc86I&usqp=CAU"
                        alt="Book"
                      />
                    </div>
                  ) : (
                    <div className="image">
                      <img
                        className="rounded-full h-24 w-24"
                        src={`${item.image}`}
                        alt="Book"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell className="cellName">{item.bookName}</TableCell>

                <TableCell className="cellDate">
                  <Moment format="DD/MM/YYYY">{item.dateOfPublished}</Moment>
                </TableCell>

                <TableCell className="cellPrice">
                  <NumericFormat
                    disabled
                    value={item.price}
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
                    value={item.quantity}
                    thousandSeparator=","
                    style={{
                      background: "none",
                      width: "100px",

                      wordWrap: "break-word",
                    }}
                  />
                </TableCell>
                <TableCell className="action">
                  <div className="tip">
                    <TooltipComponent content="Detail" position="BottomCenter">
                      <ActionButton
                        color="detail"
                        onClick={() => openInPopup(item.bookID)}
                      >
                        <LibraryBooksIcon fontSize="small" />
                      </ActionButton>
                    </TooltipComponent>
                    <TooltipComponent content="Edit" position="BottomCenter">
                      <Link to={"/books/" + item.bookID}>
                        <ActionButton
                          color="edit"
                          onClick={() => {
                            setNotify({
                              isOpen: true,
                              message: "Edit Successfully",
                              type: "success",
                            });
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </ActionButton>
                      </Link>
                    </TooltipComponent>

                    <TooltipComponent content="Delete" position="BottomCenter">
                      {item.orderDetails.length === 0 ? (
                        <ActionButton
                          color="delete"
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "Are you sure to delete this record?",
                              subTitle: "You can't undo this operation",
                              onConfirm: () => {
                                handleDelete(item.bookID);
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

              //  show detail
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination className="pagination" />
      </div>

      {/* SHOW DETAIL */}
      {detailData.map((item) => (
        <Popup
          title={`Detail ID: ${item.bookID}  `}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <Table size="medium" aria-label="purchases">
            <TableHead>
              <TableRow className="rowHead">
                <TableCell className="cell">Author name</TableCell>
                <TableCell className="cell">Publisher Name</TableCell>
                <TableCell className="cell">Field Name</TableCell>
                <TableCell className="cell">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={item.bookID}>
                <TableCell>{item.author.authorName}</TableCell>
                <TableCell>{item.publisher.publisherName}</TableCell>
                <TableCell>{item.field.fieldName}</TableCell>

                <TableCell>{parse(item.description)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Popup>
      ))}
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Books;
