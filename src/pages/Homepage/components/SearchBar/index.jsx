import { TextField } from '@mui/material';

import classes from './style.module.scss';

const SearchBar = ({ onSearch }) => {
    const handleChange= (event) =>{
        onSearch(event.target.value);
    };
    return (
        <>
            <TextField className={classes["search-bar"]} id="filled-basic" label="Search for a country..." variant="filled"onChange={handleChange}/>
        </>
    )
}

export default SearchBar