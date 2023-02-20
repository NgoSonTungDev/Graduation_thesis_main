// import 'react-tabs/style/react-tabs.css';
import "./index.scss"
import logo from "./images/logo.png"
import acount from "./images/acount.jpeg"
import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, Button, MenuItem } from '@mui/material';
import { color, style } from "@mui/system";
import { ExploreOutlined, LocalOfferOutlined, Home } from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Notification from "./notification";
const Navbar = () => {

    const [value, setValue] = useState('one');

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [showNotification, setShowNotification] = useState(false);

    const [showSetting, setShowSetting] = useState(false);

    const [showNotificationSetting, setShowNotificationSetting] = useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setShowSetting(false)
        setShowNotification(false)

    };

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleNotification = () => {
        if (showNotification) {
            setShowNotification(false)


        } else {
            setShowNotification(true)
            setShowSetting(false)

        }
    }

    const handleSetting = () => {
        if (!showSetting) {
            setShowSetting(true)
            setShowNotification(false)

        } else {
            setShowSetting(false)
        }
    }


    return (
        <div>
            <div className='Navbar_Container'>

                <div className="Navbar_Logo">
                    <nav>
                        <label className="logo"> MAF<span style={{ color: "red" }}>LINE</span></label>
                    </nav>
                    {/* <img src={logo} alt="LOVE TRAVEL" /> */}
                </div>
                <div className="Navbar_Menu">
                    <Box sx={{
                        width: '100%', '& .MuiTabs-indicator': { backgroundColor: 'red', color: "red" },
                        '& .Mui-selected': { color: 'red' }
                    }}>
                        <Tabs className="Tabs_Navbar"
                            value={value}
                            onChange={handleChange}
                            textColor="red"
                            indicatorColor="red"
                            aria-label="red tabs example"
                            TabProps={{ style: { color: 'red' } }}
                        >
                            <Tab className="Tab_Navbar" value="one" label="Trang chủ" icon={<Home />} />
                            <Tab className="Tab_Navbar" value="two" label="Địa điểm" icon={<LocationOnIcon />} />
                            <Tab className="Tab_Navbar" value="three" label="Khám phá" icon={<ExploreOutlined />} />
                            <Tab className="Tab_Navbar" value="four" label="Khuyến mãi" icon={<LocalOfferOutlined />} />
                        </Tabs>
                    </Box>
                </div>
                <div className="Navbar_Icon">
                    <div className="Button">
                        <Button variant="contained">
                            <span class="material-icons" style={{ fontSize: "18px" }}>edit </span>
                            Viết Review
                        </Button>
                    </div>
                    <div className="Icon" >
                        {isAuthenticated ? (
                            <>
                                <span id="notificationButton" class="material-icons">favorite </span>
                                <span id="notificationButton" class="material-icons">sms </span>
                                <div className="Notification">
                                    <div className="div">
                                        <span id="profileButton" class="material-icons" onClick={handleNotification}>notifications </span>
                                    </div>
                                    {showNotification && (
                                        <div className="Contents">
                                            <span>Thông báo</span>
                                            <Notification type="success" message="Action succeeded!" />
                                        </div>
                                    )}
                                </div>
                                <div id="notificationButton" class="dropdown">
                                    <div className="anh">
                                        <img className="Acount" src={acount} alt="Acount" onClick={handleSetting} />
                                    </div>
                                    {showSetting && (
                                        <div class="noidung_dropdown">
                                            <span>Xem hồ sơ</span>
                                            <span>Cài đặt tài khoản</span>
                                            <span>Đăng xuất</span>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <Button id="loginButton" variant="contained" onClick={handleLogin}>
                                Đăng Nhập
                            </Button>
                        )}
                    </div>

                </div>


            </div>
        </div>
    );
};

export default Navbar;





