import { ReactNode } from "react";
import Head from "next/head";
import { UserContextProvider } from "@/context/user.context";
import Footer from "@/components/partials/footer/Footer";
import Header from "@/components/partials/header/NavBar/index";
import ScrollTop from "@/components/scrollTop/index";
import ReactToastify from "@/components/Toast/ReactToastify";

type Props = {
  children?: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function PageLayout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Lingo</title>
      </Head>
      <UserContextProvider>
        <Header />
        {children}
        <ScrollTop />
        <ReactToastify />
        <Footer />
      </UserContextProvider>
    </>
  );
}
