import { toastify } from "../utils/common";
import axiosClient from "./axiosClient";

export const userApi = {
  async getUser() {
    try {
      const res = await axiosClient.get("/user ");
      return res;
    } catch (error) {
      toastify("error", error.message || "Lỗi he thong");
    }
  },
};
