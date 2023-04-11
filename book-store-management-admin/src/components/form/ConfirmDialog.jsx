import React from 'react'
import './style/confirmDialog.scss'
import Button from './Button'
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";

const ConfirmDialog = ({confirmDialog,setConfirmDialog}) => {
  return (
  
        <Dialog open={confirmDialog.isOpen} className="dialog">
          <DialogTitle style={{textAlign:"center"}}>
            <IconButton disableRipple className='icon'>
                <NotListedLocationIcon style={{fontSize: '8rem', color: 'red'}} />
            </IconButton>
          </DialogTitle>
          <DialogContent style={{textAlign: 'center'}}>
            <Typography variant="h5">{confirmDialog.title}</Typography>
            <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
          </DialogContent>
          <DialogActions style={{justifyContent: "center"}}>
            <Button text="No"
             className="no"
             onClick={() => setConfirmDialog({...confirmDialog,isOpen:false})} />
    
            <Button text="Yes" className= "yes" onClick={confirmDialog.onConfirm}/>
          </DialogActions>
        </Dialog>
  )
}

export default ConfirmDialog