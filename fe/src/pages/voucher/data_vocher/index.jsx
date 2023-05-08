import React from "react";
import { formatMoney, toastify } from "../../../utils/common";

const styles = {
  card: {
    width: "300px",
    height: "200px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: "5px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  placeName: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  discount: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  code: {
    fontSize: "20px",
    fontWeight: "bold",
  },
};

const MapData = ({ data }) => {
  const CopyText = () => {
    navigator.clipboard.writeText(`${data.codeVoucher}`);
    toastify("success", "Sao chép mã thành công !");
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: 300,
        borderRadius: "10px",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        maxWidth: "300px",
        margin: "10px 0 ",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          color: "#4CAF50",
          fontSize: "28px",
          fontWeight: "bold",
          padding: 0,
        }}
      >
        VOUCHER
      </h2>
      <span style={styles.code}>{data.codeVoucher}</span>
      <hr
        style={{
          borderTop: "3px solid #4CAF50",
          width: "50%",
        }}
      />
      <p
        style={{
          fontSize: "18px",
        }}
      >
        <div style={styles.discount}>Địa điểm: {data.placeId?.name}</div>
        <div style={styles.discount}>Sự kiện: {data.title}</div>
        <div style={styles.discount}>Giảm giá: {formatMoney(data.price)}</div>
        <div style={styles.discount}>
          Thời gian còn lại :{" "}
          {Math.max(
            0,
            Math.ceil(
              (new Date(data.endDate) - new Date()) / (1000 * 60 * 60 * 24)
            )
          )}{" "}
          ngày
        </div>
      </p>
      <button
        onClick={CopyText}
        style={{
          backgroundColor: "#4CAF50",
          border: "none",
          borderRadius: "5px",
          color: "#fff",
          cursor: "pointer",
          fontSize: "20px",
          marginTop: "20px",
          padding: "10px",
          width: "100%",
        }}
      >
        Sao chép mã
      </button>
    </div>
  );
};
export default MapData;
