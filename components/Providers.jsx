"use client";
import store from "@/store/store";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
const Providers = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
};

export default Providers;
