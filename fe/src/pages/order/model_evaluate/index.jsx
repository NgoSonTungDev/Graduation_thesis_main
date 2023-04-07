import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, TextField, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import axiosClient from "../../../api/axiosClient";
import { getUserDataLocalStorage } from "../../../utils/localstorage";
import { toastify } from "../../../utils/common";

const ModalEvaluate = ({ open, handleClose, placeId }) => {
  const [value, setValue] = React.useState(4);
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const userIdStorage = getUserDataLocalStorage();

  const handleSubmitEvaluate = () => {
    if (content === "") {
      return toastify("info", "Đánh giá địa điểm không được để trống");
    }
    setLoading(true);
    axiosClient
      .post("/evaluate/add", {
        userId: userIdStorage?._id,
        content: content,
        dateTime: Number(new Date()),
        rating: value,
        placeId: placeId,
      })
      .then((res) => {
        setLoading(false);
        toastify("success", res.data.message || "Đánh giá thành công !");
        handleClose();
        setContent("");
      })
      .catch((err) => {
        setContent("");
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

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
              value={content}
              variant="standard"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <LoadingButton
            loading={loading}
            loadingIndicator="Loading…"
            variant="text"
            onClick={handleSubmitEvaluate}
          >
            Gửi đánh giá
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalEvaluate;
