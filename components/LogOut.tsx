'use client';

import { LogOutIcon } from '@/Icons/Icons';

// import { useRouter } from "next/router";

export default function LogOut() {
  // const router = useRouter()
  const cerrarSesion = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // router.push('/login');
    window.location.reload();
  };
  return (
    <div className="flex items-center">
      <LogOutIcon />
      <button
        type="button"
        onClick={cerrarSesion}
        // className="px-1 my-2 border bg-blue-400 rounded-3xl ml-7"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
