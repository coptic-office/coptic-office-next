import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { checkUserModal } from "@/src/types";
import { resetPassword } from "@/src/network/auth";
import { usePathname } from "next/navigation";
import { setCookie } from "cookies-next";
import { PasswordInput } from "../../auth/components/passwordInput";
import { LoadingSpinner } from "../../auth/components/loading";

export const ChangePassword = ({
  refreshData,
  closeModal,
}: {
  refreshData: (callback: VoidFunction) => void;
  closeModal: VoidFunction;
}) => {
  const [error, setError] = useState<null | {
    password: false;
    api: null;
  }>(null);
  const [loading, setLoading] = useState(false);
  const locale = useLocale();
  const [password, setPassword] = useState({
    old: "",
    new: "",
  });
  const translate = useTranslations();
  const pathname = usePathname();

  const submit = () => {
    if (
      (password.old || password.old) == "" ||
      (password.old.length || password.new.length) < 6
    ) {
      setError({ ...(error as any), password: true });
      return;
    } else {
      setLoading(true);
      resetPassword(
        {
          oldPassword: password.old,
          newPassword: password.new,
        },
        locale
      )
        .then((response) => {
          setLoading(false);

          refreshData(() => {});
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
      <div className='mt-5 flex flex-col gap-3  mb-5  py-6 px-3 md:px-[60px]'>
        <div className='flex justify-center w-full'>
          <PasswordInput
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                submit();
              }
            }}
            error={error?.password}
            label={translate("locale.Old_Password")}
            onChange={(e) => {
              setError({ api: null, password: false });
              setPassword({ ...password, old: e.target.value });
            }}
            placeholder=''
            value={password.old}
          />
        </div>
        <div className='flex justify-center w-full'>
          <PasswordInput
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                submit();
              }
            }}
            error={error?.password}
            label={translate("locale.New_Password")}
            onChange={(e) => {
              setError({ api: null, password: false });
              setPassword({ ...password, new: e.target.value });
            }}
            placeholder=''
            value={password.new}
          />
        </div>
      </div>
      <p className='text-THEME_ERROR_COLOR text-center text-sm my-2'>
        {" "}
        {error?.api ? error.api : null}
      </p>

      <div className='flex flex-col md:flex-row px-3 md:px-6 gap-3 md:gap-0 justify-around w-full my-6'>
        <button
          disabled={error?.api || error?.password}
          onClick={submit}
          className={`h-[55px] w-full md:w-[181px]   bg-THEME_PRIMARY_COLOR disabled:opacity-45 ${
            loading ? "!opacity-45" : ""
          } rounded-lg flex justify-center items-center  text-white font-medium text-base `}>
          {loading ? <LoadingSpinner /> : translate("locale.Confirm")}
        </button>
        <button
          onClick={closeModal}
          className={`h-[55px] w-full md:w-[181px]   bg-THEME_PRIMARY_COLOR disabled:opacity-45 ${
            loading ? "!opacity-45" : ""
          } rounded-lg flex justify-center items-center  text-white font-medium text-base `}>
          {translate("locale.Cancel")}
        </button>
      </div>
    </div>
  );
};
