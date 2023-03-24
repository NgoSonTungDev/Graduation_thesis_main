import React, { useEffect } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import logo from "./images/logo.png";
import { Box, Tabs, Tab, Button } from "@mui/material";
import logo1 from "./images/logo1.svg";

const Footer = () => {
  const navigation = useNavigate();

  return (
    <div>
      <div className="container_footer">
        <div className="footer_Top">
          {/* <div>
                        <img src={logo1} alt="" />
                    </div> */}
          <span> Chúng tôi có đang bỏ lỡ địa điểm nào bạn biết ? </span>
          <div className="Button">
            <Button variant="contained">ĐÓNG GÓP ĐỊA ĐIỂM</Button>
          </div>
        </div>
        <div className="footer_Main">
          <div className="footer_Main_left">
            <span className="logo">
              {" "}
              MAF<span style={{ color: "red" }}>LINE</span>
            </span>
            <div className="Button">
              <Button variant="contained">
                <span class="material-icons" style={{ fontSize: "30px" }}>
                  handshake{" "}
                </span>
                Hợp tác với chúng tôi
              </Button>
            </div>
          </div>
          <div className="footer_Main_container">
            <span>VỀ CHÚNG TÔI</span>
            <ul>
              <li>
                <span>Giới thiệu</span>
              </li>
              <li>
                <span>Giải đáp thắc mắc</span>
              </li>
              <li>
                <span>Liên hệ góp ý</span>
              </li>
              <li>
                <span>Điều khoản sử dụng</span>
              </li>
            </ul>
          </div>
          <div className="footer_Main_right">
            <span>THEO DÕI CHÚNG TÔI TRÊN</span>
            <ul>
              <li>
                <i class="fa-brands fa-facebook"></i>
                <span>Facebook</span>
              </li>
              <li>
                <i class="fa-brands fa-github"></i>
                <span>Githup</span>
              </li>
              <li>
                <i class="fa-brands fa-linkedin"></i>
                <span>Linkedin</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="deSign">
          <p>
            Bản quyền © 2022 <span style={{ color: "red" }}>Love Travel</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
