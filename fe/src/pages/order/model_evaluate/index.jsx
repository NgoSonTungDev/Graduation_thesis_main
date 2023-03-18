import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, TextField, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";

const ModalEvaluate = ({ open, handleClose }) => {
  const [value, setValue] = React.useState(4);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography sx={{ fontWeight: 600, fontSize: "22px" }}>
            Đánh giá địa điểm
          </Typography>
        </DialogTitle>
        <DialogContent style={{ width: 550 }}>
          <DialogContentText id="alert-dialog-description">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                flexDirection: "row",
              }}
            >
              <Typography>Số điểm :</Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Đánh giá của bạn"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <LoadingButton
            loading={false}
            loadingIndicator="Loading…"
            variant="text"
          >
            Gửi đánh giá
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalEvaluate;
