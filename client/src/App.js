import React from 'react';
import Dashboard from './components/Dashboard';
import { CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <img 
            src="/favicon.ico" 
            alt="Logo" 
            style={{ height: '24px', marginRight: '12px' }} 
          />
          <Typography variant="h6">Vacation Countdown</Typography>
        </Toolbar>
      </AppBar>
      <Dashboard />
    </>
  );
}

export default App;
