import React, { useState } from "react";
import BasicSnackbar from "../../components/BasicSnackbar";
import TableAuthor from "../../components/datatable/datatableAuthor/TableAuthor";

const ListAuthor = () => {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl ">
        <TableAuthor onError={() => setOpen(true)} />
      </div>
      <BasicSnackbar
        open={open}
        severity="error"
        message="Data couldn't be fetched"
        onClose={handleClose}
      />
    </>
  );
};

export default ListAuthor;
