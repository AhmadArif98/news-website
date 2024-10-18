import { Box, Typography } from "@mui/material"

export const NoDataFound = ({ message = '' }) => {
    return <>
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: '#ffffff',
            padding: '20px',
            borderRadius: '15px',
            border: '1px solid #e8e8e8'
        }}>
            <img src="/no_data.jpeg" alt="" />
            <p style={{
                fontSize: '16px',
                color: '#a3a4a4',
                marginTop: '-10px',
                marginBottom: '10px',
            }}>No Data Found!</p>
            {message && <Typography fontSize={'15px'} marginBottom={'20px'} color="#a3a4a4">{message}</Typography>}
        </Box>
    </>
}