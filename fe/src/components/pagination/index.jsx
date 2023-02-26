import React, { useState } from "react";

import Pagination from "@mui/material/Pagination";

const PaginationCpn = ({ count, page, onChange }) => {
  const handleChange = (event, value) => {
    onChange(value);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        placeItems: "center",
        padding: "8px 0",
      }}
    >
      <Pagination count={count} page={page} onChange={handleChange} />
    </div>
  );
};

export default PaginationCpn;
