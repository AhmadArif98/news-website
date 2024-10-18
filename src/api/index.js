import axios from 'axios';

const NEWS_API_URL = 'https://newsapi.org/v2/everything';
const NEWS_API_SOURCES = 'https://newsapi.org/v2/top-headlines/sources';
const THE_GUARDIAN_API_URL = 'https://content.guardianapis.com/search';
const NYT_API_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

const apiKey = {
  newsAPI: process.env.REACT_APP_NEWS_API_KEY,
  theGuardian: process.env.REACT_APP_THE_GUARDIAN_API_KEY,
  nyt: process.env.REACT_APP_NYT_API_KEY,
};

export const fetchNewsArticles = async (payload) => {
  const payloadObj = {
    apiKey: apiKey.newsAPI,
    q: payload?.query || '',
    pageSize: 20,
  };
  if (payload?.sources) {
    payloadObj.sources = payload.sources;
  }
  if (payload?.from && payload?.to) {
    payloadObj.from = payload.from?.format('YYYY-MM-DD');
    payloadObj.to = payload.to?.format('YYYY-MM-DD');
  }
  try {
    const response = await axios.get(`${NEWS_API_URL}`, {
      params: payloadObj,
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching from News API:', error);
    return error?.response?.data?.message || '';
  }
};

export const fetchNewsSources = async () => {
  try {
    const response = await axios.get(`${NEWS_API_SOURCES}`, {
      params: {
        apiKey: apiKey.newsAPI,
      },
    });
    return response.data.sources;
  } catch (error) {
    console.error('Error fetching from News API:', error);
    return [];
  }
};

export const fetchTheGuardianArticles = async (payload) => {
  const payloadObj = {
    'api-key': apiKey.theGuardian,
    q: payload?.query || '',
  };
  if (payload?.category) {
    payloadObj.tag = payload.category;
  }
  try {
    const response = await axios.get(`${THE_GUARDIAN_API_URL}`, {
      params: payloadObj,
    });
    return response.data.response.results;
  } catch (error) {
    console.error('Error fetching from The Guardian News:', error);
    return [];
  }
};

export const fetchNYTArticles = async (payload) => {
  const payloadObj = {
    'api-key': apiKey.nyt,
    q: payload?.query || '',
  };
  if (payload?.from && payload?.to) {
    payloadObj.begin_date = payload.from?.format('YYYYMMDD');
    payloadObj.end_date = payload.to?.format('YYYYMMDD');
  }
  try {
    const response = await axios.get(`${NYT_API_URL}`, {
      params: payloadObj,
    });
    return response.data.response.docs;
  } catch (error) {
    console.error('Error fetching from New York Times:', error);
    return [];
  }
};
