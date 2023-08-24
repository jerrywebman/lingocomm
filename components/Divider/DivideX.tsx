import React from "react";

const DivideX = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="mx-8 md:mx-16">{children}</div>
    </>
  );
};

export default DivideX;
