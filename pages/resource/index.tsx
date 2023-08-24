import { GetStaticPropsContext } from "next";
import { useEffect, useState, useContext } from "react";
import Title from "@/components/Typography/Title";
import DivideX from "@/components/Divider/DivideX";
import { UserContext } from "@/context/user.context";
import Loading from "@/components/loading/Loading";
import moment from "moment";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/Button/ButtonWithIconRight";

// types
type Inputs = {
  password: string;
};

type TransactionType = {
  id: string;
  object: string;
  amount: number;
  created: number;
  currency: string;
  description: string;
  status: string;
  metadata: {
    customerId: string;
    email: string;
    fullname: string;
  };
  receipt_email: string;
};

type TransactionResponseType = {
  status: boolean;
  data?: [];
  message: string;
};

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_UR}/payment/get-payment-intent`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function Page() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [allTrxn, setAllTrxn] = useState<TransactionType[]>();
  const [pass, setPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.password === "wysiwyg") {
      setPass(true);
    }
  };

  const getInfo = async () => {
    const data: TransactionResponseType = await getData();
    const transactions: [] | undefined = data.data;
    setAllTrxn(transactions);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      {user?.email === "jerry.ifeanyi@korsgy.com" ||
      user?.email === "sofia.magalhaes@lingocomm.com" ? (
        <>
          <div className="mt-8">
            <Title
              intro={""}
              titleColor={"text-primary-blue px-4 "}
              title={"Latest transactions"}
              subtitle={` Welcome ${user.firstname} the demo password is - wysiwyg - = what you see is what you get`}
              introRequired={false}
              subtitleRequired={true}
              bgLineRequired={false}
            />
          </div>
          <DivideX>
            {allTrxn === undefined ? (
              <>
                <>
                  <Loading />
                </>
              </>
            ) : pass ? (
              <>
                {" "}
                <div className="flex flex-col mt-6 mb-16">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden sm:rounded-lg">
                        <table className="min-w-full text-sm text-gray-400">
                          <thead className="bg-gray-800 text-xs uppercase font-medium">
                            <tr>
                              <th></th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left tracking-wider"
                              >
                                Email
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left tracking-wider"
                              >
                                Amount(Euro)
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left tracking-wider"
                              >
                                Description
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left tracking-wider"
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left tracking-wider"
                              >
                                Date
                              </th>
                            </tr>
                          </thead>
                          {allTrxn?.map((item, index) => (
                            <tbody key={index} className="bg-gray-800">
                              <tr className="bg-black bg-opacity-20">
                                <td className="pl-4">{index + 1}</td>
                                <td className="flex px-6 py-4 whitespace-nowrap">
                                  <span className="ml-2 font-medium">
                                    {item.receipt_email}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  € {item.amount / 100}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {item.description}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {item.status === "succeeded" ? (
                                    <>
                                      <svg
                                        className="w-4 fill-current text-green-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clip-rule="evenodd"
                                        />
                                      </svg>
                                    </>
                                  ) : (
                                    <> {item.status}</>
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {moment(item.created * 1000).format("LLL")}
                                </td>
                              </tr>
                            </tbody>
                          ))}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {" "}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  method="POST"
                  action="#"
                  className="space-y-2 p-2 max-w-4xl mx-auto lg:px-12 md:my-8 max-md:max-w-sm bg-white md:drop-shadow-xl rounded-lg"
                >
                  <div className="space-y-2 mt-16">
                    <label
                      htmlFor="password"
                      className="font-base text-lg block"
                    >
                      Passcode
                    </label>
                    <input
                      type="password"
                      placeholder={"enter a passcode"}
                      className={`p-3 rounded-lg border focus:border-primary-blue w-full ${
                        errors.password &&
                        "border-primary-red focus:border-primary-red"
                      }`}
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <small className="text-primary-red text-xs">
                        {"enter a passcode"}
                      </small>
                    )}
                  </div>

                  <div className="space-y-2 p-2">
                    <>
                      <Button value={`Submit`} type="submit" />
                    </>
                  </div>
                </form>
              </>
            )}
          </DivideX>
        </>
      ) : null}
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
