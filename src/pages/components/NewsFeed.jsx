import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Box, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { MainContext } from '../home';

export const NewsFeed = ({ open, handleClose }) => {
    const { handleNewsFeed, feedCategories, feedSources, feedAuthors } = useContext(MainContext);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [checkedValues, setCheckedValues] = useState([]);
    const [checkedAutherValues, setCheckedAutherValues] = useState([]);
    useEffect(() => {
        const getFeedData = JSON.parse(localStorage.getItem('news_feed') || '{}');
        if (getFeedData?.category?.length) {
            setSelectedCategory(getFeedData.category[0]);
        }
        if (getFeedData?.sources?.length) {
            setCheckedValues(getFeedData.sources);
        }
        if (getFeedData?.authors?.length) {
            setCheckedAutherValues(getFeedData.authors);
        }
    }, []);
    const handleClickCategory = (value) => {
        setSelectedCategory(value)
    };

    const handleChange = (event) => {
        if (event.target.checked) {
            const sourcesList = [...checkedValues, event.target.name];
            setCheckedValues(sourcesList)
        } else {
            const sourcesList = checkedValues?.filter(item => item !== event.target.name);
            setCheckedValues(sourcesList)
        }
    };

    const handleChangeAuthor = (event) => {
        if (event.target.checked) {
            const authorsList = [...checkedAutherValues, event.target.name];
            setCheckedAutherValues(authorsList)
        } else {
            const authorsList = checkedAutherValues?.filter(item => item !== event.target.name);
            setCheckedAutherValues(authorsList)
        }
    };

    const handleSubmit = () => {
        const payloadObj = {
            category: [selectedCategory]
        };
        if (checkedValues?.length) {
            payloadObj.sources = checkedValues;
        }
        if (checkedAutherValues?.length) {
            payloadObj.authors = checkedAutherValues;
        }
        handleNewsFeed(payloadObj);
        handleClose();
    }
    return (
        <>
            <Dialog
                open={open}
                maxWidth={'sm'}
                fullWidth
                scroll='body'
                PaperProps={{
                    sx: {
                        background: '#ffffff'
                    }
                }}
            >
                <DialogTitle>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Typography variant='h4'>Personalized News Feed</Typography>
                        <CloseOutlined sx={{ cursor: 'pointer' }} onClick={handleClose} />
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <Box>
                            <Typography variant='h6'>Select Category</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    flexWrap: 'wrap',
                                    mt: 1
                                }}
                            >
                                {feedCategories.map(item => {
                                    return <Chip key={item.label} onClick={() => handleClickCategory(item.value)} size="medium" label={item.label}
                                        sx={selectedCategory === item.value ? {} : {
                                            backgroundColor: 'transparent',
                                            border: '1px solid transparent',
                                        }} />
                                })}
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant='h6'>Select Sources</Typography>
                            <FormControl component="fieldset">
                                <FormGroup>
                                    <Grid container spacing={1}>
                                        {feedSources?.map((source, index) => {
                                            return <Grid
                                                item
                                                xs={12}
                                                md={6}
                                                key={index}
                                            ><FormControlLabel
                                                    key={index}
                                                    control={
                                                        <Checkbox
                                                            disabled={checkedValues?.length >= 20 && !checkedValues.includes(source)}
                                                            checked={checkedValues.includes(source)}
                                                            onChange={handleChange}
                                                            name={source}
                                                        />
                                                    }
                                                    label={source}
                                                />
                                            </Grid>
                                        })}
                                    </Grid>
                                </FormGroup>
                            </FormControl>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant='h6'>Select Authors</Typography>
                            <FormControl component="fieldset">
                                <FormGroup>
                                    <Grid container spacing={1}>
                                        {feedAuthors?.map((category, index) => {
                                            return <Grid
                                                item
                                                xs={12}
                                                md={6}
                                                key={index}
                                            ><FormControlLabel
                                                    key={index}
                                                    control={
                                                        <Checkbox
                                                            disabled={checkedAutherValues?.length >= 20 && !checkedAutherValues.includes(category)}
                                                            checked={checkedAutherValues.includes(category)}
                                                            onChange={handleChangeAuthor}
                                                            name={category}
                                                        />
                                                    }
                                                    label={category}
                                                />
                                            </Grid>
                                        })}
                                    </Grid>
                                </FormGroup>
                            </FormControl>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}
                        >
                            <Button color="primary" variant="text" size="small" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button color="primary" variant="contained" size="small" onClick={handleSubmit}>
                                Save
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};
