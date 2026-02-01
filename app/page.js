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

      <div className="bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 w-full min-h-screen p-4 md:p-6 lg:p-8 flex flex-col">
        <header className="bg-white/95 backdrop-blur-sm flex justify-between items-center p-4 md:p-5 lg:p-4 px-6 md:px-8 lg:px-6 rounded-full shadow-lg border border-white/50">
          <h1 className="font-black text-2xl md:text-3xl lg:text-2xl text-emerald-700 tracking-tight">
            ULink
          </h1>

          <a
            href="/login"
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 p-3 md:p-4 lg:p-3 px-6 md:px-8 lg:px-6 rounded-full text-white text-sm md:text-base lg:text-sm font-semibold shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-700/40 hover:scale-105 active:scale-95">
            Log in / Sign up
          </a>
        </header>

        <AnimatedLanding />
      </div>
    </>
  );
}
