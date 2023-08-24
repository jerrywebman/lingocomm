import { GetStaticPropsContext } from "next";
import ForgotPasswordForm from "@/components/Form/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <>
      <div className="my-16">
        <ForgotPasswordForm />
      </div>
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
