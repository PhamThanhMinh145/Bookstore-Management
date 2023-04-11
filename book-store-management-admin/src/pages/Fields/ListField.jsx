import React,  { useState } from 'react'
import DatatableField from '../../components/datatable/datatableField/DatatableField'
import BasicSnackbar from "../../components/BasicSnackbar";

const ListField = () => {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  return (
    <>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl">
      <DatatableField onError={() => setOpen(true)} />
    </div>
    <BasicSnackbar
      open={open}
      severity="error"
      message="Data couldn't be fetched"
      onClose={handleClose}
    />
  </>
  )
}

export default ListField