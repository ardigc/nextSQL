import { IconButton } from 'gordo-ui';
import { GithubIcon, LinkedInIcon } from '../Icons/Icons';

export default function FooterComponent() {
  return (
    <footer className="w-full mt-10">
      <div className="flex mx-auto items-center flex-col">
        <p className="text-xl">Creado por Adrián Gordo</p>
        <div>Echa un vistazo a mis redes</div>
        <div className="flex">
          <IconButton href="https://github.com/ardigc" disableRipple>
            <GithubIcon />
          </IconButton>
          <IconButton href="https://www.linkedin.com/in/adrian-gordo-cortes-1375ba282/">
            <LinkedInIcon />
          </IconButton>
        </div>
      </div>
    </footer>
  );
}
