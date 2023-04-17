import React, { useEffect } from "react";
import Navbar from "../../components/navbar";
import "./style.scss";

const Introduce = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="introduce-container">
        <div className="introduce-left"></div>
        <div className="introduce-content">
          <div className="introduce-title">
            <h2>Giới thiệu</h2>
          </div>

          <div className="introduce-logo">
            <div className="introduce-logo-color">
              <b>
                <span className="text-application1">MAF</span>
                <span className="text-application2">LINE</span>
              </b>
            </div>
          </div>

          <div className="introduce-text">
            <p>
              <b>
                &emsp;<span className="text-application">MAF</span>
                <span className="text-application2">LINE</span> là một mạng xã
                hội thu nhỏ được sinh ra nhằm mục đích review và bán vé các địa
                điểm du lịch trong nước.
              </b>
            </p>
            <i>
              <p>
                &emsp;&emsp;Với nổ lực không ngừng{" "}
                <b>
                  <span className="text-application1">MAF</span>
                  <span className="text-application2">LINE</span>
                </b>{" "}
                đã mang đến người dùng trải nghiệm du lịch dễ dàng hơn bao giờ
                hết.
                <b>VIỆT</b> Bước ngoặc lớn nhất vào tháng 05-2021{" "}
                <b>
                  <span className="text-application1">MAF</span>
                  <span className="text-application2">LINE</span>
                </b>{" "}
                hi vọng sẽ là dịch vụ du lịch đưa đến người dùng các tour du
                dịch tốt với mức gía phù hợp nhất/
              </p>

              <p>
                &emsp;&emsp;Và hứa hẹn trong tương lai chúng ta sẽ cùng bùng nổ
                hơn nữa chứ không phải chỉ riêng khoảnh khắc này.
              </p>

              <p>
                &emsp;&emsp;Hãy cùng nhau đón chờ những thông tin mới nhất từ{" "}
                <b>
                  <span className="text-application1">MAF</span>
                  <span className="text-application2">LINE</span>
                </b>{" "}
                nhé. <b>Cảm ơn các bạn rất nhiều!</b>
              </p>
            </i>
          </div>
        </div>
        <div className="introduce-right"></div>
      </div>
    </div>
  );
};

export default Introduce;
