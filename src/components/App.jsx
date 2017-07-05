import React, { Component } from 'react';
import Select from 'react-select';
import Dropdown from 'react-dropdown';
import 'react-select/scss/default.scss';
import 'react-dropdown/style.css';
import Header from './Header.jsx';
import Table from './AricleCards.jsx';
import '../App.css';
import NewsStore from '../stores/NewsStore';
import * as NewsAction from '../actions/NewsActions';

const DEFAULT_QUERY = 'bloomberg';
// const DEFAULT_PAGE = 0;

const largeColumn = {
  width: '50%',
};

const midColumn = {
  width: '20%',
};

const smallColumn = {
  width: '10%',
};

const picWidth = {
  width: '100%',
};

const titleFont = {
  fontFamily: 'PT Serif,Georgia,serif',
  fontSize: '1.075rem',
  fontWeight: '700',
};

const imgColumn = {
  width: '40%',
};

const optop = [
  'one', 'two', 'three',
];

/**
 *
 *
 * @class App
 * @extends {React.Component}
 */
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: '',
      selectValue: DEFAULT_QUERY,
      options: null,
      sortValue: '',
    };

    // this.setSearchTopStories = this.setSearchTopStories.bind(this);
    // this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    // this.onDismiss = this.onDismiss.bind(this);
    this.updateNews = this.updateNews.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.sortValue = this.sortValue.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    NewsAction.getArticles(this.state.selectValue);
    NewsAction.getSources();
    NewsStore.on('change', this.updateNews);
  }

  componentWillUnmount() {
    NewsStore.removeListener('change', this.updateNews);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    event.preventDefault();
  }

  logout(e) {
    e.preventDefault();
    localStorage.removeItem('User');
    window.location.replace('#/');
  }

  updateNews() {
    if (NewsStore.getArticles() !== [] && NewsStore.getSources() !== []) {
      this.setState({
        result: NewsStore.getArticles(),
        options: NewsStore.getSources()
      });
    }
  }

/**
 * @method updateValue
 * @param {newValue} newValue - takes in a value for the list of sources
 * @memberof App
 * @return {void}
 */
  updateValue(newValue) {
    if (newValue) {
      NewsAction.getArticles(newValue);
      this.setState({
        selectValue: newValue,
        searchTerm: '',
        sortValue: '',
      });
    } else {
      this.setState({
        selectValue: '',
      });
    }
  }

/**
 * @method sortValue
 * @param {sortValue} sortValue - takes in a value from the sortBysAvailable array
 * @memberof App
 * @return {void}
 */
  sortValue(sortValue) {
    NewsAction.sortArticles(this.state.selectValue, sortValue.value);
    this.setState({
      searchTerm: '',
      sortValue: sortValue.value,
    });
  }

  // fetchSearchTopStories(searchTerm) {
  //   console.log('im here');
  //   this.setState({
  //     result: NewsAction.getArticles(searchTerm),
  //   });
  // }
  render() {
    //  console.log("elo", this.state);
    console.log(this.state);
    const { searchTerm, result, options, selectValue, sortValue } = this.state;
    console.log(result);
    if (!result) { return null; }
    return (
      <div className="page">
        <Header
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
          onClick={this.logout}
        />
        <div className="interactions">
          <div className="sources">
            {options &&
              <Select
                autofocus
                options={options.sources}
                simpleValue
                valueKey="id"
                labelKey="name"
                value={this.state.selectValue}
                tabSelectsValue
                onChange={this.updateValue}
                placeholder="Search News Sources..."
                searchable
              />
            }
          </div>
          <div className="sort-by">
            {options.sources &&
              options.sources.map((item) => {
                if (item.id === selectValue) {
                  return <Dropdown key={item.id} onChange={this.sortValue} value={sortValue} options={item.sortBysAvailable} placeholder="Sort By..." />;
                }
              })
            }
          </div>
        </div>
        {result.articles &&
          <Table
            list={result.articles}
            onDismiss={this.onDismiss}
            pattern={searchTerm}
          />
        }

      </div>
    );
  }
}

export default App;
