import React, { useEffect } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import "./style.scss";
import BoxStatistic from "./box_statistic";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const styles = {
  button: {
    width: "30%",
    backgroundColor: "#FFC300",
    color: "#fff",
    borderRadius: "30px",
    padding: "15px 40px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1.2rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
    margin: "auto",
  },
  buttonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
};

const handleHover = (e) => {
  e.target.style.backgroundColor = "#E0A800";
  e.target.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
};

const handleLeave = (e) => {
  e.target.style.backgroundColor = "#FFC300";
  e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
};

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <>
      <Navbar loading={false} valueTab="one" />
      <BoxStatistic />

      <div className="home">
        <div className="home__banner">
          <div className="home__banner_image">
            <img
              width={"100%"}
              style={{ objectFit: "center" }}
              src="https://images.unsplash.com/photo-1551254656-e9cd460b5cd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1229&q=80"
              alt=""
            />
          </div>
          <div className="home__banner_content">
            <div
              style={{ display: "flex", gap: "15px", flexDirection: "column" }}
            >
              <span>Khám phá các địa điểm du lịch Việt Nam</span>
              <button
                style={styles.button}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                onClick={() => {
                  navigate("/place");
                }}
              >
                Bắt đầu
              </button>
            </div>
          </div>
        </div>

        <div className="container_home_body">
          <div className="container_home_body_information">
            <div
              className="container_home_body_information_text"
              data-aos="fade-right"
            >
              <h2>
                Thêm thông tin <br /> Giới thiệu về những địa điểm đẹp
              </h2>

              <span>
                Bạn có thể tìm được những vị trí đẹp và ưng ý nhất với giá tốt
                nhất kèm theo chiết khấu đặc biệt, bạn chọn vị trí chúng tôi sẽ
                hướng dẫn bạn tận tình chỉ còn chờ đợi, nhận chỗ ngay.
              </span>
            </div>
            <div
              className="container_home_body_information_image"
              data-aos="fade-left"
            >
              <img
                width={215}
                height={320}
                src="https://images.unsplash.com/photo-1545172538-171a802bd867?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
                alt=""
              />
              <img
                width={270}
                height={400}
                src="https://images.unsplash.com/photo-1603852452378-a4e8d84324a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHZpZXRuYW18ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </div>
          </div>
          <div className="container_home_body_place">
            <div
              className="container_home_body_place_text"
              data-aos="fade-down"
            >
              <h2>
                Khám phá nhiều nhất <br />
                Địa điểm hấp dẫn{" "}
              </h2>
            </div>
            <div className="container_home_body_place_place">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  flexDirection: "row",
                }}
              >
                <img
                  width={215}
                  height={325}
                  style={{ objectFit: "cover" }}
                  src="https://images.unsplash.com/photo-1606801954050-be6b29588460?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                  alt=""
                  data-aos="zoom-in"
                />
                <img
                  width={240}
                  height={360}
                  style={{ objectFit: "cover" }}
                  src="https://images.unsplash.com/photo-1531737212413-667205e1cda7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=434&q=80"
                  alt=""
                  data-aos="zoom-in"
                />
                <img
                  width={215}
                  height={325}
                  style={{ objectFit: "cover" }}
                  src="https://images.unsplash.com/photo-1588411393236-d2524cca1196?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80"
                  alt=""
                  data-aos="zoom-in"
                />
              </div>
            </div>
          </div>
          <div className="container_home_body_place">
            <div
              className="container_home_body_place_text"
              data-aos="fade-down"
            >
              <h2>
                Với kinh nghiệm của chúng tôi <br />
                Chúng Tôi Sẽ Phục Vụ Bạn
              </h2>
            </div>
            <div className="container_home_body_place_place">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  flexDirection: "row",
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                <p data-aos="zoom-in">2+ năm kinh nghiệm </p>
                <p data-aos="zoom-in">20+ Hoàn thành các chuyến tham quan </p>
                <p data-aos="zoom-in">10+ điểm du lịch </p>
              </div>
              <img
                width={"70%"}
                height={"350px"}
                style={{ objectFit: "cover" }}
                src="https://images.unsplash.com/photo-1504457047772-27faf1c00561?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1247&q=80"
                alt=""
                data-aos="zoom-in"
              />
              <span style={{ marginTop: "15px" }} data-aos="fade-down">
                --- Chúc bạn có những trải nghiệm tuyệt vời trong các chuyến đi
                ❤️ ---
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
