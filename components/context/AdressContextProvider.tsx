'use client';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

interface ContextType {
  adressDef: number;
  setAdressDef: Dispatch<SetStateAction<number>>;
}
const initialState: ContextType = {
  adressDef: 0,
  setAdressDef: () => {},
};
export const AdressContext = createContext(initialState);
export function AdressProvider({
  children,
  initialAdress,
}: {
  children: ReactNode;
  initialAdress: number;
}) {
  const [adressDef, setAdressDef] = useState(initialAdress);

  return (
    <AdressContext.Provider value={{ adressDef, setAdressDef }}>
      {children}
    </AdressContext.Provider>
  );
}
