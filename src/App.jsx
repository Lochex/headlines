import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './App.css';
import NewsStore from './stores/NewsStore';
import * as NewsAction from './actions/NewsActions';

// const listed = [
//   {
//     title: 'React Tested',
//     url: 'https://facebook.github.io/react/',
//     author: 'Jordan Walke',
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   },
//   {
//     title: 'Redux Testing',
//     url: 'https://github.com/reactjs/redux',
//     author: 'Dan Abramov, Andrew Clark',
//     num_comments: 2,
//     points: 5,
//     objectID: 1,
//   },
// ];

const DEFAULT_QUERY = 'bloomberg';
// const DEFAULT_PAGE = 0;

// //  const PATH_BASE = 'https://hn.algolia.com/api/v1';
// const PATH_BASE = 'https://newsapi.org/v1';
// const PATH_SEARCH = '/articles';
// const PARAM_SEARCH = 'source=';
// const PARAM_PAGE = 'page=';
// const API_KEY = 'apiKey=213327409d384371851777e7c7f78dfe';

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

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: '',
      selectValue: DEFAULT_QUERY,
      options: null,
    };

    // this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    // this.onDismiss = this.onDismiss.bind(this);
    this.articles = this.getArticles.bind(this);
    this.sources = this.getSources.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  componentDidMount() {
    console.log('obi');
    NewsAction.getArticles(this.state.selectValue);
    NewsStore.on('change', this.articles);
    NewsAction.getSources();
    // console.log(NewsAction.getSources());
    NewsStore.on('change', this.sources);
  }

  componentWillUnmount() {
    NewsStore.removeChangeListener(this.onChange);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.result, hits: updatedHits },
    });
  }

  // setSearchTopStories(result) {
  //   this.setState({ result });
  //   // const { hits, page } = result;
  //   // const oldHits = page !== 0 ? this.state.result.hits : [];

  //   // const updatedHits = [...oldHits, ...hits];
  //   // this.setState({ result: { hits: updatedHits, page}});
  // }

  // fetchSearchTopStories(searchTerm, page) {
  //   fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${API_KEY}`)
  //     .then(response => response.json())
  //     .then(
  //       res => this.setSearchTopStories(res),
  //     )
  //     .catch(function (err) {
  //       console.log('Fetch Error :-S', err);
  //     });
  // }

  // fetchSources() {
  //   fetch(`https://newsapi.org/v1/sources?language=en`)
  //     .then(response => response.json())
  //     .then(
  //       res => this.setSources(res)
  //     )
  //     .catch(function(err) {
  //       console.log('Fetch Error :-S', err);
  //     });
  // }

  // componentDidMount() {
  //   console.log("testing componentDidMount");
  //   const { searchTerm } = this.state;
  //   this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
  // }


  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    console.log('im here');
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  getArticles() {
    this.setState({
      result: NewsStore.getList(),
    });
  }

  getSources() {
    this.setState({
      options: NewsStore.getSources(),
    });
  }

  updateValue(newValue) {
    console.log('State changed to ' + newValue);
    this.setState({
      selectValue: newValue,
    });
    NewsAction.getArticles(newValue);
  }

  fetchSearchTopStories(searchTerm) {
    console.log('im here');
    this.setState({
      result: NewsAction.getArticles(searchTerm),
    });
  }
  render() {
    //  console.log("elo", this.state);
    console.log(this.state);
    const { searchTerm, result, options } = this.state;
    const page = (result && result.page) || 0;
    if (!result) { return null; }
    return (
      <div className="page">
        <Header
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
        />
        <div className="interactions" >
          { options &&
            <Select
              autofocus
              options={options.sources}
              simpleValue
              valueKey="id"
              labelKey="name"
              value={this.state.selectValue}
              tabSelectsValue={true}
              onChange={this.updateValue}
              placeholder="Search News Sources..."
              searchable={true}
            />
          }
        </div>
        { result &&
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

const Header = ({ value, onChange, onSubmit }) =>
  <header className="page-header">
    <div className="logo-wrapper">
      <a className="logo">
        <img src={logo}/>
        <div className="logo-name">
        Asaa
        <br></br>
        News Feed
        </div>
      </a>
    </div>
    <Search value={value} onChange={onChange} onSubmit={onSubmit} />
  </header>;

const Search = ({ value, onChange, onSubmit, children }) =>
  <div className="search-wrapper">
    <div className="search">
      <form>
        <span className="fa fa-search"></span>
        <input
          type="text"
          placeholder="Search stories by title"
          value={value}
          onChange={onChange}
        />
      </form>
    </div>
  </div>;


const Button = ({ onClick, className='', children }) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>;

function isSearched(searchTerm) {
  return function (item) {
    return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
}

const Table = ({ list, onDismiss, pattern }) =>
  <div className="table">
    { list.filter(isSearched(pattern)).map(item =>
        item.title &&
        <div key={item.publishedAt} className="table-row">
          <span style={imgColumn} className="picColumn">
            <img src={item.urlToImage} style={picWidth} />
          </span>
          <span style={largeColumn}>
            <a href={item.url}  rel="noopener noreferrer" target="_blank" style={titleFont}>{item.title}</a>
            <p>{item.description}</p>
            <p>{item.author}</p>
          </span>
          <span style={smallColumn}>
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >
              Dismiss
            </Button>
          </span>
        </div>
    )}
  </div>;


export default App;
