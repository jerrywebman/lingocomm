import { GetStaticPropsContext } from "next";
import LoginForm from "@/components/Form/LoginForm";
import SignupForm from "@/components/Form/SignupForm";

export default function Signup() {
  return (
    <>
      <div className="my-16">
        <SignupForm />
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
