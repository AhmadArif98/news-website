import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { MainContext } from '../home';
import { Author } from './Author';
import { Skeleton } from '@mui/material';
import { NoDataFound } from './noData';
import { AuthorLoading } from './AuthorLoading';

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export default function NewsAPISection() {
  const {loadingNewsAPI, newsApiData, newsApiError} = useContext(MainContext);
  const handleImgError = (e) => {
    e.target.onerror = null; // Prevents infinite loop if placeholder fails
    e.target.src = '/news-placeholder.png';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          News API
        </Typography>
        <Typography>Stay in the loop with the latest news from News API</Typography>
      </div>
      <Grid container spacing={2} columns={12}>
        {loadingNewsAPI ? Array.from(Array(7).keys()).map(item => {
            return <Grid size={{ xs: 12, md: (item === 0 || item === 1) ? 6 : 4 }} key={item}>
            <SyledCard
                variant="outlined"
              >
                <Skeleton sx={{ height: (item === 0 || item === 1) ? 320 : 210 }} animation="wave" variant="rectangular" />
                <SyledCardContent>
                  <Typography gutterBottom variant="caption" component="div">
                    <Skeleton />
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    <Skeleton />
                  </Typography>
                  <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                    <Skeleton />
                  </StyledTypography>
                </SyledCardContent>
                <AuthorLoading />
              </SyledCard>
          </Grid>
          }) : newsApiData?.length ? newsApiData.map((item, index) => {
            return <Grid size={{ xs: 12, md: (index === 0 || index === 1) ? 6 : 4 }} key={index}>
            <a href={item?.url} target='_blank' rel="noreferrer" style={{all: 'unset'}}>
            <SyledCard
                variant="outlined"
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  image={item?.urlToImage || '/news-placeholder.png'}
                  onError={handleImgError} 
                  aspect-ratio="16 / 9"
                  sx={{
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    maxHeight: '320px'
                  }}
                />
                <SyledCardContent>
                  <Typography gutterBottom variant="caption" component="div">
                    {item?.source?.name}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {item?.title}
                  </Typography>
                  <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                    {item?.content}
                  </StyledTypography>
                </SyledCardContent>
                <Author authors={[item?.author]} publishDate={item?.publishedAt}/>
              </SyledCard>
            </a>
          </Grid>
          }) : <NoDataFound message={newsApiError}/>}
      </Grid>
    </Box>
  );
}
