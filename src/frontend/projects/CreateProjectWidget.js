import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

const _style = {
  form: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: 250,
    },
    title: {
      marginTop: 12,
      textAlign: 'center',
    },
  },
};

const CreateProjectWidget = props => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleClose = () => {
    setIsDialogOpen(false);
  };
  const handleSubmit = () => {
    props.onSubmit(name, description);
    setName('');
    setDescription('');
    setIsDialogOpen(false);
  };
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };
  return (
    <React.Fragment>
      <Button variant="contained" color="primary" onClick={handleDialogOpen}>
        CREATE PROJECT
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClose}>
      <div style={_style.form.root}>
        <strong style={_style.form.title}>Create Project</strong>
        <TextField
          label="Project Name"
          value={name}
          onChange={evt => setName(evt.target.value)}
          style={{margin: 12}}
        />
        <TextField
          label="Project Description"
          multiline
          rowsMax="4"
          value={description}
          onChange={evt => setDescription(evt.target.value)}
          style={{margin: 12}}
        />
        <Button
          variant="contained"
          fullWidth
          disabled={!Boolean(name && description)}
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

CreateProjectWidget.propTypes = {
  onSubmit: PropTypes.func,
};

CreateProjectWidget.defaultProps = {
  onSubmit: () => {},
};

export default CreateProjectWidget;

