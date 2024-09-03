import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getUnits = (lang: string) =>
  axiosInstance.get(`home`, {
    headers: {
      "accept-language": lang ?? "ar",
    },
  });
