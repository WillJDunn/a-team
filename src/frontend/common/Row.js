import React from 'react';
import PropTypes from 'prop-types';

const _style = {
  display: 'flex',
  flexDirection: 'row',
};

const Row = props => (
  <div style={{ ...props.style, ..._style }}>
    {props.children}
  </div>
);

Row.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
};

export default Row;
