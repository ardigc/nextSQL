'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { Toaster } from 'react-hot-toast';

interface Cart {
  cart_id: number;
  description: string;
  id: number;
  name: string;
  price: number;
  product_id: number;
  qt: number;
  user_id: number;
  image_url: string;
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

export function Provider({
  children,
  initialCart,
}: {
  children: ReactNode;
  initialCart: Array<Cart>;
}) {
  const [cart, setCart] = useState<Array<Cart>>(initialCart);

  return (
    <GlobalContext.Provider value={{ cart, setCart }}>
      <Toaster />
      {children}
    </GlobalContext.Provider>
  );
}
