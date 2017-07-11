import Dispatcher from '../dispatcher/AppDispatcher';
import * as Constants from '../constants/NewsConstants';
// import { getNewsApi } from '../utils/newsAPI';


const PATH_BASE = 'https://newsapi.org/v1';
const ART_SEARCH = '/articles';
const PARAM_SEARCH = 'source=';
const SORT_BY = 'sortBy=';
const API_KEY = 'apiKey=';
const KEY_VALUE = process.env.KEY;

export const getArticles = (sourcId) => {
  fetch(`${PATH_BASE}${ART_SEARCH}?${PARAM_SEARCH}${sourcId}&${API_KEY}${KEY_VALUE}`)
    .then(response => response.json())
    .then((res) => {
      Dispatcher.dispatch({
        actionType: Constants.Articles,
        articles: res,
      });
    });
    // .catch((err) => {
    //   console.log('Fetch Error :-S', err);
    // });
};

export const sortArticles = (sourcId, sortBy) => {
  fetch(`${PATH_BASE}${ART_SEARCH}?${PARAM_SEARCH}${sourcId}&${SORT_BY}${sortBy}&${API_KEY}${KEY_VALUE}`)
    .then(response => response.json())
    .then((res) => {
      Dispatcher.dispatch({
        actionType: Constants.Articles,
        articles: res,
      });
    });
    // .catch((err) => {
    // });
};

export const getSources = () => {
  fetch('https://newsapi.org/v1/sources?language=en')
    .then(response => response.json())
    .then((res) => {
      Dispatcher.dispatch({
        actionType: Constants.Sources,
        sources: res,
      });
    });
    // .catch((err) => {
    // });
};

