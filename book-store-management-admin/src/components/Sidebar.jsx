import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BiBookBookmark, BiCategory } from "react-icons/bi";
import {
  BsBookHalf, BsFillCartCheckFill, BsPersonLinesFill
} from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineCancel, MdOutlinePeopleAlt } from "react-icons/md";
import { SiAffinitypublisher } from "react-icons/si";
import { Link, NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

import AuthService from "../services/auth.service";
const Sidebar = () => {
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) setActiveMenu(false);
  };

  const user = AuthService.getCurrentUser();

  return (
    <div
      className="ml-3 h-screen md:overflow-hidden
    overflow-auto md:hover:overflow-auto pb-10"
    >
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="home"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 
          mt-4 flex text-3xl font-extrabold tracking-tight dark:text-green-600
          text-green-400"
            >
              <BiBookBookmark /> <span>Bookly.</span>
            </Link>
            <TooltipComponent content="Menu" position="BottonCenter">
              <button
                type="button"
                onClick={() =>
                  setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                }
                className="text-xl rounded-full p-3 hover:bg-light-gray 
            mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>

          <div className="mt-8">
            <div>
              <p className="text-gray-400 m-3 mt-4 uppercase">DASHBOARD</p>

              <NavLink
                to="/home"
                key="home"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <AiFillHome />
                <span className="capitalize">Home</span>
              </NavLink>
            </div>

            {/* ACCOUNT */}
            {user.role === "Admin" && (
              <div>
                <p className="text-gray-400 m-3 mt-4 uppercase">ACCOUNTS</p>

                <NavLink
                  to="/employee"
                  key="employee"
                  onClick={handleCloseSideBar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : "",
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <IoIosPeople />
                  <span className="capitalize">Employee</span>
                </NavLink>

                <NavLink
                  to="/customer"
                  key="customer"
                  onClick={handleCloseSideBar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : "",
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <MdOutlinePeopleAlt />
                  <span className="capitalize">Customer</span>
                </NavLink>
              </div>
            )}

            {/* PRODUCTS  */}

            <div>
              <p className="text-gray-400 m-3 mt-4 uppercase">PRODUCTS</p>

              <NavLink
                to="/books"
                key="book"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <BsBookHalf />
                <span className="capitalize">Book</span>
              </NavLink>

              <NavLink
                to="/publishers"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <SiAffinitypublisher />
                <span className="capitalize">Publisher</span>
              </NavLink>

              <NavLink
                to="/authors"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <BsPersonLinesFill />
                <span className="capitalize">Author</span>
              </NavLink>

              <NavLink
                to="/fields"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <BiCategory />
                <span className="capitalize">Field</span>
              </NavLink>
            </div>

            <div>
              <p className="text-gray-400 m-3 mt-4 uppercase">SALES</p>

              <NavLink
                to="/orders"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <BsFillCartCheckFill />
                <span className="capitalize">Orders</span>
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
