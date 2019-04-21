import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';

const _style = {
  form: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: 250,
    },
    title: {
      textAlign: 'center',
      marginTop: 12,
    },
  },
  dropdownMenu: {
    formControl: {
      minWidth: 120,
      margin: 12,
    },
  },
};

const UserDropDown = props => {
  const [user, setUser] = useState({username: "None"});
  const handleUserChange = evt => {
    setUser(evt.target.value);
    props.setUser(evt.target.value);
  };
  return (
    <FormControl style={_style.dropdownMenu.formControl}>
      <InputLabel htmlFor="assignedTo">Assigned To</InputLabel>
      <Select
        value={user}
        onChange={handleUserChange}
        input={<Input name="assignedTo" id="assignedTo"/>}
        autoWidth
      >
        {props.users.map(user =>
          <MenuItem key={`${user.username}`} value={user}>{user.username}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

const PriorityDropdown = props => {
  const [priority, setPriority] = useState({name: "None"});
  const handlePriorityChange = evt => {
    setPriority(evt.target.value);
    props.setPriority(evt.target.value);
  };
  return (
    <FormControl style={_style.dropdownMenu.formControl}>
      <InputLabel htmlFor="priority">Priority</InputLabel>
      <Select
        value={priority}
        onChange={handlePriorityChange}
        input={<Input name="priority" id="priority"/>}
        autoWidth
      >
        {props.priorities.map(priority =>
          <MenuItem key={`${priority.name}`} value={priority}>{priority.name}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

const StatusDropdown = props => {
  const [status, setStatus] = useState({name: "None"});
  const handleStatusChange = evt => {
    setStatus(evt.target.value);
    props.setStatus(evt.target.value);
  };
  return (
    <FormControl style={_style.dropdownMenu.formControl}>
      <InputLabel htmlFor="status">Status</InputLabel>
      <Select
        value={status}
        onChange={handleStatusChange}
        input={<Input name="status" id="status"/>}
        autoWidth
      >
        {props.statuses.map(status =>
          <MenuItem key={`${status.name}`} value={status}>{status.name}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

const CreateItemWidget = props => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [status, setStatus] = useState(props.item.status || '');
  const [priority, setPriority] = useState(props.item.priority || '');
  const [isIssue, setIsIssue] =
    useState(props.item.isIssue || !Boolean(props.requirement));
  const [name, setName] = useState(props.item.name || '');
  const [description, setDescription] = useState(props.item.description || '');
  const [dueDate, setDueDate] =
    useState(props.item.dueDate || moment().format('YYYY-MM-DD'));
  const [timeEstimate, setTimeEstimate] = useState(props.item.timeEstimate || '');
  const [createdBy, setCreatedBy] = useState(props.item.createdBy || '');
  const [assignedTo, setAssignedTo] = useState(props.item.assignedTo || '');
  const [labels, setLabels] = useState(props.item.labels || '');

  const handleSubmit = () => {
    const item = {
      projectId: props.project.id,
      boardId: props.board.id,
      statusId: status.id,
      priorityId: priority.id,
      isIssue: !Boolean(props.requirement),
      name,
      description,
      dueDate,
      timeEstimate,
      assignedTo: assignedTo.id,
      labels,
    };
    console.log(item);
    props.onSubmit(item);
    setStatus('');
    setPriority('');
    setIsIssue(!Boolean(props.requirement));
    setName('');
    setDescription('');
    setDueDate('');
    setTimeEstimate('');
    setAssignedTo('');
    setLabels('');
    setIsDialogOpen(false);
  };
  const handleClose = () => {
    setIsDialogOpen(false);
  };
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };
  const disabled = !Boolean(status && priority && name && description);
  const itemString = props.requirement ? 'Requirement' : 'Issue';
  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDialogOpen}
        style={{width: 250, marginLeft: 12}}
      >
        CREATE {itemString}
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <div style={_style.form.root}>
          <strong style={_style.form.title}>Create {itemString} for {props.project.name} > {props.board.name}</strong>
          <StatusDropdown statuses={props.statuses} setStatus={setStatus}/>
          <PriorityDropdown priorities={props.priorities} setPriority={setPriority}/>
          <TextField
            label="Name"
            value={name}
            onChange={evt => setName(evt.target.value)}
            style={{margin: 12}}
          />
          {props.edit && (
            <TextField
              label="Is issue"
              value={isIssue}
              onChange={evt => setIsIssue(evt.target.value)}
              style={{ margin: 12 }}
            />
          )}
          <TextField
            label="Description"
            multiline
            rows="4"
            value={description}
            onChange={evt => setDescription(evt.target.value)}
            style={{margin: 12}}
          />
          <TextField
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={evt => setDueDate(evt.target.value)}
            style={{margin: 12}}
          />
          <TextField
            label="Time Estimate"
            type="number"
            value={timeEstimate}
            onChange={evt => setTimeEstimate(evt.target.value)}
            style={{margin: 12}}
          />
          <UserDropDown users={props.users} setUser={setAssignedTo}/>
          <TextField
            label="Labels"
            value={labels}
            onChange={evt => setLabels(evt.target.value)}
            style={{margin: 12}}
          />
          <Button
            variant="contained"
            fullWidth
            disabled={disabled}
            onClick={handleSubmit}
            color="primary"
            style={{padding: 12}}
          >
            SUBMIT
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

CreateItemWidget.propTypes = {
  requirement: PropTypes.bool,
  edit: PropTypes.bool,
  projectName: PropTypes.string,
  priorities: PropTypes.array,
  statuses: PropTypes.array,
  users: PropTypes.array,
  onSubmit: PropTypes.func,
  project: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
  }).isRequired,
  board: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
  }).isRequired,
  item: PropTypes.object,
};

CreateItemWidget.defaultProps = {
  onSubmit: () => {},
  users: [],
  priorities: [],
  statuses: [],
  item: {},
};

export default CreateItemWidget;

