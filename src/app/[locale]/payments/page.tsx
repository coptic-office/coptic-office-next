import HomePage from "@/src/modules/Home";
import MyPayments from "@/src/modules/payments";
export default function Home(params: { params: any }) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between mt-[500px] z-[100] bg-white  '>
      <MyPayments lang={params?.params?.lang} />
    </main>
  );
}
