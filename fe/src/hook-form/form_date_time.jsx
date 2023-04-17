import React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const FormDateTime = ({
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
        <DateTimePicker
          minDate={dayjs(minDate)}
          maxDate={dayjs(maxDate)}
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

export default FormDateTime;
