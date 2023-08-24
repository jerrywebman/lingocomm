"use client";

import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { Rings } from "react-loader-spinner";
import Button from "../Button/ButtonWithIconRight";
import ButtonIconLeft from "../../components/Button/ButtonWithIconLeft";
import LogoutButton from "../../components/Button/LogoutButtonWithIconRight";
import { putData } from "./../../services/index";
import { UserContext } from "./../../context/user.context";

type Inputs = {
  firstname: string;
  lastname: string;
  email: string;
  birthdate: string;
  gender: string;
  country: string;
  city: string;
  job: string;
  phone: number;
  password: string;
};

const EditProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const router = useRouter();
  const { user } = useContext(UserContext);

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
      birthdate: user?.birthdate,
      gender: user?.gender,
      country: user?.country,
      city: user?.city,
      job: user?.job,
      phone: user?.phone,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    putData(`customers/update/${user?._id}`, data).then((res) => {
      setResponse(res);
      //If failed, show error message else redirect to services page
      if (res.success === false) {
        setIsLoading(false);
        toast.error(`${res.message}`);
      } else {
        setIsLoading(false);
        toast.success(`${res.message}`);
        localStorage.setItem("lingoUser", JSON.stringify(res.data));
        window.location.href = "/customer/my-profile";
      }
    });
  };

  return (
    <div className="mx-4 md:mx-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        action="#"
        className="space-y-2 p-2 max-w-4xl mx-auto lg:px-12 max-md:max-w-sm bg-white md:drop-shadow-xl rounded-lg"
      >
        <div className="space-y-2 py-8">
          <span className="text-4xl font-bold block text-center">
            Edit Profile
          </span>
        </div>
        <div className="space-y-2 py-2">
          <label htmlFor="fname" className="font-base text-lg block">
            Firstname
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
              errors.firstname && "border-primary-red focus:border-primary-red"
            }`}
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <small className="text-primary-red text-xs">
              Please enter your firstname
            </small>
          )}
        </div>
        <div className="space-y-2 py-2">
          <label htmlFor="lname" className="font-base text-lg block">
            Lastname
          </label>
          <input
            type="text"
            placeholder="Enter your last name"
            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
              errors.lastname && "border-primary-red focus:border-primary-red"
            }`}
            {...register("lastname", { required: true })}
          />
          {errors.lastname && (
            <small className="text-primary-red text-xs">
              Please enter your lastname
            </small>
          )}
        </div>
        <div className="space-y-2 py-2">
          <label htmlFor="email" className="font-base text-lg block">
            Email
          </label>
          <input
            readOnly
            type="email"
            placeholder="Enter your email address"
            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
              errors.email && "border-primary-red focus:border-primary-red"
            }`}
            {...register("email", { required: true })}
          />
          {errors.email && (
            <small className="text-primary-red text-xs">
              Please enter your email
            </small>
          )}
        </div>
        <div className="flex justify-between space-x-2">
          {" "}
          <div className="space-y-2 py-2 w-full">
            <label htmlFor="birthdate" className="font-base text-lg block">
              Date of Birth
            </label>
            <input
              type="date"
              placeholder="Enter your date of birth"
              className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                errors.birthdate &&
                "border-primary-red focus:border-primary-red"
              }`}
              {...register("birthdate", { required: true })}
            />
            {errors.birthdate && (
              <small className="text-primary-red text-xs">
                Please enter your date of birth
              </small>
            )}
          </div>
          <div className="space-y-2 py-2 w-full">
            <label htmlFor="gender" className="font-base text-lg block">
              Gender
            </label>
            <select
              className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                errors.gender && "border-primary-red focus:border-primary-red"
              }`}
              {...register("gender", { required: true })}
            >
              <option>Please select an option</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Do Not Wish to Specify">
                Do Not Wish to Specify
              </option>
            </select>
            {errors.gender && (
              <small className="text-primary-red text-xs">
                Please enter your gender
              </small>
            )}
          </div>
        </div>
        <div className="flex justify-between space-x-2 ">
          {" "}
          <div className="space-y-2 py-2 w-full">
            <label htmlFor="country" className="font-base text-lg block">
              Country
            </label>
            <input
              type="text"
              placeholder="Enter your Country"
              className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                errors.country && "border-primary-red focus:border-primary-red"
              }`}
              {...register("country", { required: true })}
            />
            {errors.country && (
              <small className="text-primary-red text-xs">
                Please enter your country
              </small>
            )}
          </div>
          <div className="space-y-2 py-2 w-full">
            <label htmlFor="City" className="font-base text-lg block">
              City
            </label>
            <input
              type="text"
              placeholder="Enter your City"
              className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                errors.city && "border-primary-red focus:border-primary-red"
              }`}
              {...register("city", { required: true })}
            />
            {errors.city && (
              <small className="text-primary-red text-xs">
                Please enter your city
              </small>
            )}
          </div>
        </div>
        <div className="space-y-2 py-2">
          <label htmlFor="Job" className="font-base text-lg block">
            Job
          </label>
          <input
            type="text"
            placeholder="Enter your Job"
            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
              errors.job && "border-primary-red focus:border-primary-red"
            }`}
            {...register("job", { required: true })}
          />
          {errors.job && (
            <small className="text-primary-red text-xs">
              Please enter your job
            </small>
          )}
        </div>
        <div className="space-y-2 py-2">
          <label htmlFor="Phone" className="font-base text-lg block">
            Phone number
          </label>
          <input
            type="text"
            placeholder="Enter your Phone number"
            className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
              errors.phone && "border-primary-red focus:border-primary-red"
            }`}
            {...register("phone", { required: true })}
          />
          {errors.phone && (
            <small className="text-primary-red text-xs">
              Please enter your phone
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
            <div className="flex justify-between">
              <ButtonIconLeft value="Back" />
              <Button value="Edit" type="submit" />
            </div>
          )}
        </div>
        <Link href="/customer/forgot-password">
          <p className="font-bold mb-4 text-right text-xs md:text-base text-primary-red hover:text-black hover:backdrop-blur-md hover:cursor-pointer">
            Change your password here.
          </p>
        </Link>
      </form>
    </div>
  );
};

export default EditProfileForm;
