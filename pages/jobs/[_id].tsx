import {
  GetStaticPropsContext,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import axios from "axios";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useState, useEffect, useContext } from "react";
import type { GetStaticPaths } from "next";
import React from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Rings } from "react-loader-spinner";
import DivideX from "@/components/Divider/DivideX";
import Button from "@/components/Button/ButtonWithIconRight";
import { useForm, SubmitHandler } from "react-hook-form";
import { BiSelectMultiple } from "react-icons/bi";
import { postData, postDataWithFile } from "@/services/index";
import { UserContext } from "@/context/user.context";
import { useRouter } from "next/router";

// types
type JobType = {
  _id: string;
  title: string;
  state: string;
  description: string;
  requirements: string[];
  location: string;
  type: string;
  jobApplications?: any[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

type JobResponseType = {
  success: boolean;
  data: [];
  message: string;
};

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

const Page = ({ job }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [singleJob, setSingleJob] = useState<JobType>(job);
  const [singleFile, setSingleFile] = useState<[]>();
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
      phone: user?.phone,
      address: "Default",
    },
  });

  // useEffect(() => {
  //   //get the number of words
  //   const file = watch("file");
  //   if (file?.length > 0) {
  //     const createRequest = async () => {
  //       const endpoint = "job-applications/add";
  //       try {
  //         const res = await axios.post(
  //           `http://localhost:4000/${endpoint}`,
  //           { data, file: file ? [0] : {} },
  //           {
  //             headers: {
  //               "Content-Type": "multipart/form-data,application/json",
  //             },
  //           }
  //         );

  //         console.log(res.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     createRequest();
  //   }
  // }, [watch("file")]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    const jobId: string | string[] | undefined = router.query?._id;
    const jobData: {} = { ...data, job: jobId };
    const file = watch("file");
    // @ts-ignore
    const newDdata = { ...jobData, file: data.file[0] };
    if (file?.length > 0) {
      postDataWithFile("job-applications/add", newDdata).then((res) => {
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
    <>
      {singleJob === undefined ? (
        <>
          <div className="items-center space-y-2 p-2 max-w-4xl mx-auto lg:px-12 max-md:max-w-sm bg-white md:drop-shadow-xl my-8 h-72 w-screen">
            <h4 className="text-lg md:text-xl text-black font-bold  my-4 px-auto text-center">
              Job not found
            </h4>
            <center>
              {" "}
              <div>
                {" "}
                <Link
                  href="/jobs"
                  className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white hover:text-black transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-primary-blue active:bg-primary-purple hover:bg-primary-purple"
                >
                  Back to Career page
                </Link>
              </div>
            </center>
          </div>
        </>
      ) : (
        <div className="mt-8">
          <h4 className="font-bold text-primary-blue text-3xl md:text-4xl text-center md:mx-0 md:items-center p-2 mb-8">
            {`Application for `}
            <span className="lowercase">{singleJob?.title}</span>
          </h4>
          <DivideX>
            <div className="space-y-2 p-2 max-w-4xl mx-auto lg:px-12 max-md:max-w-sm bg-white md:drop-shadow-xl my-8">
              <h4 className="text-lg md:text-xl text-black font-bold text-left my-4 px-auto">
                Requirements :
              </h4>
              <div className="md:mx-auto">
                {singleJob?.requirements.map((item, index) => (
                  <div className="flex my-2" key={index}>
                    <BiSelectMultiple className="inline text-base md:text-lg text-primary-blue mx-2" />
                    <span className="inline">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="POST"
              action="#"
              encType="multipart/form-data"
              className="space-y-2 p-2 max-w-4xl mx-auto lg:px-12 max-md:max-w-sm bg-white md:drop-shadow-xl my-8"
            >
              <div className="space-y-2 pb-4">
                <label htmlFor="fname" className="font-base text-lg block">
                  Firstname<span className="text-red-800">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your Firstname"
                  className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                    errors.firstname &&
                    "border-primary-red focus:border-primary-red"
                  }`}
                  {...register("firstname", { required: true })}
                />
                {errors.firstname && (
                  <small className="text-primary-red text-xs">
                    Please enter your first name
                  </small>
                )}
              </div>
              <div className="space-y-2 pb-4">
                <label htmlFor="lname" className="font-base text-lg block">
                  Lastname<span className="text-red-800">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                    errors.lastname &&
                    "border-primary-red focus:border-primary-red"
                  }`}
                  {...register("lastname", { required: true })}
                />
                {errors.lastname && (
                  <small className="text-primary-red text-xs">
                    Please enter your last name
                  </small>
                )}
              </div>
              <div className="space-y-2  pb-4">
                <label htmlFor="email" className="font-base text-lg block">
                  Email<span className="text-red-800">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                    errors.email &&
                    "border-primary-red focus:border-primary-red"
                  }`}
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <small className="text-primary-red text-xs">
                    Please enter your email
                  </small>
                )}
              </div>
              <div className="space-y-2  pb-4">
                <label htmlFor="phone" className="font-base text-lg block">
                  Phone number<span className="text-red-800">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter your phone number"
                  className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                    errors.email &&
                    "border-primary-red focus:border-primary-red"
                  }`}
                  {...register("phone", { required: true })}
                />
                {errors.email && (
                  <small className="text-primary-red text-xs">
                    Please enter your phone
                  </small>
                )}
              </div>
              <div className="space-y-2  pb-4">
                <label htmlFor="birthdate" className="font-base text-lg block">
                  Birth Date<span className="text-red-800">*</span>
                </label>
                <input
                  type="date"
                  placeholder="Enter your birth date "
                  className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                    errors.email &&
                    "border-primary-red focus:border-primary-red"
                  }`}
                  {...register("birthdate", { required: true })}
                />
                {errors.birthdate && (
                  <small className="text-primary-red text-xs">
                    Please enter date of birth
                  </small>
                )}
              </div>

              <div className="space-y-2 pb-4">
                <label htmlFor="message" className="font-base text-lg block">
                  Tell us about youself<span className="text-red-800">*</span>
                </label>
                <textarea
                  placeholder="Tell us about your skills, passions ..."
                  className={`p-3 rounded-lg border focus:border-primary-blue w-full h-72 ${
                    errors.about &&
                    "border-primary-red focus:border-primary-red"
                  }`}
                  {...register("about", { required: true })}
                >
                  {errors.about && (
                    <small className="text-primary-red text-xs">
                      This field is required
                    </small>
                  )}
                </textarea>
              </div>
              <div className="flex flex-col w-max mx-auto text-center pb-8">
                {errors.file && (
                  <small className="text-primary-red text-xs">* *</small>
                )}
                <label className="font-base text-lg block">
                  Upload your resume
                  <span className="text-red-800">*</span>
                  <input
                    className={`text-sm cursor-pointer w-3/4  ${
                      errors.file
                        ? "border-primary-red"
                        : "border-primary-grey "
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
                    <Button value="Apply" type="submit" />
                  </>
                )}
              </div>
            </form>
          </DivideX>
        </div>
      )}
    </>
  );
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_UR}/jobs/all`);
  const jobs: JobResponseType = await res.json();
  const paths = jobs.data.map((item: any) => {
    return { params: { _id: item._id } };
  });
  return {
    paths,
    fallback: true, // false or "blocking"
  };
};

export const getStaticProps: GetStaticProps<{
  job: JobType;
}> = async ({ locale, params }: GetStaticPropsContext) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_UR}/jobs/search/${params?._id}`
  );
  const job = await res.json();
  return {
    props: {
      job: job.data,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
};
