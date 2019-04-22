import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';

const Issue = props => {
  return (
    <TableRow hover onClick={props.onClick} selected={props.selected}>
      <TableCell>
        {props.name}
      </TableCell>
      <TableCell>
        {props.statusName}
      </TableCell>
      <TableCell>
        {props.priorityName}
      </TableCell>
      <TableCell>
        {props.dueDate}
      </TableCell>
      <TableCell>
        {props.createdAt}
      </TableCell>
    </TableRow>
  );
};

Issue.propTypes = {
  selected: PropTypes.bool,
};

export default Issue;
