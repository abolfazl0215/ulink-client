import Head from "next/head";
import { Toaster } from "react-hot-toast";
import AnimatedLanding from "./AnimatedLanding";

export default function App() {
  return (
    <>
      <Toaster />
      <Head>
        <title>ULink - Create and Customize Your Link in Bio</title>
      </Head>

      <div className="bg-[#3AC481] w-full min-h-screen md:min-h-screen p-[3vw] pt-[5vw] md:p-[2vw] md:px-[5vw] flex flex-col">
        <header className="bg-white flex justify-between p-[2vw] md:p-[.8vw] rounded-full items-center">
          <h1 className="font-bold text-[5vw] md:text-[2.4vw] lg:text-[1.3vw] ml-[4vw] md:ml-[2.7vw]">
            ULink
          </h1>

          <a
            href="/login"
            className="bg-[#005822] p-[3vw] md:p-[2vw] lg:p-[1.2vw] px-[6vw] md:px-[4vw] lg:px-[2vw] rounded-full text-white text-[3.7vw] md:text-[2.1vw] lg:text-[1.1vw]">
            Log in / Sign up
          </a>
        </header>

        {/* اینجا انیمیشن */}
        <AnimatedLanding />
      </div>
    </>
  );
}
