import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import React, { useState } from "react";
import { BiPackage } from "react-icons/bi";
import { BsTicketPerforated } from "react-icons/bs";
import { FiHome, FiLogOut } from "react-icons/fi";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import "./style.scss";

import "react-pro-sidebar/dist/css/styles.css";

const MenuSaleAgent = ({ ReactNode }) => {
  const [menuCollapse, setMenuCollapse] = useState(true);
  const [pathName, setPathName] = useState("/admin/home");
  const navigation = useNavigate();

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const movePage = (path) => {
    navigation(path);
    setMenuCollapse(true);
    setPathName(path);
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
                      <img
                        src="https://i.pinimg.com/736x/4a/4c/29/4a4c29807499a1a8085e9bde536a570a.jpg"
                        alt=""
                      />
                    </div>
                    <div className="information_item_name">
                      <p>Ngo Son Tung</p>
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
                    active={pathName === "/admin/home" && true}
                    icon={<FiHome />}
                  >
                    Manage information
                  </MenuItem>
                  <MenuItem
                    active={pathName === "/admin/message" && true}
                    icon={<BsTicketPerforated />}
                  >
                    Ticket management
                  </MenuItem>
                  <MenuItem
                    active={pathName === "admin" && true}
                    icon={<BiPackage />}
                    onClick={() => {
                      movePage("/sale-agent/order-management");
                    }}
                  >
                    Order management
                  </MenuItem>
                </Menu>
              </div>
            </SidebarContent>
            <SidebarFooter>
              <Menu iconShape="square">
                <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        </div>
        <div className="body_scroll">{ReactNode}</div>
      </div>
    </>
  );
};

export default MenuSaleAgent;
