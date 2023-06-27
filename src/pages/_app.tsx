import { type AppType } from "next/app";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import { useState } from "react";

import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Notifications } from '@mantine/notifications';

import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";

import "../styles/globals.css";
import Navbar from "./components/layout/_navbar";

const publicPages = ["/sign-in/[[...index]]", "/sign-up/[[...index]]"];

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ClerkProvider {...pageProps}>
      {publicPages.includes(router.pathname) ? (
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme,
            }}
          >
            <Notifications />
            {/* <Layout> */}
            <Component {...pageProps} colorScheme />
            {/* </Layout> */}
          </MantineProvider>
        </ColorSchemeProvider>
      ) : (
        <>
          <SignedIn>
            <ColorSchemeProvider
              colorScheme={colorScheme}
              toggleColorScheme={toggleColorScheme}
            >
              <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                  colorScheme,
                }}
              >
                <Notifications />
                {/* <Layout> */}
                <AppShell
                  padding="md"
                  fixed={false}
                  navbarOffsetBreakpoint="sm"
                  asideOffsetBreakpoint="sm"
                  navbar={
                    <Navbar /> //opened={opened}
                  }

                  styles={(theme) => ({
                    main: {
                      backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                    },
                  })}
                >
                  <Component {...pageProps} />
                </AppShell>
                {/* </Layout> */}
              </MantineProvider>
            </ColorSchemeProvider>
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
