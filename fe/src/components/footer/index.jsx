import { Button } from "@mui/material";
import React from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigation = useNavigate();

  const movePage = (path) => {
    navigation(path);
  };
  return (
    <div>
      <div className="container_footer">
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
                <span
                  onClick={() => {
                    movePage("/introduce");
                  }}
                >
                  Giới thiệu
                </span>
              </li>
              <li
                onClick={() => {
                  movePage("/place");
                }}
              >
                <span>Địa điểm</span>
              </li>
              <li>
                <span
                  onClick={() => {
                    movePage("/explore");
                  }}
                >
                  Khám phá
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    movePage("/voucher");
                  }}
                >
                  Khuyến mãi
                </span>
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
            Bản quyền © 2023{" "}
            <span style={{ color: "red" }}>Mafline Travel</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
