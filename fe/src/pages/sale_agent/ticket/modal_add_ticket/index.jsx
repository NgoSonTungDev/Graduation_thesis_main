import { yupResolver } from "@hookform/resolvers/yup";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import _ from "lodash";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import axiosClient from "../../../../api/axiosClient";
import GetDataPlaceItem from "../../../../components/modle_find_place";
import { clearByIdPlace } from "../../../../redux/place/placeSlice";
import { DataPlaceById } from "../../../../redux/selectors";
import { formatMoney, toastify } from "../../../../utils/common";
import { getUserDataLocalStorage } from "../../../../utils/localstorage";

const ModalAddTicket = ({ open, handleClose, callBackApi }) => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const dataPlace = useSelector(DataPlaceById);
  const userIdStorage = getUserDataLocalStorage();

  const validationInput = yup.object().shape({
    adultTicket: yup
      .number()
      .required("Không được để trống.")
      .min(
        Number(dataPlace.startingPrice),
        "Không nằm trong khoảng giá quy định !"
      )
      .typeError("Không được để trống")
      .max(
        Number(dataPlace.LastPrice),
        "Không nằm trong khoảng giá quy định !"
      ),
    childTicket: yup
      .number()
      .required("Không được để trống.")
      .min(
        Number(dataPlace.startingPrice),
        "Không nằm trong khoảng giá quy định !"
      )
      .typeError("Không được để trống")
      .max(
        Number(dataPlace.LastPrice),
        "Không nằm trong khoảng giá quy định !"
      ),
    numberTickets: yup
      .number()
      .min(50, "Ít nhất có 50 vé")
      .max(500, "Tối đa 500 vé")
      .typeError("Không được để trống")
      .required("Không được để trống."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      adultTicket: 0,
      childTicket: 0,
      numberTickets: 0,
    },
    resolver: yupResolver(validationInput),
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddTicket = (data) => {
    axiosClient
      .post("/ticket/add-ticket", {
        placeId: dataPlace?._id,
        salesAgentId: userIdStorage?._id,
        adultTicket: data.adultTicket,
        childTicket: data.childTicket,
        numberTickets: data.numberTickets,
      })
      .then((res) => {
        callBackApi();
        setLoading(false);
        reset();
        handleClose();
        dispatch(clearByIdPlace());
        toastify(
          "success",
          res.data.message || "Tên người dùng và email hợp lệ !"
        );
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>Thêm vé</DialogTitle>
        <DialogContent>
          <div style={{ width: "500px", display: "flex" }}>
            <div
              style={{
                width: "50%",
                display: "grid",
                placeItems: "center",
              }}
            >
              {!_.isEmpty(dataPlace) ? (
                <div
                  style={{
                    width: "90%",
                    height: "90%",
                    border: "2px dashed #dedede",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <CloseOutlinedIcon
                    sx={{
                      position: "absolute",
                      cursor: "pointer",
                      color: "#fff",
                    }}
                    onClick={() => {
                      dispatch(clearByIdPlace());
                    }}
                  />
                  <img
                    src={dataPlace?.image[0]}
                    alt=""
                    style={{ width: "100%", objectFit: "cover", height: "50%" }}
                  />
                  <h5
                    style={{
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      padding: "5px 10px",
                      fontSize: "18px",
                    }}
                  >
                    {dataPlace?.name}
                  </h5>
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      flexDirection: "row",
                      padding: "5px 10px",
                    }}
                  >
                    Giá :
                    <i>
                      {formatMoney(dataPlace?.startingPrice)} -{" "}
                      {formatMoney(dataPlace?.LastPrice)}
                    </i>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      flexDirection: "row",
                      padding: "5px 10px",
                    }}
                  >
                    Địa điểm :<i>{dataPlace?.location}</i>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      flexDirection: "row",
                      padding: "5px 10px",
                    }}
                  >
                    Đánh giá :<i>{dataPlace.rating} (sao)</i>
                  </div>
                </div>
              ) : (
                <div
                  onClick={handleOpenModal}
                  style={{
                    width: "90%",
                    height: "90%",
                    border: "2px dashed #dedede",
                    borderRadius: "10px",
                    display: "grid",
                    placeItems: "center",
                    cursor: "pointer",
                  }}
                >
                  Chọn Địa điểm
                </div>
              )}
            </div>
            <div
              style={{
                width: "50%",
                marginTop: "15px",
                display: "flex",
                gap: "15px",
                flexDirection: "column",
              }}
            >
              <TextField
                type="text"
                label={!_.isEmpty(dataPlace) ? dataPlace?.name : "Địa điểm"}
                disabled={true}
                // value={dataPlace ? dataPlace?.name : ""}
                size="small"
                sx={{ width: "80%", marginLeft: "10%" }}
              />
              <TextField
                type="text"
                label={
                  !_.isEmpty(dataPlace) ? dataPlace?.location : "Tỉnh/Thành phố"
                }
                disabled={true}
                // value={dataPlace ? dataPlace?.location : ""}
                size="small"
                sx={{ width: "80%", marginLeft: "10%" }}
              />
              <TextField
                error={!!errors?.childTicket}
                {...register("childTicket")}
                type="number"
                label="Giá vé trẻ em"
                size="small"
                sx={{ width: "80%", marginLeft: "10%" }}
                helperText={errors.childTicket?.message}
              />
              <TextField
                error={!!errors?.adultTicket}
                {...register("adultTicket")}
                type="number"
                label="Giá vé người lớn"
                size="small"
                sx={{ width: "80%", marginLeft: "10%" }}
                helperText={errors.adultTicket?.message}
              />
              <TextField
                error={!!errors?.numberTickets}
                {...register("numberTickets")}
                type="numberTickets"
                label="Số lượng vé của bạn"
                size="small"
                sx={{ width: "80%", marginLeft: "10%" }}
                helperText={errors.numberTickets?.message}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <LoadingButton
            loading={loading}
            onClick={handleSubmit(handleAddTicket)}
            disabled={_.isEmpty(dataPlace)}
          >
            Thêm
          </LoadingButton>
        </DialogActions>
      </Dialog>
      {openModal && (
        <GetDataPlaceItem openDialog={openModal} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ModalAddTicket;
