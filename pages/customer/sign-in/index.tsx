import LoginForm from "@/components/Form/LoginForm";
import { GetStaticPropsContext } from "next";
import SignupForm from "@/components/Form/SignupForm";

export default function Signin() {
  return (
    <>
      <div className="my-16">
        <LoginForm />
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
