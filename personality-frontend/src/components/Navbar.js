import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navLinks = [
    { label: 'Home', to: '/', type: 'router' },
    ...(isHome ? [{ label: 'About', to: 'about-section', type: 'scroll' }] : []),
    ...(isLoggedIn
      ? [
          { label: 'Dashboard', to: '/dashboard', type: 'router' },
          { label: 'Logout', to: '/logout', type: 'action' },
        ]
      : [
          { label: 'Login', to: '/login', type: 'router' },
          { label: 'Register', to: '/register', type: 'router' },
        ]),
  ];

  const handleNavClick = (link) => {
    setDrawerOpen(false);
    if (link.type === 'router') {
      navigate(link.to);
    } else if (link.type === 'scroll') {
      // ScrollLink will handle
    } else if (link.type === 'action' && link.label === 'Logout') {
      handleLogout();
    }
  };

  return (
    <AppBar
      position="static"
      elevation={4}
      sx={{
        background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 60%, #6dd5ed 100%)',
        boxShadow: '0 4px 24px 0 rgba(33,147,176,0.12)',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
        <EmojiObjectsIcon sx={{ mr: 1, color: '#fff' }} />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1, color: '#fff' }}
        >
          PersonaFit
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{ sx: { width: 220 } }}
            >
              <Box sx={{ mt: 2 }}>
                <List>
                  {navLinks.map((link, idx) => (
                    <ListItem key={idx} disablePadding>
                      {link.type === 'scroll' ? (
                        <ListItemButton
                          component={ScrollLink}
                          to={link.to}
                          smooth={true}
                          duration={600}
                          offset={-70}
                          onClick={() => setDrawerOpen(false)}
                        >
                          <ListItemText primary={link.label} />
                        </ListItemButton>
                      ) : (
                        <ListItemButton
                          onClick={() => handleNavClick(link)}
                        >
                          <ListItemText primary={link.label} />
                        </ListItemButton>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/"
              sx={{ fontWeight: 600, mx: 1, letterSpacing: 1, '&:hover': { background: 'rgba(255,255,255,0.08)' } }}
            >
              Home
            </Button>
            {isHome && (
              <Button
                color="inherit"
                component={ScrollLink}
                to="about-section"
                smooth={true}
                duration={600}
                offset={-70}
                sx={{ fontWeight: 600, mx: 1, letterSpacing: 1, '&:hover': { background: 'rgba(255,255,255,0.08)' } }}
              >
                About
              </Button>
            )}
            {isLoggedIn ? (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/dashboard"
                  sx={{ fontWeight: 600, mx: 1, letterSpacing: 1, '&:hover': { background: 'rgba(255,255,255,0.08)' } }}
                >
                  Dashboard
                </Button>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  sx={{ fontWeight: 600, mx: 1, letterSpacing: 1, '&:hover': { background: 'rgba(255,255,255,0.08)' } }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                  sx={{ fontWeight: 600, mx: 1, letterSpacing: 1, '&:hover': { background: 'rgba(255,255,255,0.08)' } }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/register"
                  sx={{ fontWeight: 600, mx: 1, letterSpacing: 1, '&:hover': { background: 'rgba(255,255,255,0.08)' } }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 