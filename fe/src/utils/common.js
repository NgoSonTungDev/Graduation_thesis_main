import moment from "moment";
import { toast } from "react-toastify";
import "moment/locale/vi";

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

export const momentLocale = (date) => {
  moment.updateLocale("vi", {});
  return moment(date).fromNow();
};

export const formatMoney = (money) => {
  return Number(money).toLocaleString("vi", { style: "currency", currency: "VND" });
};

// export const take_decimal_number = (number, n) => {
//   //number : số cần xử lý
//   //n: số chữ số sau dấu phẩy cần lấy
//   let base = 10 ** n;
//   let result = Math.round(number * base) / base;
//   return result;
// };
