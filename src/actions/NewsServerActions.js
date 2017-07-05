import AppDispatcher from '../dispatcher/AppDispatcher';
import NewsConstants from '../constants/NewsConstants';

function receiveArticles(response) {
  AppDispatcher.handleServerAction({
    actionType: NewsConstants.GET_ARTICLES,
    response,
  });
}

export { receiveArticles as default };

