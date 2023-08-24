import EditProfileForm from "@/components/Form/EditProfileForm";
import { GetStaticPropsContext } from "next";
export default function Signup() {
  return (
    <>
      <div className="my-16">
        <EditProfileForm />
      </div>
    </>
  );
}
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
