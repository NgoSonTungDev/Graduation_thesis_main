import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function TextInputControl({
  name,
  control,
  label,
  disabled,
  type,
  size,
}) {
  const [isShowPassword, setIsShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange },
        fieldState: { error, invalid },
      }) => (
        <FormControl fullWidth sx={{ display: "block", padding: "10px" }}>
          <TextField
            disabled={disabled || false}
            label={label}
            type={
              type !== "password" ? type : !isShowPassword ? "password" : "text"
            }
            error={invalid}
            size={size || "small"}
            helperText={error ? error.message : null}
            onChange={(e) => {
              const value = e.target.value;

              onChange(value);
              // if (handleChange) {
              //   handleChange(name, value);
              // }
            }}
            InputProps={{
              endAdornment: type === "password" && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {isShowPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={value ? value : ""}
          />
        </FormControl>
      )}
    />
  );
}
export default TextInputControl;
