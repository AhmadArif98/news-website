import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FeedIcon from '@mui/icons-material/Feed';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { MainContext } from '../home';
import { Filters } from './Filters';
import { NewsFeed } from './NewsFeed';

export function Search() {
    const { query, setQuery, loadingNewsAPI, loadingTheGuardian, loadingNYT } = useContext(MainContext);
    const [searchValue, setSearchValue] = useState(query || '');
    const [openFilters, setOpenFilters] = useState(false);
    const [openNewsFeed, setOpenNewsFeed] = useState(false);
    const [timer, setTimer] = useState(null);
    const handleSearchChange = async (event) => {
        setSearchValue(event.target.value);
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setTimer(
            setTimeout(async () => {
                setQuery(event.target.value)
            }, 600),
        );
    };

    const handleOpenFilters = () => {
        setOpenFilters(true);
    };

    const handleOpenNewsFeed = () => {
        setOpenNewsFeed(true);
    };

    const handleClose = () => {
        setOpenFilters(false);
    };

    const handleCloseNewsFeed = () => {
        setOpenNewsFeed(false);
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    width: { xs: '100%', md: 'fit-content' },
                    overflow: 'auto',
                }}
            >
                <IconButton onClick={handleOpenFilters} size='small' sx={{ width: 'fit-content', paddingLeft: '7px', paddingRight: '9px' }}>
                    <FilterAltIcon sx={{ marginBottom: '1px' }} />&nbsp;
                    <Typography variant='caption'>Filters</Typography>
                </IconButton>
                <IconButton onClick={handleOpenNewsFeed} size='small' sx={{ width: 'fit-content', paddingLeft: '7px', paddingRight: '9px' }}>
                    <FeedIcon sx={{ marginBottom: '1px' }} />&nbsp;
                    <Typography variant='caption'>News Feed</Typography>
                </IconButton>
                <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
                    <OutlinedInput
                        size="small"
                        id="search"
                        placeholder="Search…"
                        sx={{ flexGrow: 1 }}
                        startAdornment={
                            <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                                <SearchRoundedIcon fontSize="small" />
                            </InputAdornment>
                        }
                        endAdornment={
                            (loadingNewsAPI || loadingTheGuardian || loadingNYT) && <CircularProgress size={15}/>
                        }
                        inputProps={{
                            'aria-label': 'search',
                        }}
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                </FormControl>
            </Box>
            <Filters open={openFilters} handleClose={handleClose} />
            <NewsFeed open={openNewsFeed} handleClose={handleCloseNewsFeed} />
        </>
    );
}