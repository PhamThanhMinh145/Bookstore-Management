import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import AuthService from "../services/auth.service";

const Logout = ({
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
}) => {
  const { setIsClicked, initialState } = useStateContext();
  const currentUser = AuthService.getCurrentUser();
  const urlPost = "https://localhost:7091/Auth/logout";
  function logout() {
    fetch(urlPost, {
      method: "POST",
      headers: {
        accept: "*/*",
        Authorization: "bearer " + currentUser.token,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.data;
    });
    localStorage?.removeItem("user");

    // .catch(() => onError());
  };
    function set(){
      setIsClicked(initialState)
    }
  return (
    <button
      type="button"
      onClick={() => {
        logout();
         set()
      }}
      // onClick = {onClick}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {text}
    </button>
  );
};

export default Logout;
