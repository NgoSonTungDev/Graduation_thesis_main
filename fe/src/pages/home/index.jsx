import React, { useEffect } from "react";
import Navbar from "../../components/navbar";
import "./style.scss";

const Home = () => {
  return (
    <>
      <Navbar loading={false} valueTab="one" />
      <div className="home">
        <div className="home__banner">
          <h1 className="home__title">Travel Việt Nam</h1>
          <p className="home__subtitle">Khám phá Việt Nam qua góc nhìn mới</p>
          <button className="home__button">Khám phá ngay</button>
        </div>
        <div className="home__categories">
          <div className="home__category">
            <img
              src="https://picsum.photos/id/1018/300/200"
              alt="category"
              className="home__category-image"
            />
            <h2 className="home__category-title">Điểm đến nổi bật</h2>
            <button to="/places" className="home__category-link">
              Xem ngay
            </button>
          </div>
          <div className="home__category">
            <img
              src="https://picsum.photos/id/1020/300/200"
              alt="category"
              className="home__category-image"
            />
            <h2 className="home__category-title">Đặc sản miền Tây</h2>
            <button className="home__category-link">Xem ngay</button>
          </div>
          <div className="home__category">
            <img
              src="https://picsum.photos/id/1023/300/200"
              alt="category"
              className="home__category-image"
            />
            <h2 className="home__category-title">Du lịch mạo hiểm</h2>
            <button className="home__category-link">Xem ngay</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
