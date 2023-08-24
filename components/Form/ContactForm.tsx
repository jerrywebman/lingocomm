"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Rings } from "react-loader-spinner";
import { Alert } from "flowbite-react";
import Button from "./../Button/ButtonWithIconRight";
import { postData } from "./../../services/index";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

type Inputs = {
  firstname: string;
  lastname: string;
  email: string;
  subject: string;
  message: string;
};

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  //translation
  const t = useTranslations("ContactPage");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    postData("customers/contact", data).then((res) => {
      setResponse(res);
      setTimeout(() => setIsLoading(false), 3000);
    });
    setTimeout(() => router.push("/services"), 3000);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        action="#"
        className="space-y-2 p-4 max-w-4xl mx-auto lg:px-12 max-md:max-w-sm bg-white md:drop-shadow-xl"
      >
        <div className="space-y-2 py-8">
          {/* <span className="text-2xl font-bold block">Get in touch</span> */}
          <span className="text-4xl font-bold block text-center text-primary-blue">
            {t("title")}
          </span>
        </div>
        {response === null ? (
          <></>
        ) : (
          <div className="px-8">
            <Alert color="success" onDismiss={() => setResponse(null)}>
              <span>
                <p className="text-lg md:text-xl font-bold">
                  {`Your ${response}`}
                </p>
              </span>
            </Alert>
          </div>
        )}
        <div className="space-y-2 pb-4">
          <label htmlFor="fname" className="font-base text-lg block">
            {t("firstname")}
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
            {t("lastnamePlaceholder")}
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
        <div className="space-y-2 pb-4">
          <label htmlFor="subject" className="font-base text-lg block">
            {t("subject")}
          </label>
          <input
            type="text"
            placeholder={t("subjectPlaceholder")}
            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
              errors.subject && "border-primary-red focus:border-primary-red"
            }`}
            {...register("subject", { required: true })}
          />
          {errors.subject && (
            <small className="text-primary-red text-xs">
              {t("subjectPlaceholder")}
            </small>
          )}
        </div>
        <div className="space-y-2 pb-4">
          <label htmlFor="message" className="font-base text-lg block">
            {t("message")}
          </label>
          <textarea
            placeholder={t("messagePlaceholder")}
            className={`p-3 rounded-lg border focus:border-primary-blue w-full h-72 ${
              errors.message && "border-primary-red focus:border-primary-red"
            }`}
            {...register("message", { required: true })}
          ></textarea>
          {errors.message && (
            <small className="text-primary-red text-xs">
              {t("messagePlaceholder")}
            </small>
          )}
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
                  visible={true}
                  ariaLabel="rings-loading"
                />
              </div>
            </>
          ) : (
            <>
              {response !== null ? (
                <>
                  <center className="mt-4 md:mt-8 my-8">
                    <div className="px-8">
                      <Alert
                        color="success"
                        onDismiss={() => setResponse(null)}
                      >
                        <span>
                          <p className="text-lg md:text-xl font-bold">
                            {`Your ${response}`}
                          </p>
                        </span>
                      </Alert>
                    </div>
                  </center>
                </>
              ) : (
                <Button value={t("btnText")} type="submit" />
              )}
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default ContactForm;
