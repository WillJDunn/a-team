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
      textAlign: 'center',
      marginTop: 12,
    },
  },
};

const CreateBoardWidget = props => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleSubmit = () => {
    props.onSubmit(name, description);
    setName('');
    setDescription('');
    setIsDialogOpen(false);
  };
  const handleClose = () => {
    setIsDialogOpen(false);
  };
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };
  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDialogOpen}
        disabled={props.disabled}
      >
        CREATE BOARD
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <div style={_style.form.root}>
          <strong style={_style.form.title}>Create Board for {props.projectName}</strong>
          <TextField
            label="Board Name"
            value={name}
            onChange={evt => setName(evt.target.value)}
            style={{margin: 12}}
          />
          <TextField
            label="Board Description"
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

CreateBoardWidget.propTypes = {
  projectName: PropTypes.string,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
};

CreateBoardWidget.defaultProps = {
  onSubmit: () => {},
};

export default CreateBoardWidget;

