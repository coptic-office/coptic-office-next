import { useTranslation } from "@/app/i18n";
import { useState } from "react";
import { Header } from "../components/Header";
import { AUTH_STEP_ENUM, checkUserModal } from "../../../[lang]/types";
import { LoadingSpinner } from "../components/loading";
import { PasswordInput } from "../components/passwordInput";
import { Login } from "@/app/network/auth";
export const CheckPassword = ({
  handleChangeStep,
  checkUserData,
  closeModal,
}: {
  handleChangeStep(step: AUTH_STEP_ENUM): void;
  checkUserData: checkUserModal;
  closeModal: VoidFunction;
}) => {
  const [error, setError] = useState<null | {
    password: false;
    api: null;
  }>(null);
  const [loading, setLoading] = useState(false);
  const [i18n, setI18n] = useState<any>(null);
  const [password, setPassword] = useState("");

  useTranslation(localStorage.getItem("lang")).then((value: any) => {
    setI18n(value);
  });

  const submit = () => {
    if (password == "" || password.length < 6) {
      setError({ ...(error as any), password: true });
      return;
    } else {
      setLoading(true);
      Login(
        {
          mobileNumber: checkUserData.mobileNumber,
          password: password,
        },
        i18n?.i18n?.language
      )
        .then((response) => {
          setLoading(false);
          localStorage.setItem(
            "user",
            JSON.stringify(response?.data?.message?.user)
          );
          localStorage.setItem(
            "authToken",
            response?.data?.message?.accessToken
          );
          closeModal();
        })
        .catch((err) => {
          setLoading(false);
          setError({
            ...(error as any),
            api:
              err?.response?.data?.message?.info || err?.response?.data?.error,
          });
        });
    }
  };
  return (
    <div>
      <Header
        description='Check_Password_Text'
        title='Check_Password'
        marginBottom={"mb-3"}
      />
      <div
        className='flex justify-center md:justify-start w-fit flex-row gap-1  items-center '
        dir='ltr'>
        <p className='text-sm text-black font-bold'>
          {checkUserData?.mobileNumber}
        </p>
        <img
          src='/assets/Edit.svg'
          className='cursor-pointer'
          onClick={() => {
            handleChangeStep(AUTH_STEP_ENUM.MOBILE_NUMBER);
          }}
          width={"24px"}
          height={"24px"}
        />
      </div>
      <div className='mt-10 mb-10'>
        <div className='flex justify-center w-full'>
          <PasswordInput
            error={error?.password}
            label={i18n?.translate("Password")}
            onChange={(e) => {
              setError({ ...(error as any), password: false });
              setPassword(e.target.value);
            }}
            placeholder='123456@'
            value={password}
          />
        </div>
        {error?.api ? (
          <p className='text-THEME_ERROR_COLOR text-sm  mt-4 text-center'>
            {error?.api}
          </p>
        ) : (
          ""
        )}
      </div>

      <button
        onClick={submit}
        className={`h-[55px] w-full   bg-THEME_PRIMARY_COLOR disabled:opacity-45 ${
          loading ? "!opacity-45" : ""
        } rounded-lg flex justify-center items-center  text-white font-medium text-base mt-[140px] md:mt-[90px] mb-2`}>
        {loading ? <LoadingSpinner /> : i18n?.translate("Login")}
      </button>
      <button
        className={`h-[55px] w-full   bg-white  border-solid border-[1px] border-THEME_PRIMARY_COLOR disabled:opacity-45 ${
          loading ? "!opacity-45" : ""
        } rounded-lg flex justify-center items-center  text-THEME_PRIMARY_COLOR font-medium text-base`}
        onClick={() => handleChangeStep(AUTH_STEP_ENUM.FORGET_PASSWORD)}>
        {i18n?.translate("Forgot_Password")}
      </button>
    </div>
  );
};
