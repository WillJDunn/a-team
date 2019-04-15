import React from 'react';
import Paper from '@material-ui/core/Paper';

const Item = props => {
  return (
    <Paper square style={{ width: 200, margin: 4 }}>
      <div>Id: {props.id}</div>
      <div>Name: {props.name}</div>
      <div>Status: {props.statusName}</div>
      <div>Priority: {props.priorityName}</div>
      <div>Is issue: {props.isIssue}</div>
      <div>Due date: {props.dueDate}</div>
      <div>Created by: {props.createdByName}</div>
      <div>Assigned to: {props.assignedTo}</div>
      <div>Created at: {props.createdAt}</div>
    </Paper>
  );
};

export default Item;
