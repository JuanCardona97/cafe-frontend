import React from 'react';
import { Alert, Snackbar, } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: '20px',
    },
  },
}));

export default function AlertComponent({
  open,
  message,
  variant,
  severity,
  handleClose,
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Snackbar
        autoHideDuration={5000}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          elevation={6}
          variant={variant || 'filled'}
          severity={severity || 'error'}
          onClose={handleClose}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

Alert.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  variant: PropTypes.string,
  severity: PropTypes.string,
  handleClose: PropTypes.func,
};
