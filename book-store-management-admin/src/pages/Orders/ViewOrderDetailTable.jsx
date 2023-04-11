import { TableBody, TableCell, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { NumericFormat } from "react-number-format";
import { useParams } from "react-router-dom";
import useTable from "../../components/datatable/useTable";
import Notification from "../../components/Notification";
import AuthService from "../../services/auth.service";
import "../Orders/style/ViewOrderDetailTable.scss";

const headCells = [
  { id: "orderDetailID", label: "ID" },
  { id: "image", label: "Image" },
  { id: "bookName", label: "Book Name" },
  { id: "price", label: "Price" },
  { id: "quantity", label: "Quantity" },
  { id: "dateOfPublished", label: "Published Date" },
  { id: "totalPrice", label: "Total Price" },
];

const ViewOrderDetailTable = () => {
  const user = AuthService.getCurrentUser();
  const { orderID } = useParams();
  const [values, setValues] = useState([]);
  const [filterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      Authorization: "bearer " + user.token,
    },
  };

  useEffect(() => {
    const showOrderDetail = async () => {
      try {
        await axios
          .get(
            `https://localhost:7091/Order/GetByOrderId/${orderID}`,
            config
          )
          .then((response) => {
            const resData = response.data[0].orderDetails;
            setValues(resData);
          });
      } catch (e) {
        console.log(e);
      }
    };
    showOrderDetail();
  }, [orderID]);
  console.log(values);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(values, headCells, filterFn);

  return (
    <>
      <div className="datatableViewOrderDetail">
        <div className="title">List Order Details</div>

        <TblContainer>
          <TblHead sx={{ height: "40px" }} />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.orderDetailID} className="rowViewOrderDetail">
                <TableCell className="cellID">
                  <div>{item.orderDetailID}</div>
                </TableCell>
                <TableCell className="cellImg">
                  {item.image === "" ? (
                    <img
                      className="rounded-full h-24 w-24"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5CJmdN6MPlykajhKOifHiPudu3nSgspz0FGd3UPHXdXcBRak4nWbuTuJh4O2eJFhc86I&usqp=CAU"
                      alt="Book"
                    />
                  ) : (
                    <img
                      className="rounded-full h-24 w-24"
                      src={`${item.book.image}`}
                      alt="Book"
                    />
                  )}
                </TableCell>
                <TableCell className="cellBookName">
                  <div>{item.book.bookName}</div>
                </TableCell>
                <TableCell className="cellBookPrice">
                  <NumericFormat
                    className="cellBookPriceData"
                    value={item.book.price}
                    thousandSeparator=","
                    style={{
                      background: "none",
                      width: "120px",
                    }}
                  ></NumericFormat>
                </TableCell>
                <TableCell className="cellQuantity">
                  <div className="cellQuantityData">{item.quantity}</div>
                </TableCell>

                <TableCell className="cellDate">
                  <Moment className="cellDateData" format="DD/MM/YYYY">
                    {item.book.dateOfPublished}
                  </Moment>
                </TableCell>
                <TableCell className="cellTotalPrice">
                  <NumericFormat
                    className="cellTotalData"
                    value={item.totalPrice}
                    thousandSeparator=","
                    style={{
                      background: "none",
                      width: "120px",
                    }}
                  ></NumericFormat>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination className="pagination" />
        <Notification notify={notify} setNotify={setNotify} />
      </div>
      {/* SHOW OrderDetail */}
    </>
  );
};

export default ViewOrderDetailTable;
