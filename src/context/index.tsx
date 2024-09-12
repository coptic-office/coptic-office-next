"use client";
import { getCookie } from "cookies-next";
import { createContext, useContext, useState } from "react";

const APPContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    isLoggedIn: boolean;
    currentRunningModal: string;
  }>({
    isLoggedIn: getCookie("user") ? true : false,
    currentRunningModal: "",
  });
  const setIsLoggedIn = () => {
    setState({ ...state, isLoggedIn: true });
  };
  const setCurrentModal = (value: string) => {
    console.log("FALF", value);
    setState({ ...state, currentRunningModal: value });
  };
  return (
    <APPContext.Provider
      value={{
        isLoggedIn: state.isLoggedIn,
        currentRunningModal: state.currentRunningModal,
        setCurrentModal,
        setIsLoggedIn,
      }}>
      {children}
    </APPContext.Provider>
  );
}

export function useAppContext() {
  return useContext(APPContext);
}
