import React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const FormDate = ({
  value = new Date(),
  onChange,
  label,
  size = "small",
  minDate = "",
  maxDate = "",
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          minDate={dayjs(minDate)}
          maxDate={dayjs(maxDate)}
          value={dayjs(value)}
          onChange={(newValue) => {
            onChange(new Date(newValue));
          }}
          label={label}
          fullWidth
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
