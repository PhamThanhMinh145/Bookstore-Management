import React, { useRef, useEffect } from "react";

const CheckOutsideClick = ({ onClick, children }) => {
  const ref = useRef();
  const handleClickOutsite = (event) => {
    if (!ref.current.contains(event.target)) {
      onClick();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsite);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsite);
    };
  }, []);


  return <div ref={ref}>{children}</div>;
};

export default CheckOutsideClick;
