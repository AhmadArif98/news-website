import { Box, Skeleton, Typography } from "@mui/material";

export const AuthorLoading = ({ category = '' }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                ...(category ? { paddingLeft: 0 } : {})
            }}
        >
            {category ? <Typography variant="caption"><Skeleton width={60} /></Typography> : <Box
                sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
            >
                <Skeleton animation="wave" variant="circular" width={40} height={40} />
                <Typography variant="caption">
                    <Skeleton width={50} />
                </Typography>
            </Box>}
            <Typography variant="caption"><Skeleton width={50} /></Typography>
        </Box>
    );
}
