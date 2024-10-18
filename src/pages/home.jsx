import Container from '@mui/material/Container';
import AppAppBar from './components/AppAppBar';
import NewsAPISection from './components/NewsAPISection';
import TheGuardianSection from './components/TheGuardianSection';
import Footer from './components/Footer';
import { Box, Divider } from '@mui/material';
import { createContext, useState } from 'react';
import { fetchNewsArticles, fetchNYTArticles, fetchTheGuardianArticles } from '../api';
import NYTNewsSection from './components/NYTNewsSection';

export const MainContext = createContext(null);

export default function Home() {
  const [query, setQuery] = useState('politics');
  const [loadingNewsAPI, setLoadingNewsAPI] = useState(false);
  const [loadingTheGuardian, setLoadingTheGuardian] = useState(false);
  const [loadingNYT, setLoadingNYT] = useState(false);
  const [newsApiError, setNewsAPIError] = useState('');
  const [newsApiData, setNewsAPIData] = useState([]);
  const [theGuardianData, setTheGuardianData] = useState([]);
  const [nytData, setNYTData] = useState([]);
  const [feedSources, setFeedSources] = useState([]);
  const [feedAuthors, setFeedAuthors] = useState([]);
  const [feedCategories, setFeedCategories] = useState([]);

  const applyNewsFeed = (apiName, apiData) => {
    const getFromStorage = JSON.parse(localStorage.getItem('news_feed') || '{}');
    let sortedData = apiData?.slice() || [];
    if (apiName === 'guardianapi') {
      if (getFromStorage?.category) {
        sortedData.sort((a, b) => getFromStorage?.category?.indexOf(b.pillarName) - getFromStorage?.category?.indexOf(a.pillarName))
      }
    }
    if (apiName === 'newsapi') {
      if (getFromStorage?.sources) {
        sortedData.sort((a, b) => getFromStorage?.sources?.indexOf(b.source.name) - getFromStorage?.sources?.indexOf(a.source.name))
      }
      if (getFromStorage?.authors) {
        sortedData.sort((a, b) => getFromStorage?.authors?.indexOf(b.author) - getFromStorage?.authors?.indexOf(a.author))
      }
    }
    if (apiName === 'nytapi') {
      if (getFromStorage?.sources) {
        sortedData.sort((a, b) => getFromStorage?.sources?.indexOf(b.source) - getFromStorage?.sources?.indexOf(a.source))
      }
      if (getFromStorage?.authors) {
        const authorsList = getFromStorage?.authors;
        sortedData.sort((a, b) => {
          const authorA = a?.byline?.original;
          const authorB = b?.byline?.original;
          const isAuthorAIncluded = authorsList?.some(author => authorA?.includes(author));
          const isAuthorBIncluded = authorsList?.some(author => authorB?.includes(author));
          if (isAuthorAIncluded && !isAuthorBIncluded) {
            return -1; // a should come before b
          } else if (!isAuthorAIncluded && isAuthorBIncluded) {
            return 1; // b should come before a
          } else {
            return 0; // keep the same order
          }
        });
      }
    }
    return sortedData;
  }

  const newsAPICall = async (payloadObj = {}) => {
    setLoadingNewsAPI(true);
    payloadObj.query = query;
    const newsAPINews = await fetchNewsArticles(payloadObj);
    if (typeof newsAPINews === 'string') {
      setNewsAPIError(newsAPINews);
      setNewsAPIData([]);
    } else {
      setNewsAPIError('');
      const newsAPISources = newsAPINews?.map(z => z?.source?.name) || [];
      setFeedSources(prevSources => [...prevSources, ...newsAPISources]?.filter((v, i, a) => a?.findIndex(t => (t === v)) === i));
      const newsAPIAuthors = newsAPINews?.map(z => z?.author)?.filter(Boolean) || [];
      setFeedAuthors(prevAuthors => [...prevAuthors, ...newsAPIAuthors]?.filter((v, i, a) => a?.findIndex(t => (t === v)) === i));
      const sortedArr = applyNewsFeed('newsapi', newsAPINews);
      setNewsAPIData(sortedArr);
    }
    setLoadingNewsAPI(false);
  }

  const theGuardianAPICall = async (payloadObj = {}) => {
    setLoadingTheGuardian(true);
    payloadObj.query = query;
    const theGuardianNews = await fetchTheGuardianArticles(payloadObj);
    const guardianAPICategories = theGuardianNews?.map(z => z?.pillarName)?.filter((v, i, a) => a?.findIndex(t => (t === v)) === i) || [];
    const categories = guardianAPICategories.map(item => {
      return {
        label: item, value: item
      }
    });
    setFeedCategories(categories)
    const sortedArr = applyNewsFeed('guardianapi', theGuardianNews);
    setTheGuardianData(sortedArr);
    setLoadingTheGuardian(false);
  }

  const nytAPICall = async (payloadObj = {}) => {
    setLoadingNYT(true);
    payloadObj.query = query;
    const nytNews = await fetchNYTArticles(payloadObj);
    const nytAPISources = nytNews?.map(z => z?.source) || [];
    setFeedSources(prevSources => [...prevSources, ...nytAPISources]?.filter((v, i, a) => a?.findIndex(t => (t === v)) === i));
    const nytAPIAuthors = nytNews?.map(z => `${z?.byline?.person[0]?.firstname}${z?.byline?.person[0]?.middlename ? ` ${z?.byline?.person[0]?.middlename || ''}` : ''}${z?.byline?.person[0]?.lastname ? ` ${z?.byline?.person[0]?.lastname || ''}` : ''}`) || [];
    setFeedAuthors(prevAuthors => [...prevAuthors, ...nytAPIAuthors]?.filter((v, i, a) => a?.findIndex(t => (t === v)) === i));
    const sortedArr = applyNewsFeed('nytapi', nytNews);
    setNYTData(sortedArr);
    setLoadingNYT(false);
  }

  const handleAPICalls = async (payload) => {
    newsAPICall(payload);
    theGuardianAPICall(payload);
    nytAPICall(payload);
  };

  const handleNewsFeed = (payload) => {
    localStorage.setItem('news_feed', JSON.stringify(payload));
    setNewsAPIData(applyNewsFeed('newsapi', newsApiData));
    setTheGuardianData(applyNewsFeed('guardianapi', theGuardianData));
    setNYTData(applyNewsFeed('nytapi', nytData));
  };

  return (
    <MainContext.Provider
      value={{
        query,
        setQuery,
        handleAPICalls,
        handleNewsFeed,
        newsApiData,
        theGuardianData,
        nytData,
        loadingNewsAPI,
        loadingTheGuardian,
        loadingNYT,
        newsAPICall,
        applyNewsFeed,
        feedCategories,
        feedAuthors,
        feedSources,
        newsApiError,
      }}
    >
      <Box sx={{ height: '100dvh' }}>
        <Box sx={{ overflow: 'auto' }}>
          <AppAppBar />
          <Container
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', my: 12, gap: 4 }}
          >
            <NewsAPISection />
            <Divider />
            <TheGuardianSection />
            <Divider />
            <NYTNewsSection />
          </Container>
          <Footer />
        </Box>
      </Box>
    </MainContext.Provider>
  );
}
