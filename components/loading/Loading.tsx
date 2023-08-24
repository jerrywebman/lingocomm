"use client";

import Image from "next/image";
import loadinglogo from "/public/images/loading-logo.png";

const loading = () => {
  return (
    <center className="h-screen my-40">
      <div className="flex justify-center items-center animate-bounce rounded-md bg-primary-blue shadow-lg  w-16 h-16">
        <Image
          src={loadinglogo}
          alt="Lingo Comms loading bar"
          width={60}
          height={60}
        />
      </div>
    </center>
  );
};

export default loading;
