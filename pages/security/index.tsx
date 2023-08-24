import Title from "@/components/Typography/Title";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";

export default function Security() {
  const t = useTranslations("Security");
  return (
    <>
      <div className="mt-8">
        <Title
          intro={""}
          titleColor={"text-primary-blue text-lg px-4 md:text-3xl"}
          title={t("title")}
          subtitle={""}
          introRequired={false}
          subtitleRequired={false}
          bgLineRequired={false}
        />
      </div>

      <article className="mx-4 md:mx-16 p-4 md:p-8 rounded-lg leading-loose tracking-wide my-2">
        {" "}
        <p className="text-gray-800 text-sm md:text-lg">{t("intro")}</p>
        <ul className="text-gray-800 text-sm md:text-lg list-disc pl-4 my-4">
          <li>{t("items.one")}</li>
          <li>{t("items.two")}</li>
          <li>{t("items.three")}</li>
        </ul>
        <p className="text-gray-800 text-sm md:text-lg my-4">
          {t("outro")}
          <a
            href="mailto:support@lingocomm.com"
            className="text-secondary-purple hover:cursor-pointer"
          >
            {" "}
            support@lingocomm.com
          </a>
        </p>
      </article>
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
