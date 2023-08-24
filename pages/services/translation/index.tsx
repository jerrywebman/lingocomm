import { GetStaticPropsContext } from "next";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import DivideXY from "@/components/Divider/DivideXY";
import Title from "@/components/Typography/Title";
import RoundedButton from "@/components/Button/RoundedButton";
import NoUser from "@/components/Auth/NoUser";
import {
  FaCheckCircle,
  FaInfo,
  FaLanguage,
  FaStickyNote,
  FaWallet,
} from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserContext } from "@/context/user.context";
import { postDataWithFile } from "@/services/index";
import { toast } from "react-toastify";
import PaymentProcessCard from "@/components/Cards/PaymentProcessCard";
import { useTranslations } from "next-intl";
import UserDetails from "@/components/Auth/UserDetails";

//TYPES
type TranslationInputs = {
  fullname: string;
  email: string;
  phone: string;
  address: string;
  file: {}[];
  from: string;
  to: string;
  type: string;
};

export default function Translation() {
  const [pricePerWord, setPricePerWord] = useState<number>(0.11);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataComplete, setIsDataComplete] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [allData, setAllData] = useState<any>({});
  const [translationType, setTranslationType] = useState("");
  const [allExistingData, setAllExistingData] = useState<any>();
  const [toggle, setToggle] = useState("type");
  const [showOther, setShowOther] = useState(false);
  const [wordCount, setWordCount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>();
  const t = useTranslations("TranslationService");
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TranslationInputs>();

  //watch for file changes and get noOfWords
  useEffect(() => {
    if (translationType === "Standard") setPricePerWord(0.07);
    else setPricePerWord(0.11);
    //get the number of words
    const file = watch("file");
    if (file?.length > 0) {
      setIsUploadingFile(true);
      postDataWithFile("documents/count-words", { file: file[0] }).then(
        (res) => {
          if (res.NumberOfWords) {
            setWordCount(res.NumberOfWords);
            setTotalPrice(res.NumberOfWords * 0.07);
          } else {
            toast.error(t("response"));
          }
          setIsUploadingFile(false);
        }
      );
    }
  }, [watch("file")]);

  useEffect(() => {
    //see if an existing data exist
    const subscription = watch((data) => {
      if (
        data.from === "Select an option" ||
        data.to === "Select an option" ||
        data.to === data.from ||
        data.file?.length === 0
      ) {
        setIsDataComplete(false);
      } else {
        setIsDataComplete(true);
        setTotalPrice(wordCount * 0.07);
        setAllData(data);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  //run this function on click

  const onSubmit: SubmitHandler<TranslationInputs> = (data) => {
    setToggle("review");

    let newData = {
      ...allData,
      customer: user?._id,
      totalPrice: pricePerWord * wordCount,
      wordCount,
      type: translationType,
      pricePerWord,
    };

    console.log(newData);
    setAllData(newData);
    // postDataWithFile("translations/add", newData).then((res) => {
    //   //If failed, show error message else redirect to services page
    //   if (res.success === false) {
    //     setIsLoading(false);
    //     //send feedback to the user
    //     toast.error(`${res.message}`);
    //   } else {
    //     setIsLoading(false);
    //     //send feedback to the user
    //     toast.success(`${res.message}`);
    //     //show th trxn successful screen
    //     setToggle("submit");
    //   }
    // });
    // setToggle("payment");

    //set the total price here

    //save the data to local storage
    sessionStorage.setItem(
      "lingoTranslationServiceData",
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
          <div className="grid grid-cols-4 md:mx-8 md:gap-8 divide-x text-center">
            <>
              {" "}
              <div
                onClick={() => setToggle("type")}
                className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 ${
                  toggle === "type"
                    ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                    : ""
                }`}
              >
                <p>
                  <FaLanguage className="inline" />{" "}
                  <span className="hidden md:block capitalize">
                    {t("Tab.0")}
                  </span>
                </p>
              </div>
            </>

            {translationType === "" ? (
              <>
                <div
                  className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 cursor-not-allowed ${
                    toggle === "details"
                      ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                      : ""
                  }`}
                >
                  <p>
                    <FaStickyNote className="inline" />{" "}
                    <span className="hidden md:block capitalize">
                      {t("Tab.1")}
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <div
                onClick={() => setToggle("details")}
                className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 cursor-pointer ${
                  toggle === "details"
                    ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                    : ""
                }`}
              >
                <p>
                  <FaStickyNote className="inline" />{" "}
                  <span className="hidden md:block capitalize">
                    {t("Tab.1")}
                  </span>
                </p>
              </div>
            )}

            {!isDataComplete ? (
              <>
                <div
                  className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 cursor-not-allowed ${
                    toggle === "review"
                      ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black "
                      : ""
                  }`}
                >
                  <p>
                    <FaInfo className="inline" />{" "}
                    <span className="hidden md:block capitalize">
                      {t("Tab.2")}
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={() => setToggle("review")}
                  className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 cursor-pointer ${
                    toggle === "review"
                      ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                      : ""
                  }`}
                >
                  <p>
                    <FaInfo className="inline" />{" "}
                    <span className="hidden md:block capitalize">
                      {" "}
                      {t("Tab.2")}
                    </span>
                  </p>
                </div>
              </>
            )}

            <div
              // onClick={() => setToggle("submit")}
              className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 cursor-not-allowed ${
                toggle === "payment"
                  ? "bg-green-600 hover:bg-gray-200  text-white hover:text-black"
                  : ""
              }`}
            >
              <p>
                <FaWallet className="inline" />{" "}
                <span className="hidden md:block"> {t("Tab.3")}</span>
              </p>
            </div>
          </div>
          <hr className="my-6"></hr>
          <div className="">
            {/* Type Starts */}
            {toggle === "type" ? (
              <>
                <div className="space-y-2 py-2">
                  <span className="text-lg md:text-2xl font-bold block text-center  capitalize mb-8">
                    {t("info")}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 divide-y-2 md:divide-x-2">
                  <div
                    onClick={() => setTranslationType("Standard")}
                    className={`p-4 text-center text-black  rounded-lg cursor-pointer ${
                      translationType === "Standard"
                        ? " bg-primary-blue text-white shadow-2xl"
                        : "shadow-lg"
                    }`}
                  >
                    <h4 className={`text-lg md:text-2xl font-bold mb-4 `}>
                      {t("standard.title")}
                    </h4>
                    <hr className="py-4"></hr>
                    <p
                      className={`text-gray-600 ${
                        translationType === "Standard" ? " text-white" : ""
                      }`}
                    >
                      {t("standard.subtitle")}
                    </p>
                    <FaCheckCircle
                      className={`text-3xl  text-center block mx-auto my-4 ${
                        translationType === "Standard"
                          ? " text-green-500"
                          : "text-white"
                      }`}
                    />{" "}
                  </div>
                  <div
                    onClick={() => setTranslationType("Technical")}
                    className={`p-4 text-center text-black rounded-lg cursor-pointer ${
                      translationType === "Technical"
                        ? " bg-primary-blue text-white shadow-2xl"
                        : "shadow-lg"
                    }`}
                  >
                    <h4 className={`text-lg md:text-2xl font-bold mb-4 `}>
                      {t("technical.title")}
                    </h4>
                    <hr className="py-4"></hr>
                    <p
                      className={`text-gray-600 ${
                        translationType === "Technical" ? " text-white" : ""
                      }`}
                    >
                      {t("technical.subtitle")}
                    </p>
                    <FaCheckCircle
                      className={`text-3xl  text-center block mx-auto my-4 ${
                        translationType === "Technical"
                          ? " text-green-500"
                          : "text-white"
                      }`}
                    />{" "}
                  </div>
                </div>
                <div className="flex space-x-3 py-8">
                  <Link href={"/services"} className="w-3/4">
                    <button className="w-full text-center bg-primary-red py-2 px-4 rounded-lg hover:bg-primary-blue hover:text-white font-fold cursor-pointer">
                      {t("cancelBtnText")}
                    </button>{" "}
                  </Link>

                  <button
                    onClick={() => setToggle("details")}
                    className={`w-3/4 text-center bg-gray-400 py-2 px-4 rounded-lg  font-fold ${
                      translationType === ""
                        ? "cursor-not-allowed invisible"
                        : "hover:bg-primary-blue hover:text-white cursor-pointer "
                    }`}
                    disabled={translationType === ""}
                  >
                    {t("continueBtnText")}
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
            {/* type ends */}
            {/* Details Starts */}
            {toggle === "details" ? (
              <>
                <form
                  className="space-y-2 p-2 max-w-4xl mx-auto lg:px-12 max-md:max-w-sm "
                  onSubmit={handleSubmit(onSubmit)}
                  method="POST"
                  action="#"
                  encType="multipart/form-data"
                >
                  <div className="space-y-2 py-2">
                    <span className="text-lg md:text-2xl font-bold block text-center md:hidden capitalize">
                      {toggle}
                    </span>
                  </div>
                  <div className="input_field flex flex-col md:w-max md:mx-auto text-center my-4">
                    <label className="font-base text-lg block mb-4">
                      {t("uploadText")}{" "}
                      <span className="text-red-800">(pdf Only)*</span>
                      <input
                        type="file"
                        className={`my-4 text-sm cursor-pointer w-3/4 p-3 rounded-lg border focus:border-primary-blue ${
                          errors.file &&
                          "border-primary-red focus:border-primary-red"
                        }`}
                        {...register("file", { required: true })}
                      />
                      {errors.file && (
                        <small className="text-primary-red text-xs">
                          {t("uploadText")}
                        </small>
                      )}
                    </label>
                  </div>
                  <label htmlFor="from" className="font-base text-lg block">
                    {t("select.text")}
                  </label>
                  <div className="flex space-x-4">
                    <div className="space-y-2 py-2 w-full">
                      <label htmlFor="from" className="font-base text-lg block">
                        {t("select.from")}{" "}
                        <span className="text-red-800">*</span>
                      </label>
                      <select
                        className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                          errors.from &&
                          "border-primary-red focus:border-primary-red"
                        }`}
                        {...register("from", { required: true })}
                      >
                        <option> {t("select.text")}</option>
                        <option value="Arabic">Arabic</option>
                        <option value="French">French</option>
                        <option value="English">English</option>
                        <option value="Portuguese">Portuguese</option>
                        <option value="Spanish">Spanish</option>
                        <option value="German">German</option>
                        <option value="Chinese">Chinese</option>
                      </select>
                      {errors.from && (
                        <small className="text-primary-red text-xs">
                          Please select a language
                        </small>
                      )}
                    </div>

                    <div className="space-y-2 py-2 w-full">
                      <label htmlFor="dob" className="font-base text-lg block">
                        {t("select.to")} :{" "}
                        <span className="text-red-800">*</span>
                      </label>
                      <select
                        className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                          errors.to &&
                          "border-primary-red focus:border-primary-red"
                        }`}
                        {...register("to", { required: true, maxLength: 30 })}
                      >
                        <option>{t("select.text")}</option>
                        <option value="Arabic">Arabic</option>
                        <option value="French">French</option>
                        <option value="English">English</option>
                        <option value="Portuguese">Portuguese</option>
                        <option value="Spanish">Spanish</option>
                        <option value="German">German</option>
                        <option value="Chinese">Chinese</option>
                      </select>
                      {errors.to && (
                        <small className="text-primary-red text-xs">
                          Please select a language
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-3 py-16">
                    <span
                      onClick={() => setToggle("type")}
                      className={`w-3/4 text-center bg-primary-red py-2 px-4 rounded-lg  font-fold `}
                    >
                      {t("backBtnText")}
                    </span>

                    {isDataComplete && wordCount > 0 ? (
                      <>
                        {isUploadingFile ? (
                          <p className="animate-bounce font-bold text-primary-blue w-3/4 py-2 px-4">
                            {t("readingFileText")}
                          </p>
                        ) : (
                          <span className={`inline w-full`}>
                            <RoundedButton
                              text={t("submitBtnText")}
                              color={"bg-gray-400"}
                            />
                          </span>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </form>
              </>
            ) : (
              <></>
            )}
            {/* Details ends */}
            {toggle === "review" ? (
              <div className="space-y-2 p-2 max-w-4xl mx-auto lg:px-12 max-md:max-w-sm ">
                <div className="space-y-2 py-2">
                  <span className="text-lg md:text-2xl font-bold block text-center md:hidden capitalize text-black">
                    {toggle}
                  </span>
                </div>
                <div className="space-y-2 divide-y-2 text-left ">
                  {!user ? (
                    <>
                      <NoUser
                        services={"lingoTranslationServiceData"}
                        returnUrl={"/services/translation"}
                        data={allData}
                      />
                    </>
                  ) : (
                    <UserDetails />
                  )}

                  <div>
                    <h4 className="text-base font-bold py-4 md:text-2xl">
                      {t("title")} {t("select.from")}
                    </h4>
                    <p className="text-md md:text-lg text-gray-600">
                      {allData?.from}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-bold py-4 md:text-2xl">
                      {t("title")} {t("select.to")}
                    </h4>
                    <p className="text-md md:text-lg text-gray-600">
                      {allData?.to}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-bold py-4 md:text-2xl">
                      {t("wordCount")}
                    </h4>
                    <p className="text-md md:text-lg text-gray-600">
                      {wordCount}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-bold py-4 md:text-2xl">
                      {t("Tab.0")}
                    </h4>
                    <p className="text-md md:text-lg text-gray-600">
                      {translationType}
                    </p>
                  </div>

                  {allData.file?.length > 0 && (
                    <div>
                      <h4 className="text-base font-bold py-4 md:text-2xl">
                        {t("file")}
                      </h4>
                      <p className="text-md md:text-lg text-gray-600">
                        {allData.file[0].name}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-base font-bold py-4 md:text-2xl">
                    {t("price")}
                  </h4>
                  <p className="text-md md:text-lg text-primary-red font-bold">
                    €{(wordCount * pricePerWord).toFixed(2)}
                  </p>
                </div>
                <div className="flex space-x-3 py-8">
                  <span
                    onClick={() => setToggle("details")}
                    className="w-3/4 text-center text-white bg-primary-red py-2 px-4 rounded-lg hover:bg-primary-blue hover:text-white font-fold cursor-pointer"
                  >
                    {t("backBtnText")}
                  </span>

                  <span
                    onClick={() => setToggle("payment")}
                    className={`w-3/4 text-center bg-gray-400 py-2 px-4 rounded-lg  font-fold ${
                      !isDataComplete || !user
                        ? "cursor-not-allowed invisible"
                        : "hover:bg-primary-blue hover:text-white cursor-pointer"
                    }`}
                  >
                    {t("payment")}
                  </span>
                </div>
              </div>
            ) : (
              <></>
            )}
            {toggle === "payment" && (
              <>
                {allData.totalPrice < 0.5 ? (
                  <center>Total Price must be at least €0.50 eur</center>
                ) : (
                  <PaymentProcessCard
                    formData={allData}
                    dataKey={"lingoTranslationServiceData"}
                    serviceType={"Translation Service"}
                  />
                )}
              </>
            )}
            {/* {toggle === "payment" ? <Completed /> : <></>} */}
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
