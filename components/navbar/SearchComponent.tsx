import { Input, TextField } from 'gordo-ui';
import { SearchIcon } from '../Icons/Icons';

export default function SearchComponent() {
  return (
    <div className="max-w-xl w-full flex items-center">
      <TextField
        disableUnderline
        inputProps={{ startAdornment: <SearchIcon /> }}
        fullWidth
        className="bg-white  rounded-2xl "
        size="small"
        classes={{
          inputClassName: 'ml-4 [div>&]:py-1 w-full hover:text-neutral-600',
        }}
        placeholder="¿Que necesitas?"
        // onChange={changeHandler}
        // onClick={clickHandler}
      />
    </div>
  );
}
