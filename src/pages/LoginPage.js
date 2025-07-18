import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Card, CardContent, Box, Alert, Snackbar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import api from '../api';

function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.username.trim() || !form.password.trim()) {
      setShowHint(true);
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('username', form.username);
      params.append('password', form.password);
      const res = await api.post('/login', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      localStorage.setItem('token', res.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: { xs: 4, md: 8 }, px: { xs: 1, sm: 0 } }}>
      <Card elevation={4}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <LockOutlinedIcon sx={{ fontSize: { xs: 32, sm: 40 }, mb: 1, color: '#111', border: '2px solid #111', borderRadius: '50%', p: 0.5 }} />
            <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 600, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
              Login
            </Typography>
            {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
            <Box component="form" sx={{ mt: 1, width: '100%' }} onSubmit={handleSubmit}>
              <TextField label="Username" name="username" value={form.username} onChange={handleChange} variant="outlined" margin="normal" fullWidth required size="small" />
              <TextField label="Password" name="password" value={form.password} onChange={handleChange} type="password" variant="outlined" margin="normal" fullWidth required size="small" />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.2, fontSize: { xs: '1rem', sm: '1.1rem' }, bgcolor: '#111', color: '#fff', fontWeight: 700, '&:hover': { bgcolor: '#222' } }} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Box>
            {/* Add register prompt below login form */}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don't have an account?{' '}
                <a href="/register" style={{ color: '#111', textDecoration: 'underline', fontWeight: 600 }}>Register here</a>
              </Typography>
            </Box>
            <Snackbar
              open={showHint}
              autoHideDuration={3000}
              onClose={() => setShowHint(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              message="Please enter both username and password."
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default LoginPage; 