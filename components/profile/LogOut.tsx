'use client';

import { LogOutIcon } from '@/components/Icons/Icons';

export default function LogOut() {
  // const router = useRouter()
  const cerrarSesion = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  };
  return (
    <div className="flex items-center">
      <LogOutIcon />
      <button type="button" onClick={cerrarSesion}>
        Cerrar sesión
      </button>
    </div>
  );
}
