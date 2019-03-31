import React from 'react';
import PropTypes from 'prop-types';

const _style = {
  display: 'flex',
  flexDirection: 'column',
};

const Column = props => (
  <div style={{ ...props.style, ..._style }}>
    {props.children}
  </div>
);

Column.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
};

export default Column;
