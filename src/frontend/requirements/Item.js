import React from 'react';
import Paper from '@material-ui/core/Paper';

const Item = props => {
  return (
    <Paper square style={{ width: 200, margin: 4 }}>
      <div>id: {props.id}</div>
      <div>name: {props.name}</div>
      <div>status: {props.statusName}</div>
      <div>priority: {props.priorityName}</div>
      <div>is issue: {props.isIssue}</div>
      <div>due date: {props.dueDate}</div>
      <div>created by: {props.createdByName}</div>
      <div>assigned to: {props.assignedTo}</div>
      <div>created at: {props.createdAt}</div>
    </Paper>
  );
};

export default Item;
