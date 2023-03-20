import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Navbar from "../../../components/navbar";

export default function PaymentDetail() {
  return (
    <div>
      <Navbar />
      <div className="container_payment" style={{width:"90%",marginLeft:"5%",height:"100vh",overflow:"hidden"}}>
        <div style={{ display: "flex" }}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{margin:"10px 0px 8px 20px"}}>
              <b>Thông tin cá nhân</b>
            </div>
            <div>
              <TextField
                required
                label="Tên người dùng  "
                placeholder="Nhập tên người dùng "
              />
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}
