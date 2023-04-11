import CheckIcon from "@mui/icons-material/Check";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import ShoppingCartCheckoutTwoToneIcon from "@mui/icons-material/ShoppingCartCheckoutTwoTone";
import ViewInArTwoToneIcon from "@mui/icons-material/ViewInArTwoTone";
import React, { useEffect, useState } from "react";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import { publicRequest, userRequest } from "../requestMethod";
import AuthService from "../services/auth.service";
const Home = () => {
  const currentUser = AuthService.getCurrentUser();
  const [income, setIncome] = useState();
  const [customer, setCustomer] = useState();
  const [books, setBooks] = useState();
  const [orders, setOrders] = useState();
  const [quantity, setQuantity] = useState();
  const [amount, setAmount] = useState();

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await publicRequest.get("Book/NumberOfMoney");
        setIncome(res.data);
      } catch {}
    };

    const getCustomer = async () => {
      try {
        const res = await userRequest.get("Book/NumberOfAcc");
        setCustomer(res.data);
      } catch {}
    };

    const getNumberBooks = async () => {
      try {
        const res = await userRequest.get("Book/NumberOfBookName");
        setBooks(res.data);
      } catch {}
    };

    const getQuantity = async () => {
      try {
        const res = await userRequest.get("Book/TotalOfBook");
        setQuantity(res.data);
      } catch {}
    };

    const getAmount = async () => {
      try {
        const res = await userRequest.get("Book/NumberOfSold");
        setAmount(res.data);
      } catch {}
    };

    const getOrders = async () => {
      try {
        const res = await userRequest.get("Book/NumberOfOrder");
        setOrders(res.data);
      } catch {}
    };

    getQuantity();
    getIncome();
    getCustomer();
    getAmount();
    getNumberBooks();
    getOrders();
  }, []);

  // const {currentColor} = useStateContext();
  return (
    <div className="mt-12">
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        {currentUser.role === "Admin" && (
          <div
            className="bg-green-300 
        dark:text-gray-200
        dark:bg-secondary-dark-bg h-45
        rounded-xl  p-6 pt-9 m-3 
         bg-no-repeat bg-cover
        bg-center"
            style={{ width: "300px", height: "215px" }}
          >
            <div className="flex justify-between items-center">
              <div style={{ width: "100px" }}>
                <p className="font-bold text-gray-400 mb-2 text-xl">Revanue</p>
                <p className="text-2xl">
                  <NumericFormat
                    disabled
                    value={income}
                    thousandSeparator=","
                    suffix={" VND"}
                    style={{
                      background: "none",
                      width: "180px",
                      height: "75px",
                      wordWrap: "break-word",
                    }}
                  />
                </p>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="/#"
                className="font-normal italic hover:not-italic underline underline-offset-1  "
              >
                View net earning
              </a>
            </div>
          </div>
        )}

        <div className="flex m-3 flex-wrap  gap-1 items-center">
          {currentUser.role === "Admin" && (
            <div
              className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg
     md:w-56 p-4 pt-9 rounded-2xl"
            >
              <button
                type="button"
                style={{ color: "#03C9D7", backgroundColor: "#E5FAFB" }}
                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              >
                <MdOutlineSupervisorAccount />
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">
                  <NumericFormat
                    disabled
                    value={customer}
                    thousandSeparator=","
                    style={{
                      background: "none",
                      width: "190px",
                    }}
                  />
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">Customers</p>
              <div className="mt-4">
                <Link
                  to="/customer"
                  className="font-normal italic hover:not-italic underline underline-offset-1"
                >
                  See all customer
                </Link>
              </div>
            </div>
          )}
          {/* Books  */}
          <div
            className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg
                md:w-56 p-4 pt-9 rounded-2xl"
          >
            <button
              type="button"
              style={{
                color: "rgb(228, 106, 118)",
                backgroundColor: "rgb(255, 244, 229)",
              }}
              className="text-2xl opacity-0.9 rounded-full p-3 hover:drop-shadow-xl"
            >
              <CollectionsBookmarkIcon
                style={{ height: "23,993px", margin: "0", padding: "0" }}
              />
            </button>
            <p className="mt-3">
              <span className="text-lg font-semibold">
                <NumericFormat
                  disabled
                  value={books}
                  thousandSeparator=","
                  style={{
                    background: "none",
                    width: "190px",
                  }}
                />
              </span>
            </p>
            <p className="text-sm text-gray-400 mt-1">Books</p>
            <div className="mt-4">
              <Link
                to="/books"
                className="font-normal italic hover:not-italic
                 underline underline-offset-1"
              >
                See all books
              </Link>
            </div>
          </div>

          {/* QUANTITY BOOKS */}
          <div
            className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg
                md:w-56 p-4 pt-9 rounded-2xl"
          >
            <button
              type="button"
              style={{
                color: "rgb(255, 244, 229)",
                backgroundColor: "rgb(254, 201, 15)",
              }}
              className="text-2xl opacity-0.9 rounded-full p-3 hover:drop-shadow-xl"
            >
              <ViewInArTwoToneIcon fontSize="medium" />
            </button>
            <p className="mt-3">
              <span className="text-lg font-semibold">
                <NumericFormat
                  disabled
                  value={quantity}
                  thousandSeparator=","
                  style={{
                    background: "none",
                    width: "190px",
                  }}
                />
              </span>
            </p>
            <p className="text-sm text-gray-400 mt-1">Quantity Books</p>
            <div className="mt-4 pb-7"></div>
          </div>

          {/* Order  */}

          <div
            className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg
                md:w-56 p-4 pt-9 rounded-2xl"
          >
            <button
              type="button"
              style={{
                color: "rgb(0, 194, 146)",
                backgroundColor: "rgb(235, 250, 242)",
              }}
              className="text-2xl opacity-0.9 rounded-full p-3 hover:drop-shadow-xl"
            >
              <ShoppingCartCheckoutTwoToneIcon fontSize="medium" />
            </button>
            <p className="mt-3">
              <span className="text-lg font-semibold">
                <NumericFormat
                  disabled
                  value={orders}
                  thousandSeparator=","
                  style={{
                    background: "none",
                    width: "190px",
                  }}
                />
              </span>
            </p>
            <p className="text-sm text-gray-400 mt-1">Orders</p>
            <div className="mt-4">
              <Link
                to="/orders"
                className="font-normal italic hover:not-italic
                 underline underline-offset-1"
              >
                See all orders
              </Link>
            </div>
          </div>

          {/* amount sold */}
          <div
            className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg
                md:w-56 p-4 pt-9 rounded-2xl"
          >
            <button
              type="button"
              style={{
                color: "#FCAAD1",
                backgroundColor: "#ffecf2",
              }}
              className="text-2xl opacity-0.9 rounded-full p-3 hover:drop-shadow-xl"
            >
              <CheckIcon fontSize="medium" />
            </button>
            <p className="mt-3">
              <span className="text-lg font-semibold">
                <NumericFormat
                  disabled
                  value={amount}
                  thousandSeparator=","
                  style={{
                    background: "none",
                    width: "190px",
                  }}
                />
              </span>
            </p>
            <p className="text-sm text-gray-400 mt-1">Amount sold</p>
            <div className="mt-4 pb-7"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
