"use client";
import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";

// import Toastr from "react-native-toastr";

export const EditContext = createContext({
  section: "",
  setSection: () => {},
  item: "",
  setItem: () => {},
  endDrag: "",
  setEndDrag: () => {},
  sectionEditHandler: () => {},
});

const EditContextComponent = ({ children }) => {
  const [section, setSection] = useState("");
  const [item, setItem] = useState();
  const [endDrag, setEndDrag] = useState(true);

  const sectionEditHandler = async (sectionType, item) => {
    if (endDrag) {
      setItem(item);
      setSection(sectionType);
      console.log({ item, section });
    }
    console.log("main itemmm :", item);
  };

  useEffect(() => {
    console.log("new section : ", section);
  }, [section]);

  return (
    <EditContext.Provider
      value={{
        section,
        setSection,
        sectionEditHandler,
        item,
        setItem,
        endDrag,
        setEndDrag,
      }}>
      {children}
    </EditContext.Provider>
  );
};

export default EditContextComponent;
