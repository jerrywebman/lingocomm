import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextIntlClientProvider } from "next-intl";
import localFont from "next/font/local";
import PageLayout from "@/components/Layout/PageLayout";

//fonts
const myFont = localFont({
  src: "../fonts/helvetica_neue_67_medium_condensed-webfont.woff2",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextIntlClientProvider messages={pageProps.messages}>
      <main className={myFont.className}>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </main>
    </NextIntlClientProvider>
  );
}
