import { GetStaticPropsContext } from "next";
import ContactForm from "@/components/Form/ContactForm";

export default function Contact() {
  return (
    <>
      <div className="md:my-8">
        <ContactForm />
      </div>
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
