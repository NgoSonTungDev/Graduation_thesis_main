import React, { useEffect } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import "./style.scss";

const Introduce = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="introduce-container">
        <div className="introdude-main">
          <div className="introduce-title">
            MAF<span style={{ color: "red" }}>LINE</span>
          </div>
          <div className="introduce-content">
            <div className="introduce-text">
              <span style={{ fontWeight: "600" }}>MAF</span>
              <span style={{ color: "red", fontWeight: "600" }}>LINE</span> là
              một mạng xã hội thu nhỏ được sinh ra nhằm mục đích review và bán
              vé các địa điểm du lịch trong nước.
            </div>
            <div className="introduce-text">
              Với nổ lực không ngừng nghỉ,{" "}
              <span style={{ fontWeight: "600" }}>MAF</span>
              <span style={{ color: "red", fontWeight: "600" }}>LINE</span> hứa
              hẹn sẽ đem đến cho khách hàng trải nghiệm tốt nhất về giá cả cũng
              như chất lượng của các tour du lịch.
            </div>
            <div className="introduce-text">
              Cùng đón chờ những tin tức mới nhất của{" "}
              <span style={{ fontWeight: "600" }}>MAF</span>
              <span style={{ color: "red", fontWeight: "600" }}>LINE</span>{" "}
              nhé!.
              <div className="introduce-text"></div>
              Cảm ơn cả nhà!!!
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Introduce;
