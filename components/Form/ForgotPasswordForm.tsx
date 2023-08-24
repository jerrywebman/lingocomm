"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../Button/ButtonWithIconRight";
import {useTranslations} from 'next-intl';

type Inputs = {
  email: string;
};

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
    //translation
  const t = useTranslations('RecoverAccountPage');

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className="mx-8">
      {" "}
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        action="#"
        className="space-y-2 p-2 max-w-4xl mx-auto lg:px-12 my-8 max-md:max-w-sm bg-white md:drop-shadow-xl rounded-lg"
      >
        <div className="space-y-2 py-8">
          <span className="text-4xl font-bold block text-center">
            {t('title')}
          </span>
        </div>

        <div className="space-y-2 py-4">
          <label htmlFor="email" className="font-base text-lg block">
          {t('email')}
          </label>
          <input
            type="email"
            placeholder=  {t('emailPlaceholder')}
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

        <div className="space-y-2">
          <Button value=  {t('btnText')} type="submit" />
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
            href={"/customer/sign-in"}
            className="font-bold inline-block text-xs md:text-base text-primary-blue hover:text-black hover:backdrop-blur-md hover:cursor-pointer"
          >
            {t('loginQuestion')}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
