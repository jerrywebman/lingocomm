import Image from "next/image";
const HowItWorksCard = ({ headerImg, title, description }) => {
  return (
    <>
      <div className="w-60 bg-white shadow-lg rounded-t-full rounded-b-lg text-center mx-auto">
        <div className="h-52 mt-[-30] mb-12">
          <Image className="" src={headerImg} alt="ujali food" />
        </div>
        <div className="p-4 flex flex-col mb-3 ">
          <p className="font-bold text-lg "> {title} </p>
          <p className="text-gray-800 text-xs mt-1">{description}</p>
        </div>
      </div>
    </>
  );
};
export default HowItWorksCard;
