import React, { useEffect, useState } from "react";
import ws from "../../../../socket";
import { momentLocale } from "../../../../utils/common";
import "./style.scss";

const CardRoom = ({ data, callBackFunction }) => {
  const [check, setCheck] = useState(false);

  const joinRoom = (id) => {
    ws.joinRoom(id);
  };

  useEffect(() => {
    setCheck(!data?.listInbox[data.listInbox.length - 1]?.isAdmin);
  }, []);

  return (
    <div
      className=" container_card_room"
      style={{ backgroundColor: `${check && "#74b9ff"}` }}
      onClick={() => {
        callBackFunction(data._id);
        joinRoom(data._id);
      }}
    >
      <div style={{ width: "56px", height: "56px", marginLeft: "5px" }}>
        <img
          src={data?.user.avt}
          alt=""
          width={"56px"}
          height={"56px"}
          style={{ borderRadius: "50%" , objectFit:"cover"}}
        />
      </div>
      <div className="information_user">
        <p
          style={{
            textTransform: "capitalize",
            margin: 0,
            padding: 0,
            fontWeight: 500,
          }}
        >
          {data?.user.userName}
        </p>
        <div>
          {data?.listInbox[data.listInbox.length - 1].isAdmin ? (
            <div
              style={{
                width: "100%",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                }}
              >
                Bạn: {data?.listInbox[data.listInbox.length - 1].message}
              </span>
              <span style={{ marginLeft: "5px", fontSize: "12px" }}>
                {momentLocale(data?.listInbox[data.listInbox.length - 1].time)}
              </span>
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                }}
              >
                {data?.listInbox[data.listInbox.length - 1].message}
              </span>
              <span style={{ marginLeft: "5px", fontSize: "12px" }}>
                {momentLocale(data?.listInbox[data.listInbox.length - 1].time)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardRoom;
