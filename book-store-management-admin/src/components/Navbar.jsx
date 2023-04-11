import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiNotification3Line } from "react-icons/ri";
import { Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import ListOrders from "../pages/Orders/ListOrders";
import AuthService from "../services/auth.service";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-4  hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2 "
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const currentUser = AuthService.getCurrentUser();

  const {
    setActiveMenu,
    isClicked,
    handleClick,
    screenSize,
    setScreenSize,
    currentColor,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <NavButton
          customFunc={<ListOrders />}
          color={currentColor}
          icon={<FiShoppingCart />}
        />

        <NavButton
          dotColor="#03c9d7"
          customFunc={() => handleClick("chat")}
          color={currentColor}
          icon={<BsChatLeft />}
        />

        <NavButton
          dotColor="#03c9d7"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={<RiNotification3Line />}
        />

        <div
          className="flex items-center
        gap-2 cursor-pointer p-3 
        hover: bg-dark-gray rounded-lg"
          onClick={() => handleClick("userProfile")}
        >
          {currentUser.image === null ? (
            <img
              className="rounded-full w-8 h-8"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="user-profile"
            />
          ) : (
            <img
              className="rounded-full w-8 h-8"
              src={currentUser.image}
              alt="user-profile"
            />
          )}
          <p>
            <span className="text-gray-400 text-14">Hi, </span>{" "}
            <span className="text-gray-400 font-bold ml-1 text-14">
              {currentUser.owner !== null ? currentUser.owner : "Admin"}
            </span>
          </p>
          <MdKeyboardArrowDown className="text-gray-400 text-14" />
        </div>

        {/* {isClicked.cart && <ListOrders /> */}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
