export enum AUTH_STEP_ENUM {
  MOBILE_NUMBER,
  OTP,
  VERIFY_PASSWORD,
  FORGET_PASSWORD,
  RESET_PASSWORD,
  CREATE_USER,
  FORGET_PASSWORD_OTP,
}
export interface pageParams {
  lang: any;
}

export interface checkUserModal {
  otpSent: boolean;
  isExisted: boolean;
  otpResend: string;
  mobileNumber: string;
  verificationCode: string;
}

export interface Category {
  categoryName: string;
  installments: Installments;
  images: string[];
  category: string;
  bookingAmount: string | number;
  contractingAmount: string | number;
  grossAmount: number;
  cashAmount: number;
}
export interface Installments {
  count: number;
  amount: number;
  spanInMonths: number;
}

export interface Payment {
  id: string;
  paymentMethod: string;
  amount: number;
  adviceDate: string;
  unitId: string;
  paymentMethodText: string;
}
export interface bankChecks {
  number: string;
  dueDate: string;
  amount: number;
  bankName: string;
  status: string;
  statusText: string;
  unitId: string;
}
export interface Units {
  id: string;
  bookingDate: string;
  contractingDate: string;
  category: string;
  unitNumber: string;
  totalCashAmount: number;
  totalAmount: number;
  totalChecksAmount: number;
  contractDate: string | null;
}
