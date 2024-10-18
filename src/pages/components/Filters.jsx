import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Box, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { CloseOutlined } from '@mui/icons-material';
import { fetchNewsSources } from '../../api';
import { MainContext } from '../home';

export const Filters = ({ open, handleClose }) => {
    const { query, handleAPICalls } = useContext(MainContext);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [checkedValues, setCheckedValues] = useState([]);
    const [newsSources, setNewsSources] = useState([]);
    const handleClickCategory = (value) => {
        setSelectedCategory(value)
    }
    const categories = [
        { label: 'All Categories', value: '' },
        { label: 'Business', value: 'business' },
        { label: 'Entertainment', value: 'entertainment' },
        { label: 'General', value: 'general' },
        { label: 'Health', value: 'health' },
        { label: 'Science', value: 'science' },
        { label: 'Sports', value: 'sports' },
        { label: 'Technology', value: 'technology' },
    ];
    const handleChange = (event) => {
        if (event.target.checked) {
            const sourcesList = [...checkedValues, event.target.name];
            setCheckedValues(sourcesList)
        } else {
            const sourcesList = checkedValues?.filter(item => item !== event.target.name);
            setCheckedValues(sourcesList)
        }
    };

    const fetchNewsSourcesData = async () => {
        const response = await fetchNewsSources();
        setNewsSources(response);
    }

    useEffect(() => {
        fetchNewsSourcesData();
    }, [])

    const handleStartDateChange = (value) => {
        setStartDate(value);
        // If start date is after the end date, reset end date
        if (endDate && value && value.isAfter(endDate)) {
            setEndDate(null);
        }
    };

    const handleEndDateChange = (value) => {
        setEndDate(value);
        // If end date is before the start date, reset start date
        if (startDate && value && value.isBefore(startDate)) {
            setStartDate(null);
        }
    };

    const handleSubmit = () => {
        const payloadObj = {
            category: selectedCategory,
            query,
        };
        if (startDate && endDate) {
            payloadObj.from = startDate
            payloadObj.to = endDate
        }
        if (checkedValues?.length) {
            payloadObj.sources = checkedValues.join(',')
        }
        handleAPICalls(payloadObj)
    };
    useEffect(() => {
        handleSubmit();
    }, [query])
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
                        <Typography variant='h4'>Filters</Typography>
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
                                {categories.map(item => {
                                    return <Chip key={item.label} onClick={() => handleClickCategory(item.value)} size="medium" label={item.label}
                                        sx={selectedCategory === item.value ? {} : {
                                            backgroundColor: 'transparent',
                                            border: '1px solid transparent',
                                        }} />
                                })}
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant='h6'>Select Date Range</Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                gap: 2,
                            }}>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <Box>
                                        <FormLabel>Start Date</FormLabel>
                                        <DatePicker
                                            label=""
                                            value={startDate}
                                            onChange={handleStartDateChange}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </Box>
                                    <Box>
                                        <FormLabel>End Date</FormLabel>
                                        <DatePicker
                                            label=""
                                            value={endDate}
                                            onChange={handleEndDateChange}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </Box>
                                </LocalizationProvider>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant='h6'>Select Sources&nbsp;
                                <Typography variant='caption'>(Max. 20 sources)</Typography>
                            </Typography>
                            <FormControl component="fieldset">
                                <FormGroup>
                                    <Grid container spacing={1}>
                                        {newsSources?.map((item, index) => {
                                            return <Grid
                                                item
                                                xs={12}
                                                md={6}
                                                key={index}
                                            ><FormControlLabel
                                                    key={index}
                                                    control={
                                                        <Checkbox
                                                            disabled={checkedValues?.length >= 20 && !checkedValues.includes(item.id)}
                                                            checked={checkedValues.includes(item.id)}
                                                            onChange={handleChange}
                                                            name={item?.id}
                                                        />
                                                    }
                                                    label={item?.name}
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
                            <Button color="primary" variant="contained" size="small" onClick={() => {
                                handleSubmit();
                                handleClose();
                            }}>
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};
