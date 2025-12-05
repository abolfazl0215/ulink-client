"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const Page = ({ params }) => {
  const router = useRouter();
  useEffect(() => {
    if (params.slug == "OK") {
      toast.success("خرید شما با موفقیت انجام شد");
      router.push("/account");
    }
    if (params.slug == "NOK") {
      toast.error("تراکنش ناموفق بود");
      router.push("/account");
    }
  }, []);

  return <></>;
};

export default Page;
