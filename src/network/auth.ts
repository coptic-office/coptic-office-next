import axiosInstance from "./axiosInstance";

export const checkUser = (number: string, lang: string) =>
  axiosInstance.post(
    `users/check-user
`,
    {
      mobile: {
        countryCode: "EG",
        number: number,
      },
    },
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );

export const verifyOtp = (
  data: {
    mobileNumber: string;
    otp: string;
  },
  lang: string
) =>
  axiosInstance.post(
    `users/verify-otp
`,
    {
      ...data,
    },
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );
export const resendOtpApi = (mobileNumber: string, lang: string) =>
  axiosInstance.post(
    `users/resend-otp
`,
    {
      mobileNumber: mobileNumber,
    },
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );

export const createUser = (
  data: {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    password: string;
    verificationCode: string;
  },
  lang: string
) =>
  axiosInstance.post(
    `users/create-user`,
    {
      ...data,
      role: "User",
    },
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );

export const Login = (
  data: {
    mobileNumber: string;
    password: string;
  },
  lang: string
) =>
  axiosInstance.post(
    `users/login`,
    {
      ...data,
    },
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );
export const forgotPassword = (number: string, lang: string) =>
  axiosInstance.post(
    `users/forgot-password
`,
    {
      mobile: {
        countryCode: "EG",
        number: number,
      },
    },
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );
export const resetPassword = (
  data: {
    mobileNumber: string;
    verificationCode: string;
    newPassword: string;
  },
  lang: string
) =>
  axiosInstance.post(
    `users/change-password
`,
    { ...data },
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );

export const updatePhoto = (data: any, lang: string) =>
  axiosInstance.post(
    `users/update-photo
`,
    data,
    {
      headers: {
        "accept-language": lang ?? "ar",
        "Content-Type": "multipart/form-data",
      },
    }
  );
