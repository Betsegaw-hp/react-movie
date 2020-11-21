import React from 'react';

function Quotes(props) {
  const {author , quote , series} = props;
  return (
      <div className="intro-text">
          <div className="quote-text">
           "{quote}"
          </div>
          <h4 className="footer-text">- {author}</h4>
          <p className="footer-text">From {series} season</p>
      </div>
  )
}

export default Quotes;