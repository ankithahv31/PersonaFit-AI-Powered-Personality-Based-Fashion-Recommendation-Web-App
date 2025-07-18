import React from 'react';
import { Container, Typography, Paper, Divider, Box, Grid, Avatar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockIcon from '@mui/icons-material/Lock';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DownloadIcon from '@mui/icons-material/Download';

const steps = [
  {
    label: 'Register',
    icon: <CheckCircleIcon color="primary" />,
    description: [
      'Click “Get Started” from the homepage.',
      'You will be directed to the Registration Page.',
      'Fill in the required details: Username, Email, Password, Confirm Password.',
      'Click Submit to register your account successfully.'
    ]
  },
  {
    label: 'Login',
    icon: <LockIcon color="primary" />,
    description: [
      'Navigate to the Login Page.',
      'Enter your registered Username and Password.',
      'Click Login to access the platform.'
    ]
  },
  {
    label: 'Upload Your Dress Images',
    icon: <CloudUploadIcon color="primary" />,
    description: [
      'Prepare your image dataset as a single folder/file.',
      'Accepted formats: .jpeg, .jpg, .png, .bmp, .gif',
      'Go to the Upload Section and submit your file.',
      '⚠ Please do not refresh or close the page while uploading.'
    ]
  },
  {
    label: 'AI-Based Classification',
    icon: <AutoAwesomeIcon color="primary" />,
    description: [
      'The system will analyze your images and categorize them into five personality traits.',
      'This may take a few moments depending on file size and number of images.'
    ]
  },
  {
    label: 'View Results',
    icon: <DownloadIcon color="primary" />,
    description: [
      'After processing, you can download trait-wise organized folders in zip format.'
    ]
  }
];

function Working() {
  return (
    <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 8 }}>
      <Container>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: '#111', textAlign: 'center', letterSpacing: 1 }}>
          How Our System Works
        </Typography>
        {/* First row: 3 cards, always in one row */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: 4,
            mb: 4,
            flexWrap: 'nowrap',
            overflowX: { xs: 'auto', md: 'visible' },
            maxWidth: '100vw'
          }}
        >
          {steps.slice(0, 3).map((step, idx) => (
            <Paper
              key={step.label}
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                width: 340,
                minWidth: 260,
                maxWidth: 360,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                bgcolor: '#fff'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{
                  bgcolor: ['#1976d2', '#43a047', '#fbc02d', '#e53935', '#8e24aa'][idx % 5],
                  mr: 2, width: 44, height: 44, fontWeight: 700, fontSize: 22
                }}>
                  {idx + 1}
                </Avatar>
                {step.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#143642' }}>{step.label}</Typography>
              <ul style={{ margin: 0, paddingLeft: 18, color: '#222', fontSize: 16, lineHeight: 1.7 }}>
                {step.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </Paper>
          ))}
        </Box>
        {/* Second row: 2 cards, always in one row and centered */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: 4,
            flexWrap: 'nowrap',
            overflowX: { xs: 'auto', md: 'visible' },
            maxWidth: '100vw'
          }}
        >
          {steps.slice(3).map((step, idx) => (
            <Paper
              key={step.label}
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                width: 340,
                minWidth: 260,
                maxWidth: 360,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                bgcolor: '#fff'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{
                  bgcolor: ['#1976d2', '#43a047', '#fbc02d', '#e53935', '#8e24aa'][(idx+3) % 5],
                  mr: 2, width: 44, height: 44, fontWeight: 700, fontSize: 22
                }}>
                  {idx + 4}
                </Avatar>
                {step.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#143642' }}>{step.label}</Typography>
              <ul style={{ margin: 0, paddingLeft: 18, color: '#222', fontSize: 16, lineHeight: 1.7 }}>
                {step.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Working; 