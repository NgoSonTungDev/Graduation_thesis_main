import "./index.scss";
import React, { useState, useEffect } from "react";
import {
  ExploreOutlined,
  LocalOfferOutlined,
  Home,
  Logout,
  Settings,
} from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Notification from "./notification";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo1 from "./images/acount.jpeg";
import BarLoader from "react-spinners/BarLoader";
const Navbar = ({ loading }) => {
  const [value, setValue] = useState("one");

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [showNotification, setShowNotification] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigation = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setShowNotification(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleNotification = () => {
    if (showNotification) {
      setShowNotification(false);
    } else {
      setShowNotification(true);
    }
  };

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setShowNotification(false);
    setAnchorEl(event.currentTarget);
    // setValue(URL.createObjectURL(file))
  };

  const handleClose1 = () => {
    setShowNotification(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
                  <span
                    id="notificationButton"
                    class="material-icons"
                    onClick={handleClose1}
                  >
                    favorite{" "}
                  </span>
                  <span
                    id="notificationButton"
                    class="material-icons"
                    onClick={handleClose1}
                  >
                    sms{" "}
                  </span>
                  <div className="Notification">
                    {/* <div className="div"> */}
                    <span
                      id="profileButton"
                      class="material-icons"
                      onClick={handleNotification}
                    >
                      notifications{" "}
                    </span>
                    {showNotification && (
                      <div className="Contents">
                        <span>Thông báo</span>
                        <Notification
                          type="success"
                          message="Action succeeded!"
                        />
                      </div>
                    )}
                  </div>
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
                        <Avatar /> Profile
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
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
    </div>
  );
};

export default Navbar;
