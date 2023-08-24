import { GetStaticPropsContext } from "next";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import DivideXY from "@/components/Divider/DivideXY";
import Title from "@/components/Typography/Title";
import RoundedButton from "@/components/Button/RoundedButton";
import { FaFileContract, FaInfo, FaMoneyCheck } from "react-icons/fa";
import NoUser from "@/components/Auth/NoUser";
import { UserContext } from "@/context/user.context";
import { DataContext } from "@/context/data.context";
import { useForm, SubmitHandler } from "react-hook-form";
import PaymentProcessCard from "@/components/Cards/PaymentProcessCard";
import { useTranslations } from "next-intl";
import UserDetails from "@/components/Auth/UserDetails";

type TechnicalWritingInputs = {
  type: string;
  topic: string;
  wordCount: number;
  writingAssignment: string;
  specificRequirement: string;
  listOfResource?: string;
  file?: any;
};

export default function TechnicalWriting() {
  let pricePerWord: number = 0.25;
  const [toggle, setToggle] = useState("details");
  const [showOther, setShowOther] = useState(false);
  const [isDataComplete, setIsDataComplete] = useState(false);
  const [isExistingData, setIsExistingData] = useState(false);
  const [allData, setAllData] = useState<any>({});
  const { user } = useContext(UserContext);
  const t = useTranslations("WritingService");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TechnicalWritingInputs>();

  // watch for input changes
  useEffect(() => {
    const subscription = watch((data) => {
      if (
        data.topic === "" ||
        data.writingAssignment === "" ||
        data.wordCount === null ||
        data.specificRequirement === ""
      ) {
        setIsDataComplete(false);
      } else {
        setIsDataComplete(true);
        setAllData(data);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, toggle]);

  //HANDLE THE FORM DATA
  const onSubmit: SubmitHandler<TechnicalWritingInputs> = (data) => {
    setToggle("payment");
    //set the total price here
    const newData = {
      ...data,
      fullname: user?.firstname + " " + user?.lastname,
      email: user?.email,
      pricePerWord,
      totalPrice: pricePerWord * data.wordCount,
    };
    setAllData(newData);
    //save the data to local storage
    sessionStorage.setItem(
      "lingoTechnicalwritingServiceData",
      JSON.stringify(newData)
    );
  };

  return (
    <DivideXY>
      <div className="rounded-xl shadow-xl p-2 md:p-8">
        <Title
          intro={""}
          titleColor={"text-primary-blue px-2"}
          title={t("title")}
          subtitle={t("subtitle")}
          introRequired={false}
          subtitleRequired={true}
          bgLineRequired={false}
        />
        <div className="p-2">
          <div className="grid grid-cols-3 md:mx-8 md:gap-8 divide-x text-center">
            <div
              onClick={() => setToggle("details")}
              className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 ${
                toggle === "details"
                  ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                  : ""
              }`}
            >
              <p>
                <FaFileContract className="inline" />{" "}
                <span className="hidden md:block capitalize">{t("Tab.0")}</span>
              </p>
            </div>
            {isDataComplete ? (
              <>
                {" "}
                <div
                  onClick={() => setToggle("information")}
                  className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 cursor-pointer ${
                    toggle === "information"
                      ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                      : ""
                  } `}
                >
                  <p>
                    <FaInfo className="inline" />{" "}
                    <span className="hidden md:block capitalize">
                      {t("Tab.1")}
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div
                  className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 cursor-not-allowed ${
                    toggle === "information"
                      ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                      : ""
                  }`}
                >
                  <p>
                    <FaInfo className="inline" />{" "}
                    <span className="hidden md:block capitalize">
                      {t("Tab.1")}
                    </span>
                  </p>
                </div>
              </>
            )}

            <div
              onClick={() => setToggle("payment")}
              className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 ${
                toggle === "payment"
                  ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                  : ""
              }`}
            >
              <p>
                <FaMoneyCheck className="inline" />{" "}
                <span className="hidden md:block">{t("Tab.2")}</span>
              </p>
            </div>
          </div>
          <hr className="my-6"></hr>
          <div className="">
            {/* Details Starts */}
            <form
              className="space-y-2 p-2 max-w-4xl mx-auto lg:px-12 max-md:max-w-sm "
              onSubmit={handleSubmit(onSubmit)}
              method="POST"
              action="#"
              encType="multipart/form-data"
            >
              {toggle === "details" ? (
                <>
                  <div className="space-y-2 py-2">
                    <span className="text-lg md:text-2xl font-bold block text-center md:hidden capitalize">
                      {t("details")}
                    </span>
                  </div>
                  {/* <div className="space-y-2 py-2">
                    <label htmlFor="fname" className="font-base text-lg block">
                      Document Type <span className="text-red-800">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter the document type .pdf , .doc, .docx ..."
                      className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                        errors.type &&
                        "border-primary-red focus:border-primary-red"
                      }`}
                      {...register("type", { required: true })}
                    />
                    {errors.type && (
                      <small className="text-primary-red text-xs">
                        Please enter document type
                      </small>
                    )}
                  </div> */}
                  <div className="space-y-2 py-2">
                    <label
                      htmlFor="writingassignment"
                      className="font-base text-lg block"
                    >
                      {t("form.assignment")}
                      <span className="text-red-800"> *</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t("form.assignmentPlaceholder")}
                      className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                        errors.writingAssignment &&
                        "border-primary-red focus:border-primary-red"
                      }`}
                      {...register("writingAssignment", { required: true })}
                    />
                    {errors.writingAssignment && (
                      <small className="text-primary-red text-xs">
                        {t("form.assignmentPlaceholder")}
                      </small>
                    )}
                  </div>
                  <div className="space-y-2 py-2">
                    <label htmlFor="lname" className="font-base text-lg block">
                      {t("form.topic")} <span className="text-red-800">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t("form.topicPlaceholder")}
                      className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                        errors.topic &&
                        "border-primary-red focus:border-primary-red"
                      }`}
                      {...register("topic", { required: true })}
                    />
                    {errors.topic && (
                      <small className="text-primary-red text-xs">
                        {t("form.topicPlaceholder")}
                      </small>
                    )}
                  </div>

                  <div className=" space-y-2">
                    {" "}
                    <div className=" w-full">
                      <label
                        htmlFor="wordcount"
                        className="font-base text-lg block pt-4"
                      >
                        {t("form.wordcount")}{" "}
                        <span className="text-red-800">*</span>
                      </label>
                      <input
                        type="number"
                        placeholder={t("form.wordcountPlaceholder")}
                        className={`p-3 rounded-lg border focus:border-primary-blue w-full  ${
                          errors.wordCount &&
                          "border-primary-red focus:border-primary-red"
                        }`}
                        {...register("wordCount", { required: true })}
                      />
                      {errors.wordCount && (
                        <small className="text-primary-red text-xs">
                          {t("form.wordcountPlaceholder")}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="font-base text-lg block"
                    >
                      {t("form.requirement")}{" "}
                      <span className="text-red-800">*</span>
                    </label>
                    <textarea
                      placeholder={t("form.requirementPlaceholder")}
                      className={`p-3 h-48 rounded-lg border focus:border-primary-blue w-full ${
                        errors.specificRequirement &&
                        "border-primary-red focus:border-primary-red"
                      }`}
                      {...register("specificRequirement", { required: true })}
                    ></textarea>
                    {errors.specificRequirement && (
                      <small className="text-primary-red text-xs">
                        {t("form.requirementPlaceholder")}
                      </small>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="font-base text-lg block"
                    >
                      {t("form.resources")}
                    </label>
                    <textarea
                      placeholder={t("form.resourcesPlaceholder")}
                      className={`p-3 h-48 rounded-lg border focus:border-primary-blue w-full ${
                        errors.listOfResource &&
                        "border-primary-red focus:border-primary-red"
                      }`}
                      {...register("listOfResource")}
                    ></textarea>
                    {errors.listOfResource && (
                      <small className="text-primary-red text-xs">
                        {t("form.resourcesPlaceholder")}
                      </small>
                    )}
                  </div>
                  <div className="flex flex-col md:w-max md:mx-auto text-center">
                    <label className="font-base text-lg block">
                      {t("uploadText")}:
                      <input
                        type="file"
                        className={`p-3 rounded-lg border focus:border-primary-blue w-full my-4 ${
                          errors.file &&
                          "border-primary-red focus:border-primary-red"
                        }`}
                        {...register("file")}
                      />
                    </label>
                  </div>
                  <div className="flex space-x-3 py-8">
                    <Link href="/services" className="w-3/4">
                      <RoundedButton
                        text={t("cancelBtnText")}
                        color={"bg-primary-red"}
                      />
                    </Link>

                    <span
                      onClick={() => setToggle("information")}
                      className={`w-3/4 text-center bg-gray-400 py-2 px-4 rounded-lg hover:bg-secondary-purple hover:text-white font-fold cursor-pointer ${
                        isDataComplete ? "visible" : "invisible"
                      }`}
                    >
                      {t("continueBtnText")}
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
              {/* Details ends */}
              {toggle === "information" ? (
                <div className="space-y-2 p-2 max-w-4xl mx-auto lg:px-12 max-md:max-w-sm ">
                  <div className="space-y-2 py-2">
                    <span className="text-lg md:text-2xl font-bold block text-center md:hidden capitalize text-black">
                      {t("details")}
                    </span>
                  </div>
                  <div className="space-y-2 divide-y-2 text-left">
                    {!user ? (
                      <>
                        <NoUser
                          services={"lingoTechnicalwritingServiceData"}
                          returnUrl={"/services/technicalwriting"}
                          data={allData}
                        />
                      </>
                    ) : (
                      <UserDetails />
                    )}

                    <div>
                      <h4 className="text-base font-bold py-4 md:text-2xl">
                        {t("form.topic")}
                      </h4>
                      <p className="text-md md:text-lg text-gray-600">
                        {allData?.topic}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-base font-bold py-4 md:text-2xl">
                        {t("form.requirement")}
                      </h4>
                      <p className="text-md md:text-lg text-gray-600">
                        {allData?.specificRequirement}
                      </p>
                    </div>

                    {allData?.listOfResource && (
                      <div>
                        <h4 className="text-lg font-bold py-4 md:text-2xl">
                          {t("form.resources")}
                        </h4>
                        <p className="text-md md:text-lg text-gray-600">
                          {allData?.listOfResource}
                        </p>
                      </div>
                    )}
                    {allData?.file.length > 0 && (
                      <div>
                        <h4 className="text-lg font-bold py-4 md:text-2xl">
                          {t("form.doc")}
                        </h4>
                        <p className="text-md md:text-lg text-gray-600">
                          {allData?.file[0].name}
                        </p>
                      </div>
                    )}
                    <div>
                      <h4 className="text-base font-bold py-4 md:text-2xl">
                        {t("form.wordcount")}
                      </h4>
                      <p className="text-md md:text-lg text-gray-600">
                        {allData?.wordCount}{" "}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-base font-bold py-4 md:text-2xl">
                        {t("price")}
                      </h4>
                      <p className="text-md md:text-lg text-primary-red font-bold">
                        €{allData?.wordCount * pricePerWord}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-3 py-8">
                    <span
                      onClick={() => setToggle("details")}
                      className="w-3/4 text-center text-white bg-primary-red py-2 px-4 rounded-lg hover:bg-secondary-purple hover:text-white font-fold cursor-pointer"
                    >
                      {t("backBtnText")}
                    </span>
                    <span className={`${!user ? "hidden" : "inline w-full"}`}>
                      <RoundedButton
                        text={t("payment")}
                        color={"bg-gray-400"}
                      />
                    </span>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </form>
            {toggle === "payment" ? (
              <>
                <PaymentProcessCard
                  formData={allData}
                  dataKey={"lingoTechnicalwritingServiceData"}
                  serviceType={"Technicalwriting Service"}
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </DivideXY>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
