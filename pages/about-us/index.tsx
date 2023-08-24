import Title from "@/components/Typography/Title";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";

export default function About() {
  const t = useTranslations("AboutUs");

  return (
    <div className="mb-16">
      <div className="mt-8">
        <Title
          intro={""}
          titleColor={"text-primary-blue px-4"}
          title={t("title")}
          subtitle={""}
          introRequired={false}
          subtitleRequired={false}
          bgLineRequired={false}
        />
      </div>

      <div className="mx-8 md:mx-16 shadow-lg p-8 rounded-lg leading-loose tracking-wide">
        {" "}
        <h4 className="capitalize font-bold mb-4 text-base md:text-2xl text-primary-blue">
          <span className="text-primary-purple">{t("itemOne.number")}</span>{" "}
          {t("itemOne.title")}
        </h4>
        <p className="text-black text-sm md:text-lg">
          {t("itemOne.description")}
        </p>
      </div>
      <div className="mx-8 md:mx-16 shadow-lg p-8 rounded-lg leading-loose tracking-wide">
        {" "}
        <h4 className="capitalize font-bold mb-4 text-base md:text-2xl text-primary-blue">
          <span className="text-primary-purple">{t("itemTwo.number")}</span>{" "}
          {t("itemTwo.title")}
        </h4>
        <p className="text-black text-sm md:text-lg">
          {t("itemTwo.description")}
        </p>
      </div>
      <div className="mx-8 md:mx-16 shadow-lg p-8 rounded-lg leading-loose tracking-wide">
        {" "}
        <h4 className="capitalize font-bold mb-4 text-base md:text-2xl text-primary-blue">
          <span className="text-primary-purple">{t("itemThree.number")}</span>{" "}
          {t("itemThree.title")}
        </h4>
        <p className="text-black text-sm md:text-lg">
          {t("itemThree.description")}
        </p>
      </div>
      <div className="mx-8 md:mx-16 shadow-lg p-8 rounded-lg leading-loose tracking-wide">
        {" "}
        <h4 className="capitalize font-bold mb-4 text-base md:text-2xl text-primary-blue">
          <span className="text-primary-purple">{t("itemFour.number")}</span>{" "}
          {t("itemFour.title")}
        </h4>
        <p className="text-black text-sm md:text-lg">
          {t("itemFour.description")}
        </p>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
