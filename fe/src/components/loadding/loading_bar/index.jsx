import React, { CSSProperties } from "react";
import BarLoader from "react-spinners/BarLoader";

const LoadingBar = ({ loading }) => {
  return (
    <div
      style={{
        width: "100%",
        padding: "15px 0",
        display: `${loading ? "grid" : "none"}`,
        placeItems: "center",
        overflow: "hidden",
      }}
    >
      <BarLoader
        color={"#ff0000"}
        loading={loading}
        width={500}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingBar;
