import type { AppProps } from "next/app";
import RootLayout from "@/app/RootLayout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "@/styles/globals.css";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { Router } from "next/router";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// Setup NProgress for each route change
NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
