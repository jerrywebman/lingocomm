import Title from "@/components/Typography/Title";
import { TbTargetArrow } from "react-icons/tb";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";

export default function Faq() {
  const t = useTranslations("Faq");
  const data = [
    {
      id: 1,
      title: "What is Lingo?",
      moreInfo:
        "Lingo is a document and translating company. We transform your ideas and creative process into books, manuals, and manuscripts in 20 different languages. Among the services we provide are translation, ghostwriting, and audio book production. Other services include technical writing, document certification, printing, and interpretation.",
    },
    {
      id: 2,
      title: "Why choose Lingo?",
      moreInfo:
        "We provide more languages than other translation firms. More than that, we take pride in the sheer excellence and perfection with which we complete each task. You can also get expert advice from our in-house business intelligence and development team.",
    },
    {
      id: 3,
      title: "How can Lingo improve my business?",
      moreInfo:
        "Our editing and ghostwriting services guarantee you error-free and grammatically sound content, while our translation service helps you reach new audiences around the world. Our audio services also give people a more practical way to listen to your content in various languages. Every time we start a learning journey, Lingo takes all of these things into account. It's time to focus on other areas of your business while Lingo handles the creative side.",
    },
    {
      id: 4,
      title: "What languages are available?",
      moreInfo: `We currently offer support in 20 languages including, English, French, Portuguese, Spanish, Italian, German, Chinese, Korean, Japanese, Polish, Czech, Slovak, Turkish, Arabic, Hebrew, Persian, Indonesian, Russian, Dutch, and Hindi.`,
    },
    {
      id: 5,
      title: " I need a certified document. Where do you offer this service?",
      moreInfo:
        "We are able to provide this service in the following countries: Portugal, the USA, Ireland, the UK, and Tunisia.",
    },
    {
      id: 6,
      title: "How is the cost calculated?",
      moreInfo:
        "All our services are priced differently. Translation, editing, ghostwriting, technical writing, and audio production services are priced per word. Our printing services are charged per page, while document certification and interpretation vary based on the needs of our clients. Also, revisions are billed on an hourly basis.",
    },
    {
      id: 7,
      title:
        "What is the difference between Standard and Technical Translation/Editing/Writing?",
      moreInfo:
        "Our Standard creative services deal with any piece of work considered non-technical, including website content, articles, non-technical books, etc. If you need us to help you with a more complex document, that’s where our technical services come in handy! We can help you with anything from legal contracts, thesis, and instruction manuals here.",
    },
    {
      id: 8,
      title: "When can I expect my project to be delivered?",
      moreInfo: `The deadline for your order will depend on the service you selected and the word count. Projects up to 5K words have a deadline of 1-2 days, and projects can range from 3-4 days (15K words) and 10+ days for projects with more than 40K words. The exact due date will be determined after your order is confirmed, and it will be sent to you via email. You can also access “my purchases” and check the status of your order, which is updated at the end of every business day.`,
    },
    {
      id: 9,
      title:
        "My project was finalized, but I want to request revisions. What do I do?",
      moreInfo: `You may request it by responding to the email you received with your final draft. The Project Manager will then arrange a free 30-min consultation for revisions. Please keep in mind that any additional revisions will have an extra cost.`,
    },
    {
      id: 10,
      title:
        "What differences exist between the standard and premium printing?",
      moreInfo: `Our standard printing services are tailored to meet your basic needs. The premium package comes with a personalized cover feature.`,
    },
  ];

  return (
    <div className="mb-8">
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

      <article className="mx-8 md:mx-16 shadow-lg p-4 md:p-8 rounded-lg leading-loose tracking-wide my-2">
        {" "}
        <h4 className="capitalize font-bold mb-4 text-base md:text-2xl text-primary-blue">
          <span className="text-primary-purple mr-2">
            <TbTargetArrow className="inline md:h-12 md:w-12" />
          </span>{" "}
          {t("one.title")}
        </h4>
        <hr className="my-2 shadow-sm"></hr>
        <p className="text-gray-800 text-sm md:text-lg"> {t("one.moreInfo")}</p>
      </article>
      <article className="mx-8 md:mx-16 shadow-lg p-4 md:p-8 rounded-lg leading-loose tracking-wide my-2">
        {" "}
        <h4 className="capitalize font-bold mb-4 text-base md:text-2xl text-primary-blue">
          <span className="text-primary-purple mr-2">
            <TbTargetArrow className="inline md:h-12 md:w-12" />
          </span>{" "}
          {t("two.title")}
        </h4>
        <hr className="my-2 shadow-sm"></hr>
        <p className="text-gray-800 text-sm md:text-lg"> {t("two.moreInfo")}</p>
      </article>
      <article className="mx-8 md:mx-16 shadow-lg p-4 md:p-8 rounded-lg leading-loose tracking-wide my-2">
        {" "}
        <h4 className="capitalize font-bold mb-4 text-base md:text-2xl text-primary-blue">
          <span className="text-primary-purple mr-2">
            <TbTargetArrow className="inline md:h-12 md:w-12" />
          </span>{" "}
          {t("three.title")}
        </h4>
        <hr className="my-2 shadow-sm"></hr>
        <p className="text-gray-800 text-sm md:text-lg">
          {" "}
          {t("three.moreInfo")}
        </p>
      </article>
      <article className="mx-8 md:mx-16 shadow-lg p-4 md:p-8 rounded-lg leading-loose tracking-wide my-2">
        {" "}
        <h4 className="capitalize font-bold mb-4 text-base md:text-2xl text-primary-blue">
          <span className="text-primary-purple mr-2">
            <TbTargetArrow className="inline md:h-12 md:w-12" />
          </span>{" "}
          {t("four.title")}
        </h4>
        <hr className="my-2 shadow-sm"></hr>
        <p className="text-gray-800 text-sm md:text-lg">
          {" "}
          {t("four.moreInfo")}
        </p>
      </article>
      <article className="mx-8 md:mx-16 shadow-lg p-4 md:p-8 rounded-lg leading-loose tracking-wide my-2">
        {" "}
        <h4 className="capitalize font-bold mb-4 text-base md:text-2xl text-primary-blue">
          <span className="text-primary-purple mr-2">
            <TbTargetArrow className="inline md:h-12 md:w-12" />
          </span>{" "}
          {t("five.title")}
        </h4>
        <hr className="my-2 shadow-sm"></hr>
        <p className="text-gray-800 text-sm md:text-lg">
          {" "}
          {t("five.moreInfo")}
        </p>
      </article>
      <article className="mx-8 md:mx-16 shadow-lg p-4 md:p-8 rounded-lg leading-loose tracking-wide my-2">
        {" "}
        <h4 className="capitalize font-bold mb-4 text-base md:text-2xl text-primary-blue">
          <span className="text-primary-purple mr-2">
            <TbTargetArrow className="inline md:h-12 md:w-12" />
          </span>{" "}
          {t("six.title")}
        </h4>
        <hr className="my-2 shadow-sm"></hr>
        <p className="text-gray-800 text-sm md:text-lg"> {t("six.moreInfo")}</p>
      </article>
      <article className="mx-8 md:mx-16 shadow-lg p-4 md:p-8 rounded-lg leading-loose tracking-wide my-2">
        {" "}
        <h4 className="capitalize font-bold mb-4 text-base md:text-2xl text-primary-blue">
          <span className="text-primary-purple mr-2">
            <TbTargetArrow className="inline md:h-12 md:w-12" />
          </span>{" "}
          {t("seven.title")}
        </h4>
        <hr className="my-2 shadow-sm"></hr>
        <p className="text-gray-800 text-sm md:text-lg">
          {" "}
          {t("seven.moreInfo")}
        </p>
      </article>
      <article className="mx-8 md:mx-16 shadow-lg p-4 md:p-8 rounded-lg leading-loose tracking-wide my-2">
        {" "}
        <h4 className="capitalize font-bold mb-4 text-base md:text-2xl text-primary-blue">
          <span className="text-primary-purple mr-2">
            <TbTargetArrow className="inline md:h-12 md:w-12" />
          </span>{" "}
          {t("eight.title")}
        </h4>
        <hr className="my-2 shadow-sm"></hr>
        <p className="text-gray-800 text-sm md:text-lg">
          {" "}
          {t("eight.moreInfo")}
        </p>
      </article>
      <article className="mx-8 md:mx-16 shadow-lg p-4 md:p-8 rounded-lg leading-loose tracking-wide my-2">
        {" "}
        <h4 className="capitalize font-bold mb-4 text-base md:text-2xl text-primary-blue">
          <span className="text-primary-purple mr-2">
            <TbTargetArrow className="inline md:h-12 md:w-12" />
          </span>{" "}
          {t("nine.title")}
        </h4>
        <hr className="my-2 shadow-sm"></hr>
        <p className="text-gray-800 text-sm md:text-lg">
          {" "}
          {t("nine.moreInfo")}
        </p>
      </article>
      <article className="mx-8 md:mx-16 shadow-lg p-4 md:p-8 rounded-lg leading-loose tracking-wide my-2">
        {" "}
        <h4 className="capitalize font-bold mb-4 text-base md:text-2xl text-primary-blue">
          <span className="text-primary-purple mr-2">
            <TbTargetArrow className="inline md:h-12 md:w-12" />
          </span>{" "}
          {t("ten.title")}
        </h4>
        <hr className="my-2 shadow-sm"></hr>
        <p className="text-gray-800 text-sm md:text-lg"> {t("ten.moreInfo")}</p>
      </article>
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
