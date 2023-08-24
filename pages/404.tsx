import { GetStaticPropsContext } from "next";
import { useState, useEffect } from "react";
import Title from "@/components/Typography/Title";
import { useTranslations } from "next-intl";
import ButtonWithIconLeft from "@/components/Button/ButtonWithIconLeft";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Custom404() {
  const [count, setCount] = useState<number>(5);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      setCount(count - 1);
    }, 1000);
    if (count === 0) router.push("/");
  }, [count]);

  const t = useTranslations("PageErrorComponent");
  return (
    <div className="my-16 h-full">
      <Title
        intro={""}
        titleColor={"text-primary-blue px-4 "}
        title={t("title")}
        subtitle={t("subtitle")}
        introRequired={false}
        subtitleRequired={true}
        bgLineRequired={false}
      />
      <p className="text-primary-blue leading-5 md:leading-loose font-normal text-center text-lg md:text-2xl mb-8">
        {count}
      </p>

      <Link href="/">
        <ButtonWithIconLeft value={t("btnText")} />
      </Link>
    </div>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
}
