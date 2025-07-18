import React from 'react';
import { Box, Container, Typography, Grid, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <Box sx={{ bgcolor: '#111', color: '#fff', py: 4, mt: 8, borderTop: '2px solid #e0e0e0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1 }}>
              PersonaFit
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              &copy; {new Date().getFullYear()} PersonaFit. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Quick Links
            </Typography>
            <Box>
              <a href="/about" style={{ color: '#fff', margin: '0 12px', textDecoration: 'none', fontWeight: 500 }}>About</a>
              <a href="/working" style={{ color: '#fff', margin: '0 12px', textDecoration: 'none', fontWeight: 500 }}>How it Works</a>
              <a href="/dashboard" style={{ color: '#fff', margin: '0 12px', textDecoration: 'none', fontWeight: 500 }}>Dashboard</a>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Social
            </Typography>
            <IconButton color="inherit" sx={{ mx: 1, color: '#fff', cursor: 'default' }}>
              <GitHubIcon />
            </IconButton>
            <IconButton color="inherit" sx={{ mx: 1, color: '#fff', cursor: 'default' }}>
              <LinkedInIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer; 