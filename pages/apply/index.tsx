import { GetStaticPropsContext } from "next";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/ButtonWithIconRight";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { Rings } from "react-loader-spinner";
import { postData, postDataWithFile } from "@/services/index";
import { UserContext } from "@/context/user.context";
import Title from "@/components/Typography/Title";
import { useTranslations } from "next-intl";

type Inputs = {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  birthdate: string;
  address: string;
  about: string;
  file: [];
};

const Apply = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const router = useRouter();
  const { user } = useContext(UserContext);
  const t = useTranslations("SponteneousApplication");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      phone: user?.phone,
      address: "Default",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    const file = watch("file");
    // @ts-ignore
    const newDdata = { ...data, file: data.file[0] };
    console.log(newDdata);
    if (file?.length > 0) {
      setIsLoading(true);
      postDataWithFile("job-applications/spontaneous", newDdata).then((res) => {
        setResponse(res);
        //If failed, show error message else redirect to services page
        if (res.success === false) {
          setIsLoading(false);
          toast.error(`${res.message}`);
        } else {
          setIsLoading(false);
          toast.success(`${res.message}`);
          router.push("/jobs");
        }
      });
    }
  };

  return (
    <div className="my-8">
      <Title
        intro={""}
        titleColor={"text-primary-blue px-2"}
        title={t("title")}
        subtitle={" "}
        introRequired={false}
        subtitleRequired={false}
        bgLineRequired={false}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        encType="multipart/form-data"
        className="space-y-2 p-2 max-w-4xl mx-auto lg:px-12 max-md:max-w-sm bg-white md:drop-shadow-xl my-8"
      >
        <div className="space-y-2 pb-4">
          <label htmlFor="fname" className="font-base text-lg block">
            {t("firstname")}
            <span className="text-red-800">*</span>
          </label>
          <input
            type="text"
            placeholder={t("firstnamePlaceholder")}
            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
              errors.firstname && "border-primary-red focus:border-primary-red"
            }`}
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <small className="text-primary-red text-xs">
              {t("firstnamePlaceholder")}
            </small>
          )}
        </div>
        <div className="space-y-2 pb-4">
          <label htmlFor="lname" className="font-base text-lg block">
            {t("lastname")}
            <span className="text-red-800">*</span>
          </label>
          <input
            type="text"
            placeholder={t("lastnamePlaceholder")}
            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
              errors.lastname && "border-primary-red focus:border-primary-red"
            }`}
            {...register("lastname", { required: true })}
          />
          {errors.lastname && (
            <small className="text-primary-red text-xs">
              {t("lastnamePlaceholder")}
            </small>
          )}
        </div>
        <div className="space-y-2  pb-4">
          <label htmlFor="email" className="font-base text-lg block">
            {t("email")}
            <span className="text-red-800">*</span>
          </label>
          <input
            type="email"
            placeholder={t("emailPlaceholder")}
            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
              errors.email && "border-primary-red focus:border-primary-red"
            }`}
            {...register("email", { required: true })}
          />
          {errors.email && (
            <small className="text-primary-red text-xs">
              {t("emailPlaceholder")}
            </small>
          )}
        </div>
        <div className="space-y-2  pb-4">
          <label htmlFor="phone" className="font-base text-lg block">
            {t("phone")}
            <span className="text-red-800">*</span>
          </label>
          <input
            type="number"
            placeholder={t("phonePlaceholder")}
            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
              errors.email && "border-primary-red focus:border-primary-red"
            }`}
            {...register("phone", { required: true })}
          />
          {errors.email && (
            <small className="text-primary-red text-xs">
              {t("phonePlaceholder")}
            </small>
          )}
        </div>
        <div className="space-y-2  pb-4">
          <label htmlFor="birthdate" className="font-base text-lg block">
            {t("dob")}
            <span className="text-red-800">*</span>
          </label>
          <input
            type="date"
            placeholder={t("dobPlaceholder")}
            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
              errors.email && "border-primary-red focus:border-primary-red"
            }`}
            {...register("birthdate", { required: true })}
          />
          {errors.birthdate && (
            <small className="text-primary-red text-xs">
              {t("dobPlaceholder")}
            </small>
          )}
        </div>
        <div className="space-y-2 pb-4">
          <label htmlFor="message" className="font-base text-lg block">
            {t("message")}
            <span className="text-red-800">*</span>
          </label>
          <textarea
            placeholder={t("messagePlaceholder")}
            className={`p-3 rounded-lg border focus:border-primary-blue w-full h-72 ${
              errors.about && "border-primary-red focus:border-primary-red"
            }`}
            {...register("about", { required: true, minLength: 20 })}
          >
            {errors.about && (
              <small className="text-primary-red text-xs">
                {t("messagePlaceholder")}
              </small>
            )}
          </textarea>
        </div>
        <div className="flex flex-col w-max mx-auto text-center pb-8">
          {errors.file && (
            <small className="text-primary-red text-xs">
              {t("resumePlaceholder")}
            </small>
          )}
          <label className="font-base text-lg block">
            {t("resume")}
            <span className="text-red-800">*</span>
            <input
              className={`text-sm cursor-pointer w-3/4 my-2  ${
                errors.file ? "border-primary-red" : "border-primary-grey "
              }`}
              type="file"
              accept=".pdf"
              {...register("file", { required: true })}
            />
            {/* <div className="text bg-gray-200 text-black border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-primary-green shadow-lg">
                  <MdAttachFile className="text-xl inline" /> Select
                </div> */}
          </label>
        </div>
        <div className="space-y-2 pb-4">
          {isLoading ? (
            <>
              <div className="flex justify-center">
                <Rings
                  height="60"
                  width="60"
                  color="#5465AC"
                  radius=""
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={response !== null}
                  ariaLabel="rings-loading"
                />
              </div>
            </>
          ) : (
            <>
              <Button value={t("btnText")} type="submit" />
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Apply;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
