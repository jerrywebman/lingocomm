import { GetStaticPropsContext } from "next";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import DivideXY from "@/components/Divider/DivideXY";
import Title from "@/components/Typography/Title";
import RoundedButton from "@/components/Button/RoundedButton";
import NoUser from "@/components/Auth/NoUser";
import { UserContext } from "@/context/user.context";
import { DataContext } from "@/context/data.context";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  FaCheckCircle,
  FaInfo,
  FaMoneyCheck,
  FaPenFancy,
  FaStickyNote,
} from "react-icons/fa";
import PaymentProcessCard from "@/components/Cards/PaymentProcessCard";
import { useTranslations } from "next-intl";
import UserDetails from "@/components/Auth/UserDetails";
import { MdClearAll, MdDeleteSweep } from "react-icons/md";

//types
type GhostwritingInputs = {
  writingType: string;
  title: string;
  subtitle?: string;
  authorName: string;
  preferences?: string;
  type: string;
  count: number;
  genre: string;
  summary: string;
  description?: string;
  noOfChapters: number;
  wordCountPerChapter: number;
  wordCount: number;
  audience: string;
  bookSize: string;
  outline: string;
  resource: string;
  file?: {}[];
};

export default function Ghostwriting() {
  let pricePerWord: number = 0.25;
  const { data } = useContext(DataContext);
  const [toggle, setToggle] = useState("type");
  const [writingType, setWritingType] = useState<string | null | undefined>(
    data?.writingType || ""
  );
  const [isDataComplete, setIsDataComplete] = useState(false);
  const [isExistingData, setIsExistingData] = useState(false);
  const [genreData, setGenreData] = useState("");
  const [isExistingDataSource, setIsExistingDataSource] = useState<any>({});
  const [allData, setAllData] = useState<any>({});
  const { user } = useContext(UserContext);

  const t = useTranslations("GhostwritingService");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<GhostwritingInputs>({
    defaultValues: {
      writingType: data?.writingType,
      title: data?.title,
      subtitle: data?.subtitle,
      authorName: data?.authorName,
      preferences: data?.preferences,
      type: data?.type,
      count: data?.count,
      genre: data?.genre,
      summary: data?.summary,
      description: data?.description,
      noOfChapters: data?.noOfChapters,
      wordCountPerChapter: data?.wordCountPerChapter,
      wordCount: data?.wordCount,
      audience: data?.audience,
      bookSize: data?.bookSize,
      outline: data?.outline,
      resource: data?.resource,
    },
  });

  //check for existing data
  useEffect(() => {
    if (data === null || data === undefined || JSON.stringify(data) === "{}") {
      setIsExistingData(false);
    } else {
      setIsExistingData(true);
    }
  }, []);

  //APPEND TEXT TO THE INPUT
  const appendText = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    setGenreData(genreData.concat(button.name, " "));
  };
  //CLEAR APPENDED TEXT
  const clearText = (event: React.MouseEventHandler<SVGElement>) => {
    setGenreData("");
  };

  //check for existing data
  useEffect(() => {
    if (data !== undefined || data !== null) {
      setIsExistingData(true);
    } else {
      setIsExistingData(false);
    }
  }, [isExistingDataSource]);

  const onSubmit: SubmitHandler<GhostwritingInputs> = (data) => {
    setToggle("review");
    const dataFromForm = {
      ...data,
      writingType: writingType,
      fullname: user?.firstname + " " + user?.lastname,
      email: user?.email,
      pricePerWord,
      totalPrice: pricePerWord * data.wordCount,
    };
    //set the total price here
    setAllData(dataFromForm);
    //save the data to session storage
    sessionStorage.setItem(
      "lingoGhostwritingServiceData",
      JSON.stringify(dataFromForm)
    );
    //store in local storage
    localStorage.setItem(
      "lingoGhostwritingServiceDataExist",
      JSON.stringify(dataFromForm)
    );
  };

  // watch for input changes
  useEffect(() => {
    const subscription = watch((data) => {
      if (
        data.title === "Select an option" ||
        data.authorName === "Select an option" ||
        data.type === "" ||
        data.summary === "" ||
        data.audience === "" ||
        data.bookSize === "" ||
        data.outline === ""
      ) {
        setIsDataComplete(false);
      } else {
        setIsDataComplete(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  //GET THE EXISTING DATA FROM LOCAL STORAGE
  const getExistingData = () => {
    if (data) {
      setIsExistingDataSource(data);
      setIsExistingData(false);
    }
  };

  //CLEAR DATA
  const clearExistingData = () => {
    localStorage.removeItem("lingoGhostwritingServiceDataExist");
    localStorage.removeItem("lingoGhostwritingServiceData");
    setIsExistingData(false);
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
            <div
              onClick={() => setToggle("type")}
              className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 ${
                toggle === "type"
                  ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                  : ""
              }`}
            >
              <p>
                <FaPenFancy className="inline" />{" "}
                <span className="hidden md:block capitalize">{t("Tab.0")}</span>
              </p>
            </div>
            {writingType !== "" ? (
              <>
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
                      {t("Tab.1")}
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div
                  className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 cursor-not-allowed `}
                >
                  <p>
                    <FaStickyNote className="inline" />{" "}
                    <span className="hidden md:block capitalize">
                      {t("Tab.1")}
                    </span>
                  </p>
                </div>
              </>
            )}

            {isDataComplete ? (
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
                    {t("Tab.2")}
                  </span>
                </p>
              </div>
            ) : (
              <div
                className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 cursor-not-allowed ${
                  toggle === "review"
                    ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
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
                <FaMoneyCheck className="inline" />{" "}
                <span className="hidden md:block">{t("Tab.3")}</span>
              </p>
            </div>
          </div>
          <hr className="my-6"></hr>
          {/* IF EXISTING DATA IS AVAILABLE */}
          {!isExistingData ? (
            <>
              <div className="">
                {/* Type Starts */}
                {toggle === "type" ? (
                  <>
                    <div className="space-y-2 py-2">
                      <span className="text-lg md:text-2xl font-bold block text-center capitalize mb-8">
                        {t("type")}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-32 divide-y-2 md:divide-x-2 md:mx-16">
                      <div
                        onClick={() => setWritingType("Standard")}
                        className={`p-4 text-center text-black  rounded-lg cursor-pointer ${
                          writingType === "Standard"
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
                            writingType === "Standard" ? " text-white" : ""
                          }`}
                        >
                          {t("standard.subtitle")}
                        </p>
                        <FaCheckCircle
                          className={`text-3xl  text-center block mx-auto my-4 ${
                            writingType === "Standard"
                              ? " text-green-500"
                              : "text-white"
                          }`}
                        />{" "}
                      </div>
                      <div
                        onClick={() => setWritingType("Technical")}
                        className={`p-4 text-center text-black  rounded-lg cursor-pointer ${
                          writingType === "Technical"
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
                            writingType === "Technical" ? " text-white" : ""
                          }`}
                        >
                          {t("technical.subtitle")}
                        </p>
                        <FaCheckCircle
                          className={`text-3xl  text-center block mx-auto my-4 ${
                            writingType === "Technical"
                              ? " text-green-500"
                              : "text-white"
                          }`}
                        />{" "}
                      </div>
                    </div>
                    <div className="flex space-x-3 py-8">
                      <Link href="/services" className="w-3/4">
                        <RoundedButton
                          text={t("cancelBtnText")}
                          color={"bg-primary-red"}
                        />
                      </Link>
                      {writingType !== "" ? (
                        <>
                          <span
                            onClick={() => setToggle("details")}
                            className="w-3/4 text-center bg-gray-400 py-2 px-4 rounded-lg hover:bg-primary-blue hover:text-white font-fold cursor-pointer"
                          >
                            {t("continueBtnText")}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="w-3/4 text-center bg-gray-400 py-2 px-4 rounded-lg hover:bg-primary-blue hover:text-white font-fold cursor-not-allowed">
                            {t("option")}
                          </span>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {/* Type ends */}

                {/* Details Starts */}
                {toggle === "details" ? (
                  <>
                    <form
                      className="space-y-2 p-2 max-w-4xl mx-auto lg:px-12 max-md:max-w-sm  "
                      onSubmit={handleSubmit(onSubmit)}
                      method="POST"
                      action="#"
                      encType="multipart/form-data"
                    >
                      <div className="space-y-2 py-2">
                        <span className="text-lg  md:text-2xl font-bold block text-center md:hidden capitalize mb-8">
                          {t("details")}
                        </span>
                      </div>
                      <div className="md:flex md:space-x-4">
                        <div className="space-y-2 py-2 w-full">
                          <label
                            htmlFor="dob"
                            className="font-base text-lg block"
                          >
                            {t("form.title")}{" "}
                            <span className="text-red-800">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder={t("form.titlePlaceholder")}
                            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                              errors.title &&
                              "border-primary-red focus:border-primary-red"
                            }`}
                            {...register("title", { required: true })}
                          />
                          {errors.title && (
                            <small className="text-primary-red text-xs">
                              {t("form.titlePlaceholder")}
                            </small>
                          )}
                        </div>

                        <div className="space-y-2 py-2 w-full">
                          <label className="font-base text-lg block">
                            {t("form.subtitle")}
                          </label>
                          <input
                            type="text"
                            placeholder={t("form.subtitlePlaceholder")}
                            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                              errors.subtitle &&
                              "border-primary-red focus:border-primary-red"
                            }`}
                            {...register("subtitle")}
                          />
                          {errors.subtitle && (
                            <small className="text-primary-red text-xs">
                              {t("form.subtitlePlaceholder")}
                            </small>
                          )}
                        </div>
                      </div>{" "}
                      <div className="md:flex md:space-x-4">
                        <div className="space-y-2 py-2 w-full">
                          <label className="font-base text-lg block">
                            {t("form.author")}{" "}
                            <span className="text-red-800">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder={t("form.authorPlaceholder")}
                            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                              errors.authorName &&
                              "border-primary-red focus:border-primary-red"
                            }`}
                            {...register("authorName", { required: true })}
                          />
                          {errors.authorName && (
                            <small className="text-primary-red text-xs">
                              {t("form.authorPlaceholder")}
                            </small>
                          )}
                        </div>

                        <div className="space-y-2 py-2 w-full">
                          <label
                            htmlFor="dob"
                            className="font-base text-lg block"
                          >
                            {t("form.preferences")}
                          </label>
                          <input
                            type="text"
                            placeholder={t("form.preferencesPlaceholder")}
                            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                              errors.preferences &&
                              "border-primary-red focus:border-primary-red"
                            }`}
                            {...register("preferences")}
                          />
                          {errors.preferences && (
                            <small className="text-primary-red text-xs">
                              {t("form.preferencesPlaceholder")}
                            </small>
                          )}
                        </div>
                      </div>{" "}
                      <div className="md:flex md:space-x-4">
                        <div className="space-y-2 py-2 w-full">
                          <label
                            htmlFor="lname"
                            className="font-base text-lg block"
                          >
                            {t("form.bookType")}{" "}
                            <span className="text-red-800">*</span>
                          </label>
                          <select
                            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                              errors.type &&
                              "border-primary-red focus:border-primary-red"
                            }`}
                            {...register("type", { required: true })}
                          >
                            <option>{t("option")}</option>
                            <option value={t("fiction")}>{t("fiction")}</option>
                            <option value={t("nonfiction")}>
                              {t("nonfiction")}
                            </option>
                          </select>
                          {errors.type && (
                            <small className="text-primary-red text-xs">
                              {t("form.bookTypePlaceholder")}
                            </small>
                          )}
                        </div>

                        <div className="space-y-2 py-2 w-full">
                          <label
                            htmlFor="lname"
                            className="font-base text-lg block"
                          >
                            {t("form.wordCount")}{" "}
                            <span className="text-red-800">*</span>
                          </label>

                          <>
                            <input
                              type="number"
                              placeholder={t("form.wordCountPlaceholder")}
                              className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                                errors.wordCount &&
                                "border-primary-red focus:border-primary-red"
                              }`}
                              {...register("wordCount", { required: true })}
                            />
                            {errors.wordCount && (
                              <small className="text-primary-red text-xs">
                                {t("form.wordCountPlaceholder")}
                              </small>
                            )}
                          </>
                        </div>
                      </div>{" "}
                      <div className="space-y-2 py-2 w-full">
                        <label
                          htmlFor="dob"
                          className="font-base text-lg block"
                        >
                          {t("form.genre")}{" "}
                          <span className="text-red-800">*</span>
                        </label>
                        <div>
                          <span className="py-2">
                            {[
                              t("horror"),
                              t("fantasy"),
                              t("finance"),
                              t("fictions"),
                              t("food"),
                              t("travel"),
                              t("selfhelp"),
                              t("biography"),
                              t("mystery"),
                              t("romance"),
                            ].map((key) => (
                              <button
                                onClick={appendText}
                                name={key}
                                className={`${
                                  genreData.includes(key)
                                    ? "bg-primary-blue"
                                    : "bg-gray-500"
                                } m-1 p-2 text-sm text-white hover:text-black inline cursor-pointer hover:shadow-lg hover:scale-125 hover:bg-primary-purple `}
                                key={key}
                              >
                                {key}
                              </button>
                            ))}
                          </span>
                        </div>
                        <p className="text-primary-red inline">
                          <MdDeleteSweep
                            className="text-lg text-center"
                            title={t("clear")}
                          />
                        </p>
                        <input
                          type="text"
                          placeholder={t("form.genrePlaceholder")}
                          className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                            errors.genre &&
                            "border-primary-red focus:border-primary-red"
                          }`}
                          {...register("genre")}
                        />
                        {errors.genre && (
                          <small className="text-primary-red text-xs">
                            {t("form.genrePlaceholder")}
                          </small>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="font-base text-lg block"
                        >
                          {t("form.summary")}
                          <span className="text-red-800">*</span>
                        </label>
                        <textarea
                          placeholder={t("form.summaryPlaceholder")}
                          className={`p-3 rounded-lg border focus:border-primary-blue w-full h-48 ${
                            errors.summary &&
                            "border-primary-red focus:border-primary-red"
                          }`}
                          {...register("summary", { required: true })}
                        ></textarea>
                        {errors.summary && (
                          <small className="text-primary-red text-xs">
                            {t("form.summaryPlaceholder")}
                          </small>
                        )}
                      </div>
                      <div className="space-y-2 py-2">
                        <hr></hr>
                        <p className="text-center">{t("form.info")}</p>
                        <hr></hr>
                      </div>
                      <div className="md:flex md:space-x-4">
                        <div className="space-y-2 py-2 w-full">
                          <label
                            htmlFor="dob"
                            className="font-base text-lg block"
                          >
                            {t("form.chapters")}
                            <span className="text-red-800">*</span>
                          </label>
                          <input
                            type="number"
                            placeholder={t("form.chaptersPlaceholder")}
                            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                              errors.noOfChapters &&
                              "border-primary-red focus:border-primary-red"
                            }`}
                            {...register("noOfChapters", { required: true })}
                          />
                          {errors.noOfChapters && (
                            <small className="text-primary-red text-xs">
                              {t("form.chaptersPlaceholder")}
                            </small>
                          )}
                        </div>

                        <div className="space-y-2 py-2 w-full">
                          <label
                            htmlFor="dob"
                            className="font-base text-lg block"
                          >
                            {t("form.wordCountPerChapter")}
                            <span className="text-red-800">*</span>
                          </label>
                          <input
                            type="number"
                            placeholder={t(
                              "form.wordCountPerChapterPlaceholder"
                            )}
                            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                              errors.wordCountPerChapter &&
                              "border-primary-red focus:border-primary-red"
                            }`}
                            {...register("wordCountPerChapter", {
                              required: true,
                            })}
                          />
                          {errors.wordCountPerChapter && (
                            <small className="text-primary-red text-xs">
                              {t("form.wordCountPerChapterPlaceholder")}
                            </small>
                          )}
                        </div>
                      </div>{" "}
                      <div className="md:flex md:space-x-4">
                        <div className="space-y-2 py-2 w-full">
                          <label
                            htmlFor="dob"
                            className="font-base text-lg block"
                          >
                            {t("form.audience")}
                            <span className="text-red-800">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder={t("form.audiencePlaceholder")}
                            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                              errors.audience &&
                              "border-primary-red focus:border-primary-red"
                            }`}
                            {...register("audience", { required: true })}
                          />
                          {errors.audience && (
                            <small className="text-primary-red text-xs">
                              {t("form.audiencePlaceholder")}
                            </small>
                          )}
                        </div>

                        <div className="space-y-2 py-2 w-full">
                          <label
                            htmlFor="dob"
                            className="font-base text-lg block"
                          >
                            {t("form.bookSize")}{" "}
                            <span className="text-red-800">*</span>
                          </label>
                          <select
                            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                              errors.bookSize &&
                              "border-primary-red focus:border-primary-red"
                            }`}
                            {...register("bookSize", { required: true })}
                          >
                            <option>{t("option")}</option>
                            <option value="5.5 x 8.5 in (13,34 x 20,32 cm)">
                              5.5 x 8.5 in (13,34 x 20,32 cm)
                            </option>
                            <option value="6 x 9 in (15,24 x 22,86 cm)">
                              6 x 9 in (15,24 x 22,86 cm)
                            </option>
                          </select>
                          {errors.bookSize && (
                            <small className="text-primary-red text-xs">
                              {t("form.bookSizePlaceholder")}
                            </small>
                          )}
                        </div>
                      </div>{" "}
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="font-base text-lg block"
                        >
                          {t("form.bookOutline")}{" "}
                          <span className="text-red-800">*</span>
                        </label>
                        <textarea
                          placeholder={t("form.bookOutlinePlaceholder")}
                          className={`p-3 h-44 rounded-lg border focus:border-primary-blue w-full ${
                            errors.outline &&
                            "border-primary-red focus:border-primary-red"
                          }`}
                          {...register("outline", { required: true })}
                        ></textarea>
                        {errors.outline && (
                          <small className="text-primary-red text-xs">
                            {t("form.bookOutlinePlaceholder")}
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
                          className={`p-3 h-44 rounded-lg border focus:border-primary-blue w-full ${
                            errors.resource &&
                            "border-primary-red focus:border-primary-red"
                          }`}
                          {...register("resource")}
                        ></textarea>
                        {errors.resource && (
                          <small className="text-primary-red text-xs">
                            {t("form.resourcesPlaceholder")}
                          </small>
                        )}
                      </div>
                      <div className="flex flex-col md:w-max md:mx-auto text-center pb-8">
                        <label className="font-base text-lg block my-4">
                          {t("uploadText")}
                        </label>
                        <label className="font-base text-lg block">
                          <input
                            className="text-sm cursor-pointer w-3/4"
                            type="file"
                            {...register("file")}
                          />
                        </label>
                      </div>
                      <div className="flex space-x-3 py-8">
                        <span
                          onClick={() => setToggle("type")}
                          className="w-3/4 text-center py-2 px-4 bg-primary-red rounded-lg hover:bg-primary-blue hover:text-white font-fold cursor-pointer"
                        >
                          {t("backBtnText")}
                        </span>
                        <span
                          className={`w-3/4 text-center bg-gray-400  rounded-lg hover:bg-primary-blue hover:text-white font-fold cursor-pointer ${
                            isDataComplete ? "visible" : "invisible"
                          }`}
                        >
                          <RoundedButton
                            text={t("continueBtnText")}
                            color={"text-primary-blue"}
                          />
                        </span>
                      </div>
                    </form>
                  </>
                ) : (
                  <></>
                )}
                {/* Details ends */}

                {/* Review starts */}
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
                              services={"lingoGhostwritingServiceData"}
                              returnUrl={"/services/ghostwriting"}
                              data={allData}
                            />
                          </>
                        ) : (
                          <UserDetails />
                        )}

                        <div>
                          <h4 className="text-base font-bold py-4 md:text-2xl">
                            {t("form.title")}
                          </h4>
                          <p className="text-md md:text-lg text-gray-600">
                            {allData?.title}
                          </p>
                        </div>
                        {allData?.subtitle && (
                          <div>
                            <h4 className="text-base font-bold py-4 md:text-2xl">
                              {t("form.subtitle")}
                            </h4>
                            <p className="text-md md:text-lg text-gray-600">
                              {allData?.subtitle}
                            </p>
                          </div>
                        )}

                        <div>
                          <h4 className="text-base font-bold py-4 md:text-2xl">
                            {t("form.author")}
                          </h4>
                          <p className="text-md md:text-lg text-gray-600">
                            {allData?.authorName}
                          </p>
                        </div>
                        {allData?.preferences && (
                          <div>
                            <h4 className="text-base font-bold py-4 md:text-2xl">
                              {t("form.title")}
                            </h4>
                            <p className="text-md md:text-lg text-gray-600">
                              {allData?.preferences}
                            </p>
                          </div>
                        )}

                        <div>
                          <h4 className="text-base font-bold py-4 md:text-2xl">
                            {t("form.bookType")}
                          </h4>
                          <p className="text-md md:text-lg text-gray-600">
                            {allData?.type}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-base font-bold py-4 md:text-2xl">
                            {t("form.genre")}
                          </h4>
                          <p className="text-md md:text-lg text-gray-600">
                            {genreData}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-base font-bold py-4 md:text-2xl">
                            {t("form.chapters")}
                          </h4>
                          <p className="text-md md:text-lg text-gray-600">
                            {allData?.noOfChapters}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-base font-bold py-4 md:text-2xl">
                            {t("form.wordCountPerChapter")}
                          </h4>
                          <p className="text-md md:text-lg text-gray-600">
                            {allData?.wordCountPerChapter}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-base font-bold py-4 md:text-2xl">
                            {t("form.wordCount")}
                          </h4>
                          <p className="text-md md:text-lg text-gray-600">
                            {allData?.wordCount}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-base font-bold py-4 md:text-2xl">
                            {t("form.audience")}
                          </h4>
                          <p className="text-md md:text-lg text-gray-600">
                            {allData?.audience}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-base font-bold py-4 md:text-2xl">
                            {t("form.summary")}
                          </h4>
                          <p className="text-md md:text-lg text-gray-600">
                            {allData?.summary}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-base font-bold py-4 md:text-2xl">
                            {t("form.bookOutline")}
                          </h4>
                          <p className="text-md md:text-lg text-gray-600">
                            {allData?.outline}
                          </p>
                        </div>
                        {allData?.resources && (
                          <div>
                            <h4 className="text-base font-bold py-4 md:text-2xl">
                              {t("form.resources")}
                            </h4>
                            <p className="text-md md:text-lg text-gray-600">
                              {allData?.resources}
                            </p>
                          </div>
                        )}

                        {allData?.file.length > 0 && (
                          <div>
                            <h4 className="text-base font-bold py-4 md:text-2xl">
                              {t("form.details")}
                            </h4>
                            <p className="text-md md:text-lg text-gray-600">
                              {allData?.file[0].name}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-3 py-8">
                        <span
                          onClick={() => setToggle("details")}
                          className="w-3/4 text-center text-white bg-primary-red py-2 px-4 rounded-lg hover:bg-primary-blue hover:text-white font-fold cursor-pointer"
                        >
                          {t("backBtnText")}
                        </span>
                        <span
                          className="w-3/4"
                          onClick={() => setToggle("submit")}
                        >
                          <RoundedButton
                            text={t("payment")}
                            color={"bg-gray-400"}
                          />
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {/* Review ends */}
                {toggle === "submit" ? (
                  <>
                    <PaymentProcessCard
                      formData={allData}
                      dataKey={"lingoGhostwritingServiceData"}
                      serviceType={"Ghostwriting Service"}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="text-lg md:text-xl font-medium leading-loose text-center">
                <p className="my-8">{t("existingData")}</p>
                <button
                  onClick={() => getExistingData()}
                  className={`px-4 md:px-8 py-4 rounded-lg text-lg md:text-xl font-medium bg-gray-100 text-primary-blue hover:text-white hover:bg-primary-blue hover:shadow-lg backdrop-blur-lg`}
                >
                  {t("reload")}
                </button>
                <button
                  onClick={() => clearExistingData()}
                  className={`mx-4 px-4 md:px-8 py-4 rounded-lg text-lg md:text-xl font-medium bg-gray-100 text-primary-red hover:text-white hover:bg-primary-red hover:shadow-lg backdrop-blur-lg`}
                >
                  {t("clear")}
                </button>
              </div>
            </>
          )}
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
