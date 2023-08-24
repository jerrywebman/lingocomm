"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
// import onorio from "/public/images/Onario_korsgy.jpg";
import onorio from "/public/images/hero/8.png";
import six from "/public/images/hero/6.png";
import FOUR from "/public/images/hero/4.png";
import nine from "/public/images/hero/9.jpg";
import rc from "/public/images/hero/rc.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import Translation from "/public/images/services/new/translation.png";
import audioprod from "/public/images/services/new/audioprod.jpeg";
import certification from "/public/images/services/new/certification.jpeg";
import editing from "/public/images/services/new/editing.jpg";
import ghost from "/public/images/services/new/ghost.jpg";
import interpretation from "/public/images/services/new/interpretation.png";
import technicalwriting from "/public/images/services/new/technical.jpg";
import printing from "/public/images/services/new/printing.png";

import {
  FaChess,
  FaArrowRight,
  FaCartPlus,
  FaHeadphonesAlt,
  FaPenNib,
  FaPrint,
  FaEdit,
  FaCertificate,
  FaTeamspeak,
} from "react-icons/fa";
import { MdGTranslate } from "react-icons/md";
import {useTranslations} from 'next-intl';

const HomePageHero = () => {

   const t = useTranslations("Services");
  const data = [
    {
      id: "0",
      name: t("translation.name"),
      description: t("translation.description"),
      image: Translation,
      icon: <MdGTranslate />,
      link: "/services/translation",
    },
    {
      id: "1",
      name: t("audioProduction.name"),
      description: t("audioProduction.description"),
      image: audioprod,
      icon: <FaHeadphonesAlt />,
      link: "/services/audioproductions",
    },
    {
      id: "2",
      name: t("editing.name"),
      description: t("editing.description"),
      image: editing,
      icon: <FaEdit />,
      link: "/services/editing",
    },

    {
      id: "3",
      name: t("printing.name"),
      description: t("printing.description"),
      image: printing,
      icon: <FaPrint />,
      link: "/services/printing",
    },
    {
      id: "4",
      name: t("ghostwriting.name"),
      description: t("ghostwriting.description"),
      image: ghost,
      icon: <FaPenNib />,
      link: "/services/ghostwriting",
    },

    {
      id: "5",
      name: t("interpretation.name"),
      description: t("interpretation.description"),
      image: interpretation,
      icon: <FaTeamspeak />,
      link: "/services/interpretation",
    },
    {
      id: "6",
      name: t("certification.name"),
      description: t("certification.description"),
      image: certification,
      icon: <FaCertificate />,
      link: "/services/certification",
    },
    {
      id: "7",
      name: t("technicalWriting.name"),
      description: t("technicalWriting.description"),
      image: technicalwriting,
      icon: <FaChess />,
      link: "/services/technicalwriting",
    },
  ];
  return (
    <>
      <div className="w-full h-full md:pb-0 md:px-24 md:bg-home-hero-bg bg-home-hero bg-bottom bg-no-repeat bg-cover md:bg-cover backdrop-opacity-0 backdrop-invert md:bg-black/70 bg-black/70 bg-blend-color-burn">
        <Carousel
          infiniteLoop={true}
          autoPlay={true}
          swipeable={true}
          stopOnHover={true}
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          interval={7000}
        >
          {data.map((item, index) => (
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 px-8 py-4 md:p-8"
              key={index}
            >
              {" "}
              <div className="p-4 md:pt-24 leading-8 order-2 md:order-1">
                <span className="md:pl-12">
                  <h1
                    style={{ lineHeight: "3.5rem" }}
                    className="md:text-left text-3xl md:text-4xl text-white  font-bold  mb-8 md:mb-8 uppercase tracking-wide"
                  >
                    {item.name}
                  </h1>
                  <p className="md:text-left text-base leading-8 text-white md:font-normal  pr-0 md:pr-20 mb-2 md:mb-12 Lowercase ">
                    {item.description}
                  </p>
                </span>
                <div className="flex md:justify-start justify-center py-8 md:py-2">
                  <Link href={item.link}>
                    <button className="mr-4 p-3 rounded-lg bg-secondary-purple text-white mb-4 text-md md:text-xl capitalize shadow-xl flex">
                      {t("explore")}
                      <span className="inline mx-2"> {item.icon}</span>
                    </button>
                  </Link>
                  <Link href="/services">
                    <button className="mr-4 p-3 rounded-lg bg-secondary-purple text-white mb-4 text-md md:text-xl capitalize shadow-xl">
                      {t("allServices")} <FaArrowRight className="inline ml-2" />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="py-4 md:py-24 order-1 md:order-2">
                <Image alt="jdkkfkkd" src={item.image} />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default HomePageHero;
