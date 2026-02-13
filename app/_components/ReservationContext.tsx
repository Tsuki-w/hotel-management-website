"use client";

import { createContext, useContext, useState, useCallback } from "react";

type TReservationRange = {
  from: Date | undefined;
  to: Date | undefined;
};

type TReservationContext = {
  range: TReservationRange;
  setRange: React.Dispatch<React.SetStateAction<TReservationRange>>;
  resetRange: () => void;
};

const initialState = {
  from: undefined,
  to: undefined,
};
const ReservationContext = createContext<TReservationContext>({
  range: initialState,
  setRange: () => {},
  resetRange: () => {},
});

// 全局提供用户选择的住宿日期
export default function ReservationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [range, setRange] = useState<TReservationRange>(initialState);
  const resetRange = useCallback(() => {
    setRange(initialState);
  }, []);
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (context === null) {
    throw new Error("useReservation必须在ReservationProvider中使用");
  }
  return context;
}
