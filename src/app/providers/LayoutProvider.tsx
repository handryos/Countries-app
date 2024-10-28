"use client";
import { useRouter, usePathname } from "next/navigation";
import { Provider as ReduxProvider } from "react-redux";
import React, { Suspense, useEffect } from "react";

import DynamicRouting from "../components/DynamicRouting";
import { store, useSelector } from "../redux/store";
import ThemeRegistry from "../theme/ThemeRegistry";
import Menu from "../components/Menu/Menu";
import MenuTop from "../components/Menu/MenuTop";
import { useMediaQuery, useTheme } from "@mui/material";
import DrawerTema from "../components/ArpaDrawerTema/DrawerTema";

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  let routerx = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width:1024px)");
  const isTablet = useMediaQuery("(min-width:500px)");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token && pathname != "/routes/register") {
      routerx.push("/routes/login");
    }

    if (token) {
      const expirationTime = 60 * 60 * 1000;
      const timer = setTimeout(() => {
        localStorage.removeItem("token");
        routerx.push("/routes/login");
      }, expirationTime);
      return () => clearTimeout(timer);
    }
  }, [routerx, pathname, token]);

  return (
    <ReduxProvider store={store}>
      <ThemeRegistry>
        <DynamicRouting>
          <>
            {pathname != "/routes/login" && pathname != "/routes/register" ? (
              isMobile ? (
                <MenuTop />
              ) : (
                <>
                  <Menu />
                  <DrawerTema />
                </>
              )
            ) : null}
            <div
              style={{
                minHeight: "93.3dvh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  marginTop: isMobile ? (isTablet ? "2dvh" : "8dvh") : 0,
                  marginLeft:
                    pathname != "/routes/login" && "/routes/register"
                      ? isMobile
                        ? undefined
                        : pathname == "/routes/register"
                        ? "4dvw"
                        : "14dvw"
                      : "",
                  flex: 1,
                  overflow: "hidden",
                }}
              >
                <Suspense>
                  <div style={{ overflow: "auto" }}>{children}</div>
                </Suspense>
              </div>
            </div>
          </>
        </DynamicRouting>
      </ThemeRegistry>
    </ReduxProvider>
  );
};
