import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

const _style = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
  },
};

const CreateBoardWidget = props => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleClose = () => {
    props.onSubmit(name, description);
    setIsDialogOpen(false);
  };
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };
  return (
    <React.Fragment>
      <Button variant="contained" color="primary" onClick={handleDialogOpen}>
        CREATE BOARD
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <div style={_style.root}>
          <TextField
            label="Board Name"
            value={name}
            onChange={evt => setName(evt.target.value)}
          />
          <TextField
            label="Board Description"
            multiline
            rowsMax="4"
            value={description}
            onChange={evt => setDescription(evt.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            disabled={!Boolean(name && description)}
            onClick={handleClose}
            color="primary"
          >
            SUBMIT
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

CreateBoardWidget.propTypes = {
  onSubmit: PropTypes.func,
};

CreateBoardWidget.defaultProps = {
  onSubmit: () => {},
};

export default CreateBoardWidget;

