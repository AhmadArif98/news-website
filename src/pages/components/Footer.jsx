import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import NewsWebsiteIcon from './NewsWebsiteIcon';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      News Website&nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <>
      <Divider />
      <Container
        sx={{
          py: { xs: 4, sm: 6 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            borderColor: 'divider',
          }}
        >
          <NewsWebsiteIcon />
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
