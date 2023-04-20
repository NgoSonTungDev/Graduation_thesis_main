import React from "react";

import Pagination from "@mui/material/Pagination";

const PaginationCpn = ({ count, page, onChange }) => {
  const handleChange = (event, value) => {
    onChange(value);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        sx={{ position: "absolute", top: "50%", transform: "translateY(-50%)" }}
      />
    </div>
  );
};

export default PaginationCpn;
