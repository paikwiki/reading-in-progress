/* eslint no-unused-vars: 0 */
import React from 'react';
import BookCover from './BookCover';
import BookInfo from './BookInfo';

class Book extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <BookCover cover={ this.props.item.cover }/>
        <BookInfo info={ this.props.item }/>
      </div>
    );
  }

}

Book.defaultProps = {
  item: {
    title: '책 제목',
    author: '저자',
    link: '온라인서점 알라딘의 해당 책 링크',
    isbn13: '1234567890123',
    cover: 'http://placehold.it/100x140',
    publisher: '출판사',
  },
};

export default Book;