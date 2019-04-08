import React from 'react';
import PropTypes from 'prop-types';
import Column from '../common/Column';
import Row from '../common/Row';
import Item from './Item';
import colormap from 'colormap';

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
  const { statuses, items } = props;
  const columnColors = colormap({
    nshades: Math.max(statuses.length, 6),
  });
  const itemsByStatus = statuses.reduce((map, status) => {
    map[status.id] = items.filter(item => item.statusId === status.id);
    return map;
  }, {});
  return (
    <Row>
      {statuses.map((status, i) => (
        <Column
          style={{ ..._style.statusColumn, backgroundColor: columnColors[i] }}
          key={`${status.id}_status`}
        >
          <h1 style={_style.columnTitle}>{status.name}</h1>
          <div>
            {itemsByStatus[status.id].map(item => <Item {...item} />)}
          </div>
        </Column>
      ))}
    </Row>
  )
};

RequirementsPage.propTypes = {
  items: PropTypes.array,
  statuses: PropTypes.array,
};

RequirementsPage.defaultProps = {
  items: [],
  statuses: [],
};

export default RequirementsPage;
