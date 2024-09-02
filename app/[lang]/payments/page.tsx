import HomePage from "@/app/modules/Home";
import MyPayments from "@/app/modules/payments";
export default function Home(params: { params: any }) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between mt-[500px] z-[100] bg-white  '>
      <MyPayments lang={params?.params?.lang} />
    </main>
  );
}
