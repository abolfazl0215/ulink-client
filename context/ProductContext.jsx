"use client";
import React, {
  createContext,
  use,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// import Toastr from "react-native-toastr";

export const ProductContext = createContext({
  update: "",
  setUpdate: () => {},
  plans: "",
  setPlans: () => {},
});

const ProductContextComponent = ({ children }) => {
  const [update, setUpdate] = useState(0);
  const [plans, setPlans] = useState("");

  const getPlans = async () => {
    const response = await axios.get(
      "https://ulink-back-431g.onrender.com/getProducts",
    );
    setPlans(response.data.plans);
    console.log("plans :", response.data);
  };

  // useEffect(() => {
  //   getPlans();
  // }, [update]);

  return (
    <ProductContext.Provider
      value={{
        update,
        setUpdate,
        plans,
        setPlans,
      }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextComponent;
