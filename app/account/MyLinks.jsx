import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const MyLinks = ({ links, setShowRemoveLink, setQrCode }) => {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className={`lg:mt-[3vw] md:mt-[14vw] mt-[18vw] flex flex-col md:flex-row md:flex-wrap ${
        links?.length < 3 ? "justify-start" : "justify-evenly"
      } gap-[3vw] md:gap-[2vw] lg:gap-[1vw]`}>
      {links.map((link, index) => (
        <div key={link.address} className="flex lg:gap-[1vw]">
          <div className="lg:shadow-md bg-white w-full md:w-[45vw] lg:w-[22vw] p-[4vw] lg:p-[2vw] rounded-lg flex flex-col items-center relative">
            <Trash2
              onClick={() => setShowRemoveLink(link.address)}
              color="red"
              className="absolute left-[4vw] md:left-[2vw] md:top-[2vw] lg:left-[1vw] top-[4vw] lg:top-[1vw] cursor-pointer w-[6vw] lg:w-[1.5vw] h-[6vw] lg:h-[1.5vw] lg:hover:w-[1.7vw] md:h-[3vw] md:w-[3vw] lg:hover:h-[1.7vw] transition-all"
            />
            {link.mainImage ? (
              <Image
                alt="image"
                width={50}
                height={50}
                className="w-[20vw] h-[20vw] md:w-[10vw] md:h-[10vw] lg:w-[5vw] lg:h-[5vw] rounded-full object-cover"
                src={link.mainImage}
              />
            ) : (
              <div className="w-[20vw] h-[20vw] lg:w-[5vw] lg:h-[5vw] rounded-full  bg-stone-200"></div>
            )}

            <p className="font-semibold text-[4.8vw] md:text-[3vw] lg:text-[1.15vw] mt-[3vw] md:mt-[2vw]  lg:mt-[1vw]">
              {link?.title || "--"}
            </p>
            <p className="text-[#717184] text-[4vw] md:text-[2.5vw] lg:text-[1vw]">
              {link?.subTitle || "--"}
            </p>
            <button
              onClick={() => router.push(`/edit/${link?.address}`)}
              className="border select-none border-[#055aff] flex items-center gap-[2.1vw] md:gap-[1.5vw] lg:gap-[.7vw] text-[#055aff] p-[1.8vw] md:p-[1.1vw] lg:p-[.6vw] px-[3vw] lg:px-[1vw] text-[4vw] lg:text-[1.1vw] rounded-xl my-[4vw] md:my-[2vw] lg:my-[1vw] hover:bg-blue-50 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[4vw] h-[4vw] md:w-[2.4vw] md:h-[2.4vw] lg:w-[1.2vw] lg:h-[1.2vw]"
                fill="none"
                viewBox="0 0 20 20">
                <path
                  fill="#055AFF"
                  d="M.806 3.034 3.034.806A2.67 2.67 0 0 1 4.982 0a2.73 2.73 0 0 1 1.945.81l12.354 12.411a.75.75 0 0 1 .219.529v5a.75.75 0 0 1-.75.75h-5a.75.75 0 0 1-.53-.218L.81 6.927A2.73 2.73 0 0 1 0 4.982a2.73 2.73 0 0 1 .806-1.948M14.06 18H18v-3.94L9.007 5.026 5.025 9.007zM1.868 5.864l2.094 2.085 3.987-3.986-2.085-2.095a1.25 1.25 0 0 0-.885-.368h-.001c-.334 0-.648.13-.885.366L1.865 4.094a1.247 1.247 0 0 0 .003 1.77"></path>
              </svg>
              <p className="text-[4vw] md:text-[2vw] lg:text-[1vw]">
                Edit link
              </p>
            </button>
            <div className="bg-[#F9F9FA] p-[3vw] md:p-[2vw] lg:p-[1vw] flex justify-between rounded-lg items-center w-full">
              <p className="text-[#9C9CAB] text-[4vw] md:text-[2.2vw] lg:text-[1vw]">
                ulink-front.onrender.com/{" "}
                <span className="text-[#2F2F37]">
                  {link?.address}
                </span>
              </p>
              <svg
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://ulink-front.onrender.com/${link?.address}`,
                  );
                  toast.success("Link copied to clipboard!");
                }}
                xmlns="http://www.w3.org/2000/svg"
                className="w-[4.5vw] md:w-[2vw] md:h-[2vw] lg:w-[1vw] h-[4.5vw] lg:h-[1vw] cursor-pointer"
                fill="none"
                viewBox="0 0 13 13">
                <path
                  fill="#131316"
                  d="M10.75 2.667H4.917c-1.452 0-2.25.798-2.25 2.25v5.833c0 1.451.798 2.25 2.25 2.25h5.833c1.451 0 2.25-.799 2.25-2.25V4.917c0-1.452-.799-2.25-2.25-2.25M12 10.75c0 .888-.362 1.25-1.25 1.25H4.917c-.888 0-1.25-.362-1.25-1.25V4.917c0-.888.362-1.25 1.25-1.25h5.833c.888 0 1.25.362 1.25 1.25zM1 2.247v5.84c0 .798.322.995.428 1.06A.5.5 0 1 1 .905 10C.305 9.632 0 8.989 0 8.087v-5.84C0 .819.82 0 2.247 0h5.84C9.21 0 9.747.493 10 .905a.5.5 0 0 1-.853.522C9.083 1.321 8.885 1 8.087 1h-5.84C1.36 1 1 1.361 1 2.247"></path>
              </svg>
            </div>
            <div className="flex gap-[2vw] md:gap-[1vw] lg:gap-[.5vw] mt-[2vw] md:mt-[1.5vw] lg:mt-[1vw] w-full">
              <div
                onClick={() => setQrCode(link?.address)}
                className="bg-[#F3F7FE] select-none rounded-lg flex-1 flex items-center justify-center gap-[2vw] md:gap-[1vw] lg:gap-[.5vw] py-[3vw] md:py-[1.8vw] lg:py-[.8vw] cursor-pointer hover:bg-blue-100 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[5vw] md:w-[2.3vw] md:h-[2.3vw] lg:w-[1.2vw] h-[5vw] lg:h-[1.2vw]"
                  fill="none"
                  viewBox="0 0 20 20">
                  <path
                    fill="#055AFF"
                    d="M15.751 12a3.74 3.74 0 0 0-3.197 1.818l-5.331-2.665c.176-.434.278-.906.278-1.403s-.102-.969-.278-1.403l5.331-2.665A3.74 3.74 0 0 0 15.751 7.5a3.755 3.755 0 0 0 3.75-3.75A3.755 3.755 0 0 0 15.751 0a3.755 3.755 0 0 0-3.75 3.75c0 .173.028.339.051.506L6.387 7.088A3.74 3.74 0 0 0 3.75 6 3.755 3.755 0 0 0 0 9.75a3.755 3.755 0 0 0 3.75 3.75 3.74 3.74 0 0 0 2.637-1.088l5.665 2.832c-.023.167-.051.333-.051.506a3.755 3.755 0 0 0 3.75 3.75 3.755 3.755 0 0 0 3.75-3.75 3.755 3.755 0 0 0-3.75-3.75m0-10.5c1.24 0 2.25 1.009 2.25 2.25S16.991 6 15.751 6a2.253 2.253 0 0 1-2.25-2.25c0-1.241 1.01-2.25 2.25-2.25m-12 10.5a2.253 2.253 0 0 1-2.25-2.25c0-1.241 1.01-2.25 2.25-2.25s2.25 1.009 2.25 2.25S4.991 12 3.751 12m12 6a2.253 2.253 0 0 1-2.25-2.25c0-1.241 1.01-2.25 2.25-2.25s2.25 1.009 2.25 2.25-1.01 2.25-2.25 2.25"></path>
                </svg>
                <p className="text-[#055AFF] text-[4vw] md:text-[2vw] lg:text-[1vw]">
                  QrCode
                </p>
              </div>
              <div
                onClick={() => router.push(`/${link?.address}`)}
                className="bg-[#F0FFF8] select-none rounded-lg flex-1 flex items-center justify-center gap-[2vw] md:gap-[1vw] lg:gap-[.5vw] py-[3vw] md:py-[1.8vw] lg:py-[.8vw] hover:bg-green-100 transition-all cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[5vw]  md:w-[2.3vw] md:h-[2.3vw] lg:w-[1.2vw] h-[5vw] lg:h-[1.2vw]"
                  fill="none"
                  viewBox="0 0 20 16">
                  <path
                    fill="#2AC27C"
                    d="M18.986 5.888C17.672 3.688 14.725 0 9.75 0 4.775 0 1.828 3.689.515 5.888a3.62 3.62 0 0 0 0 3.724c1.313 2.2 4.26 5.888 9.235 5.888s7.922-3.689 9.235-5.888a3.62 3.62 0 0 0 0-3.724m-1.288 2.954C16.548 10.768 13.985 14 9.75 14s-6.798-3.231-7.948-5.158a2.13 2.13 0 0 1 0-2.185c1.15-1.926 3.713-5.158 7.948-5.158s6.798 3.231 7.948 5.158a2.13 2.13 0 0 1 0 2.185M9.75 3.5A4.255 4.255 0 0 0 5.5 7.75 4.255 4.255 0 0 0 9.75 12 4.255 4.255 0 0 0 14 7.75 4.255 4.255 0 0 0 9.75 3.5m0 7A2.75 2.75 0 0 1 7 7.75 2.75 2.75 0 0 1 9.75 5a2.75 2.75 0 0 1 2.75 2.75 2.75 2.75 0 0 1-2.75 2.75"></path>
                </svg>
                <p className="text-[#2AC27C] text-[4vw]  md:text-[2vw] lg:text-[1vw]">
                  Show link
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyLinks;
