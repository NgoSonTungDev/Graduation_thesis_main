import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const ModalConfirm = ({
  open,
  handleClose,
  content,
  functionDelete,
  loading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ textAlign: "c" }}>
        {"Xác nhận thông tin"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Box sx={{ minWidth: "300px" }}>
            {content ? content : "Bạn có chắt chắn ?"}
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <LoadingButton
          loading={loading ? loading : false}
          onClick={functionDelete}
          autoFocus
        >
          Xác nhận
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirm;
