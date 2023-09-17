'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { Toaster } from 'react-hot-toast';

export interface CartInterface {
  cart_id: number;
  description: string;
  name: string;
  price: number;
  product_id: number;
  qt: number;
  seller_id: number;
  seller_name: string;
  user_id: number;
  image_url: string;
}
interface ContextType {
  cart: Array<CartInterface>;
  setCart: Dispatch<SetStateAction<Array<CartInterface>>>;
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
  initialCart: Array<CartInterface>;
}) {
  const [cart, setCart] = useState<Array<CartInterface>>(initialCart);

  return (
    <GlobalContext.Provider value={{ cart, setCart }}>
      <Toaster />
      {children}
    </GlobalContext.Provider>
  );
}
