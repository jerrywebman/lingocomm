import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { GetStaticPropsContext } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { Rings } from "react-loader-spinner";
import DivideXY from "@/components/Divider/DivideXY";
import PaymentProcessCard from "@/components/Cards/PaymentProcessCard";
import Title from "@/components/Typography/Title";
import RoundedButton from "@/components/Button/RoundedButton";
import {
  FaMoneyCheck,
  FaCheckCircle,
  FaEdit,
  FaInfo,
  FaUpload,
} from "react-icons/fa";
import { UserContext } from "@/context/user.context";
import { postDataWithFile } from "@/services/index";
import NoUser from "@/components/Auth/NoUser";
import { useTranslations } from "next-intl";
import UserDetails from "@/components/Auth/UserDetails";

//types
type EditingInputs = {
  fullname: string;
  email: string;
  phone: string;
  address: string;
  file: string;
  type: string;
  documentName: string;
  numberofWords: number;
  price: number;
};

export default function Editing() {
  let pricePerWord: number = 0.35;
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [allData, setAllData] = useState<any>({});
  const [wordCount, setWordCount] = useState<number>(0);
  const [toggle, setToggle] = useState("upload");
  const [editingType, setEditingType] = useState("");
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [showOther, setShowOther] = useState("");
  const [isEditingServiceExist, setIsEditingServiceExist] =
    useState<EditingInputs | null>();
  const [isDataComplete, setIsDataComplete] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [File, setFile] = useState<{} | undefined>();

  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditingInputs>();
  const t = useTranslations("EditingService");
  const onSubmit: SubmitHandler<EditingInputs> = (data) => {
    setToggle("submit");
    //add the price and word count to the form data

    //save data to sesssion
    sessionStorage.setItem("lingoEditingServiceData", JSON.stringify(allData));
    // postDataWithFile("customers/signin", data).then((res) => {
    //   setResponse(res);
    //   //If failed, show error message else redirect to services page
    //   if (res.success === false) {
    //     setIsLoading(false);
    //     //send feedback to the user
    //     toast.error(`${res.message}`);
    //   } else {
    //     setIsLoading(false);
    //     //send feedback to the user
    //     toast.success(`${res.message}`);
    //     //save the signedIn User
    //     const authenticatedUser: {} = { ...res.customer, token: res.token };
    //     localStorage.setItem("lingoUser", JSON.stringify(authenticatedUser));
    //     //delay
    //     window.location.href = "/services";
    //   }
    // });
  };
  //GET THE EXISTING DATA FROM LOCAL STORAGE
  const getExistingData = () => {
    const data: string | null = localStorage.getItem("lingoEditingServiceData");
    if (data !== null) {
      setIsEditingServiceExist(JSON.parse(data));
    }
  };

  //CLEAR DATA
  const clearExistingData = () => {
    localStorage.removeItem("lingoEditingServiceData");
    setIsEditingServiceExist(null);
  };

  //watch for file upload and get noOfWords
  useEffect(() => {
    //get the number of words
    const file = watch("file");
    if (file.length > 0) {
      setIsUploadingFile(true);
      postDataWithFile("documents/count-words", { file: file[0] }).then(
        (res) => {
          if (res.NumberOfWords) {
            setWordCount(res.NumberOfWords);
            setTotalPrice(res.NumberOfWords * pricePerWord);
            setFile(file[0]);
          } else {
            toast.error(
              "Unable to get word count, please Check the selected file"
            );
          }
          setIsUploadingFile(false);
        }
      );
    }
  }, [watch("file")]);

  //TRACK CHANGES ON THE FORM
  useEffect(() => {
    setAllData({
      nb_words: wordCount,
      type: editingType,
      price: totalPrice,
      fullname: user?.firstname + " " + user?.lastname,
      email: user?.email,
      file: File,
      pricePerWord,
      totalPrice: totalPrice,
      wordCount,
    });
  }, [user, totalPrice, wordCount, editingType, toggle]);

  return (
    <DivideXY>
      <div className="rounded-xl shadow-xl p-2 md:p-8">
        <Title
          intro={""}
          titleColor={"text-primary-blue px-2"}
          title={t("title")}
          subtitle={t("title")}
          introRequired={false}
          subtitleRequired={true}
          bgLineRequired={false}
        />
        {/* CHECK IF AN EXISTING SERVICE EXIST */}
        {isEditingServiceExist === null ||
        isEditingServiceExist === undefined ? (
          <div className="p-2">
            <div className="grid grid-cols-4 md:mx-8 md:gap-8 divide-x text-center">
              <div
                onClick={() => setToggle("upload")}
                className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 ${
                  toggle === "upload"
                    ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                    : ""
                }`}
              >
                <p>
                  <FaUpload className="inline" />{" "}
                  <span className="hidden md:block capitalize">
                    {t("Tab.0")}
                  </span>
                </p>
              </div>
              {wordCount > 0 ? (
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
                      <FaEdit className="inline" />{" "}
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
                    // onClick={() => setToggle("type")}
                    className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 cursor-not-allowed `}
                  >
                    <p>
                      <FaEdit className="inline" />{" "}
                      <span className="hidden md:block capitalize">
                        {t("Tab.1")}
                      </span>
                    </p>
                  </div>
                </>
              )}

              <div
                onClick={() => setToggle("review")}
                className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 ${
                  toggle === "review"
                    ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                    : ""
                } ${
                  wordCount > 0 && editingType !== ""
                    ? "cursor-pointer"
                    : " cursor-not-allowed "
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
              <div
                onClick={() => setToggle("submit")}
                className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 ${
                  toggle === "submit"
                    ? "bg-primary-blue hover:bg-gray-200  text-white hover:text-black"
                    : ""
                }`}
              >
                <p>
                  <FaMoneyCheck className="inline" />{" "}
                  <span className="hidden md:block"> {t("Tab.3")}</span>
                </p>
              </div>
            </div>
            <hr className="my-6"></hr>
            <div className="">
              <form
                className="space-y-2 p-2 max-w-4xl mx-auto lg:px-12 max-md:max-w-sm "
                onSubmit={handleSubmit(onSubmit)}
                method="POST"
                encType="multipart/form-data"
              >
                {/* Upload Starts */}
                {toggle === "upload" ? (
                  <>
                    <div className="flex md:w-max md:mx-auto text-center pb-8">
                      <label className="font-base text-lg block">
                        {t("uploadText")}
                        <span className="text-red-800">({t("only")})*</span>
                        <input
                          type="file"
                          className={`p-3 rounded-lg border focus:border-primary-blue w-full my-4 ${
                            errors.file &&
                            "border-primary-red focus:border-primary-red"
                          }`}
                          {...register("file", { required: true })}
                          accept=".pdf"
                        />
                        {errors.file && (
                          <small className="text-primary-red text-xs">
                            {t("uploadText")}
                          </small>
                        )}
                      </label>
                    </div>
                    <div className="flex space-x-3 py-8">
                      <Link href="/services" className="w-3/4">
                        <RoundedButton
                          text={t("cancelBtnText")}
                          color={"bg-primary-red"}
                        />
                      </Link>
                      {isUploadingFile ? (
                        <p className="animate-bounce font-bold text-primary-blue w-3/4 py-2 px-4">
                          {t("readingFileText")}
                        </p>
                      ) : (
                        <span
                          onClick={() => setToggle("type")}
                          className={`w-3/4 text-center bg-gray-400 py-2 px-4 rounded-lg  font-fold ${
                            wordCount < 0 || totalPrice < 0.6
                              ? "cursor-not-allowed invisible"
                              : "hover:bg-primary-blue hover:text-white cursor-pointer"
                          }`}
                        >
                          {t("continueBtnText")}
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {/* Upload ends */}
                {/* Type Starts */}
                {toggle === "type" ? (
                  <>
                    <div className="space-y-2 py-2">
                      <span className="text-lg md:text-2xl font-bold block text-center  capitalize mb-8">
                        {t("infoType")}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 divide-y-2 md:divide-x-2">
                      <div
                        onClick={() => setEditingType("Standard")}
                        className={`p-4 text-center text-black  rounded-lg cursor-pointer ${
                          editingType === "Standard"
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
                            editingType === "Standard" ? " text-white" : ""
                          }`}
                        >
                          {t("standard.subtitle")}
                        </p>
                        <FaCheckCircle
                          className={`text-3xl  text-center block mx-auto my-4 ${
                            editingType === "Standard"
                              ? " text-green-500"
                              : "text-white"
                          }`}
                        />{" "}
                      </div>
                      <div
                        onClick={() => setEditingType("Technical")}
                        className={`p-4 text-center text-black rounded-lg cursor-pointer ${
                          editingType === "Technical"
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
                            editingType === "Technical" ? " text-white" : ""
                          }`}
                        >
                          {t("technical.subtitle")}
                        </p>
                        <FaCheckCircle
                          className={`text-3xl  text-center block mx-auto my-4 ${
                            editingType === "Technical"
                              ? " text-green-500"
                              : "text-white"
                          }`}
                        />{" "}
                      </div>
                    </div>
                    <div className="flex space-x-3 py-8">
                      <button
                        onClick={() => setToggle("upload")}
                        className="w-3/4 text-center bg-primary-red py-2 px-4 rounded-lg hover:bg-primary-blue hover:text-white font-fold cursor-pointer"
                      >
                        {t("backBtnText")}
                      </button>

                      <button
                        onClick={() => setToggle("review")}
                        className={`w-3/4 text-center bg-gray-400 py-2 px-4 rounded-lg  font-fold ${
                          editingType === ""
                            ? "cursor-not-allowed invisible"
                            : "hover:bg-primary-blue hover:text-white cursor-pointer "
                        }`}
                        disabled={editingType === ""}
                      >
                        {t("continueBtnText")}
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {/* type ends */}
                {/* Review starts */}
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
                              services={"lingoEditingServiceData"}
                              returnUrl={"/services/editing"}
                              data={allData}
                            />
                          </>
                        ) : (
                          <UserDetails />
                        )}
                        <div>
                          <h4 className="text-base font-bold py-4 md:text-2xl">
                            {t("review.doc")}
                          </h4>
                          <p className="text-md md:text-lg text-gray-600">
                            {allData.file.name}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-base font-bold py-4 md:text-2xl">
                            {t("review.wordCount")}
                          </h4>
                          <p className="text-md md:text-lg text-gray-600">
                            {allData?.nb_words}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-base font-bold py-4 md:text-2xl">
                            {t("review.type")}
                          </h4>
                          <p className="text-md md:text-lg text-gray-600">
                            {allData?.type}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-base font-bold py-4 md:text-2xl">
                            {t("review.price")}
                          </h4>
                          <p className="text-md md:text-lg text-primary-red font-bold">
                            €{allData?.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-3 py-8">
                        <span
                          onClick={() => setToggle("type")}
                          className="w-3/4 text-center text-white bg-primary-red py-2 px-4 rounded-lg hover:bg-primary-blue hover:text-white font-fold cursor-pointer"
                        >
                          {t("backBtnText")}
                        </span>
                        <span
                          className={`${!user ? "hidden" : "inline w-full"}`}
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
              </form>
              {toggle === "submit" ? (
                <>
                  <PaymentProcessCard
                    formData={allData}
                    dataKey={"lingoEditingServiceData"}
                    serviceType={"Editing Service"}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="text-lg md:text-xl font-medium leading-loose text-center">
              <hr></hr>
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
