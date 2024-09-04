import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getPayments = (lang: string) =>
  axiosInstance.post(
    `users/get-my-units
`,
    {},
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );
