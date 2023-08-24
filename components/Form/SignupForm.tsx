"use client";

import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { Rings } from "react-loader-spinner";
import Button from "./../Button/ButtonWithIconRight";
import LogoutButton from "./../Button/LogoutButtonWithIconRight";
import { postData } from "./../../services/index";
import { UserContext } from "./../../context/user.context";
import {useTranslations} from 'next-intl';

type Inputs = {
  firstname: string;
  lastname: string;
  email: string;
  birthdate: string;
  gender: string;
  country: string;
  city: string;
  job: string;
  phone: string;
  password: string;
};

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const router = useRouter();
  const { user } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
    //translation
  const t = useTranslations('SignupPage');

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    postData("customers/signup", data).then((res) => {
      setResponse(res);
      //If failed, show error message else redirect to services page
      if (res.success === false) {
        setIsLoading(false);
        toast.error(`${res.message}`);
      } else {
        setIsLoading(false);
        toast.success(`${res.message}`);
        router.push("/customer/sign-in");
      }
    });
  };

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
          className="space-y-2 p-2 max-w-4xl mx-auto lg:px-12 max-md:max-w-sm bg-white md:drop-shadow-xl rounded-lg"
        >
          <div className="space-y-2 py-8">
            <span className="text-4xl font-bold block text-center">{t("title")}</span>
          </div>
          <div className="space-y-2 py-2">
            <label htmlFor="fname" className="font-base text-lg block">
              {t('firstname')}
            </label>
            <input
              type="text"
              placeholder={t('firstnamePlaceholder')}
              className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                errors.firstname &&
                "border-primary-red focus:border-primary-red"
              }`}
              {...register("firstname", { required: true })}
            />
            {errors.firstname && (
              <small className="text-primary-red text-xs">
                 {t('firstnamePlaceholder')}
              </small>
            )}
          </div>
          <div className="space-y-2 py-2">
            <label htmlFor="lname" className="font-base text-lg block">
               {t('lastname')}
            </label>
            <input
              type="text"
              placeholder= {t('lastnamePlaceholder')}
              className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                errors.lastname && "border-primary-red focus:border-primary-red"
              }`}
              {...register("lastname", { required: true })}
            />
            {errors.lastname && (
              <small className="text-primary-red text-xs">
               {t('lastnamePlaceholder')}
              </small>
            )}
          </div>
          <div className="space-y-2 py-2">
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
          <div className="flex justify-between space-x-2">
            {" "}
            <div className="space-y-2 py-2 w-full">
              <label htmlFor="birthdate" className="font-base text-lg block">
                {t('dob')}
              </label>
              <input
                type="date"
                placeholder=  {t('dobPlaceholder')}
                className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                  errors.birthdate &&
                  "border-primary-red focus:border-primary-red"
                }`}
                {...register("birthdate", { required: true })}
              />
              {errors.birthdate && (
                <small className="text-primary-red text-xs">
                  {t('dobPlaceholder')}
                </small>
              )}
            </div>
            <div className="space-y-2 py-2 w-full">
              <label htmlFor="gender" className="font-base text-lg block">
               {t('gender')}
              </label>
              <select
                className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                  errors.gender && "border-primary-red focus:border-primary-red"
                }`}
                {...register("gender", { required: true })}
              >
                <option>{t('select')}</option>
                <option value="Male">{t('male')}</option>
                <option value="Female">{t('female')}</option>
                <option value="Other">{t('other')}</option>
                <option value="Do Not Wish to Specify">
                  {t('donot')}
                </option>
              </select>
              {errors.gender && (
                <small className="text-primary-red text-xs">
                  {t('genderPlaceholder')}
                </small>
              )}
            </div>
          </div>
          <div className="flex justify-between space-x-2 ">
            {" "}
            <div className="space-y-2 py-2 w-full">
              <label htmlFor="country" className="font-base text-lg block">
                {t('country')}
              </label>
              <input
                type="text"
                placeholder={t('countryPlaceholder')}
                className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                  errors.country &&
                  "border-primary-red focus:border-primary-red"
                }`}
                {...register("country", { required: true })}
              />
              {errors.country && (
                <small className="text-primary-red text-xs">
                   {t('countryPlaceholder')}
                </small>
              )}
            </div>
            <div className="space-y-2 py-2 w-full">
              <label htmlFor="City" className="font-base text-lg block">
                {t('city')}
              </label>
              <input
                type="text"
                placeholder= {t('cityPlaceholder')}
                className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                  errors.city && "border-primary-red focus:border-primary-red"
                }`}
                {...register("city", { required: true })}
              />
              {errors.city && (
                <small className="text-primary-red text-xs">
                   {t('cityPlaceholder')}
                </small>
              )}
            </div>
          </div>
          <div className="space-y-2 py-2">
            <label htmlFor="Job" className="font-base text-lg block">
               {t('job')}
            </label>
            <input
              type="text"
              placeholder= {t('jobPlaceholder')}
              className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                errors.job && "border-primary-red focus:border-primary-red"
              }`}
              {...register("job", { required: true })}
            />
            {errors.job && (
              <small className="text-primary-red text-xs">
                {t('jobPlaceholder')}
              </small>
            )}
          </div>
          <div className="space-y-2 py-2">
            <label htmlFor="Phone" className="font-base text-lg block">
              {t('phone')}
            </label>
            <input
              type="text"
              placeholder={t('phonePlaceholder')}
              className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                errors.phone && "border-primary-red focus:border-primary-red"
              }`}
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <small className="text-primary-red text-xs">
                {t('phonePlaceholder')}
              </small>
            )}
          </div>
          <div className="space-y-2 py-2">
            <label htmlFor="password" className="font-base text-lg block">
              {t('password')}
            </label>
            <input
              type="password"
              placeholder={t('passwordPlaceholder')}
              className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                errors.password && "border-primary-red focus:border-primary-red"
              }`}
              {...register("password", {
                required: true,
                minLength: 8,
                maxLength: 20,
              })}
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
                <Button value={t('btnText')} type="submit" />
              </>
            )}
          </div>
          <Link href="/customer/sign-in">
            <p className="font-bold mb-4 text-right text-xs md:text-base text-primary-red hover:text-black hover:backdrop-blur-md hover:cursor-pointer">
              {t('loginQuestion')}
            </p>
          </Link>
        </form>
      )}
    </div>
  );
};

export default SignupForm;
