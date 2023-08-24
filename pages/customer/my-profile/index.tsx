import { useContext } from "react";
import { GetStaticPropsContext } from "next";
import Link from "next/link";
import Title from "@/components/Typography/Title";
import DivideX from "@/components/Divider/DivideX";
import { useRouter } from "next/navigation";
import moment from "moment";
import { MdEditDocument, MdLocationPin, MdOutlineEmail } from "react-icons/md";
import {
  FaArrowAltCircleLeft,
  FaBirthdayCake,
  FaSignOutAlt,
  FaSuitcase,
  FaUserTie,
} from "react-icons/fa";
import { BsExclude } from "react-icons/bs";
import { BiPhoneCall } from "react-icons/bi";
import { UserContext } from "@/context/user.context";
import { useTranslations } from "next-intl";

export default function Page() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const t = useTranslations("ProfilePage");

  const logout = () => {
    localStorage.removeItem("lingoUser");
    // router.push("/customer/sign-in");
    window.location.href = "/";
  };

  if (user === null) {
    router.push("/customer/sign-in");
  }

  return (
    <>
      <div className="mt-8">
        <Title
          intro={""}
          titleColor={"text-primary-blue px-4 "}
          title={t("title")}
          subtitle={t("subtitle")}
          introRequired={false}
          subtitleRequired={true}
          bgLineRequired={false}
        />
      </div>
      <DivideX>
        <div className="leading-relaxed tracking-wide p-2 max-w-4xl mx-auto lg:px-12 md:my-8 bg-white md:drop-shadow-xl rounded-lg">
          <center className="my-4">
            {" "}
            <FaUserTie className="h-24 w-24 shadow-lg rounded-full inline text-xl md:text-3xl text-black" />
            <Link href={`/customer/my-profile/edit`}>
              {" "}
              <MdEditDocument className="text-lg md:text-2xl text-green-500" />
            </Link>
          </center>
          <hr></hr>
          <div className="grid grid-col-1 md:grid-cols-2 place-content-center md:place-content-start divide-y md:divide-x gap-8 font-base text-lg">
            {" "}
            <p className="">
              {" "}
              <FaUserTie className="inline text-xl md:text-3xl text-primary-blue mr-2" />{" "}
              {user?.firstname + " " + user?.lastname}
            </p>
            <p className=" ">
              <MdOutlineEmail className="inline text-xl md:text-3xl text-primary-blue mr-2" />{" "}
              {user?.email}
            </p>
            <p className="">
              {" "}
              <BsExclude className="inline text-xl md:text-3xl text-primary-blue mr-2" />{" "}
              {user?.gender}
            </p>
            <p className="">
              <MdLocationPin className="inline text-xl md:text-3xl text-primary-blue mr-2" />{" "}
              {user?.city + ", " + user?.country}
            </p>
            <p className="">
              {" "}
              <FaSuitcase className="inline text-xl md:text-3xl text-primary-blue mr-2" />{" "}
              {user?.job}
            </p>
            <p className="">
              <BiPhoneCall className="inline text-xl md:text-3xl text-primary-blue mr-2 " />{" "}
              {user?.phone}
            </p>
            <p className="">
              <FaBirthdayCake className="inline text-xl md:text-3xl text-primary-blue mr-2" />
              {moment(user?.birthdate).format("ll")}
            </p>
          </div>
          <div className="my-4 md:my-8">
            <hr></hr>
            <div className="flex justify-between ">
              <button
                className="my-12 transition ease-in-out delay-150 hover:-translate-y-1 text-lg md:text-2xl cursor-pointer"
                onClick={() => router.back()}
              >
                <FaArrowAltCircleLeft className="inline text-secondary-purple mx-1 " />
                {t("backBtn")}
              </button>

              <button
                className="my-12 transition ease-in-out delay-150 hover:-translate-y-1 text-lg md:text-2xl cursor-pointer "
                onClick={() => logout()}
              >
                {t("logoutBtn")}
                <FaSignOutAlt className="inline text-primary-red mx-1" />
              </button>
            </div>
          </div>
        </div>
      </DivideX>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
