import { TableBody, TableCell, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { NumericFormat } from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import useTable from "../../components/datatable/useTable";
import Notification from "../../components/Notification";
import AuthService from "../../services/auth.service";
import "../Orders/style/ViewOrderTable.scss";

const headCells = [
  { id: "orderID", label: "ID" },
  { id: "dateOfOrder", label: "Order Date" },
  { id: "totalAmount", label: "Total Price" },
  { id: "orderStatus", label: "Status" },
];

const ViewOrderTable = () => {
  const user = AuthService.getCurrentUser();
  const { accountID } = useParams();
  const [values, setValues] = useState([]);
  const navigate = useNavigate();
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
    const getOrders = async () => {
      try {
        await axios
          .get(
            `https://localhost:7091/Order/GetByCustomerId/${accountID}`,
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
    getOrders();
  }, [accountID]);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(values, headCells, filterFn);

  return (
    <>
      <div className="datatableViewOrderCus">
        <div className="title">List Order</div>

        <TblContainer>
          <TblHead sx={{ height: "40px" }} />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow
                key={item.orderID}
                className="rowViewOrderCus"
                hover
                onClick={() => {
                  navigate(`/orders/${accountID}/${item.orderID}`);
                }}
              >
                <TableCell className="cellID">
                  <div>{item.orderID}</div>
                </TableCell>
                <TableCell className="cellDate">
                  <Moment className="cellDateData" format="DD/MM/YYYY">
                    {item.dateOfOrder}
                  </Moment>
                </TableCell>
                <TableCell className="cellTotal">
                  <NumericFormat
                    className="cellTotalData"
                    value={item.totalAmount}
                    thousandSeparator=","
                    style={{
                      background: "none",
                      width: "120px",
                    }}
                  ></NumericFormat>
                </TableCell>
                <TableCell className="cellStatus">
                  {item.orderStatus === true ? (
                    <div className="active">Active</div>
                  ) : (
                    <div className="disable">Disable</div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination className="pagination" />
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </>
  );
};

export default ViewOrderTable;
