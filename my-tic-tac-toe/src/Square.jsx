// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

// Prop validation
Square.propTypes = {
  value: PropTypes.oneOf(['X', 'O', null]), // Accepts 'X', 'O', or null
  onClick: PropTypes.func.isRequired, // onClick must be a function
};

export default Square;
