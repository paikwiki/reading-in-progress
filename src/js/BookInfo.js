/* eslint no-unused-vars: 0 */
import React from 'react';

class BookInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>BookInfo - { this.props.info.title }</div>
    );
  }

}

export default BookInfo;