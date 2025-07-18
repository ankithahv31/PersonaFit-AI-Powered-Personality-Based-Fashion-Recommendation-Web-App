import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static" sx={{ bgcolor: '#143642' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, fontFamily: 'cursive' }}>
          PersonaFit
        </Typography>
        <Button color="inherit" component={Link} to="/" sx={{ mx: 1 }}>Home</Button>
        <Button color="inherit" component={Link} to="/about" sx={{ mx: 1 }}>About</Button>
        <Button color="inherit" component={Link} to="/features" sx={{ mx: 1 }}>Features of this Model</Button>
        <Button color="inherit" component={Link} to="/working" sx={{ mx: 1 }}>Working</Button>
        <Button color="inherit" component={Link} to="/login" sx={{ mx: 1 }}>Login</Button>
        <Button color="inherit" component={Link} to="/register" sx={{ mx: 1 }}>Register</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 