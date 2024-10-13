import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { AUTH_STEP_ENUM, checkUserModal } from "@/src/types";
import { LoadingSpinner } from "../components/loading";
import { PasswordInput } from "../components/passwordInput";
import { Login } from "@/src/network/auth";
import { usePathname } from "next/navigation";
import { setCookie } from "cookies-next";
let interval: any = null;
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
  const [resendTime, setResendTime] = useState<number | null>();
  const [password, setPassword] = useState("");
  const translate = useTranslations();
  const pathname = usePathname();
  const [nextTrail, setNextTrail] = useState(null);
  useEffect(() => {
    if (interval && nextTrail) clearInterval(interval);
    if (nextTrail)
    {
        interval = setInterval(() => {
          let newDiff =
            (new Date(nextTrail as any) as any) - (new Date() as any);
          setResendTime(Math.floor(newDiff / 1000));
        }, 1000);
    }
  }, [nextTrail]);
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
        pathname?.includes("/ar") ? "ar" : "en"
      )
        .then((response) => {
          setLoading(false);
          setCookie("user", JSON.stringify(response?.data?.message?.user));
          setCookie("authToken", response?.data?.message?.accessToken);
          localStorage.setItem(
            "authToken",
            response?.data?.message?.accessToken
          );
          window.location.reload();

          closeModal();
        })
        .catch((err) => {
          setLoading(false);
          setError({
            ...(error as any),
            api:
              err?.response?.data?.message?.info || err?.response?.data?.error,
          });
          if (err?.response?.data?.message?.nextTrial) {
            setNextTrail(err?.response?.data?.message?.nextTrial);
          }
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
        className='flex justify-center md:justify-start w-full md:w-fit flex-row gap-1 mt-2  md:mt-0 items-center '
        dir='ltr'>
        <p className='text-sm text-black font-semibold rtl:font-medium'>
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
      <div className='mt-5 md:mt-10 mb-5 md:mb-10'>
        <div className='flex justify-center w-full'>
          <PasswordInput
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                submit();
              }
            }}
            error={error?.password}
            label={translate("locale.Password")}
            onChange={(e) => {
              setError({ ...(error as any), password: false });
              setPassword(e.target.value);
            }}
            placeholder=''
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
        {resendTime != null ? (
          <p className='text-sm  text-[#00000099]  text-center  mt-2'>
            {translate("locale.Please_Wait")}{" "}
            <span className='text-sm text-THEME_PRIMARY_COLOR font-semibold rtl:font-medium'>
              {`${
                resendTime > 60
                  ? `${Math.floor(resendTime / 60)}:${
                      resendTime % 60 < 10
                        ? `0${resendTime % 60}`
                        : resendTime % 60
                    }`
                  : `00:${resendTime < 10 ? `0${resendTime}` : resendTime}`
              }`}
            </span>
          </p>
        ) : null}
      </div>

      <button
        onClick={submit}
        className={`h-[55px] w-full   bg-THEME_PRIMARY_COLOR disabled:opacity-45 ${
          loading ? "!opacity-45" : ""
        } rounded-lg flex justify-center items-center  text-white font-medium text-base mt-5 md:mt-[65px] mb-2`}>
        {loading ? <LoadingSpinner /> : translate("locale.Login")}
      </button>
      <button
        className={`h-[55px] w-full   bg-white  border-solid border-[1px] border-THEME_PRIMARY_COLOR disabled:opacity-45 ${
          loading ? "!opacity-45" : ""
        } rounded-lg flex justify-center items-center  text-THEME_PRIMARY_COLOR font-medium text-base`}
        onClick={() => handleChangeStep(AUTH_STEP_ENUM.FORGET_PASSWORD)}>
        {translate("locale.Forgot_Password")}
      </button>
    </div>
  );
};
