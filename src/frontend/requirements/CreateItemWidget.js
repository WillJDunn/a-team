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
import FormHelperText from '@material-ui/core/FormHelperText';

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
  userMenu: {
    formControl: {
      minWidth: 120,
    },
  },
};

const UserDropDown = props => {
  const [user, setUser] = useState({username: "None"});
  const handleChange = evt => {
    setUser(evt.target.value);
    props.setUser(evt.target.value);
  };
  return (
  <FormControl style={_style.userMenu.formControl}>
    <InputLabel htmlFor="assignedTo">Assigned To</InputLabel>
    <Select
      value={user.username}
      onChange={handleChange}
      input={<Input name="assignedTo" id="assignedTo"/>}
      autoWidth
    >
      <MenuItem value={{ username: "None"}}>
        <em>None</em>
      </MenuItem>
      {props.users.map(user =>
        <MenuItem key={`${user.username}`} value={user}>{user.username}</MenuItem>
      )}
    </Select>
  </FormControl>
  );
};

const PriorityDropdown = props => {
  const [priority, setPriority] = useState({name: "None"});
  const handleChange = evt => {
    setPriority(evt.target.value);
    props.setPriority(evt.target.value);
  };
  return (
    <FormControl style={_style.userMenu.formControl}>
      <InputLabel htmlFor="priority">Priority</InputLabel>
      <Select
        value={priority.name}
        onChange={handleChange}
        input={<Input name="priority" id="priority"/>}
        autoWidth
      >
        <MenuItem value={{name: "None"}}>
          <em>None</em>
        </MenuItem>
        {props.priorities.map(priority =>
          <MenuItem key={`${priority.name}`} value={priority}>{priority.name}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

const StatusDropdown = props => {
  const [status, setStatus] = useState({name: "None"});
  console.log(status);
  const handleChange = evt => {
    console.log(evt.target.value);
    setStatus(evt.target.value);
    props.setStatus(evt.target.value);
  };
  return (
    <FormControl style={_style.userMenu.formControl}>
      <InputLabel htmlFor="status">Status</InputLabel>
      <Select
        value={status.name}
        onChange={handleChange}
        input={<Input name="status" id="status"/>}
        autoWidth
      >
        <MenuItem value={{name: "None"}}>
          <em>None</em>
        </MenuItem>
        {props.statuses.map(status =>
          <MenuItem key={`${status.name}`} value={status}>{status.name}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

const CreateItemWidget = props => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [status, setStatus] = useState(props.status);
  const [priority, setPriority] = useState(props.priority);
  const [isIssue, setIsIssue] = useState(props.isIssue);
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [dueDate, setDueDate] = useState(props.dueDate);
  const [timeEstimate, setTimeEstimate] = useState(props.timeEstimate);
  const [createdBy, setCreatedBy] = useState(props.createdBy);
  const [assignedTo, setAssignedTo] = useState(props.assignedTo);
  const [labels, setLabels] = useState(props.labels);

  const handleSubmit = () => {
    const item = {
      status,
      priority,
      isIssue,
      name,
      description,
      dueDate,
      timeEstimate,
      createdBy,
      assignedTo,
      labels,
    };
    props.onSubmit(item);
    // setName('');
    // setDescription('');
    // setStatus('');
    // setPriority('');
    // setIsIssue('');
    setIsDialogOpen(false);
  };
  const handleClose = () => {
    setIsDialogOpen(false);
  };
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };
  const disabled = !Boolean(status && priority && name && description);
  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDialogOpen}
      >
        CREATE ITEM
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <div style={_style.form.root}>
          <strong style={_style.form.title}>Create Item for {props.projectName}</strong>
          <StatusDropdown statuses={props.statuses} setStatus={setStatus}/>
          <PriorityDropdown priorities={props.priorities} setPriority={setPriority}/>
          <TextField
            label="Name"
            value={name}
            onChange={evt => setName(evt.target.value)}
            style={{margin: 12}}
          />
          <TextField
            label="Is issue"
            value={isIssue}
            onChange={evt => setIsIssue(evt.target.value)}
            style={{margin: 12}}
          />
          <TextField
            label="Description"
            value={description}
            onChange={evt => setDescription(evt.target.value)}
            style={{margin: 12}}
          />
          <TextField
            label="Due Date"
            value={dueDate}
            onChange={evt => setDueDate(evt.target.value)}
            style={{margin: 12}}
          />
          <TextField
            label="Time Estimate"
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
  projectName: PropTypes.string,
  priorities: PropTypes.array,
  statuses: PropTypes.array,
  users: PropTypes.array,
  onSubmit: PropTypes.func,
};

CreateItemWidget.defaultProps = {
  onSubmit: () => {},
  users: [],
  priorities: [],
  statuses: [],
};

export default CreateItemWidget;

