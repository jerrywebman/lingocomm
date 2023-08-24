import { GetStaticPropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import onorioImg from "/public/images/Onario_korsgy.jpg";
import wolburg from "/public/images/slider/wolburg.png";
import korsgy from "/public/images/slider/korsgy.png";
import sethex from "/public/images/slider/sethex.png";
import HomePageHero from "@/components/Hero/HomePageHero";
import ContactForm from "@/components/Form/ContactForm";
import Title from "@/components/Typography/Title";
import SmallerText from "@/components/Typography/SmallerText";
import DivideY from "@/components/Divider/DivideY";
import DivideXY from "@/components/Divider/DivideXY";
import { useTranslations } from "next-intl";
import {
  IoIosCash,
  IoIosPeople,
  IoIosThumbsUp,
  IoIosTimer,
} from "react-icons/io";
import { FaQuoteRight, FaQuoteLeft, FaStar } from "react-icons/fa";

export default function Home() {
  const t = useTranslations("HomePage.Qualities");
  const trans = useTranslations("HomePage.Reviews");
  const transAffiliates = useTranslations("HomePage.Affiliates");
  return (
    <>
      <main className="items-center justify-between">
        <HomePageHero />
        {/* Qualities Starts*/}
        {/* <DivideY> */}
        <div className="px-8 md:px-16 py-8 md:py-16 bg-primary-blue ">
          <Title
            intro={""}
            titleColor={"text-white"}
            title={t("title")}
            subtitle={t("subtitle")}
            introRequired={false}
            subtitleRequired={true}
            bgLineRequired={false}
          />
          <div className=" grid grid-col-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="w-full text-center p-8 border-solid outline-white outline outline-offset-2 outline-2 rounded-md">
              <div className="">
                <IoIosPeople className="text-5xl md:text-7xl mx-auto mb-4 text-primary-purple" />
              </div>

              <h4 className="capitalize font-bold mb-4 text-xl md:text-2xl text-white">
                {t("human.title")}
              </h4>
              <p className="text-gray-300 text-sm md:text-lg">
                {t("human.intro")}
              </p>
            </div>
            <div className="w-full text-center p-8 border-solid outline-white outline outline-offset-2 outline-2 rounded-md">
              <div className="">
                <IoIosTimer className="text-5xl md:text-7xl mx-auto mb-4 text-primary-red" />
              </div>

              <h4 className="capitalizefont-bold mb-4 text-xl md:text-2xl text-white">
                {t("fast.title")}
              </h4>
              <p className="text-gray-300 text-sm md:text-lg">
                {t("fast.intro")}
              </p>
            </div>
            <div className="w-full text-center p-8 border-solid outline-white outline outline-offset-2 outline-2 rounded-md">
              <div className="">
                <IoIosCash className="text-5xl md:text-7xl mx-auto mb-4 text-yellow-300" />
              </div>

              <h4 className="capitalizefont-bold mb-4 text-xl md:text-2xl text-white">
                {t("cost.title")}
              </h4>
              <p className="text-gray-300 text-sm md:text-lg">
                {t("cost.intro")}
              </p>
            </div>
            <div className="w-full text-center p-8 border-solid outline-white outline outline-offset-2 outline-2 rounded-md">
              <div className="">
                <IoIosThumbsUp className="text-5xl md:text-7xl mx-auto mb-4 text-orange-600" />
              </div>

              <h4 className="capitalizefont-bold mb-4 text-xl md:text-2xl text-white">
                {t("team.title")}
              </h4>
              <p className="text-gray-300 text-sm md:text-lg">
                {t("fast.intro")}
              </p>
            </div>
          </div>
        </div>
        {/* </DivideY> */}
        {/* Qualities Ends*/}
        {/* Reviews Starts*/}
        <DivideY>
          <div className="px-8">
            <Title
              intro={""}
              titleColor={"text-primary-blue"}
              title={trans("title")}
              subtitle={trans("subtitle")}
              introRequired={false}
              subtitleRequired={true}
              bgLineRequired={false}
            />
            <div className="text-center p-4 md:p-16 shadow-2xl bg-gray-200 rounded-lg">
              <div className="flex justify-center">
                {" "}
                <div className="px-4 py-4">
                  <Image
                    src={onorioImg}
                    alt="Onario"
                    className="rounded-full h-16 w-16 shadow-xl"
                  />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold">
                    Onório Cutane
                  </h4>
                  <p className="text-sm md:text-lg font-normal text-gray-700">
                    {trans("writerProfession")}
                  </p>
                  <p className="">
                    <FaStar className="text-yellow-400 inline" />
                    <FaStar className="text-yellow-400 inline" />
                    <FaStar className="text-yellow-400 inline" />
                    <FaStar className="text-yellow-400 inline" />
                    <FaStar className="text-yellow-400 inline" />
                  </p>
                </div>
              </div>
              <FaQuoteLeft className="text-2xl text-gray-400" />
              <SmallerText intro={trans("quote")} />
              <FaQuoteRight className="-mt-8 text-2xl text-gray-400 float-right" />
            </div>
          </div>
        </DivideY>
        {/* Reviews Ends*/}
        {/* Reviews Starts*/}
        <DivideY>
          <div className="px-8">
            <Title
              intro={""}
              titleColor={"text-primary-blue"}
              title={transAffiliates("title")}
              subtitle={transAffiliates("subtitle")}
              introRequired={false}
              subtitleRequired={true}
              bgLineRequired={false}
            />
            <div className="px-4 py-2 md:px-32 grid grid-cols-3 gap-4">
              <Link href="https://wolburg.com" target="_blank">
                <Image src={wolburg} alt="wolburg" className="shadow-sm" />
              </Link>
              <Link href="https://korsgy.com" target="_blank">
                <Image src={korsgy} alt="Korsgy" className="shadow-sm" />
              </Link>
              <Link href="https://sethex.com" target="_blank">
                <Image src={sethex} alt="sethex" className="shadow-sm" />
              </Link>
            </div>
          </div>
        </DivideY>
        {/* Reviews Ends*/}
        {/* <PartnerLogoSlider /> */}
        <DivideXY>
          <ContactForm />
        </DivideXY>
      </main>
    </>
  );
}
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
}
