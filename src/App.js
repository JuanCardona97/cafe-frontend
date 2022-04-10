import React, { useContext } from 'react';
import Router from './router';
import AlertContext from './context/alert/AlertContext'
import AlertComponent from './components/Alert'



function App() {
  const {
    open, message, variant, severity, closeAlert,
  } = useContext(
    AlertContext,
  );
  return (
    <>
      <AlertComponent
        open={open}
        message={message}
        severity={severity}
        variant={variant}
        handleClose={closeAlert}
      />
      <Router />
    </>
  );
}

export default App;
