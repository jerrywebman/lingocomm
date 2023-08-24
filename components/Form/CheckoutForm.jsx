import { useState, useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { postDataWithFile } from "./../../services/index";
import { useTranslations } from "next-intl";

export default function CheckoutForm({
  total,
  customerInfo,
  dataKey,
  formData,
}) {
  const stripe = useStripe();
  const elements = useElements();
  let data = customerInfo;

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const t = useTranslations("PaymentProcessComponent");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return <>stripe did not load</>;
    }

    setIsProcessing(true);

    await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${window.location.origin}/payment-status/?dataKey=${dataKey}`,
        },
      })
      .then(function (result) {
        toast.error(result.error.message);
        setIsProcessing(false);
      });

    setIsProcessing(false);
  };

  //send the email notification to admin as this component unmounts
  useEffect(() => {
    return () => {
      switch (dataKey) {
        case "lingoAudioServiceData": {
          toast("audio prod");
          // postDataWithFile("interpretations/add", newData).then((res) => {
          //   //If failed, show error message else redirect to services page
          //   if (res.success === false) {
          //     //send feedback to the user
          //     toast.error(`${res.message}`);
          //   } else {
          //     //send feedback to the user
          //     toast.success(`${res.message}`);
          //   }
          // });
          break;
        }
        case "lingoEditingServiceData": {
          toast("editing");

          // postDataWithFile("interpretations/add", newData).then((res) => {
          //   //If failed, show error message else redirect to services page
          //   if (res.success === false) {
          //     //send feedback to the user
          //     toast.error(`${res.message}`);
          //   } else {
          //     //send feedback to the user
          //     toast.success(`${res.message}`);
          //   }
          // });
          break;
        }
        default: {
          //do nothing
          break;
        }
      }
    };
  }, [dataKey]);

  return (
    <div className="mb-4 py-8 px-0 md:px-8 md:py-0">
      <div className="text-lg font-bold flex flex-row gap-5 mb-8">
        {t("title")}{" "}
      </div>
      {/* alert */}

      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button disabled={isProcessing || !stripe || !elements} id="submit">
          <span id="button-text">
            {isProcessing ? (
              <>
                <div className="flex justify-end pt-4 md:pt-12">
                  <button className="bg-black text-white p-2 px-4 rounded-lg">
                    {t("status")}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-end pt-4 md:pt-12">
                  {/* <button className="bg-gray-300 p-2 px-4 rounded-lg mr-2">
                    Cancel
                  </button> */}
                  <button className="bg-black text-white p-2 px-4 rounded-lg">
                    {t("pay", { price: total })}
                  </button>
                </div>
              </>
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}
