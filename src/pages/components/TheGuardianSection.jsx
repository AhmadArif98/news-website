import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useContext } from 'react';
import { MainContext } from '../home';
import { Author } from './Author';
import { NoDataFound } from './noData';
import { Skeleton } from '@mui/material';
import { AuthorLoading } from './AuthorLoading';

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: 'relative',
  textDecoration: 'none',
  '&:hover': { cursor: 'pointer' },
  '& .arrow': {
    visibility: 'hidden',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&:hover .arrow': {
    visibility: 'visible',
    opacity: 0.7,
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '3px',
    borderRadius: '8px',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: '1px',
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.text.primary,
    opacity: 0.3,
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  '&:hover::before': {
    width: '100%',
  },
}));

export default function TheGuardianSection() {
  const { loadingTheGuardian, theGuardianData } = useContext(MainContext);

  return (
    <div>
      <Typography variant="h1" gutterBottom>
        The Guardian
      </Typography>
      <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
        {loadingTheGuardian ? Array.from(Array(5).keys()).map(item => (
            <Grid key={item} size={{ xs: 12, sm: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 1,
                  height: '100%',
                }}
              >
                <Typography gutterBottom variant="caption" component="div">
                  <Skeleton />
                </Typography>
                <TitleTypography
                  gutterBottom
                  variant="h6"
                >
                  <Skeleton />
                  <NavigateNextRoundedIcon
                    className="arrow"
                    sx={{ fontSize: '1rem' }}
                  />
                </TitleTypography>
                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                  <Skeleton />
                </StyledTypography>
                <AuthorLoading category='1' />
              </Box>
            </Grid>
          )) : theGuardianData?.length ? theGuardianData.map((article, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6 }}>
              <a href={article?.webUrl} target='_blank' rel="noreferrer" style={{ all: 'unset' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 1,
                    height: '100%',
                  }}
                >
                  <Typography gutterBottom variant="caption" component="div">
                    {article?.sectionName}
                  </Typography>
                  <TitleTypography
                    gutterBottom
                    variant="h6"
                  >
                    {article?.webTitle}
                    <NavigateNextRoundedIcon
                      className="arrow"
                      sx={{ fontSize: '1rem' }}
                    />
                  </TitleTypography>
                  <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                    {article?.description || 'A detailed description is currently unavailable for this article, but don’t worry—you can dive into the article to find out all the details!'}
                  </StyledTypography>
  
                  <Author category={article?.pillarName} publishDate={article?.webPublicationDate} />
                </Box>
              </a>
            </Grid>
          )) : <NoDataFound />}
      </Grid>
    </div>
  );
}
