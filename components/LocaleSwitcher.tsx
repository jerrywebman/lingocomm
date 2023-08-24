import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import es from "/public/images/flags/es.svg";
import pt from "/public/images/flags/PT.svg";
import en from "/public/images/flags/US.svg";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const { locale, locales, route } = useRouter();
  const [image, setImage] = useState(en);
  const otherLocale = locales?.find((cur) => cur !== locale);

  const languages = [
    {
      id: 1,
      code: "en",
      image: en,
    },
    {
      id: 2,
      code: "es",
      image: es,
    },
    {
      id: 3,
      code: "pt",
      image: pt,
    },
  ];

  useEffect(() => {
    // switch case
    switch (locale) {
      case "en": {
        setImage(en);
        break;
      }
      case "es": {
        setImage(es);
        break;
      }
      default: {
        setImage(pt);
        break;
      }
    }
  }, [locale]);

  return (
    <>
      <Dropdown
        key={locale}
        inline
        className="mx-2"
        label={
          <Image
            src={image}
            alt={"country logo"}
            width={20}
            height={20}
            className="inline"
          />
        }
      >
        {languages?.map((item, index) => (
          <span key={index}>
            <Dropdown.Item>
              <Link href={item.code} locale={item.code}>
                <span className="text-sm font-bold hover:text-primary-blue hover:text-lg">
                  {t("locale", { locale: item.code })}{" "}
                  <Image
                    src={item.image}
                    alt={item.code}
                    width={20}
                    height={20}
                    className="inline"
                  />
                </span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
          </span>
        ))}
      </Dropdown>
    </>
  );
}
