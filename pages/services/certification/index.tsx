import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { GetStaticPropsContext } from "next";
import DivideXY from "@/components/Divider/DivideXY";
import Title from "@/components/Typography/Title";
import RoundedButton from "@/components/Button/RoundedButton";
import { FaBookOpen, FaCheck, FaInfo } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import NoUser from "@/components/Auth/NoUser";
import Completed from "@/components/Auth/Completed";
import { UserContext } from "@/context/user.context";
import { postDataWithFile, postData } from "@/services/index";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import UserDetails from "@/components/Auth/UserDetails";

type CertificationInputs = {
  type: string;
  country: string;
  language: string;
  description: string;
  file: any;
};

export default function Certification() {
  const [toggle, setToggle] = useState("details");
  const [showOther, setShowOther] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataComplete, setIsDataComplete] = useState(false);
  const { user } = useContext(UserContext);
  const [allData, setAllData] = useState<any>({});
  const t = useTranslations("CertificationService");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CertificationInputs>();

  //watch for form changes
  useEffect(() => {
    const subscription = watch((data) => {
      if (
        data.type === "" ||
        data.country === "" ||
        data.language === "" ||
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

  //send the form data to the admins
  const onSubmit: SubmitHandler<CertificationInputs> = (data) => {
    setIsLoading(true);
    let newData = {
      ...data,
      file: data.file[0].name,
      email: user?.email,
      fullname: user?.firstname + " " + user?.lastname,
      customer: user?._id,
    };
    postData("certifications/add", newData).then((res) => {
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

  useEffect(() => {}, [showOther]);

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
                <FaBookOpen className="inline" />{" "}
                <span className="hidden md:block capitalize">{t("Tab.0")}</span>
              </p>
            </div>
            {isDataComplete ? (
              <>
                {" "}
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
                      {t("Tab.1")}
                    </span>
                  </p>
                </div>
              </>
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
                    {t("Tab.1")}
                  </span>
                </p>
              </div>
            )}

            <div
              className={`flex justify-center font-bold text-base md:text-xl bg-gray-200 hover:bg-primary-blue text-black hover:text-white p-2 shadow-lg rounded-md mx-1 ${
                toggle === "submit"
                  ? "bg-green-600 hover:bg-gray-200  text-white hover:text-black"
                  : ""
              }`}
            >
              <p>
                <FaCheck className="inline" />{" "}
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
                    <span className="text-lg  md:text-2xl font-bold block text-center md:hidden capitalize mb-8">
                      {t("details")}
                    </span>
                  </div>
                  <div className="flex flex-col md:w-max md:mx-auto text-center pb-8">
                    <label className="font-base text-lg block">
                      {t("uploadText")}
                      <span className="text-red-800">*</span>
                      <input
                        type="file"
                        className={`text-sm cursor-pointer w-3/4 p-3 rounded-lg border focus:border-primary-blue ${
                          errors.file &&
                          "border-primary-red focus:border-primary-red"
                        }`}
                        {...register("file", { required: true })}
                        accept="application/pdf,application/vnd.ms-excel,.doc,.docx"
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
                      <label htmlFor="dob" className="font-base text-lg block">
                        {t("form.certified")}
                        <span className="text-red-800">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Professional certification, passport, birth certificate, etc."
                        className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                          errors.type &&
                          "border-primary-red focus:border-primary-red"
                        }`}
                        {...register("type", { required: true })}
                      />
                      {errors.type && (
                        <small className="text-primary-red text-xs">
                          {t("form.certifiedPlaceholder")}
                        </small>
                      )}
                    </div>

                    <div className="space-y-2 py-2 w-full">
                      <label
                        htmlFor="country"
                        className="font-base text-lg block"
                      >
                        {t("form.country")}{" "}
                        <span className="text-red-800">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder={t("form.countryPlaceholder")}
                        className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                          errors.country &&
                          "border-primary-red focus:border-primary-red"
                        }`}
                        {...register("country", { required: true })}
                      />
                      {errors.country && (
                        <small className="text-primary-red text-xs">
                          {t("form.countryPlaceholder")}
                        </small>
                      )}
                    </div>
                  </div>{" "}
                  <div className="space-y-2 py-2 w-full">
                    <label
                      htmlFor="language"
                      className="font-base text-lg block"
                    >
                      {t("form.language")}{" "}
                      <span className="text-red-800">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t("form.languagePlaceholder")}
                      className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                        errors.language &&
                        "border-primary-red focus:border-primary-red"
                      }`}
                      {...register("language", { required: true })}
                    />
                    {errors.language && (
                      <small className="text-primary-red text-xs">
                        {t("form.languagePlaceholder")}
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
                      className={`p-3 h-44 rounded-lg border focus:border-primary-blue w-full ${
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
                    <Link href="/services" className="w-3/4">
                      <RoundedButton
                        text={t("cancelBtnText")}
                        color={"bg-primary-red"}
                      />
                    </Link>
                    <span
                      onClick={() => setToggle("review")}
                      className={`w-3/4 text-center bg-gray-400 py-2 px-4 rounded-lg hover:bg-primary-blue hover:text-white font-fold cursor-pointer ${
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

              {toggle === "review" ? (
                <>
                  <div className="space-y-2 p-2 max-w-4xl mx-auto lg:px-12 max-md:max-w-sm ">
                    <div className="space-y-2 py-2">
                      <span className="text-lg md:text-2xl font-bold block text-center md:hidden capitalize text-black">
                        {t("Tab.1")}
                      </span>
                    </div>
                    <div className="space-y-2 divide-y-2 text-left ">
                      {!user ? (
                        <>
                          <NoUser
                            services={"lingoCertificationServiceData"}
                            returnUrl={"/services/certification"}
                            data={allData}
                          />
                        </>
                      ) : (
                        <UserDetails />
                      )}

                      <div>
                        <h4 className="text-base font-bold py-4 md:text-2xl">
                          {t("form.certified")}
                        </h4>
                        <p className="text-md md:text-lg text-gray-600">
                          {allData.type}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-base font-bold py-4 md:text-2xl">
                          {t("form.country")}
                        </h4>
                        <p className="text-md md:text-lg text-gray-600">
                          {allData?.country}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-base font-bold py-4 md:text-2xl">
                          {t("form.language")}
                        </h4>
                        <p className="text-md md:text-lg text-gray-600">
                          {allData?.language}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-base font-bold py-4 md:text-2xl">
                          {t("form.doc")}
                        </h4>
                        <p className="text-md md:text-lg text-gray-600">
                          {allData.file[0].name}
                        </p>
                      </div>
                      {allData.description && (
                        <div>
                          <h4 className="text-base font-bold py-4 md:text-2xl">
                            {t("form.purpose")}
                          </h4>
                          <p className="text-md md:text-lg text-gray-600">
                            {allData.description}
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
                      {user ? (
                        <>
                          {isLoading ? (
                            <span className="w-3/4 text-center bg-primary-blue py-2 px-4 rounded-lg cursor-not-allowed text-white font-bold">
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
                        </>
                      ) : (
                        <></>
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
