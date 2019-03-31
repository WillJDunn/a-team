import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const BoardsList = props => {
  return (
    <React.Fragment>
      <div>Boards</div>
      <List>
        {props.boards.map(board => (
          <ListItem button key={`board_${board.id}`} onClick={() => props.onClick(board.id)}>
            <ListItemText primary={board.name} />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};

BoardsList.propTypes = {
  boards: PropTypes.array,
  onClick: PropTypes.func,
};

export default BoardsList;
