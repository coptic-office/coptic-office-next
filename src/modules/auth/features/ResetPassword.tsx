import { useTranslations } from "next-intl";
import { useState } from "react";
import { Header } from "../components/Header";
import { AUTH_STEP_ENUM, checkUserModal } from "@/src/types";
import { LoadingSpinner } from "../components/loading";
import { PasswordInput } from "../components/passwordInput";
import { resetPassword } from "@/src/network/auth";
import { usePathname } from "next/navigation";
let interval: any = null;
export const ResetPassword = ({
  handleChangeStep,
  checkUserData,
}: {
  handleChangeStep(step: AUTH_STEP_ENUM): void;
  checkUserData: checkUserModal;
}) => {
  const [error, setError] = useState({
    password: false,
    api: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [password, setPassword] = useState("");

  const translate = useTranslations();

  const pathname = usePathname();

  const onSubmit = () => {
    if (password == "" || password.length < 6) {
      setError({ ...error, password: true });
      return;
    }
    setLoading(true);
    resetPassword(
      {
        mobileNumber: checkUserData?.mobileNumber,
        verificationCode: checkUserData?.verificationCode,
        newPassword: password,
      },
      pathname?.includes("/ar") ? "ar" : "en"
    )
      .then((response) => {
        setLoading(false);

        setSuccess(response?.data?.message?.info);
      })
      .catch((err) => {
        setLoading(false);

        setError({
          ...error,
          api: err?.response?.data?.message?.info || err?.response?.data?.error,
        });
      });
  };
  return (
    <div>
      <Header
        description={success ? undefined : "Reset_Password_Text"}
        title='Reset_Password'
        marginBottom={"mb-3"}
      />

      {success ? (
        <div className='flex flex-col gap-2 items-center'>
          <p className='text-sm text-THEME_PRIMARY_COLOR'>{success}</p>
          <div className='flex w-full justify-center'>
            <button
              onClick={() => handleChangeStep(AUTH_STEP_ENUM.MOBILE_NUMBER)}
              className={`h-[55px] w-full   bg-THEME_PRIMARY_COLOR disabled:opacity-45 rounded-lg flex justify-center items-center  text-white font-medium text-base mt-[25px] md:mt-[90px] mb-2`}>
              {translate("locale.Login")}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className='mt-10 mb-10'>
            <div className='flex justify-center w-full'>
              <PasswordInput
                label={translate("locale.Password")}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='123456@'
                value={password}
              />
            </div>
            {error && typeof error == "string" ? (
              <p className='text-THEME_ERROR_COLOR text-sm  mt-4 text-center'>
                {error}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className='flex w-full justify-center'>
            <button
              onClick={onSubmit}
              className={`h-[55px] w-full   bg-THEME_PRIMARY_COLOR disabled:opacity-45 ${
                loading ? "!opacity-45" : ""
              } rounded-lg flex justify-center items-center  text-white font-medium text-base mt-[25px] md:mt-[90px] mb-2`}>
              {loading ? (
                <LoadingSpinner />
              ) : (
                translate("locale.Reset_Password")
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
