import { useTranslations } from "next-intl";

export default function NotificationModal({
  closeNotification,
}: {
  closeNotification: () => void;
}) {
  const translate = useTranslations();

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
          <div className='mt-6'>
            {[1, 2, 3].map((item) => (
              <div
                className={`p-6 border-b-[1px] border-gray-300   ${
                  item % 2 == 0 ? "bg-[#005fb033]" : ""
                }`}>
                <div className={`flex flex-row gap-3 items-start `}>
                  {item % 2 == 0 ? (
                    <p className='text-THEME_PRIMARY_COLOR text-xl '>•</p>
                  ) : (
                    ""
                  )}
                  <p className='text-sm text-[#555F71] font-semibold'>
                    برجاء التوجه الي مقرر المكتب الفني القبطي لأستكمال إجراءات
                    التعاقد والحصول علي نسخة العقد. يجب احضار بطاقة الرقم القومي
                    ودفتر . الشيكات الخاص بك في حالة السداد الآجل أو استكمال
                    قيمه الوحده بالكامل في حالة الدفع النقدي.
                  </p>
                </div>
                <p className='w-full text-end text-xs text-[#475569]'>
                  منذ ٤ ساعات
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
