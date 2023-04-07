import React from "react";
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

const VoucherItem = () => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: 200,
        borderRadius: "10px",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        maxWidth: "300px",
        margin: "10px",
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
      <span style={styles.code}>ádasd</span>
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
        <div style={styles.discount}>Địa điểm: ádasd</div>
        <div style={styles.discount}>Sự kiện: ádasd</div>
        <div style={styles.discount}>Giảm giá: ádasd</div>
      </p>
      <p style={{ fontSize: "13px" }}>12/1/2023 - 15/1/2023</p>
    </div>
  );
};

export default VoucherItem;
