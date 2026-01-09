"use client";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// import Toastr from "react-native-toastr";

export const LoginContext = createContext({
  update: "",
  setUpdate: () => {},
  tel: "",
  setTel: () => {},
  sms: "",
  setSms: () => {},
  userExist: "",
  setUserExist: () => {},
  user: "",
  setUser: () => {},
  totalAmount: "",
  setTotalAmount: () => {},
  address: "",
  setAddress: () => {},
});

const LoginContextComponent = ({ children }) => {
  const [update, setUpdate] = useState(0);
  const [cartLength, setCartLength] = useState(0);
  const [tel, setTel] = useState();
  const [sms, setSms] = useState();
  const [userExist, setUserExist] = useState(false);
  const [user, setUser] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [address, setAddress] = useState("");

  const getUser = async () => {
    const response = await axios.get(
      "https://ulinkk-back.onrender.com/me",
      {
        withCredentials: true,
      },
    );

    if (response.data.loggedIn) {
      console.log("// کاربر لاگین است");
      setUser(response.data.user);
      setUserExist(true);
    } else {
      console.log("  // لاگین نیست");
    }
  };

  useEffect(() => {
    // if (Cookies.get("user")) {
    //   setUserExist(true);
    getUser();
    // }
  }, [update]);

  return (
    <LoginContext.Provider
      value={{
        update,
        setUpdate,
        cartLength,
        setCartLength,
        tel,
        setTel,
        sms,
        setSms,
        userExist,
        setUserExist,
        user,
        setUser,
        totalAmount,
        setTotalAmount,
        address,
        setAddress,
      }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextComponent;
