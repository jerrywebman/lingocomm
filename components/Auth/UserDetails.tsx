"use client"

import Link from "next/link";
import { FaArrowRight, FaUserPlus } from "react-icons/fa";
import { useTranslations } from 'next-intl';
import { useContext } from "react";
import { UserContext } from "../../context/user.context";



const UserDetails = () => {
  const t = useTranslations('UserDetailsComponent');
  const { user } = useContext(UserContext);
 
 
  return (
    <>
      <div className=" grid grid-cols-2 gap-4 p-4 md:shadow-lg md:rounded-lg">
          <div>
            <h4 className="text-base font-bold py-4 md:text-2xl">
              {t("fullname")}
            </h4>
            <p className="text-xs md:text-lg text-gray-600">
              {user?.firstname + " " + user?.lastname}
            </p>
          </div>
          <div>
            <h4 className="text-base font-bold py-4 md:text-2xl">
               {t("phone")}
            </h4>
            <p className="text-xs md:text-lg text-gray-600">
              {user?.phone}
            </p>
          </div>
          <div>
            <h4 className="text-base font-bold py-4 md:text-2xl">
               {t("address")}
            </h4>
            <p className="text-xs md:text-lg text-gray-600">
              {user?.city + ", " + user?.country}
            </p>
          </div>
          <div>
            <h4 className="text-base font-bold py-4 md:text-2xl">
               {t("email")}
            </h4>
            <p className="text-xs md:text-lg text-gray-600">
              {user?.email}
            </p>
          </div>
      </div>
    </>
  );
};

export default UserDetails ;
