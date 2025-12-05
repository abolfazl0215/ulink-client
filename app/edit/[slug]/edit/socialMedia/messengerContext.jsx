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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// import Toastr from "react-native-toastr";

export const MessengerContext = createContext({
  selectedMessenger: "",
  setSelectedMessenger: () => {},
});

const MessengerContextComponent = ({ children }) => {
  const [selectedMessenger, setSelectedMessenger] = useState([]);

  const router = useRouter();


  return (
    <MessengerContext.Provider
      value={{
        selectedMessenger,
        setSelectedMessenger,
      }}>
      {children}
    </MessengerContext.Provider>
  );
};

export default MessengerContextComponent;
