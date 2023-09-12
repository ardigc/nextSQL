import { Input, TextField } from 'gordo-ui';
import { SearchIcon } from '../Icons/Icons';

export default function SearchComponent() {
  return (
    <div className="max-w-xl w-full">
      <TextField
        disableUnderline
        inputProps={{ startAdornment: <SearchIcon /> }}
        fullWidth
        className="bg-white  rounded-2xl "
        size="small"
        classes={{ inputClassName: 'ml-4 pt-2 w-full hover:text-neutral-600' }}
        placeholder="¿Que necesitas?"
        // onChange={changeHandler}
        // onClick={clickHandler}
      />
    </div>
  );
}
