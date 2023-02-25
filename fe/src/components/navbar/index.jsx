import {
  ExploreOutlined,
  Home,
  LocalOfferOutlined,
  Logout,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import GetDataPlaceItem from "../modle_find_place";
import logo1 from "./images/acount.jpeg";
import "./index.scss";
import NotificationItem from "./notification";
const Navbar = ({ loading }) => {
  const [value, setValue] = useState("one");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNotify, setAnchorElNotify] = React.useState(null);

  const open = Boolean(anchorEl);
  const openNotify = Boolean(anchorElNotify);

  const navigation = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleClickShowNotify = (event) => {
    setAnchorElNotify(event.currentTarget);
  };

  const handleCloseNotify = () => {
    setAnchorElNotify(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <div className="Navbar_Container">
        <BarLoader
          color={"#d63031"}
          loading={loading || false}
          width={"100%"}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <div className="navbar_container_box">
          <div className="Navbar_Logo">
            <nav>
              <label className="logo">
                MAF<span style={{ color: "red" }}>LINE</span>
              </label>
            </nav>
          </div>

          <div className="Navbar_Menu">
            <Box
              sx={{
                width: "100%",
                "& .MuiTabs-indicator": {
                  backgroundColor: "red",
                  color: "red",
                },
                "& .Mui-selected": { color: "red" },
              }}
            >
              <Tabs
                className="Tabs_Navbar"
                value={value}
                onChange={handleChange}
                textColor="red"
                indicatorColor="red"
                aria-label="red tabs example"
                TabProps={{ style: { color: "red" } }}
              >
                <Tab
                  className="Tab_Navbar"
                  value="one"
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Home />
                      <Typography sx={{ ml: 1 }}>Trang Chủ</Typography>
                    </Box>
                  }
                />
                <Tab
                  className="Tab_Navbar"
                  value="two"
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationOnIcon />
                      <Typography sx={{ ml: 1 }}>Địa Điểm</Typography>
                    </Box>
                  }
                />
                <Tab
                  className="Tab_Navbar"
                  value="three"
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ExploreOutlined />
                      <Typography sx={{ ml: 1 }}>Khám Phá</Typography>
                    </Box>
                  }
                />
                <Tab
                  className="Tab_Navbar"
                  value="four"
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocalOfferOutlined />
                      <Typography sx={{ ml: 1 }}>Khuyến Mãi</Typography>
                    </Box>
                  }
                />
              </Tabs>
            </Box>
          </div>

          <div className="Navbar_Icon">
            <div className="Button">
              <Button
                variant="contained"
                onClick={() => {
                  navigation("/review");
                }}
              >
                <span
                  class="material-icons"
                  style={{ fontSize: "18px", paddingRight: "8px" }}
                >
                  edit
                </span>
                Viết Review
              </Button>
            </div>
            <div className="Icon">
              {isAuthenticated ? (
                <>
                  <IconButton>
                    <FavoriteBorderIcon />
                  </IconButton>
                  <IconButton onClick={handleOpenModal}>
                    <SmsOutlinedIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleClickShowNotify}
                    aria-controls={openNotify ? "notify" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openNotify ? "true" : undefined}
                  >
                    <NotificationsOutlinedIcon />
                  </IconButton>
                  <React.Fragment>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title="Account settings">
                        <Avatar
                          alt="Remy Sharp"
                          src={logo1}
                          onClick={handleClick}
                          sx={{
                            cursor: "pointer",
                            width: 40,
                            height: 40,
                            marginLeft: "10px",
                            border: "2px solid #0984e3",
                          }}
                        />
                      </Tooltip>
                    </Box>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          ml: -0.3,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <AccountCircleIcon fontSize="medium" />
                        </ListItemIcon>
                        Trang cá nhân
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <ManageHistoryIcon fontSize="medium" />
                        </ListItemIcon>
                        Quản lý đơn hàng
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <ManageAccountsIcon fontSize="medium" />
                        </ListItemIcon>
                        Quàn lý hệ thống
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <Logout fontSize="medium" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                </>
              ) : (
                <Button
                  id="loginButton"
                  variant="contained"
                  onClick={handleLogin}
                >
                  Đăng Nhập
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Menu
        anchorEl={anchorElNotify}
        id="notify"
        open={openNotify}
        onClose={handleCloseNotify}
        onClick={handleCloseNotify}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div
          className="container_notify"
          style={{ width: "350px", maxHeight: "500px" }}
        >
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
        </div>
      </Menu>
      {openModal && (
        <GetDataPlaceItem openDialog={openModal} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Navbar;
