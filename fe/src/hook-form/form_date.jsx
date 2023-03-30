import React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const FormDate = ({ value = new Date(), onChange, label, size = "small" }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          value={dayjs(value)}
          onChange={(newValue) => {
            onChange(new Date(newValue));
          }}
          label={label}
          slotProps={{
            textField: {
              size,
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default FormDate;
