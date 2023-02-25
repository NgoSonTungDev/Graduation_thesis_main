import React, { CSSProperties } from "react";
import BarLoader from "react-spinners/BarLoader";

const Loading = ({ loading }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        display: `${loading ? "grid" : "none"}`,
        placeItems: "center",
        background: "#000000a3",
      }}
    >
      <BarLoader
        color={"#36d7b7"}
        loading={loading}
        width={500}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
