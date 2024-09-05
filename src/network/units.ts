import axiosInstance from "./axiosInstance";

export const getUnits = (lang: string) =>
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
