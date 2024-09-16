"use client";
import { getCookie } from "cookies-next";
import { createContext, useContext, useState } from "react";

const APPContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    isLoggedIn: boolean;
    currentRunningModal: string;
    unitId?: string;
    refreshPage?: boolean;
  }>({
    isLoggedIn: getCookie("user") ? true : false,
    currentRunningModal: "",
    unitId: undefined,
    refreshPage: false,
  });
  const setIsLoggedIn = (value:boolean) => {
    setState({ ...state, isLoggedIn:value?value: true });
  };

  const refreshData = (value?:boolean) => {
    setState({ ...state, refreshPage:value?? true,currentRunningModal:'' });
  };
  const setCurrentModal = (value: string, unitId?: string) => {
    if (unitId) {
      setState({ ...state, currentRunningModal: value, unitId: unitId });
    } else setState({ ...state, currentRunningModal: value });
  };
  const setUnitId = (value: string) => {
    setState({ ...state, unitId: value });
  };
  return (
    <APPContext.Provider
      value={{
        isLoggedIn: state.isLoggedIn,
        currentRunningModal: state.currentRunningModal,
        unitId: state.unitId,
        refreshPage:state.refreshPage,
        setCurrentModal,
        setIsLoggedIn,
        setUnitId,
        refreshData,
      }}>
      {children}
    </APPContext.Provider>
  );
}

export function useAppContext() {
  return useContext(APPContext);
}
