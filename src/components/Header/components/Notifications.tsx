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
  const locale = useLocale();
  const [data, setData] = useState<{
    old: Notification[];
    new: Notification[];
  }>({
    new: [],
    old: [],
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getNotifications(locale)
      .then((response) => {
        let newNotifications: Notification[] = [];
        let oldNotifications: Notification[] = [];
        setLoading(false);
        response.data.message.notifications?.map((item: Notification) => {
          if (item.isRead) oldNotifications.push(item);
          else newNotifications.push(item);
        });
        setData({
          old: oldNotifications.sort(
            (a, b) => (new Date(b.date) as any) - (new Date(a.date) as any)
          ),
          new: newNotifications.sort(
            (a, b) => (new Date(b.date) as any) - (new Date(a.date) as any)
          ),
        });
      })
      .catch(() => {
        setLoading(false);
      });
    document.addEventListener("click", (event) => {
      if ((event.target as any)?.id == "back") closeNotification();
    });
  }, []);

  return (
    <>
      <div
        id='back'
        className='absolute top-0 end-0 flex  flex-row  justify-end  min-w-full min-h-screen bg-[#0000006e] z-[150]  '>
        <div className='w-[80%] md:w-[443px]  bg-white min-h-screen'>
          <div className='flex flex-row justify-between items-center  p-6 '>
            <p className='text-[#1E293B] font-semibold rtl:font-medium text-xl'>
              {translate("locale.Notifications")}
            </p>
            <img
              src='/assets/closeHead.png'
              className='!w-5 !h-5 cursor-pointer'
              onClick={closeNotification}
            />
          </div>
          {loading ? (
            <div className='h-full w-full flex justify-center items-center'>
              <span className='svg-spinners--180-ring-with-bg'></span>
            </div>
          ) : (
            <>
              {data?.new?.length == 0 && data?.old?.length == 0 ? (
                <div className='flex flex-col gap-[60px] w-full h-full items-center mt-10 justify-start md:justify-center'>
                  <img
                    src='/assets/noNotifications.svg'
                    width={"62px"}
                    height={"62px"}
                  />
                  <p className='text-base md:text-[26px] text-[#555F71] font-semibold rtl:font-medium'>
                    {translate("locale.noNotifications")}
                  </p>
                </div>
              ) : (
                <div className='overflow-y-scroll overflow-x-hidden max-h-[550px] h-auto mb-6'>
                  {data?.new?.length > 0 ? (
                    <p className='px-6 text-[#1E293B] font-semibold rtl:font-medium text-base'>
                      {translate("locale.New_Notifications")}
                    </p>
                  ) : (
                    ""
                  )}
                  {data?.new?.length ? (
                    <div>
                      {data.new.map((item) => (
                        <div
                          className={`p-6  border-b-[1px] border-gray-300   ${
                            !item.isRead ? "bg-[#005fb033]" : ""
                          }`}>
                          <div className={`flex flex-row gap-3 items-start `}>
                            {!item.isRead ? (
                              <p className='text-THEME_PRIMARY_COLOR text-xl '>
                                •
                              </p>
                            ) : (
                              ""
                            )}
                            <p className='text-sm text-[#555F71] font-semibold rtl:font-medium'>
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
                    ""
                  )}

                  {data?.old?.length > 0 ? (
                    <p className='px-6 pt-6 text-[#1E293B] font-semibold rtl:font-medium text-base'>
                      {translate("locale.Old_Notifications")}
                    </p>
                  ) : (
                    ""
                  )}
                  {data?.old?.length ? (
                    <div>
                      {data.old.map((item) => (
                        <div
                          className={`p-6  border-b-[1px] border-gray-300   ${
                            !item.isRead ? "bg-[#005fb033]" : ""
                          }`}>
                          <div className={`flex flex-row gap-3 items-start `}>
                            {!item.isRead ? (
                              <p className='text-THEME_PRIMARY_COLOR text-xl '>
                                •
                              </p>
                            ) : (
                              ""
                            )}
                            <p className='text-sm text-[#555F71] font-semibold rtl:font-medium'>
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
                    ""
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
