import { IconButton, InputBase, Paper } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import SidebarAdmin from "../../../components/narbar_admin";
import _debounce from "lodash/debounce";
import SearchIcon from "@mui/icons-material/Search";
import qs from "query-string";
import "./style.scss";
import CardRoom from "./card_room";
import axiosClient from "../../../api/axiosClient";
import { toastify } from "../../../utils/common";
import LoadingBar from "../../../components/loadding/loading_bar";
import _ from "lodash";
import ErrorEmpty from "../../../components/emty_data";
import BoxChat from "./box_chat";
import { useDispatch } from "react-redux";
import { changeListInbox } from "../../../redux/chat_box/chatBoxSlice";

const AdminMessage = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [dataChatBoxId, setDataChatBoxId] = React.useState({});
  const dispatch = useDispatch();
  const [payload, setPayload] = React.useState({
    userName: "",
  });

  const debounceFn = useCallback(
    _debounce((value) => {
      setPayload({ userName: value });
    }, 500),
    []
  );

  const callApiChatBoxById = (id) => {
    axiosClient
      .get(`/room/get-room-user/${id}`)
      .then((res) => {
        setDataChatBoxId(res.data.data);
        dispatch(changeListInbox(res.data.data.listInbox));
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const fetchData = (url) => {
    setLoading(true);
    axiosClient
      .get(url)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    let url = `/room/get-all?${qs.stringify(payload)}`;
    fetchData(url);
  }, [payload]);

  const renderForm = () => {
    return (
      <>
        <div className="container_boxInbox">
          <div className="box_room_chat">
            <p
              style={{
                fontSize: "20px",
                fontWeight: "500",
                textTransform: "capitalize",
              }}
            >
              messenger
            </p>
            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                width: "96%",
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              }}
            >
              <InputBase
                size="small"
                sx={{ ml: 1, flex: 1, fontSize: "14px", mt: 0.5 }}
                placeholder="Tìm kiếm trên messenger"
                inputProps={{ "aria-label": "tìm kiếm trên messenger" }}
                onChange={(e) => {
                  debounceFn(e.target.value);
                }}
              />
              <IconButton
                type="button"
                sx={{ p: "5px" }}
                aria-label="search"
                disabled
              >
                <SearchIcon />
              </IconButton>
            </Paper>
            <div className="box_room_chat_list">
              {loading ? (
                <LoadingBar loading={true} />
              ) : _.isEmpty(data) ? (
                <ErrorEmpty />
              ) : (
                data
                  .sort((a, b) => a.price - b.price)
                  .map((item, index) => (
                    <CardRoom
                      data={item}
                      callBackFunction={callApiChatBoxById}
                      key={index}
                    />
                  ))
              )}
            </div>
          </div>
          <div className="box_chat">
            {_.isEmpty(dataChatBoxId) ? (
              <div
                style={{
                  width: "70%",
                  height: "100vh",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <span>
                  Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới
                </span>
              </div>
            ) : (
              <div style={{ width: "70%", height: "100vh" }}>
                <BoxChat data={dataChatBoxId} />
              </div>
            )}

            <div
              style={{
                width: "30%",
                height: "100vh",
                borderLeft: "1px solid #dedede",
              }}
            >
              ddd
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <SidebarAdmin ReactNode={renderForm()} />
    </div>
  );
};

export default AdminMessage;
