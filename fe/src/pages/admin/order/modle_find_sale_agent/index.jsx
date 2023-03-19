import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Skeleton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import _debounce from "lodash/debounce";
import qs from "query-string";
import React, { useCallback, useEffect } from "react";
import axiosClient from "../../../../api/axiosClient";
import ErrorEmpty from "../../../../components/emty_data";
import { toastify } from "../../../../utils/common";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function GetDataSaleAgent({ openDialog, onClose }) {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [payload, setPayload] = React.useState({
    pageNumber: 1,
    limit: 5,
    userName: "",
    isAdmin: 2,
  });

  const debounceFn = useCallback(
    _debounce((value) => {
      setPayload({ ...payload, placeName: value });
    }, 500),
    []
  );

  const fetchData = (url) => {
    setLoading(true);
    axiosClient
      .get(url)
      .then((res) => {
        setData(res.data.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    let url = `/user/get-all?${qs.stringify(payload)}`;
    fetchData(url);
  }, [payload]);

  return (
    <div>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
          <p
            style={{
              textAlign: "center",
              fontWeight: "600",
              margin: 0,
              padding: 0,
              textTransform: "capitalize",
            }}
          >
            Tìm Kiếm Đại Lý
          </p>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box width={400} height={"455px"}>
            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Tên địa điểm"
                inputProps={{ "aria-label": "Tên địa điểm" }}
                onChange={(e) => {
                  debounceFn(e.target.value);
                }}
              />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                disabled
              >
                <SearchIcon />
              </IconButton>
            </Paper>
            <Box
              sx={{
                marginTop: 2,
                width: "100%",
                height: "50%",
              }}
            >
              {loading ? (
                [1, 1].map((item, index) => (
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={70}
                    sx={{ marginTop: 1 }}
                    key={index}
                  />
                ))
              ) : data.length === 0 ? (
                <ErrorEmpty />
              ) : (
                data.map((item, index) => {
                  return (
                    // <PlaceItem data={item} key={index} onClose={onClose} />
                    <p>hello</p>
                  );
                })
              )}
            </Box>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
