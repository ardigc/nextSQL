'use client';
import { Input, TextField } from 'gordo-ui';
import { SearchIcon } from '../Icons/Icons';
import { ChangeEventHandler, useState } from 'react';
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  seller_id: number;
  product_page: string;
}
export default function SearchComponent() {
  const [inputValue, setInputValue] = useState<string>('');
  const [products, setProducts] = useState<Product[] | null>(null);
  const changeHandler: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = async (ev) => {
    setInputValue(ev.currentTarget.value);
    if (ev.currentTarget.value !== '') {
      const response = await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({ value: ev.currentTarget.value }),
        headers: { 'Content.type': 'application/json' },
      });
      const products = await response.json();
      setProducts(products);
    }
  };
  return (
    <div className="max-w-xl w-full flex items-center">
      <TextField
        id="seartchComponent"
        disableUnderline
        inputProps={{ startAdornment: <SearchIcon /> }}
        fullWidth
        value={inputValue}
        className="bg-white  rounded-2xl "
        size="small"
        classes={{
          inputClassName: 'ml-4 [div>&]:py-1 w-full hover:text-neutral-600',
        }}
        placeholder="¿Que necesitas?"
        onChange={changeHandler}
        // onClick={clickHandler}
      />
      {products &&
        products.map((product) => <div key={product.id}>{product.name}</div>)}
    </div>
  );
}
