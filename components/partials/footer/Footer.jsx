"use client"
import Image from "next/image";
import logo from "@/public/images/logocolornobg.png";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter
} from "react-icons/bs";
import { BiMap } from "react-icons/bi";
import { IoIosLocate, IoIosMail } from "react-icons/io";
import { TbWorldWww } from "react-icons/tb";
import Link from "next/link";
import { useTranslations } from 'next-intl';

const Footer = () => {
   //translation
  const t = useTranslations("Footer");
  return (
    <>
      <footer className="bg-footer-bg text-white bg-cover bg-no-repeat ">
        {/* <p className="bg-footer-top bg-left-top bg-no-repeat"></p> */}
        <div>
          <div className="grid grid-col-2 md:grid-cols-5 gap-2 md:gap-4 tracking-wide text-white px-4 py-8">
            <div className="col-span-2 md:col-span-1 mb-2">
              <div className="flex justify-center">
                <Image
                  src={logo}
                  alt="Lingocomms"
                  width={140}
                  height={140}
                  className="mb-4 "
                />
              </div>
              <p className="text-sm leading-6 tracking-wide">
                {t("intro")}
              </p>
              <div className="capitalize ">
                <div className="grid grid-cols-4 text-lg md:text-xl text-primary-gray my-8 w-full px-8 md:px-0 md:w-2/3 ">
                  <a
                    className=""
                    href="https://www.facebook.com/profile.php?id=100083267574258"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsFacebook className=" hover:text-primary-purple" />
                  </a>
                  <a
                    className=""
                    href="https://twitter.com/LingoComm1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsTwitter className=" hover:text-primary-purple" />
                  </a>
                  <a
                    className=""
                    href="https://www.instagram.com/lingo.communications/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsInstagram className=" hover:text-primary-purple" />
                  </a>
                  <a
                    className=""
                    href="https://www.linkedin.com/company/lingo-comunications/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsLinkedin className=" hover:text-primary-purple" />
                  </a>
                  
                </div>
                <div className="grid grid-cols-2 text-3xl"></div>
              </div>
            </div>
            <div className="md:ml-16 text-sm mb-4 text-gray-400">
              <p className="font-bold uppercase text-lg mb-4 text-white">
                {" "}
                  {t("contact")}
              </p>
              <a
                href="https://lingocomm.com"
                className="block mb-2 font-normal hover:font-bold hover:text-primary-purple cursor-pointer"
              >
                <TbWorldWww className="inline mr-2" />
                www.lingocomm.com
              </a>
              <a
                href="mailto:support@lingocomm.com"
                className="block mb-2 font-normal hover:font-bold hover:text-primary-purple cursor-pointer"
              >
                <IoIosMail className="inline mr-2" />
                support@lingocomm.com
              </a>
              <a
                href="mailto:jobs@lingocomm.com"
                className="block mb-2 font-normal hover:font-bold hover:text-primary-purple cursor-pointer"
              >
                <IoIosMail className="inline mr-2" />
                jobs@lingocomm.com
              </a>
              <p className="font-bold uppercase text-lg my-4 text-white">
                {" "}
                  {t("office")}
              </p>
              <a className="block mb-2 font-normal hover:font-bold hover:text-primary-purple cursor-pointer">
                <BiMap className="inline mr-2" />
                 {t("location")}
              </a>
              <a
                href="mailto:support@lingocomm.com"
                className="block mb-2 font-normal hover:font-bold hover:text-primary-purple cursor-pointer"
              >
                <IoIosMail className="inline mr-2" />
                support@lingocomm.com
              </a>
            </div>
            <div className="md:ml-16 capitalize text-sm mb-4">
              <p className="font-bold text-lg uppercase mb-4">   {t("quickLinks.title")}</p>
              <Link
                href="/"
                className="block mb-2 font-light md:font-normal hover:font-bold text-gray-400 hover:text-primary-purple cursor-pointer"
              >
                {t("quickLinks.home")}
              </Link>
              <Link
                href="/services"
                className="block mb-2 font-normal hover:font-bold text-gray-400 hover:text-primary-purple cursor-pointer"
              >
               {t("quickLinks.services")}
              </Link>
              <Link
                href="/jobs"
                className="block mb-2 font-normal hover:font-bold text-gray-400 hover:text-primary-purple cursor-pointer"
              >
                {t("quickLinks.career")}
              </Link>
              <Link
                href="/apply"
                className="block mb-2 font-normal hover:font-bold text-gray-400 hover:text-primary-purple cursor-pointer"
              >
                {t("quickLinks.application")}
              </Link>
              <Link
                href="/security"
                className="block mb-2 font-normal hover:font-bold text-gray-400 hover:text-primary-purple cursor-pointer"
              >
              {t("quickLinks.security")}
              </Link>
              <Link
                href="/about-us"
                className="block mb-2 font-normal hover:font-bold text-gray-400 hover:text-primary-purple cursor-pointer"
              >
                {t("quickLinks.lingo")}
              </Link>
              <Link
                href="/faq"
                className="block mb-2 font-normal hover:font-bold text-gray-400 hover:text-primary-purple cursor-pointer"
              >
                {t("quickLinks.faq")}
              </Link>
            </div>
            <div className="md:ml-16 capitalize text-sm mb-4">
              <p className="font-bold text-lg uppercase mb-4"> {t("services.title")}</p>
              <Link
                href="/services/translation"
                className="block mb-2 font-light md:font-normal hover:font-bold text-gray-400 hover:text-primary-purple cursor-pointer"
              >
                {t("services.translation")}
                
              </Link>
              <Link
                href="/services/editing"
                className="block mb-2 font-normal hover:font-bold text-gray-400 hover:text-primary-purple cursor-pointer"
              >
                 {t("services.editing")}
              </Link>
              <Link
                href="/services/ghostwriting"
                className="block mb-2 font-normal hover:font-bold text-gray-400 hover:text-primary-purple cursor-pointer"
              >
                 {t("services.ghostwriting")}
              </Link>
              <Link
                href="/services/audioproductions"
                className="block mb-2 font-normal hover:font-bold text-gray-400 hover:text-primary-purple cursor-pointer"
              >
                {t("services.production")}
              </Link>
              <Link
                href="/services/certification"
                className="block mb-2 font-normal hover:font-bold text-gray-400 hover:text-primary-purple cursor-pointer"
              >
                {t("services.certification")}
              </Link>
              <Link
                href="/services/printing"
                className="block mb-2 font-normal hover:font-bold text-gray-400 hover:text-primary-purple cursor-pointer"
              >
                {t("services.printing")}
              </Link>
              <Link
                href="/services/interpretation"
                className="block mb-2 font-normal hover:font-bold text-gray-400 hover:text-primary-purple cursor-pointer"
              >
                 {t("services.interpretation")}
              </Link>
              <Link
                href="/services/technicalwriting"
                className="block mb-2 font-normal hover:font-bold text-gray-400 hover:text-primary-purple cursor-pointer"
              >
                {t("services.writing")}
              </Link>
            </div>
            <div className="capitalize col-span-2 md:col-span-1 w-full">
              {" "}
              <p className="font-bold text-lg mb-4 uppercase text-center md:text-left">
                {" "}
                {t("newsletter")}
              </p>
              <div className="">
                <input
                  type="text"
                  className="p-4 rounded-sm font-bold text-black"
                  placeholder={t("emailPlaceholder")}
                ></input>{" "}
                <button className="p-4 rounded-sm bg-red-500 hover:bg-primary-purple hover:text-black">
                 {t("subscribe")}
                </button>
              </div>
            </div>
          </div>
          <div className="text-center text-xs md:text-sm mt-16 mb-8 pb-8">
            <hr className="pb-4"></hr>
            <p>{t("outro")}</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
