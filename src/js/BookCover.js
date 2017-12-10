/* eslint no-unused-vars: 0 */
import React from 'react';

class BookCover extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img src={ this.props.cover } />
      </div>
    );
  }

}

export default BookCover;