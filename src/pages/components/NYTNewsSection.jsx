import { Box, Card, CardContent, Skeleton, styled, Typography } from "@mui/material";
import { useContext } from "react";
import Grid from '@mui/material/Grid2';
import { MainContext } from "../home";
import { Author } from "./Author";
import { NoDataFound } from "./noData";
import { AuthorLoading } from "./AuthorLoading";

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

export default function NYTNewsSection() {
  const { loadingNYT, nytData } = useContext(MainContext);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h1">
          The New York Times
        </Typography>
      </div>
      <Grid container spacing={2} columns={12}>
        {loadingNYT ? Array.from(Array(5).keys()).map(item => {
            return <Grid size={{ xs: 12, md: (item === 0 || item === 1) ? 6 : 4 }} key={item}>
              <SyledCard
                variant="outlined"
              >
                <SyledCardContent>
                  <Typography gutterBottom variant="caption" component="div"><Skeleton /></Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    <Skeleton />
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <Skeleton />
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <Skeleton />
                  </Typography>
                </SyledCardContent>
                <AuthorLoading />
              </SyledCard>
            </Grid>
          }) : nytData?.length ? nytData.map((item, index) => {
            return <Grid size={{ xs: 12, md: (index === 0 || index === 1) ? 6 : 4 }} key={index}>
              <a href={item?.web_url} target='_blank' rel="noreferrer" style={{ all: 'unset' }}>
                <SyledCard
                  variant="outlined"
                >
                  <SyledCardContent>
                    <Typography gutterBottom variant="caption" component="div">{item?.source}</Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      {item?.headline?.main}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {item?.lead_paragraph}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {item?.abstract}
                    </Typography>
                  </SyledCardContent>
                  <Author authors={[`${item?.byline?.person[0]?.firstname}${item?.byline?.person[0]?.middlename ? ` ${item?.byline?.person[0]?.middlename || ''}` : ''}${item?.byline?.person[0]?.lastname ? ` ${item?.byline?.person[0]?.lastname || ''}` : ''}`]} publishDate={item?.pub_date} />
                </SyledCard>
              </a>
            </Grid>
          }) : <NoDataFound />}
      </Grid>
    </Box>
  );
}
