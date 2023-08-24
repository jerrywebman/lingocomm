"use client"

import Link from "next/link";
import { FaArrowRight, FaUserPlus } from "react-icons/fa";
import {useTranslations} from 'next-intl';

interface NoUserProps {
  services: string;
  returnUrl: string;
  data: Object;
}

const NoUser = ({ services, returnUrl, data }: NoUserProps) => {
  const t = useTranslations('NoUserComponent');
  //save the user state when asked to signup/login
  function saveState() {
    sessionStorage.setItem(services, JSON.stringify(data));
    sessionStorage.setItem("returnUrl", JSON.stringify(returnUrl));
  }
  return (
    <>
      <div className="text-lg md:text-xl font-medium leading-loose text-center my-8">
        <hr></hr>
        <p className="my-8">{t("text")}</p>
        <Link href="/customer/sign-in">
          <button
            onClick={() => saveState()}
            className={`px-4 md:px-8 py-4 rounded-lg text-lg md:text-xl font-medium bg-gray-100 text-primary-blue hover:text-white hover:bg-primary-blue hover:shadow-lg backdrop-blur-lg`}
          >
            {t("loginBtn")}<FaArrowRight className="inline mx-2" />
          </button>
        </Link>
        <Link href="/customer/sign-up">
          {" "}
          <button
            onClick={() => saveState()}
            className={`mx-4 px-4 md:px-8 py-4 rounded-lg text-lg md:text-xl font-medium bg-gray-100 text-primary-red hover:text-white hover:bg-primary-red hover:shadow-lg backdrop-blur-lg`}
          >
            {t("signupBtn")} <FaUserPlus className="inline mx-2" />
          </button>
        </Link>
      </div>
    </>
  );
};

export default NoUser;
