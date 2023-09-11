import { IconButton } from 'gordo-ui';
import { GithubIcon } from '../Icons/Icons';

export default function FooterComponent() {
  return (
    <footer className="w-full mt-10">
      <div className="flex mx-auto items-center flex-col">
        <p className="text-xl">Creado por Adrián Gordo</p>
        <div className="flex">Echa un vistazo a mis redes</div>
        <IconButton href="https://github.com/ardigc" disableRipple>
          <GithubIcon />
        </IconButton>
      </div>
    </footer>
  );
}
