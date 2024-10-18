import { Avatar, AvatarGroup, Box, Typography } from "@mui/material";
import moment from "moment";

export const Author = ({ authors = [], publishDate, category = '' }) => {
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
            {category ? <Typography variant="caption"><Typography variant="caption" color='text.secondary'>Category:</Typography> {category}</Typography> : <Box
                sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
            >
                <AvatarGroup max={3}>
                    {authors.map((author, index) => (
                        <Avatar
                            key={index}
                            alt={author}
                            src={null}
                            sx={{ width: 24, height: 24 }}
                        />
                    ))}
                </AvatarGroup>
                <Typography variant="caption">
                    {authors.join(', ')}
                </Typography>
            </Box>}
            <Typography variant="caption">{publishDate ? moment(publishDate)?.format('MMMM DD, YYYY') : ''}</Typography>
        </Box>
    );
}
