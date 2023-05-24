'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

interface Cart {
  cart_id: number;
  description: string;
  id: number;
  name: string;
  price: number;
  product_id: number;
  qt: number;
  user_id: number;
}
interface ContextType {
  cart: Array<Cart>;
  setCart: Dispatch<SetStateAction<Array<Cart>>>;
}

const initialState: ContextType = {
  cart: [],
  setCart: () => {},
};

export const GlobalContext = createContext<ContextType>(initialState);

export function Provider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Array<Cart>>([]);

  return (
    <GlobalContext.Provider value={{ cart, setCart }}>
      {children}
    </GlobalContext.Provider>
  );
}
