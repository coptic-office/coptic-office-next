import { getNotifications } from "@/src/network/notifications";
import { Notification } from "@/src/types";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function NotificationModal({
  closeNotification,
}: {
  closeNotification: () => void;
}) {
  const translate = useTranslations();
  const locale=useLocale()
const [data, setData] = useState<Notification[]>([]);
  useEffect(() => {
    getNotifications(locale).then((response) => {
      setData(response.data.message.notifications);
    })
  },[])
  return (
    <>
      <div className='absolute top-0 end-0 flex  flex-row  justify-end  min-w-full min-h-screen bg-[#0000006e] z-[150]  '>
        <div className='w-full md:w-[443px]  bg-white min-h-screen'>
          <div className='flex flex-row justify-between items-center  p-6 '>
            <p className='text-[#1E293B] font-semibold text-xl'>
              {translate("locale.Notifications")}
            </p>
            <img
              src='/assets/closeHead.png'
              className='!w-5 !h-5 cursor-pointer'
              onClick={closeNotification}
            />
          </div>
          {data.length ? (
            <div className='mt-6'>
              {data.map((item) => (
                <div
                  className={`p-6 border-b-[1px] border-gray-300   ${
                    !item.isRead ? "bg-[#005fb033]" : ""
                  }`}>
                  <div className={`flex flex-row gap-3 items-start `}>
                    {!item.isRead ? (
                      <p className='text-THEME_PRIMARY_COLOR text-xl '>•</p>
                    ) : (
                      ""
                    )}
                    <p className='text-sm text-[#555F71] font-semibold'>
                      {item.text}
                    </p>
                  </div>
                  <p className='w-full text-end text-xs text-[#475569]'>
                    {item.timeAgo}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col gap-[60px] w-full h-full items-center justify-center'>
              <img
                src='/assets/noNotifications.svg'
                width={"62px"}
                height={"62px"}
              />
              <p className='text-[26px] text-[#555F71] font-semibold'>
                {translate("locale.noNotifications")}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
