/* eslint no-undef: 0 no-unused-vars: 0 */
import 'raf/polyfill';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BookInfo from '../src/js/BookInfo';

configure({ adapter: new Adapter() });

const testItem = {
  title: '광기의 역사',
  author: '미셸 푸코',
  link: 'http://www.aladin.co.kr/shop/wproduct.aspx?ItemId=422189',
  isbn13: '9788930039000',
  cover: 'http://image.aladin.co.kr/product/42/21/cover/8930039006_1.jpg',
  publisher: '나남출판',
};

test('BookInfo shows a title of the book', () => {
  const component = shallow(<BookInfo info={ testItem }/>);
  expect(component.text()).toEqual('BookInfo - 광기의 역사');
});
