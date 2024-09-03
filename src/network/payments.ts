import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getPayments = (number: string, lang: string) =>
  axiosInstance.post(
    `users/get-my-payments
`,
    {},
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );
