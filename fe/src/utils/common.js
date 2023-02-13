import moment from "moment";
import { toast } from "react-toastify";

export const toastify = (type, label) => {
  switch (type) {
    case "success": {
      toast.success(label, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1000,
      });
      break;
    }
    case "error": {
      toast.error(label, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1000,
      });
      break;
    }
    case "warn": {
      toast.warn(label, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1000,
      });
      break;
    }
    case "info": {
      toast.info(label, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1000,
      });
      break;
    }
    default:
      break;
  }
};

export const formatDate = (date, type) => {
  return moment(date).format(type);
};
