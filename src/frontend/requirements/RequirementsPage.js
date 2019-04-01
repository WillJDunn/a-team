import React from 'react';
import Paper from '@material-ui/core/Paper';
import Column from '../common/Column';


const RequirementsPage = props => {
  return (
    <React.Fragment>
      <h1>Requirements Under Construction</h1>
      <Column>
        {props.items.map(item =>
          <Paper square style={{ width: 200, margin: 4 }}>
            <div>id: {item.itemId}</div>
            <div>name: {item.name}</div>
            <div>status: {item.statusName}</div>
            <div>priority: {item.priorityName}</div>
            <div>is issue: {item.isIssue}</div>
            <div>due date: {item.dueDate}</div>
            <div>created by: {item.createdByName}</div>
            <div>assigned to: {item.assignedTo}</div>
            <div>created at: {item.createdAt}</div>
          </Paper>
        )}
      </Column>
    </React.Fragment>
  )
};

export default RequirementsPage;
