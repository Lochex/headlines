import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/AppDispatcher';
import * as Constants from '../constants/NewsConstants';
/**
 *
 *
 * @class NewsStoreClass
 * @extends {EventEmitter}
 */
class NewsStoreClass extends EventEmitter {
/**
 * Creates an instance of NewsStoreClass.
 * @memberof NewsStoreClass
 */
  constructor() {
    super();
    this.articles = [];
    this.sources = [];
  }

/**
 * @method getArticles
 * @return {array} - returns an array of articles
 * @memberof NewsStoreClass
 */
  getArticles() {
    return this.articles;
  }

/**
 * @method getSources
 * @return {array} - returns an array of sources
 * @memberof NewsStoreClass
 */
  getSources() {
    return this.sources;
  }

/**
  * @method handleActions
  * @param {any} action
  * @return {void}
  * Listens to actions from the dispatcher
  * runs actions relevant to NewsStore
  * Emits a change event
  */
  handleActions(action) {
    switch (action.actionType) {
      case Constants.Articles:
        this.articles = action.articles;
        this.emit('change');
        break;

      case Constants.Sources:
        this.sources = action.sources;
        this.emit('change');
        break;

      default:
        break;
    }
  }
}

const NewsStore = new NewsStoreClass();
Dispatcher.register(NewsStore.handleActions.bind(NewsStore));

export default NewsStore;

