import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Card, CardContent, Box, Alert, Snackbar } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import api from '../api';

function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showEmailInvalid, setShowEmailInvalid] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.username.trim() || !form.email.trim() || !form.password.trim() || !form.confirmPassword.trim()) {
      setShowHint(true);
      return;
    }
    if (!isValidEmail(form.email)) {
      setShowEmailInvalid(true);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/register', {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      setSuccess('Registration successful! You can now log in.');
      setForm({ username: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: { xs: 4, md: 8 }, px: { xs: 1, sm: 0 } }}>
      <Card elevation={4}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <PersonAddAlt1Icon color="primary" sx={{ fontSize: { xs: 32, sm: 40 }, mb: 1 }} />
            <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 600, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
              Register
            </Typography>
            {success && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>{success}</Alert>}
            {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
            <Box component="form" sx={{ mt: 1, width: '100%' }} onSubmit={handleSubmit}>
              <TextField label="Username" name="username" value={form.username} onChange={handleChange} variant="outlined" margin="normal" fullWidth required size="small" />
              <TextField label="Email" name="email" value={form.email} onChange={handleChange} variant="outlined" margin="normal" fullWidth required size="small" />
              <TextField label="Password" name="password" value={form.password} onChange={handleChange} type="password" variant="outlined" margin="normal" fullWidth required size="small" />
              <TextField label="Confirm Password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type="password" variant="outlined" margin="normal" fullWidth required size="small" />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.2, fontSize: { xs: '1rem', sm: '1.1rem' } }} disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </Box>
            <Snackbar
              open={showHint}
              autoHideDuration={3000}
              onClose={() => setShowHint(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              message="Please fill in all fields."
            />
            <Snackbar
              open={showEmailInvalid}
              autoHideDuration={3000}
              onClose={() => setShowEmailInvalid(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              message="Please enter a valid email address."
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default RegisterPage; 