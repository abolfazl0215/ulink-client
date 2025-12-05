// "use client";
import React from "react";

const MyComp = ({ data }) => {
  return (
    <div>
      {data.map((d) => (
        <p>{d.address + "ssssssss"}</p>
      ))}
    </div>
  );
};

export default MyComp;
