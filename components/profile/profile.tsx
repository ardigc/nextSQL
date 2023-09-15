import { UserIcon } from '@/components/Icons/Icons';
import { useState } from 'react';
import Cart from '../cart/Cart';
import LogOut from './LogOut';
import { verify } from 'jsonwebtoken';
import Link from 'next/link';
import { Button, Menu, MenuList, Paper, Popover } from 'gordo-ui';

export default function ProfileButton({
  user,
}: {
  user: { id: number; name: string; role: string };
}) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined);

  return (
    <div className="relative">
      <Button
        disableRipple
        variant="text"
        className="[div>&]:text-black [div>&]:font-sans"
        onClick={(ev) => {
          setAnchorEl(ev.currentTarget), setOpen(true);
        }}
      >
        {user.name}
      </Button>
      <Menu
        onClose={() => {
          setAnchorEl(undefined), setOpen(false);
        }}
        open={open}
        anchorEl={anchorEl}
        classes={{ MenuList: 'm-2 flex flex-col' }}
      >
        <Link
          href="/profile"
          onClick={() => {
            setAnchorEl(undefined), setOpen(false);
          }}
        >
          Tu perfil
        </Link>

        <Link
          href="/profile/orders"
          onClick={() => {
            setAnchorEl(undefined), setOpen(false);
          }}
        >
          Pedidos
        </Link>

        {user.role === 'seller' && (
          <Link
            href="/profile/products"
            onClick={() => {
              setAnchorEl(undefined), setOpen(false);
            }}
          >
            Tus productos
          </Link>
        )}
        <li
          onClick={() => {
            setAnchorEl(undefined), setOpen(false);
          }}
        >
          <LogOut />
        </li>
      </Menu>
      {/* {open && (
        <div className="absolute bg-blue-300 border border-blue-400 w-32 ">
          <ul>
            <li>
              <Link href="/profile" onClick={() => setOpen(false)}>
                Tu perfil
              </Link>
            </li>
            <li>
              <Link href="/profile/orders">Pedidos</Link>
            </li>
            {user.role === 'seller' && (
              <li>
                <Link href="/profile/products">Tus productos</Link>
              </li>
            )}
            <li onClick={() => setOpen(false)}>
              <LogOut />
            </li>
          </ul>
        </div>
      )} */}
    </div>
  );
}
