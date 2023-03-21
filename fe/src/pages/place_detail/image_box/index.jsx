import React from "react";

const ImageBox = ({ images }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        gap: "10px",
        flexDirection: "row",
      }}
    >
      <img
        src={
          images
            ? images[0]
            : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
        }
        style={{ objectFit: "cover" }}
        width={380}
        height={355}
        alt=""
      />
      <img
        src={
          images
            ? images[1]
            : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
        }
        style={{ objectFit: "cover" }}
        width={380}
        height={355}
        alt=""
      />
      <div>
        <div style={{ display: "flex", gap: "10px", flexDirection: "row" }}>
          <img
            src={
              images
                ? images[2]
                : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
            }
            style={{ objectFit: "cover" }}
            width={185}
            height={155}
            alt=""
          />
          <img
            src={
              images
                ? images[3]
                : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
            }
            style={{ objectFit: "cover" }}
            width={185}
            height={155}
            alt=""
          />
        </div>
        <img
          src={
            images
              ? images[4]
              : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
          }
          width={380}
          height={190}
          style={{ marginTop: "10px", objectFit: "cover" }}
          alt=""
        />
      </div>
    </div>
  );
};

export default ImageBox;
