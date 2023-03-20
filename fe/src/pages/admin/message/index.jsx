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
import BoxInformation from "./box_infomation";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";
import TabContext from "@mui/lab/TabContext";

const AdminMessage = () => {
  const [loading, setLoading] = React.useState(false);
  const [openInformation, setOpenInformation] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [dataChatBoxId, setDataChatBoxId] = React.useState({});
  const [valueTab, setValueTab] = React.useState(1);

  const dispatch = useDispatch();
  const [payload, setPayload] = React.useState({
    userName: "",
    isAdmin: 2,
  });

  const handleChangeTab = (e, newValue) => {
    setValueTab(newValue);

    setPayload({
      userName: "",
      isAdmin: newValue,
    });
  };

  const debounceFn = useCallback(
    _debounce((value) => {
      setPayload({ userName: value });
    }, 500),
    []
  );

  const handleOpenInformation = () => {
    setOpenInformation(!openInformation);
  };

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

  const callBackApiChat = () => {
    axiosClient
      .get(`/room/get-all?${qs.stringify(payload)}`)
      .then((res) => {
        setData(
          res.data.data.sort(
            (a, b) =>
              b.listInbox[b.listInbox.length - 1].time -
              a.listInbox[a.listInbox.length - 1].time
          )
        );
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const fetchData = () => {
    setLoading(true);
    axiosClient
      .get(`/room/get-all?${qs.stringify(payload)}`)
      .then((res) => {
        setData(
          res.data.data.sort(
            (a, b) =>
              b.listInbox[b.listInbox.length - 1].time -
              a.listInbox[a.listInbox.length - 1].time
          )
        );
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    fetchData();
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
              // component="form"
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
                // value={payload.userName}
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
                onClick={() => {
                  fetchData();
                  // setPayload({ ...payload, userName: "" });
                }}
              >
                <RotateLeftOutlinedIcon />
              </IconButton>
            </Paper>
            <div
              style={{
                width: "96%",
                height: "50px",
                marginTop: "5px",
              }}
            >
              <TabContext value={valueTab}>
                <TabList
                  onChange={handleChangeTab}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Khách hàng" value={1} />
                  <Tab label="Đại Ly" value={2} />
                </TabList>
              </TabContext>
            </div>
            <div className="box_room_chat_list">
              {loading ? (
                <LoadingBar loading={true} />
              ) : _.isEmpty(data) ? (
                <ErrorEmpty />
              ) : (
                data.map((item, index) => (
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
                  width: `${openInformation ? "70%" : "100%"}`,
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
              <div
                style={{
                  width: `${openInformation ? "70%" : "100%"}`,
                  height: "100vh",
                }}
              >
                <BoxChat
                  data={dataChatBoxId}
                  openDetail={handleOpenInformation}
                  callBackFunction={callBackApiChat}
                />
              </div>
            )}

            {openInformation && dataChatBoxId && (
              <div
                style={{
                  width: "30%",
                  height: "100vh",
                  borderLeft: "1px solid #dedede",
                }}
              >
                <BoxInformation data={dataChatBoxId} />
              </div>
            )}
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
