import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import React, { useState } from "react";
import {
  AiFillHome,
  AiOutlineBarChart,
  AiOutlineLock,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiPackage } from "react-icons/bi";
import { BsMessenger } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineTicket } from "react-icons/hi";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import {
  changeListInbox,
  closeChatBox,
  openChatBox,
} from "../../redux/chat_box/chatBoxSlice";
import { setUser } from "../../redux/user/userSlice";
import ws from "../../socket";
import { toastify } from "../../utils/common";
import {
  getUserDataLocalStorage,
  removeUserDataLocalStorage,
} from "../../utils/localstorage";
import ChangePassword from "../change_password";
import InformationAgent from "../information_agent";
import "./style.scss";

const MenuSaleAgent = ({ ReactNode }) => {
  const [menuCollapse, setMenuCollapse] = useState(true);
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userIdStorage = getUserDataLocalStorage();

  const [openModalChangePassword, setOpenModalChangePassword] =
    React.useState(false);
  const [openModalInformation, setOpenModalInformation] = React.useState(false);

  const pathName = location.pathname;

  const joinRoom = () => {
    ws.joinRoom(userIdStorage?.roomId);
  };

  const handleGetDataInbox = (event, newValue) => {
    axiosClient
      .get(`/room/get-room-user/${userIdStorage?.roomId}`)
      .then((res) => {
        dispatch(changeListInbox(res.data.data.listInbox));
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const movePage = (path) => {
    navigation(path);
    setMenuCollapse(true);
  };

  const handleCloseChangePassword = () => {
    setOpenModalChangePassword(false);
  };

  const handleOpenChangePassword = () => {
    setOpenModalChangePassword(true);
  };
  const handleCloseInformation = () => {
    setOpenModalInformation(false);
  };

  const handleOpenInformation = () => {
    setOpenModalInformation(true);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <div id="header" style={{ color: "#fff", height: "100vh" }}>
          <ProSidebar collapsed={menuCollapse}>
            <SidebarHeader
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "1px",
              }}
            >
              <div className="logotext">
                <p>{menuCollapse ? "DL" : "Sale Agent"}</p>
              </div>
              <div
                className="closemenu"
                onClick={menuIconClick}
                style={{ marginTop: "8px", cursor: "pointer" }}
              >
                {!menuCollapse ? <MenuOutlinedIcon /> : <ListOutlinedIcon />}
              </div>
            </SidebarHeader>
            <SidebarContent>
              {!menuCollapse && (
                <div className="information_admin">
                  <div className="information_item">
                    <div className="information_item_avt">
                      <img src={userIdStorage.avt} alt="" />
                    </div>
                    <div className="information_item_name">
                      <p>{userIdStorage.userName}</p>
                    </div>
                  </div>
                </div>
              )}
              <div
                className="menu_item"
                style={{ height: `${!menuCollapse ? "400px" : "auto"}` }}
              >
                <Menu iconShape="square">
                  <MenuItem
                    active={pathName === "/sale-agent/home" && true}
                    icon={<AiFillHome />}
                    onClick={() => {
                      movePage("/sale-agent/home");
                    }}
                  >
                    Home
                  </MenuItem>
                  <MenuItem
                    active={
                      pathName === "/sale-agent/ticket-management" && true
                    }
                    icon={<HiOutlineTicket />}
                    onClick={() => {
                      movePage("/sale-agent/ticket-management");
                    }}
                  >
                    Ticket management
                  </MenuItem>
                  <MenuItem
                    active={pathName === "/sale-agent/order-management" && true}
                    icon={<BiPackage />}
                    onClick={() => {
                      movePage("/sale-agent/order-management");
                    }}
                  >
                    Order management
                  </MenuItem>
                  <MenuItem
                    active={false}
                    icon={<BsMessenger />}
                    onClick={() => {
                      dispatch(openChatBox());
                      joinRoom();
                      handleGetDataInbox();
                      setMenuCollapse(true);
                    }}
                  >
                    Message
                  </MenuItem>
                  <MenuItem
                    active={pathName === "/sales-agent/statistic" && true}
                    icon={<AiOutlineBarChart />}
                    onClick={() => {
                      movePage("/sales-agent/statistic");
                    }}
                  >
                    statistic
                  </MenuItem>
                  <MenuItem
                    active={false}
                    icon={<AiOutlineSetting />}
                    onClick={handleOpenInformation}
                  >
                    Account management
                  </MenuItem>
                  <MenuItem
                    active={false}
                    icon={<AiOutlineLock />}
                    onClick={handleOpenChangePassword}
                  >
                    Change password
                  </MenuItem>
                </Menu>
              </div>
            </SidebarContent>
            <SidebarFooter>
              <Menu
                iconShape="square"
                onClick={() => {
                  removeUserDataLocalStorage();
                  dispatch(setUser(null));
                  dispatch(closeChatBox());
                  navigation("/home");
                }}
              >
                <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>

          <ChangePassword
            open={openModalChangePassword}
            handleClose={handleCloseChangePassword}
          />

          <InformationAgent
            open={openModalInformation}
            handleClose={handleCloseInformation}
          />
        </div>
        <div className="body_scroll">{ReactNode}</div>
      </div>
    </>
  );
};

export default MenuSaleAgent;
