import React from "react";
import type { AppProps } from "next/app";
import RootLayout from "@/app/RootLayout";
import "@/styles/globals.css";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { Router } from "next/router";

// Setup NProgress for each route change
NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
