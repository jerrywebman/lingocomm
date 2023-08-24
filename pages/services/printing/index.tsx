import { GetStaticPropsContext } from "next";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import DivideXY from "@/components/Divider/DivideXY";
import Title from "@/components/Typography/Title";
import RoundedButton from "@/components/Button/RoundedButton";
import {
  FaCheck,
  FaCheckCircle,
  FaInfo,
  FaPrint,
  FaStickyNote,
} from "react-icons/fa";
import NoUser from "@/components/Auth/NoUser";
import Completed from "@/components/Auth/Completed";
import { UserContext } from "@/context/user.context";
import { postDataWithFile, postData } from "@/services/index";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import UserDetails from "@/components/Auth/UserDetails";

type PrintingInputs = {
  copies: string;
  color: string;
  location: string;
  file: string;
  description: string;
};

export default function Printing() {
  const [toggle, setToggle] = useState("type");
  const [isLoading, setIsLoading] = useState(false);
  const [printingType, setPrintingType] = useState("");
  const [showOther, setShowOther] = useState(false);
  const [noOfPages, setNoOfPages] = useState<number>();
  const [isDataComplete, setIsDataComplete] = useState(false);
  const { user } = useContext(UserContext);
  const [allData, setAllData] = useState<any>({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PrintingInputs>();
  const t = useTranslations("PrintingService");
  //watch for file changes and get noOfWords
  useEffect(() => {
    //get the number of words
    const file = watch("file");
    if (file?.length > 0) {
      postDataWithFile("documents/count-pages", { file: file[0] }).then(
        (res) => {
          if (res.data) {
            setNoOfPages(res.data);
            toast.success(t("fileSize", { size: res.data }));
          } else {
            toast.error(t("response"));
          }
        }
      );
    }
  }, [watch("file")]);

  useEffect(() => {
    const subscription = watch((data) => {
      console.log(data);
      if (
        data.color === "Select an option" ||
        data.copies === "" ||
        data.file?.length === 0 ||
        noOfPages === 0
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

  const onSubmit: SubmitHandler<PrintingInputs> = (data) => {
    setIsLoading(true);
    let newData = {
      ...data,
      nb_page: noOfPages,
      file: data.file[0],
      type: printingType,
      email: user?.email,
      phone: user?.phone,
      fullname: user?.firstname + " " + user?.lastname,
      customer: user?._id,
    };

    postDataWithFile("printing/add", newData).then((res) => {
      //If failed, show error message else redirect to services page
      if (res.success === false) {
        setIsLoading(false);
        //send feedback to the user
        toast.error(`${res.message}`);
      } else {
        setIsLoading(false);
        //send feedback to the user
        toast.success(`${res.message}`);
        //show th trxn successful screen
        setToggle("submit");
      }
    });
  };

  // useEffect(() => {}, [showOther, noOfPages]);

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
              className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 cursor-pointer ${
                toggle === "type"
                  ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                  : ""
              }`}
            >
              <p>
                <FaPrint className="inline" />{" "}
                <span className="hidden md:block capitalize">{t("Tab.0")}</span>
              </p>
            </div>
            {printingType === "" ? (
              <>
                <div
                  className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 ${
                    toggle === "details"
                      ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                      : ""
                  } ${
                    printingType === ""
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <p>
                    <FaStickyNote className="inline" />{" "}
                    <span className="hidden md:block capitalize">
                      {t("Tab.1")}{" "}
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <div
                onClick={() => setToggle("details")}
                className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 ${
                  toggle === "details"
                    ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                    : ""
                } ${
                  printingType === "" ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <p>
                  <FaStickyNote className="inline" />{" "}
                  <span className="hidden md:block capitalize">
                    {t("Tab.1")}{" "}
                  </span>
                </p>
              </div>
            )}

            {isDataComplete === true && printingType !== "" ? (
              <>
                <div
                  onClick={() => setToggle("review")}
                  className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 ${
                    toggle === "review"
                      ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                      : ""
                  } ${
                    isDataComplete === true && printingType !== ""
                      ? ""
                      : "cursor-not-allowed"
                  }`}
                >
                  <p>
                    <FaInfo className="inline" />{" "}
                    <span className="hidden md:block capitalize">
                      {t("Tab.2")}{" "}
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div
                  className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 ${
                    toggle === "review"
                      ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                      : ""
                  } ${
                    isDataComplete === true && printingType !== ""
                      ? ""
                      : "cursor-not-allowed"
                  }`}
                >
                  <p>
                    <FaInfo className="inline" />{" "}
                    <span className="hidden md:block capitalize">
                      {t("Tab.2")}{" "}
                    </span>
                  </p>
                </div>
              </>
            )}

            <div
              // onClick={() => setToggle("submit")}
              className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 ${
                toggle === "submit"
                  ? "bg-green-600 hover:bg-gray-200  text-white hover:text-black"
                  : ""
              }`}
            >
              <p>
                <FaCheck className="inline" />{" "}
                <span className="hidden md:block">{t("Tab.3")} </span>
              </p>
            </div>
          </div>
          <hr className="my-6"></hr>
          <div className="">
            {/* Type Starts */}
            {toggle === "type" ? (
              <>
                <div className="space-y-2 py-2">
                  <span className="text-lg md:text-2xl font-bold block text-center capitalize mb-8">
                    {t("infoType")}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 divide-y-2 md:divide-x-2">
                  <div
                    onClick={() => setPrintingType("Standard")}
                    className={`p-4 text-center text-black  rounded-lg cursor-pointer ${
                      printingType === "Standard"
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
                        printingType === "Standard" ? " text-white" : ""
                      }`}
                    >
                      {t("standard.subtitle")}
                    </p>
                    <FaCheckCircle
                      className={`text-3xl  text-center block mx-auto my-4 ${
                        printingType === "Standard"
                          ? "text-green-600"
                          : "text-white"
                      }`}
                    />{" "}
                  </div>
                  <div
                    onClick={() => setPrintingType("Premium")}
                    className={`p-4 text-center text-black  rounded-lg cursor-pointer ${
                      printingType === "Premium"
                        ? " bg-primary-blue text-white shadow-2xl"
                        : "shadow-lg"
                    }`}
                  >
                    <h4 className={`text-lg md:text-2xl font-bold mb-4 `}>
                      {t("premium.title")}
                    </h4>
                    <hr className="py-4"></hr>
                    <p
                      className={`text-gray-600 ${
                        printingType === "Premium" ? " text-white" : ""
                      }`}
                    >
                      {t("premium.subtitle")}
                    </p>
                    <FaCheckCircle
                      className={`text-3xl  text-center block mx-auto my-4 ${
                        printingType === "Premium"
                          ? " text-green-600"
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
                  <span
                    onClick={() => setToggle("details")}
                    className={`w-3/4 text-center bg-gray-400 py-2 px-4 rounded-lg hover:bg-primary-blue hover:text-white font-fold cursor-pointer ${
                      printingType === "" ? "invisible" : "visible"
                    }`}
                  >
                    {t("continueBtnText")}
                  </span>
                </div>
              </>
            ) : (
              <></>
            )}
            {/* Type ends */}
            <form
              className="space-y-2 p-2 max-w-4xl mx-auto lg:px-12 max-md:max-w-sm"
              onSubmit={handleSubmit(onSubmit)}
              method="POST"
              action="#"
              encType="multipart/form-data"
            >
              {/* Details Starts */}
              {toggle === "details" ? (
                <>
                  <div className="space-y-2 py-2">
                    <span className="text-lg  md:text-2xl font-bold block text-center md:hidden capitalize mb-8">
                      {t("details")}
                    </span>
                  </div>
                  <div className="flex flex-col md:w-max md:mx-auto text-center pb-8">
                    <label className="font-base text-lg block my-4">
                      {t("uploadText")}
                      <span className="text-red-800">({t("only")})*</span>
                      <input
                        type="file"
                        className={`my-4 text-sm cursor-pointer w-3/4 p-3 rounded-lg border focus:border-primary-blue ${
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
                        htmlFor="pages"
                        className="font-base text-lg block"
                      >
                        {t("form.pages")}{" "}
                        <span className="text-red-800">*</span>
                      </label>

                      <p className="text-2xl font-bold text-primary-blue">
                        {noOfPages}
                      </p>

                      {/* <input
                        type="number"
                        placeholder="Enter a number"
                        className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                          errors.nb_page &&
                          "border-primary-red focus:border-primary-red"
                        }`}
                        {...register("nb_page", { required: true })}
                        // defaultValue={noOfPages}
                      />
                      {errors.nb_page && (
                        <small className="text-primary-red text-xs">
                          Please enter number of pages
                        </small>
                      )} */}
                    </div>

                    <div className="space-y-2 py-2 w-full">
                      <label
                        htmlFor="quantity"
                        className="font-base text-lg block"
                      >
                        {t("form.quantity")}
                        <span className="text-red-800">*</span>
                      </label>
                      <input
                        type="number"
                        placeholder={t("form.quantityPlaceholder")}
                        className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                          errors.copies &&
                          "border-primary-red focus:border-primary-red"
                        }`}
                        {...register("copies", { required: true })}
                      />
                      {errors.copies && (
                        <small className="text-primary-red text-xs">
                          {t("form.quantityPlaceholder")}
                        </small>
                      )}
                    </div>
                  </div>{" "}
                  <div className="space-y-2 py-2 w-full">
                    <label htmlFor="lname" className="font-base text-lg block">
                      {t("form.color")} <span className="text-red-800">*</span>
                    </label>
                    <select
                      className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                        errors.color &&
                        "border-primary-red focus:border-primary-red"
                      }`}
                      {...register("color", { required: true })}
                    >
                      <option>{t("form.colorPlaceholder")}</option>
                      <option value="Colors">{t("form.colors")}</option>
                      <option value="Black and White">{t("form.bw")}</option>
                      <option value="Both">{t("form.both")}</option>
                    </select>
                    {errors.color && (
                      <small className="text-primary-red text-xs">
                        {t("form.colorPlaceholder")}
                      </small>
                    )}
                  </div>
                  <div className="space-y-2 py-2 w-full">
                    <label htmlFor="dob" className="font-base text-lg block">
                      {t("form.location")}:{" "}
                      <span className="text-red-800">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t("form.locationPlaceholder")}
                      className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                        errors.location &&
                        "border-primary-red focus:border-primary-red"
                      }`}
                      {...register("location", { required: true })}
                    />
                    {errors.location && (
                      <small className="text-primary-red text-xs">
                        {t("form.locationPlaceholder")}
                      </small>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="font-base text-lg block"
                    >
                      {t("form.details")}
                    </label>
                    <textarea
                      placeholder={t("form.detailsPlaceholder")}
                      className={`p-3 h-48 rounded-lg border focus:border-primary-blue w-full ${
                        errors.description &&
                        "border-primary-red focus:border-primary-red"
                      }`}
                      {...register("description")}
                    ></textarea>
                    {errors.description && (
                      <small className="text-primary-red text-xs">
                        {t("form.detailsPlaceholder")}
                      </small>
                    )}
                  </div>
                  <div className="flex space-x-3 py-8">
                    <span
                      onClick={() => setToggle("type")}
                      className="w-3/4 text-center bg-primary-red py-2 px-4 rounded-lg hover:bg-primary-blue hover:text-white font-fold cursor-pointer"
                    >
                      {t("backBtnText")}
                    </span>

                    <span
                      onClick={() => setToggle("review")}
                      className={`w-3/4 text-center bg-gray-400 py-2 px-4 rounded-lg hover:bg-primary-blue hover:text-white font-fold cursor-pointer ${
                        isDataComplete ? "" : "invisible"
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
              {toggle === "review" ? (
                <>
                  <div className="space-y-2 p-2 max-w-4xl mx-auto lg:px-12 max-md:max-w-sm ">
                    <div className="space-y-2 py-2">
                      <span className="text-lg md:text-2xl font-bold block text-center md:hidden capitalize text-black">
                        {t("Tab.2")}
                      </span>
                    </div>
                    <div className="space-y-2 divide-y-2 text-left ">
                      {!user ? (
                        <>
                          <NoUser
                            services={"lingoPrintingServiceData"}
                            returnUrl={"/services/printing"}
                            data={allData}
                          />
                        </>
                      ) : (
                        <UserDetails />
                      )}

                      <div>
                        <h4 className="text-base font-bold py-4 md:text-2xl">
                          {t("review.pageCount")}
                        </h4>
                        <p className="text-md md:text-lg text-gray-600">
                          {noOfPages}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-base font-bold py-4 md:text-2xl">
                          {t("form.quantity")}
                        </h4>
                        <p className="text-md md:text-lg text-gray-600">
                          {allData?.copies}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-base font-bold py-4 md:text-2xl">
                          {t("form.color")}
                        </h4>
                        <p className="text-md md:text-lg text-gray-600">
                          {allData?.color}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-base font-bold py-4 md:text-2xl">
                          {t("form.location")}
                        </h4>
                        <p className="text-md md:text-lg text-gray-600">
                          {allData?.location}
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
                      {allData?.description && (
                        <div>
                          <h4 className="text-base font-bold py-4 md:text-2xl">
                            {t("review.details")}
                          </h4>
                          <p className="text-md md:text-lg text-gray-600">
                            {allData?.description}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-3 py-8">
                      <span
                        onClick={() => setToggle("type")}
                        className="w-3/4 text-center text-white bg-primary-red py-2 px-4 rounded-lg hover:bg-primary-blue hover:text-white font-fold cursor-pointer"
                      >
                        {t("backBtnText")}
                      </span>
                      {isLoading ? (
                        <span
                          onClick={() => setToggle("type")}
                          className="w-3/4 text-center bg-primary-blue py-2 px-4 rounded-lg cursor-not-allowed text-white font-bold"
                        >
                          {t("submitting")}
                        </span>
                      ) : (
                        <>
                          <RoundedButton
                            text={t("submitBtnText")}
                            color={"bg-gray-400"}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </form>

            {toggle === "submit" ? <Completed /> : <></>}
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
