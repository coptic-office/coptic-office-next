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
export const resendOtpApiEmail = (email: string, lang: string) =>
  axiosInstance.post(
    `users/resend-otp
`,
    {
      email: email,
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
export const resetPassword = (data: any, lang: string) =>
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

export const deletePhoto = (lang: string) =>
  axiosInstance.post(
    `users/delete-photo`,
    {},
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );

export const getUserInfo = (lang: string) =>
  axiosInstance.post(
    `users/get-profile-info`,
    {},
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );

export const updateNationalId = (data: any, lang: string) =>
  axiosInstance.post(
    `users/update-national-id
`,
    data,
    {
      headers: {
        "accept-language": lang ?? "ar",
        "Content-Type": "multipart/form-data",
      },
    }
  );

export const updateMobile = (number: string, lang: string) =>
  axiosInstance.post(
    `users/update-mobile
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
export const updateEmail = (email: string, lang: string) =>
  axiosInstance.post(
    `users/update-email
`,
    {
      email: email,
    },
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );
