import React, { useState } from "react";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "react-pro-sidebar";
import "./style.scss";
import { AiOutlineMessage, AiOutlineBarChart } from "react-icons/ai";
import {
  MdEditLocationAlt,
  MdEditNote,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { BiCog, BiCreditCardFront } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import { GoPackage } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";

import "react-pro-sidebar/dist/css/styles.css";

const Header = ({ ReactNode }) => {
  const [menuCollapse, setMenuCollapse] = useState(true);
  const location = useLocation();
  const pathName = location.pathname;
  const navigation = useNavigate();

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const movePage = (path) => {
    navigation(path);
    setMenuCollapse(true);
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
                <p>{menuCollapse ? "AD" : "ADMIN"}</p>
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
                    onClick={() => {
                      movePage("/admin/home");
                    }}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    active={pathName === "/admin/message" && true}
                    icon={<AiOutlineMessage />}
                    onClick={() => {
                      movePage("/admin/message");
                    }}
                  >
                    Message
                  </MenuItem>
                  <MenuItem
                    active={pathName === "admin" && true}
                    icon={<FaRegHeart />}
                  >
                    General Management
                  </MenuItem>
                  <MenuItem
                    active={pathName === "admin" && true}
                    icon={<MdEditLocationAlt />}
                  >
                    Location management
                  </MenuItem>
                  <MenuItem
                    active={pathName === "admin" && true}
                    icon={<MdEditNote />}
                  >
                    Post management
                  </MenuItem>
                  <MenuItem
                    active={pathName === "admin" && true}
                    icon={<MdOutlineManageAccounts />}
                  >
                    Account management
                  </MenuItem>
                  <MenuItem
                    active={pathName === "/admin/order" && true}
                    icon={<GoPackage />}
                    onClick={() => {
                      movePage("/admin/order");
                    }}
                  >
                    Order management
                  </MenuItem>
                  <MenuItem
                    active={pathName === "/admin/voucher" && true}
                    icon={<BiCreditCardFront />}
                    onClick={() => {
                      movePage("/admin/voucher");
                    }}
                  >
                    Voucher manager
                  </MenuItem>
                  <MenuItem
                    active={pathName === "/admin/statistic" && true}
                    icon={<AiOutlineBarChart />}
                    onClick={() => {
                      movePage("/admin/statistic");
                    }}
                  >
                    statistic
                  </MenuItem>
                </Menu>
              </div>
            </SidebarContent>
            <SidebarFooter>
              <Menu
                iconShape="square"
                onClick={() => {
                  navigation("/home");
                }}
              >
                <MenuItem icon={<FiLogOut />}>Exit</MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        </div>
        <div className="body_scroll">{ReactNode}</div>
      </div>
    </>
  );
};

export default Header;
