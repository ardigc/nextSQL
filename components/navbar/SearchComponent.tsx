'use client';
import { Input, Menu, MenuItem, MenuList, TextField } from 'gordo-ui';
import { SearchIcon } from '../Icons/Icons';
import { ChangeEventHandler, useState } from 'react';
import Link from 'next/link';
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
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined);
  const changeHandler: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = async (ev) => {
    setInputValue(ev.currentTarget.value);
    if (ev.currentTarget.value !== '') {
      setAnchorEl(ev.currentTarget);
      const response = await fetch(
        `/api/search?value=${ev.currentTarget.value}`,
        {
          method: 'GET',
          // body: JSON.stringify({ value: ev.currentTarget.value }),
          // headers: { 'Content.type': 'application/json' },
        }
      );
      const products = await response.json();
      setProducts(products);
    } else {
      setAnchorEl(undefined);
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
        className="bg-white  rounded-2xl rounded-r-2xl"
        size="small"
        classes={{
          inputClassName:
            'ml-4 [div>&]:py-1 w-full rounded-r-2xl hover:text-neutral-600',
        }}
        placeholder="¿Que necesitas?"
        onChange={changeHandler}
        // onClick={clickHandler}
      />
      <Menu
        className="max-w-[32rem] w-full "
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(undefined)}
        open={Boolean(anchorEl)}
      >
        <MenuList className="bg-white flex flex-col">
          {products &&
            products.map((product) => (
              <Link
                onClick={() => setAnchorEl(undefined)}
                className="border-b border-b-neutral-200 justify-start py-[6px] px-2 uppercase gap-1 flex items-center hover:bg-neutral-100"
                key={product.id}
                href={`/products/${product.id}`}
              >
                {product.name}
              </Link>
            ))}
        </MenuList>
      </Menu>
    </div>
  );
}
