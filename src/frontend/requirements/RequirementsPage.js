import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Column from '../common/Column';
import Row from '../common/Row';
import ItemContainer from './ItemContainer';
import colormap from 'colormap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CreateItemWidget from './CreateItemWidget';

const _style  = {
  statusColumn: {
    width: 250,
    opacity: 0.5,
    margin: '24px 12px',
    alignItems: 'center',
  },
  columnTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
};


const RequirementsPage = props => {
  const { statuses, items, users, priorities } = props;
  const [selectedItem, setSelectedItem] = useState(undefined);
  const handleItemClick = (statusId, i) => {
    setSelectedItem(`${statusId}_${i}`);
  };
  const columnColors = colormap({
    nshades: Math.max(statuses.length, 6),
  });
  const itemsByStatus = statuses.reduce((map, status) => {
    map[status.id] = items.filter(item => item.statusId === status.id);
    return map;
  }, {});
  return (
    <Column>
      <CreateItemWidget users={users} priorities={priorities} statuses={statuses}/>
    <Row>
      {statuses.map((status, i) => (
        <Column
          style={{ ..._style.statusColumn, backgroundColor: columnColors[i] }}
          key={`${status.id}_status`}
        >
          <h1 style={_style.columnTitle}>{status.name}</h1>
          <div>
            <List>
              {itemsByStatus[status.id].map((item, i) => (
                <ListItem
                  key={`${item.id}_${i}`}
                  button
                  selected={selectedItem === `${status.id}_${i}`}
                  onClick={() => handleItemClick(status.id, i)}
                  >
                  <ItemContainer {...item} statuses={statuses} project={props.project}/>
                </ListItem>
                ))}
            </List>
          </div>
        </Column>
      ))}
    </Row>
    </Column>
  )
};

RequirementsPage.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
  }).isRequired,
  items: PropTypes.array,
  statuses: PropTypes.array,
  priorities: PropTypes.array,
  users: PropTypes.array,
};

RequirementsPage.defaultProps = {
  items: [],
  statuses: [],
  users: [],
};

export default RequirementsPage;
