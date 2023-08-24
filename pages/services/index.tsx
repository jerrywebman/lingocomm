import { GetStaticPropsContext } from "next";
import Link from "next/link";
import Translation from "/public/images/services/new/translation.png";
import audioprod from "/public/images/services/new/audioprod.jpeg";
import certification from "/public/images/services/new/certification.jpeg";
import editing from "/public/images/services/new/editing.jpg";
import ghost from "/public/images/services/new/ghost.jpg";
import interpretation from "/public/images/services/new/interpretation.png";
import technicalwriting from "/public/images/services/new/technical.jpg";
import printing from "/public/images/services/new/printing.png";
import Image from "next/image";
import DivideXY from "@/components/Divider/DivideXY";
//icons

import {
  FaChess,
  FaArrowRight,
  FaHeadphonesAlt,
  FaPenNib,
  FaPrint,
  FaEdit,
  FaCertificate,
  FaTeamspeak,
} from "react-icons/fa";
import { MdGTranslate } from "react-icons/md";
import Title from "@/components/Typography/Title";
import { useTranslations } from "next-intl";

export default function Services() {
  const t = useTranslations("ServicesPage");
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
      <div className="mt-8">
        <Title
          intro={""}
          titleColor={"text-primary-blue px-4"}
          title={t("title")}
          subtitle={t("subtitle")}
          introRequired={false}
          subtitleRequired={true}
          bgLineRequired={false}
        />
        <DivideXY>
          <div className="grid grid-col-1 md:grid-cols-4 gap-4 md:gap-10 mx-auto -mt-16">
            {" "}
            {data?.map((item, index) => (
              <Link href={item.link} key={index}>
                {" "}
                <div className=" shadow-md hover:shadow-2xl rounded-xl">
                  <div className="p-2 hover:p-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="rounded-xl w-full h-40"
                      placeholder="blur"
                      blurDataURL={"/img/logo.png"}
                    />
                  </div>
                  <div className="text-center text-secondary-purple text-xl md:text-2xl py-2 flex justify-center">
                    <p className="mx-2 text-2xl"> {item.icon}</p>
                    <h4 className=" font-bold">{item.name}</h4>
                  </div>
                  <p className="px-2 text-sm md:text-lg text-black text-center">
                    {item.description}
                  </p>
                  <div className="py-4 md:py-4 w-2/4 mx-auto">
                    <button
                      type="submit"
                      className={`px-2 py-2 rounded-lg bg-primary-blue text-md md:text-base font-medium text-white w-full hover:shadow-lg hover:bg-primary-purple hover:text-black`}
                    >
                      <span className="hover:hidden mx-2"> {t("btnText")}</span>
                      <FaArrowRight className="inline text-base md:text-lg hover:visible" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </DivideXY>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
