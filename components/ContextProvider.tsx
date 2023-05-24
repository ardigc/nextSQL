'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

interface ContextType {
  number: number;
  setNumber: Dispatch<SetStateAction<number>>;
}

const initialState: ContextType = {
  number: 0,
  setNumber: () => {},
};

export const GlobalContext = createContext<ContextType>(initialState);

export function Provider({ children }: { children: ReactNode }) {
  const [number, setNumber] = useState(0);

  return (
    <GlobalContext.Provider value={{ number, setNumber }}>
      {children}
    </GlobalContext.Provider>
  );
}
