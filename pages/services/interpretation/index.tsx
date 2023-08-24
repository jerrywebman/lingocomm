import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { GetStaticPropsContext } from "next";
import DivideXY from "@/components/Divider/DivideXY";
import Title from "@/components/Typography/Title";
import RoundedButton from "@/components/Button/RoundedButton";
import NoUser from "@/components/Auth/NoUser";
import Completed from "@/components/Auth/Completed";
import { FaCheck, FaInfo, FaStickyNote } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserContext } from "@/context/user.context";
import { postDataWithFile } from "@/services/index";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import UserDetails from "@/components/Auth/UserDetails";

//TYPES
type InterpretationInputs = {
  fullname: string;
  email: string;
  phone: string;
  address: string;
  file?: {}[];
  from: string;
  to: string;
  type: string;
  accent: string;
  date: string;
  time: string;
  details: string;
};

export default function Interpretation() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDataComplete, setIsDataComplete] = useState(false);
  const [allData, setAllData] = useState<any>({});
  const [allExistingData, setAllExistingData] = useState<any>();
  const [toggle, setToggle] = useState("details");
  const [showOther, setShowOther] = useState(false);
  const t = useTranslations("InterpretationService");
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InterpretationInputs>({
    defaultValues: {
      to: allExistingData?.to,
      from: allExistingData?.from,
      date: allExistingData?.date,
      time: allExistingData?.time,
      details: allExistingData?.details,
    },
  });

  useEffect(() => {
    //see if an existing data exist
    setAllExistingData(
      sessionStorage.getItem("lingoInterpretationServiceData")
    );

    const subscription = watch((data) => {
      if (
        data.from === "Select an option" ||
        data.to === "Select an option" ||
        data.time === "" ||
        data.date === "" ||
        data.details === "" ||
        data.from === data.to
        // ||
        // Date.parse(data.date) < Date.now()
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

  const onSubmit: SubmitHandler<InterpretationInputs> = (data) => {
    setIsLoading(true);
    //@ts-ignore
    const fileExist = data?.file[0];
    let newData = {
      ...data,
      email: user?.email,
      phone: user?.phone,
      fullname: user?.firstname + " " + user?.lastname,
      file: fileExist,
      customer: user?._id,
    };
    postDataWithFile("interpretations/add", newData).then((res) => {
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
                <span className="hidden md:block capitalize">{t("Tab.0")}</span>
              </p>
            </div>
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
                      {" "}
                      {t("Tab.1")}
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
                      {t("Tab.1")}
                    </span>
                  </p>
                </div>
              </>
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
            <form
              className="space-y-2 p-2 max-w-4xl mx-auto lg:px-12 max-md:max-w-sm "
              onSubmit={handleSubmit(onSubmit)}
              method="POST"
              action="#"
              encType="multipart/form-data"
            >
              {/* Details Starts */}
              {toggle === "details" ? (
                <>
                  <div className="space-y-2 py-2">
                    <span className="text-lg md:text-2xl font-bold block text-center md:hidden capitalize">
                      {toggle}
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <div className="space-y-2 py-2 w-full">
                      <label htmlFor="from" className="font-base text-lg block">
                        {t("form.from")} :{" "}
                        <span className="text-red-800">*</span>
                      </label>
                      <select
                        className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                          errors.from &&
                          "border-primary-red focus:border-primary-red"
                        }`}
                        {...register("from", { required: true })}
                      >
                        <option>{t("form.option")}</option>
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
                          {t("form.from")}
                        </small>
                      )}
                    </div>

                    <div className="space-y-2 py-2 w-full">
                      <label htmlFor="dob" className="font-base text-lg block">
                        {t("form.to")} : <span className="text-red-800">*</span>
                      </label>
                      <select
                        className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                          errors.to &&
                          "border-primary-red focus:border-primary-red"
                        }`}
                        {...register("to", { required: true, maxLength: 30 })}
                      >
                        <option>{t("form.option")}</option>
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
                          {t("form.to")}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    {" "}
                    <div className="space-y-2 py-2 w-full">
                      <label
                        htmlFor="lname"
                        className="font-base text-lg block"
                      >
                        {t("form.date")} <span className="text-red-800">*</span>
                      </label>
                      <input
                        type="date"
                        placeholder={t("form.datePlaceholder")}
                        className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                          errors.date &&
                          "border-primary-red focus:border-primary-red"
                        }`}
                        {...register("date", { required: true })}
                      />
                      {errors.date && (
                        <small className="text-primary-red text-xs">
                          {t("form.date")}
                        </small>
                      )}
                    </div>
                    <div className="space-y-2 py-2 w-full">
                      <label
                        htmlFor="lname"
                        className="font-base text-lg block"
                      >
                        {t("form.time")} <span className="text-red-800">*</span>
                      </label>
                      <input
                        type="time"
                        placeholder={t("form.timePlaceholder")}
                        className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                          errors.time &&
                          "border-primary-red focus:border-primary-red"
                        }`}
                        {...register("time", { required: true })}
                      />
                      {errors.time && (
                        <small className="text-primary-red text-xs">
                          {t("form.timePlaceholder")}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="font-base text-lg block"
                    >
                      {t("form.details")}{" "}
                      <span className="text-red-800">*</span>
                    </label>
                    <textarea
                      placeholder={t("form.detailsPlaceholder")}
                      className={`p-3 rounded-lg border focus:border-primary-blue w-full h-48 ${
                        errors.details &&
                        "border-primary-red focus:border-primary-red"
                      }`}
                      {...register("details", { required: true })}
                    ></textarea>
                    {errors.details && (
                      <small className="text-primary-red text-xs">
                        {t("form.detailsPlaceholder")}
                      </small>
                    )}
                  </div>

                  <div className="input_field flex flex-col md:w-max md:mx-auto text-center my-4">
                    <label className="font-base text-lg block mb-4">
                      {t("uploadText")} :
                      <input
                        type="file"
                        className={`text-sm cursor-pointer w-3/4 p-3 rounded-lg border focus:border-primary-blue ${
                          errors.file &&
                          "border-primary-red focus:border-primary-red"
                        }`}
                        {...register("file")}
                      />
                      {/* {errors.file && (
                        <small className="text-primary-red text-xs">
                          Please select a file
                        </small>
                      )} */}
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
                      onClick={() => setToggle("review")}
                      className={`w-3/4 text-center bg-gray-400 py-2 px-4 rounded-lg  font-fold ${
                        !isDataComplete
                          ? "cursor-not-allowed hidden"
                          : "hover:bg-primary-blue hover:text-white cursor-pointer "
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
                          services={"lingoInterpretationServiceData"}
                          returnUrl={"/services/interpretation"}
                          data={allData}
                        />
                      </>
                    ) : (
                      <UserDetails />
                    )}

                    <div>
                      <h4 className="text-base font-bold py-4 md:text-2xl">
                        {t("form.from")}
                      </h4>
                      <p className="text-md md:text-lg text-gray-600">
                        {allData?.from}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-base font-bold py-4 md:text-2xl">
                        {t("form.to")}
                      </h4>
                      <p className="text-md md:text-lg text-gray-600">
                        {allData?.to}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-base font-bold py-4 md:text-2xl">
                        {t("form.date")}
                      </h4>
                      <p className="text-md md:text-lg text-gray-600">
                        {allData?.date}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-base font-bold py-4 md:text-2xl">
                        {t("form.time")}
                      </h4>
                      <p className="text-md md:text-lg text-gray-600">
                        {allData?.time}
                      </p>
                    </div>
                    {allData.file.length > 0 && (
                      <div>
                        <h4 className="text-base font-bold py-4 md:text-2xl">
                          {t("form.doc")}
                        </h4>
                        <p className="text-md md:text-lg text-gray-600">
                          {allData.file[0].name}
                        </p>
                      </div>
                    )}
                    <div>
                      <h4 className="text-base font-bold py-4 md:text-2xl">
                        {t("form.details")}
                      </h4>
                      <p className="text-md md:text-lg text-gray-600">
                        {allData?.details}
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
                    {isLoading ? (
                      <span className="w-3/4 text-center bg-primary-blue py-2 px-4 rounded-lg cursor-not-allowed text-white font-bold">
                        Submitting your request ...
                      </span>
                    ) : (
                      <>
                        <span
                          className={`${!user ? "hidden" : "inline w-full"}`}
                        >
                          <RoundedButton
                            text={t("submitBtnText")}
                            color={"bg-gray-400"}
                          />
                        </span>
                      </>
                    )}
                  </div>
                </div>
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
