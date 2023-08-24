import React from "react";

const DivideY = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="my-24 md:my-20">{children}</div>
    </>
  );
};

export default DivideY;
