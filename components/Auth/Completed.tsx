import Link from "next/link";
import { FaHome, FaCheckCircle } from "react-icons/fa";
import {useTranslations} from 'next-intl';

const Completed = () => {
   const t = useTranslations('CompletedComponent'); 
  return (
    <>
      <div className="text-lg md:text-xl font-medium leading-loose text-center my-8">
        <hr></hr>
        <span className="flex justify-center">
          <FaCheckCircle className="text-4xl md:text-7xl text-green-400 mt-4" />
        </span>
        <h4 className="my-4 text-3xl font-bold text-primary-blue">
           {t("title")}
        </h4>
        <p className="my-8">
         {t("subtitle")}
        </p>
        <Link href="/">
          <button
            className={`px-4 md:px-8 py-4 rounded-lg text-lg md:text-xl font-medium bg-gray-100 text-primary-blue hover:text-white hover:bg-primary-blue hover:shadow-lg backdrop-blur-lg`}
          >
           {t("homeBtn")} <FaHome className="inline mx-2" />
          </button>
        </Link>
      </div>
    </>
  );
};

export default Completed;
