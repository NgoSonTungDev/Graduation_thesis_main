import React from "react";
import "./style.scss";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigation = useNavigate();
  return (
    <div
      className="
    Notfound-container"
    >
      <img
        src="https://img.lovepik.com/photo/45007/5333.jpg_wh300.jpg"
        alt="not-found"
      />
      <Button
        type="button"
        onClick={() => {
          navigation("/");
        }}
      >
        Trờ về Trang Chủ
      </Button>
    </div>
  );
};

export default NotFound;
