import React, { useContext, useEffect, useState } from "react";
import { category } from "./category";
import { LinkContext } from "../../context/LinkContext";
import styles from "./step3.module.css";
import { Search } from "lucide-react";
import { ClipLoader } from "react-spinners";

const CreateLinkStepTwo = ({ setStep }) => {
  const [data, setData] = useState(category);

  const linkContext = useContext(LinkContext);
  const handleSearch = (e) => {
    console.log(e.target.value);
    const filterData = category.filter(
      (f) =>
        f.title.includes(e.target.value) ||
        f.subTitle.includes(e.target.value),
    );
    console.log(filterData);
    setData(filterData);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="w-full mt-[18vw] md:mt-[15vw] lg:mt-0 h-[81vh] lg:h-[93vh] flex justify-center items-center">
      <section className="bg-white w-[90vw] lg:max-w-[35vw] shadow-sm p-[4vw] lg:p-[2vw] rounded-lg  flex flex-col h-full">
        <p className="text-[6vw] md:text-[4vw] lg:text-[1.5vw] font-semibold">
          your field of activity
        </p>
        <p className="text-[#9C9CAB] mt-[.9vw] lg:mt-[.3vw] text-[4vw] md:text-[2.5vw] lg:text-[1vw]">
          Select your field of activity
        </p>
        <div className="relative w-full mt-[6vw] md:mt-[4vw] lg:mt-[2vw] mb-[3vw] lg:mb-[1vw]">
          <Search className="absolute left-[3vw] md:left-[2vw] lg:left-[1vw] top-1/2 -translate-y-1/2 w-[4.5vw] md:w-[3vw] lg:w-[1.2vw] h-[4.5vw] lg:h-[1.2vw] text-[#9C9CAB]" />
          <input
            type="search"
            className="bg-[#F9F9FA] w-full rounded-lg p-[3vw] md:p-[2vw] lg:p-[1vw] pl-[10vw] md:pl-[7vw] lg:pl-[3vw] mt-0 mb-0 text-[4vw] md:text-[2.5vw] lg:text-[1vw]"
            placeholder="Search ..."
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className="overflow-y-auto flex-1">
          {data.map((c) => (
            <>
              {c.type === "header" ? (
                <div className="p-[3vw] md:p-[2vw] lg:p-[1vw] flex gap-[3vw] lg:gap-[1vw] items-center border border-[#E3E3E8] rounded-lg mt-[1vw] my-[1vw]">
                  <div className="bg-[#2AC27C] w-[10vw] md:w-[6vw] md:h-[6vw] lg:w-[3.1vw] h-[10vw] lg:h-[3.1vw] rounded-full flex justify-center items-center">
                    <Search
                      color="#fff"
                      className="w-[5vw] md:w-[3.5vw] lg:w-[1.5vw] h-[5vw] lg:h-[1.5vw]"
                    />
                  </div>
                  <div className="w-4/5">
                    <p className="text-[4vw] md:text-[2.5vw] lg:text-[1.1vw] font-semibold">
                      {c.title}
                    </p>
                    <p className="text-[3.3vw] md:text-[2vw] lg:text-[.9vw] text-[#545463] font-light">
                      {c.subTitle}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => linkContext.setJob(c.title)}
                  className={
                    linkContext.job == c.title
                      ? "p-[3vw] md:p-[2vw] lg:p-[1vw] mt-[3.5vw] lg:mt-[1vw] rounded-lg border-l-4 border-l-[#2AC27C]  cursor-pointer"
                      : "p-[3vw] md:p-[2vw] lg:p-[1vw] mt-[3.5vw] lg:mt-[1vw] rounded-lg border-l-4 border-l-stone-200 hover:border-l-stone-400 cursor-pointer"
                  }>
                  <p className="text-[3.9vw] md:text-[2.5vw] lg:text-[1vw] text-[#717184]">
                    {c.title}
                  </p>
                  <p className="text-[3.3vw] md:text-[2vw] lg:text-[.85vw] text-[#9C9CAB] font-light">
                    {c.subTitle}
                  </p>
                </div>
              )}
            </>
          ))}
        </div>
        <div>
          <div className="flex justify-between mt-[3vw]">
            <button
              className="p-[3vw] md:p-[2vw] lg:p-[1vw] px-[5vw] lg:px-[3vw] rounded-lg bg-[#F4F4F6]"
              onClick={(e) => setStep(1)}>
              Back
            </button>
            <button
              className={`${
                !linkContext.job && "opacity-30 cursor-not-allowed"
              }p-[3vw] lg:p-[1vw] md:p-[2vw] px-[5vw] rounded-lg text-white font-semibold bg-[#2AC27C]`}
              onClick={(e) => {
                !linkContext.loading &&
                  linkContext.job &&
                  linkContext.addLink(e);
              }}>
              {linkContext.loading ? (
                <ClipLoader size={20} color="white" />
              ) : (
                "Save link"
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateLinkStepTwo;
