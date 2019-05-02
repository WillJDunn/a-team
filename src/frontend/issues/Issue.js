import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import moment from 'moment';

const Issue = props => {
  console.log(props);
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
        {moment(props.dueDate).format('YYYY-MM-DD')}
      </TableCell>
      <TableCell>
        {moment(props.createdAt).format('YYYY-MM-DD')}
      </TableCell>
    </TableRow>
  );
};

Issue.propTypes = {
  selected: PropTypes.bool,
};

export default Issue;
