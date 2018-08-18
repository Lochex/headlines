import React from 'react';
import { mount, shallow } from 'enzyme';
import Header from '../src/components/Header.jsx';
import Search from '../src/components/Search.jsx';
import AricleCards from '../src/components/AricleCards.jsx';

const storageMock = () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
});
window.localStorage = storageMock();

describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});

test('should have an onChange function', () => {
  const onChange = jest.fn();
  const component = mount(<Search onChange={onChange} />);
  expect(component.props().onChange).toBe(onChange);
});

describe('Header', () => {
  it('Header should render Asaa New Feed', () => {
    const header = shallow(<Header />);
    expect(header.find('.logo-name').text()).toEqual('AsaaNews Feed');
  });
});

describe('AricleCards', () => {
  let list;

  beforeEach(() => {
    list = shallow(
      <AricleCards
        list={
        [
          {
            author: 'Spencer Soper, Craig Giammona',
            description: 'When Amazon.com Inc. completes its..',
            publishedAt: '2017-06-18T02:20:41.837Z',
            title: 'Amazon Said to Plan Cuts to Shed Whole Foods..',
            url: 'https://www.bloomberg.com/news/amazon',
            urlToImage: 'https://assets.bwbx.io/1200x731.jpg',
          },
        ]}
      />,
    );
  });
  it('List renders news articles properly', () => {
    expect(list.find('.table-row').length).toEqual(1);
  });

  it('List renders data', () => {
    const arr = list.find('a');
    expect(arr.length).toEqual(1);
    expect(arr.at(0).text()).toEqual('Amazon Said to Plan Cuts to Shed Whole Foods..');
  });
});
// describe('Header', () => {
//   let app;

//   before(() => {
//     app = shallow(<Header />);
//   });
//   it('Header renders the Search component', () => {
//     expect(app.find('Search').length).toEqual(1);
//   });
// });
