import React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const FormTime = ({
  value = new Date(),
  onChange,
  label,
  size = "small",
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
      <TimePicker
          label={label ? label:"Thời gian"}
          value={dayjs(value)}
          onChange={(newValue) => {
            onChange(new Date(newValue).getTime());
          }}
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

export default FormTime;
