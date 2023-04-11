import React, { useState } from "react";
import DatatablePublisher from "../../components/datatable/datatablePublisher/DatatablePublisher";
import BasicSnackbar from "../../components/BasicSnackbar";

const ListPublisher = () => {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  return (
      <>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl">
          <DatatablePublisher onError={() => setOpen(true)} />
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

export default ListPublisher;
