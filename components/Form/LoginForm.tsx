"use client";

import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { Rings } from "react-loader-spinner";
import Button from "./../Button/ButtonWithIconRight";
import LogoutButton from "./../Button/LogoutButtonWithIconRight";
import { UserContext } from "./../../context/user.context";
import { postData } from "./../../services/index";
import {useTranslations} from 'next-intl';

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [returnUrl, setReturnUrl] = useState<string | null>();
  const { user } = useContext(UserContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  //translation
  const t = useTranslations('LoginPage');

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    postData("customers/signin", data).then((res) => {
      setResponse(res);
      //If failed, show error message else redirect to services page
      if (res.success === false) {
        setIsLoading(false);
        //send feedback to the user
        toast.error(`${res.message}`);
      } else {
        setIsLoading(false);
        //send feedback to the user
        toast.success(`${res.message}`);
        //save the signedIn User
        const authenticatedUser: {} = { ...res.customer, token: res.token };
        localStorage.setItem("lingoUser", JSON.stringify(authenticatedUser));
        //delay
        if (returnUrl === null) window.location.href = "/services";
        window.location.href = returnUrl || "/";
      }
    });
  };

  useEffect(() => {
    const url: string | null = sessionStorage.getItem("returnUrl");
    if (url !== null) setReturnUrl(JSON.parse(url));

    return () => {
      sessionStorage.removeItem("returnUrl");
    };
  }, []);

  return (
    <div className="mx-4 md:mx-8">
      {" "}
      {user !== null ? (
        <>
          <div className="space-y-2 p-2 max-w-4xl mx-auto lg:px-12 max-md:max-w-sm bg-white md:drop-shadow-xl rounded-lg">
            <div className="space-y-2 py-8">
              <span className="text-4xl font-bold block text-center">
                Welcome Back
              </span>
            </div>
            <p className="text-center">
              We noticed you are logged in as {user?.firstname}
            </p>
            <div className="flex justify-around my-4">
              <Link href={"/services"}>
                <Button
                  value={`Continue as ${user?.firstname}`}
                  type="submit"
                />
              </Link>
              <>
                <LogoutButton value="Logout" />
              </>
            </div>
          </div>
        </>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
          action="#"
          className="space-y-2 p-2 max-w-4xl mx-auto lg:px-12 md:my-8 max-md:max-w-sm bg-white md:drop-shadow-xl rounded-lg"
        >
          <div className="space-y-2 py-8">
            <span className="text-4xl font-bold block text-center">{t('title')}</span>
          </div>

          <div className="space-y-2 py-4">
            <label htmlFor="email" className="font-base text-lg block">
              {t('email')}
            </label>
            <input
              type="email"
              placeholder={t('emailPlaceholder')}
              className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                errors.email && "border-primary-red focus:border-primary-red"
              }`}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <small className="text-primary-red text-xs">
                {t('emailPlaceholder')}
              </small>
            )}
          </div>
          <div className="space-y-2 mt-16">
            <label htmlFor="password" className="font-base text-lg block">
              {t('password')}
            </label>
            <input
              type="password"
              placeholder= {t('passwordPlaceholder')}
              className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                errors.password && "border-primary-red focus:border-primary-red"
              }`}
              {...register("password", { required: true })}
            />
            {errors.password && (
              <small className="text-primary-red text-xs">
                 {t('passwordPlaceholder')}
              </small>
            )}
          </div>

          <div className="space-y-2 p-2">
            {isLoading ? (
              <>
                <div className="flex justify-center h-screen">
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
                <Button value= {t('btnText')} type="submit" />
              </>
            )}
          </div>

          <div className="flex justify-around gap-4">
            {" "}
            <Link
              href="/customer/sign-up"
              className="font-bold inline-block mb-4 text-xs md:text-base text-primary-red hover:text-black hover:backdrop-blur-md hover:cursor-pointer"
            >
               {t('signupQuestion')}
            </Link>
            <Link
              href={"/customer/forgot-password"}
              className="font-bold inline-block text-xs md:text-base text-primary-blue hover:text-black hover:backdrop-blur-md hover:cursor-pointer"
            >
              {" "}
               {t('forgotPassword')}
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
