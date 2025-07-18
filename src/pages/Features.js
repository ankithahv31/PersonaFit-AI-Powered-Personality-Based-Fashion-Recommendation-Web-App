import React from 'react';
import { Container, Typography } from '@mui/material';

function Features() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
        Features of this Model
      </Typography>
      <Typography variant="body1">
        This is the Features page. List and describe the key features of your AI-powered fashion recommendation model here.
      </Typography>
    </Container>
  );
}

export default Features; 