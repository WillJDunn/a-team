import React, { useState } from 'react';
import Issue from './Issue';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';

const IssuesPage = props => {
  const { statuses, items, users, priorities, project, board, onCreateItem } = props;
  const [selectedItem, setSelectedItem] = useState(undefined);
  const handleClick = issueId => {
    setSelectedItem(issueId);
  };
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            Name
          </TableCell>
          <TableCell>
            Status
          </TableCell>
          <TableCell>
            Priority
          </TableCell>
          <TableCell>
            Due Date
          </TableCell>
          <TableCell>
            Created At
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map(item => <Issue {...item} onClick={() => handleClick(item.id)} selected={selectedItem === item.id}/>)}
      </TableBody>
    </Table>
  );
};

IssuesPage.propTypes = {
  items: PropTypes.array,
};

IssuesPage.defaultProps = {
  items: [],
};

export default IssuesPage;
