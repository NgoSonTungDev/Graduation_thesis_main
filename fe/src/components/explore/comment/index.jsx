import React from "react";
import { momentLocale } from "../../../utils/common";

const Comment = ({ dataComent }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ width: "40px", height: "40px", marginLeft: "40px",paddingTop:"10px" }}>
          <img
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            src={dataComent?.userId?.avt}
            alt=""
          />
        </div>
        <div
          style={{
            width: "80%",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            marginLeft: "30px",
            marginTop: "10px",
            borderRadius: "10px",
          }}
        >
          <div style={{ display: "flex",padding:"5px"}}>
            <div>{dataComent?.userId?.userName}</div>
            <div style={{marginLeft:"20px"}}>{momentLocale(dataComent?.dateTime)}</div>
          </div>
          <div style={{padding:"5px"}}>
            <span>{dataComent?.content}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
