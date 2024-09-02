import { useState } from "react";
import { Header } from "../components/Header";
import { useTranslation } from "@/app/i18n";
import { PasswordInput } from "../components/passwordInput";
import { TextInput } from "../components/TextInput";
import { LoadingSpinner } from "../components/loading";
import { checkUserModal } from "../../../[lang]/types";
import { createUser } from "@/app/network/auth";
export const CreateUser = ({
  checkUserData,
  closeModal,
}: {
  checkUserData: checkUserModal;
  closeModal: VoidFunction;
}) => {
  const [error, setError] = useState<null | {
    firstName: boolean;
    lastName: boolean;
    password: boolean;
    api: null | string;
  }>({
    firstName: false,
    lastName: false,
    password: false,
    api: null,
  });
  const [i18n, setI18n] = useState<any>(null);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useTranslation(localStorage.getItem("lang")).then((value: any) => {
    setI18n(value);
  });
  const submit = () => {
    if (
      data.firstName == "" ||
      data.lastName == "" ||
      data.password == "" ||
      data.password.length < 6
    ) {
      setError({
        api: null,
        firstName: data.firstName == "",
        lastName: data.lastName == "",
        password: data.password == "" || data.password.length < 6,
      });
      return;
    }
    setLoading(true);
    setError(null);
    createUser(
      {
        ...data,
        verificationCode: checkUserData?.verificationCode,
        mobileNumber: checkUserData?.mobileNumber,
      },
      i18n?.i18n?.language
    )
      .then((response) => {
        localStorage.setItem(
          "user",
          JSON.stringify(response?.data?.message?.user)
        );
        localStorage.setItem("authToken", response?.data?.message?.accessToken);
        closeModal();
      })
      .catch((err) => {
        setLoading(false);
        setError({
          ...(error as any),
          api: err?.response?.data?.message?.info || err?.response?.data?.error,
        });
      });
  };
  return (
    <div>
      <Header title='Create_New_Account' />

      <div className='flex flex-col gap-2 mt-3'>
        {error?.api && (
          <p className='text-sm text-THEME_ERROR_COLOR '>{error?.api}</p>
        )}
        <TextInput
          label={i18n?.translate("First_Name")}
          onChange={(value) => {
            setError({ ...(error as any), firstName: false });
            setData({ ...data, firstName: value });
            if (!value) setError({ ...(error as any), firstName: true });
          }}
          placeholder='Ehab'
          value={data?.firstName}
          error={error?.firstName}
        />
        <TextInput
          label={i18n?.translate("Last_Name")}
          onChange={(value) => {
            setError({ ...(error as any), lastName: false });
            setData({ ...data, lastName: value });
            if (!value) setError({ ...(error as any), lastName: true });
          }}
          placeholder='Saber'
          value={data?.lastName}
          error={error?.lastName}
        />

        <PasswordInput
          labelWidth={true}
          label={i18n?.translate("Password")}
          onChange={(e) => {
            setError({ ...(error as any), password: false });
            setData({ ...data, password: e.target.value });
            if (!e.target.value)
              setError({ ...(error as any), password: true });
          }}
          placeholder='123456@'
          value={data.password}
          error={error?.password}
        />
        <p
          className={`${
            error?.password ? "text-THEME_ERROR_COLOR " : "text-black "
          } text-xs`}>
          {i18n?.translate("Password_Hint")}
        </p>

        <button
          onClick={submit}
          className={`h-[55px] w-full   bg-THEME_PRIMARY_COLOR disabled:opacity-45 ${
            loading ? "!opacity-45" : ""
          } rounded-lg flex justify-center items-center  text-white font-medium text-base mt-[140px] md:mt-[90px] mb-2`}>
          {loading ? <LoadingSpinner /> : i18n?.translate("Create_Account")}
        </button>
      </div>
    </div>
  );
};
