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
    notificationCount: number | undefined;
  }>({
    isLoggedIn: getCookie("user") ? true : false,
    currentRunningModal: "",
    unitId: undefined,
    refreshPage: false,
    notificationCount: undefined,
  });
  const setIsLoggedIn = (value: boolean) => {
    setState({ ...state, isLoggedIn: value ? value : true });
  };

  const refreshData = (value?: boolean) => {
    console.log("value", value);
    setState({ ...state, refreshPage: value ?? true, currentRunningModal: "" });
  };
  const updateNotificationCount = (value: number) => {
    setState({
      ...state,
      notificationCount: value,
    });
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
        refreshPage: state.refreshPage,
        notifyCount:state.notificationCount,
        setCurrentModal,
        setIsLoggedIn,
        setUnitId,
        refreshData,
        updateNotificationCount,
      }}>
      {children}
    </APPContext.Provider>
  );
}

export function useAppContext() {
  return useContext(APPContext);
}
