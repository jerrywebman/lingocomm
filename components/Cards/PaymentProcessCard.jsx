import { useEffect, useState, useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Form/CheckoutForm";
import { getData, postData } from "../../services/index";
import { UserContext } from "../../context/user.context";
import Loading from "../loading/Loading";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const PaymentProcessCard = ({ dataKey, serviceType, formData }) => {
  const data = JSON.parse(sessionStorage.getItem(dataKey));
  const { user } = useContext(UserContext);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const t = useTranslations("PaymentProcessComponent");
  const processPayments = () => {
    //ROUND THE TOTAL PRICE TO TWO DECIMALS
    let total = Number(data.totalPrice.toFixed(2));
    const formData = {
      amount: total,
      customerId: user?._id,
      email: user?.email,
      fullname: `${user?.firstname} " " ${user?.lastname}`,
      description: `${serviceType} for ${data.wordCount} Words at € ${data.pricePerWord} per word`,
      serviceId: user?._id,
      serviceType,
    };
    if (data.totalPrice) {
      postData("payment/make-payment", formData).then((res) => {
        //If failed, show error message else redirect to services page
        if (res.success === false) {
          toast.error(res.message);
          console.log(res.message);
        }
        setClientSecret(res.clientSecret);
      });
    }
  };

  useEffect(() => {
    //GETTING THE PUBLISHABLE KEY
    const getKey = async () => {
      getData("payment/getkey").then(async (res) => {
        const { publishableKey } = await res;
        setStripePromise(loadStripe(publishableKey));
      });
    };
    getKey();
  }, []);

  useEffect(() => {
    //GETTING THE PUBLISHABLE KEY
    console.log("send email here only once");
  }, []);

  useEffect(() => {
    processPayments();
  }, [stripePromise]);

  return (
    <>
      <div className="bg-white md:p-6 md:m-4 border-0.5 mb-[200px] capitalise ">
        <div className="flex flex-col pt-8 text-center mb-8">
          <h2 className="font-bold text-xl uppercase tracking-tight">
            {t("title")}
          </h2>
          <p className="mb-4 text-green-600">
            {t("text", { price: data.pricePerWord, word: data.wordCount })}
          </p>
          <hr></hr>
        </div>{" "}
        {/* PAYMENT DETAILS FORM */}
        <>
          <div className="md:px-48">
            <>
              {clientSecret && stripePromise ? (
                <>
                  {" "}
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm
                      total={data.totalPrice}
                      customerInfo={user}
                      dataKey={dataKey}
                      formData={formData}
                    />
                  </Elements>
                </>
              ) : (
                <>
                  <p className="text-center -mb-16">{t("loading")}</p>
                  <Loading />
                </>
              )}
            </>
          </div>
        </>
      </div>
    </>
  );
};

export default PaymentProcessCard;
