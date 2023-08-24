import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHome, FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

const Success = () => {
  const searchParams = useSearchParams();
  const [service, setService] = useState<string | null>();
  const [paymentStatus, setPaymentStatus] = useState<any>(
    searchParams?.get("redirect_status")
  );
  const { locale } = useRouter();
  const t = useTranslations("SuccessComponent");

  useEffect(() => {
    //do this once
    const key = searchParams?.get("dataKey");
    switch (key) {
      case "lingoAudioServiceData": {
        setService("Audio production service");
        break;
      }
      case "lingoEditingServiceData": {
        setService("Editing service");
        break;
      }
      case "lingoGhostwritingServiceData": {
        setService("Ghostwriting service");
        break;
      }
      case "lingoTechnicalwritingServiceData": {
        setService("Technical writing service");
        break;
      }
      case "lingoTranslationServiceData": {
        setService("Translation service");
        break;
      }
      default: {
        //do nothing
        break;
      }
    }
  }, []);

  return (
    <>
      <div className="text-lg md:text-xl font-medium leading-loose text-center my-16 ">
        <div className="md:rounded-lg md:shadow-xl md:mx-16  md:p-8">
          <span className="flex justify-center">
            {paymentStatus === "succeeded" ? (
              <FaCheckCircle className="text-4xl md:text-7xl text-green-600 mt-4 backdrop-blur-lg" />
            ) : (
              <MdCancel className="text-4xl md:text-7xl text-primary-red mt-4 backdrop-blur-lg" />
            )}
          </span>
          {paymentStatus === "succeeded" ? (
            <>
              {service !== null || locale !== "en" ? (
                <h4 className="my-4 text-3xl font-bold text-primary-blue">
                  Your payment for {service} was successful
                </h4>
              ) : (
                <h4 className="my-4 text-3xl font-bold text-primary-blue">
                  {t("success")}
                </h4>
              )}
            </>
          ) : (
            <>
              {service !== null || locale !== "en" ? (
                <h4 className="my-4 text-3xl font-bold text-primary-blue">
                  Your payment for {service} was not successful
                </h4>
              ) : (
                <h4 className="my-4 text-3xl font-bold text-primary-blue">
                  {t("failure")}
                </h4>
              )}
            </>
          )}

          <p className="my-8"> {t("info")}</p>
          <Link href="/">
            <button
              className={`px-4 md:px-8 py-4 rounded-lg text-lg md:text-xl font-medium bg-gray-100 text-primary-blue hover:text-white hover:bg-primary-blue hover:shadow-lg backdrop-blur-lg`}
            >
              {t("btnText")} <FaHome className="inline mx-2" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Success;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
