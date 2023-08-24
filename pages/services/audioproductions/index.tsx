import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { GetStaticPropsContext } from "next";
import { FaCheck, FaStickyNote, FaInfo } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import DivideXY from "@/components/Divider/DivideXY";
import Title from "@/components/Typography/Title";
import PaymentProcessCard from "@/components/Cards/PaymentProcessCard";
import RoundedButton from "@/components/Button/RoundedButton";
import NoUser from "@/components/Auth/NoUser";
import { UserContext } from "@/context/user.context";
import { postDataWithFile } from "@/services/index";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import UserDetails from "@/components/Auth/UserDetails";

type AudioInputs = {
  gender: string;
  accent: string;
  language: string;
  file: string;
  description: string;
};
type ParsedAudioInputs = {
  gender: string;
  accent: string;
  language: string;
  description: string;
};

export default function AudioProduction() {
  let pricePerWord: number = 0.25;
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState("details");
  const [showOther, setShowOther] = useState(false);
  const [isDataComplete, setIsDataComplete] = useState(false);
  const [allData, setAllData] = useState<any>({});
  const [allExistingData, setAllExistingData] = useState<any>();
  const [allParsedExistingData, setAllParsedExistingData] =
    useState<ParsedAudioInputs | null>();
  const [wordCount, setWordCount] = useState<number>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AudioInputs>({
    defaultValues: {
      accent: allParsedExistingData?.accent,
      description: allParsedExistingData?.description,
      gender: allParsedExistingData?.gender,
      language: allParsedExistingData?.language,
    },
  });
  const t = useTranslations("AudioProductionService");
  const onSubmit: SubmitHandler<AudioInputs> = (data) => {
    setToggle("submit");
    //add the price and word count to the form data
    const newData: {} = { ...data, wordCount, totalPrice, pricePerWord };
    //save data to sesssion
    setAllExistingData(
      sessionStorage.setItem("lingoAudioServiceData", JSON.stringify(newData))
    );
  };

  //
  useEffect(() => {
    setAllExistingData(sessionStorage.getItem("lingoAudioServiceData"));
    if (allExistingData !== undefined) {
      setAllParsedExistingData(JSON.parse(allExistingData));
    }
  }, []);

  //watch for file changes and get noOfWords
  useEffect(() => {
    //get the number of words
    const file = watch("file");
    if (file.length > 0) {
      postDataWithFile("documents/count-words", { file: file[0] }).then(
        (res) => {
          if (res.NumberOfWords) {
            setWordCount(res.NumberOfWords);
            setTotalPrice(res.NumberOfWords * pricePerWord);
          } else {
            toast.error(t("response"));
          }
        }
      );
    }
  }, [watch("file")]);

  useEffect(() => {
    const subscription = watch((data) => {
      if (
        data.language === "Select an option" ||
        data.gender === "Select an option" ||
        data.accent === "" ||
        data.description === "" ||
        data.file?.length === 0
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
  }, [watch]);

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
                <FaStickyNote className="inline" />{" "}
                <span className="hidden md:block capitalize">
                  {" "}
                  {t("Tab.0")}
                </span>
              </p>
            </div>
            {isDataComplete ? (
              <>
                {" "}
                <div
                  onClick={() => setToggle("review")}
                  className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 ${
                    toggle === "review"
                      ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                      : ""
                  }`}
                >
                  <p>
                    <FaInfo className="inline" />{" "}
                    <span className="hidden md:block capitalize">
                      {" "}
                      {t("Tab.1")}
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <div
                className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 ${
                  toggle === "review"
                    ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                    : ""
                }`}
              >
                <p>
                  <FaInfo className="inline" />{" "}
                  <span className="hidden md:block capitalize">
                    {" "}
                    {t("Tab.1")}
                  </span>
                </p>
              </div>
            )}

            <div
              // onClick={() => setToggle("submit")}
              className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 ${
                toggle === "submit"
                  ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                  : ""
              }`}
            >
              <p>
                <FaCheck className="inline" />{" "}
                <span className="hidden md:block"> {t("Tab.2")}</span>
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
                    <span className="text-lg  md:text-2xl font-bold block text-center md:hidden capitalize mb-8">
                      {t("details")}
                    </span>
                  </div>
                  <div className="flex flex-col md:w-max md:mx-auto text-center pb-8">
                    <label className="font-base text-lg block">
                      {t("uploadText")}
                      <span className="text-red-800"> * ({t("only")})</span>
                      <input
                        type="file"
                        className={`text-sm cursor-pointer w-3/4 p-3 rounded-lg border focus:border-primary-blue ${
                          errors.file &&
                          "border-primary-red focus:border-primary-red"
                        }`}
                        {...register("file", { required: true })}
                        accept="application/pdf,application/vnd.ms-excel"
                      />
                      {errors.file && (
                        <small className="text-primary-red text-xs">
                          {t("uploadText")}
                        </small>
                      )}
                    </label>
                  </div>
                  <div className="md:flex md:space-x-4">
                    <div className="space-y-2 py-2 w-full">
                      <label
                        htmlFor="gender"
                        className="font-base text-lg block"
                      >
                        {t("gender.text")}{" "}
                        <span className="text-red-800">*</span>
                      </label>
                      <select
                        className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                          errors.gender &&
                          "border-primary-red focus:border-primary-red"
                        }`}
                        {...register("gender", { required: true })}
                      >
                        <option>{t("gender.option")}</option>
                        <option value="Male">{t("gender.male")}</option>
                        <option value="Female">{t("gender.female")}</option>
                      </select>
                      {errors.gender && (
                        <small className="text-primary-red text-xs">
                          {t("gender.text")}
                        </small>
                      )}
                    </div>
                    <div className="space-y-2 py-2 w-full">
                      <label htmlFor="from" className="font-base text-lg block">
                        {t("language.text")}
                        <span className="text-red-800">*</span>
                      </label>
                      <select
                        className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                          errors.language &&
                          "border-primary-red focus:border-primary-red"
                        }`}
                        {...register("language", { required: true })}
                      >
                        <option>{t("gender.option")}</option>
                        <option value="Arabic">Arabic</option>
                        <option value="French">French</option>
                        <option value="English">English</option>
                        <option value="Portuguese">Portuguese</option>
                        <option value="Spanish">Spanish</option>
                        <option value="German">German</option>
                        <option value="Chinese">Chinese</option>
                      </select>
                      {errors.language && (
                        <small className="text-primary-red text-xs">
                          {t("gender.text")}
                        </small>
                      )}
                    </div>
                  </div>{" "}
                  <div className="space-y-2 py-2 w-full">
                    <label htmlFor="accent" className="font-base text-lg block">
                      {t("accent.text")} <span className="text-red-800">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t("accent.placeholder")}
                      className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                        errors.accent &&
                        "border-primary-red focus:border-primary-red"
                      }`}
                      {...register("accent", { required: true })}
                    />
                    {errors.accent && (
                      <small className="text-primary-red text-xs">
                        {t("accent.placeholder")}
                      </small>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="font-base text-lg block"
                    >
                      {t("about.text")}
                    </label>
                    <textarea
                      placeholder={t("about.placeholder")}
                      className={`p-3 h-48 rounded-lg border focus:border-primary-blue w-full ${
                        errors.description &&
                        "border-primary-red focus:border-primary-red"
                      }`}
                      {...register("description")}
                    ></textarea>
                    {errors.description && (
                      <small className="text-primary-red text-xs">
                        {t("about.placeholder")}
                      </small>
                    )}
                  </div>
                  <div className="flex space-x-3 py-8">
                    <Link href="/services" className="w-3/4">
                      <RoundedButton
                        text={t("cancelBtnText")}
                        color={"bg-primary-red"}
                      />
                    </Link>
                    {!isDataComplete ? (
                      <>
                        {" "}
                        <span
                          className={`text-xs md:text-base w-3/4 text-center bg-gray-400 py-2 px-4 rounded-lg hover:bg-primary-blue hover:text-white font-fold cursor-not-allowed hidden}`}
                        >
                          {t("info")}
                        </span>
                      </>
                    ) : (
                      <span
                        onClick={() => setToggle("review")}
                        className={`w-3/4 text-center bg-gray-400 py-2 px-4 rounded-lg font-fold  hover:bg-primary-blue hover:text-white cursor-pointer`}
                      >
                        {t("continueBtnText")}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <></>
              )}
              {/* Details ends */}

              {toggle === "review" ? (
                <>
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
                            services={"lingoAudioServiceData"}
                            returnUrl={"/services/audioproductions"}
                            data={allData}
                          />
                        </>
                      ) : (
                        <UserDetails />
                      )}

                      <div>
                        <h4 className="text-base font-bold py-4 md:text-2xl">
                          {t("review.gender")}
                        </h4>
                        <p className="text-md md:text-lg text-gray-600">
                          {allData.gender}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-base font-bold py-4 md:text-2xl">
                          {t("review.language")}
                        </h4>
                        <p className="text-md md:text-lg text-gray-600">
                          {allData.language}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-base font-bold py-4 md:text-2xl">
                          {t("review.accent")}
                        </h4>
                        <p className="text-md md:text-lg text-gray-600">
                          {allData.accent}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-base font-bold py-4 md:text-2xl">
                          {t("review.doc")}
                        </h4>
                        <p className="text-md md:text-lg text-gray-600">
                          {allData.file[0].name}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-base font-bold py-4 md:text-2xl">
                          {t("review.wordCount")}
                        </h4>
                        <p className="text-md md:text-lg text-gray-600">
                          {wordCount}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-base font-bold py-4 md:text-2xl">
                          {t("review.details")}
                        </h4>
                        <p className="text-md md:text-lg text-gray-600">
                          {allData.description}
                        </p>
                      </div>
                      <div className="text-primary-red">
                        <h4 className="text-base  font-bold py-4 md:text-2xl">
                          {t("review.price")}
                        </h4>
                        <p className="text-xl md:text-2xl text-primary-red font-bold">
                          €{totalPrice?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-3 py-8">
                      <span
                        onClick={() => setToggle("details")}
                        className="w-3/4 text-center text-white bg-primary-red py-2 px-4 rounded-lg hover:bg-primary-blue hover:text-white font-fold cursor-pointer"
                      >
                        {t("backBtnText")}
                      </span>
                      {user && (
                        <span className="w-3/4">
                          <RoundedButton
                            text={t("payment")}
                            color={"bg-gray-400"}
                          />
                        </span>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </form>
            {toggle === "submit" ? (
              <>
                <PaymentProcessCard
                  formData={allData}
                  dataKey={"lingoAudioServiceData"}
                  serviceType={"AudioProduction Service"}
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
