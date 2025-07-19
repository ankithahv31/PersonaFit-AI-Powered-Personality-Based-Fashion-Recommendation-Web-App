import React, { useState, useEffect } from 'react';
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
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll event to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Only show Features link on home page
  const showFeatures = location.pathname === '/';

  // Scroll links for landing page sections (excluding Home, About, and Guidelines)
  const scrollLinks = [
    ...(showFeatures ? [{ label: 'Features', to: 'features-section' }] : []),
    // Removed 'Why This Project' and duplicate Working
  ];

  // Auth links
  const authLinks = isLoggedIn
    ? [
        { label: 'Dashboard', to: '/dashboard', type: 'router' },
        { label: 'Logout', to: '/logout', type: 'action' },
      ]
    : [
        { label: 'Login', to: '/login', type: 'router' },
        // Removed Register link
      ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleNavClick = (link) => {
    setDrawerOpen(false);
    if (link.type === 'router') {
      navigate(link.to);
    } else if (link.type === 'action' && link.label === 'Logout') {
      handleLogout();
    }
  };

  return (
    <AppBar
      position="static"
      elevation={4}
      sx={{
        background: '#111',
        boxShadow: '0 4px 24px 0 rgba(33,147,176,0.12)',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
        <EmojiObjectsIcon sx={{ mr: 1, color: '#fff' }} />
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 900,
            letterSpacing: 2,
            color: '#fff',
            fontFamily: 'Montserrat, "Segoe UI", Arial, sans-serif',
            fontSize: { xs: '1.5rem', sm: '2rem' },
            textShadow: '0 2px 8px rgba(0,0,0,0.18)',
            display: 'flex',
            alignItems: 'center'
          }}
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
                  {/* Home as router link */}
                  <ListItem disablePadding>
                    <ListItemButton component={RouterLink} to="/" onClick={() => setDrawerOpen(false)}>
                      <ListItemText primary="Home" sx={{ color: '#fff' }} />
                    </ListItemButton>
                  </ListItem>
                  {/* About as router link */}
                  <ListItem disablePadding>
                    <ListItemButton component={RouterLink} to="/about" onClick={() => setDrawerOpen(false)}>
                      <ListItemText primary="About" sx={{ color: '#fff' }} />
                    </ListItemButton>
                  </ListItem>
                  {/* Guidelines as router link to working#guidelines */}
                  <ListItem disablePadding>
                    <ListItemButton component={RouterLink} to="/working#guidelines" onClick={() => setDrawerOpen(false)}>
                      <ListItemText primary="Guidelines" sx={{ color: '#fff' }} />
                    </ListItemButton>
                  </ListItem>
                  {/* Other scroll links */}
                  {scrollLinks.map((link, idx) => (
                    <ListItem key={idx} disablePadding>
                      <ListItemButton
                        component={ScrollLink}
                        to={link.to}
                        smooth={true}
                        duration={600}
                        offset={-70}
                        onClick={() => setDrawerOpen(false)}
                      >
                        <ListItemText primary={link.label} sx={{ color: '#fff' }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  {authLinks.map((link, idx) => (
                    <ListItem key={link.label} disablePadding>
                      <ListItemButton
                        onClick={() => handleNavClick(link)}
                      >
                        <ListItemText primary={link.label} sx={{ color: '#fff' }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Home as router link */}
            <Button
              color="inherit"
              component={RouterLink}
              to="/"
              sx={{ fontWeight: 600, mx: 1, letterSpacing: 1, '&:hover': { background: 'rgba(255,255,255,0.08)' }, color: '#fff' }}
            >
              Home
            </Button>
            {/* About as router link */}
            <Button
              color="inherit"
              component={RouterLink}
              to="/about"
              sx={{ fontWeight: 600, mx: 1, letterSpacing: 1, '&:hover': { background: 'rgba(255,255,255,0.08)' }, color: '#fff' }}
            >
              About
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/working"
              sx={{ fontWeight: 600, mx: 1, letterSpacing: 1, '&:hover': { background: 'rgba(255,255,255,0.08)' }, color: '#fff' }}
            >
              Working
            </Button>
            {/* Other scroll links */}
            {scrollLinks.map((link) => (
              <Button
                key={link.label}
                color="inherit"
                component={ScrollLink}
                to={link.to}
                smooth={true}
                duration={600}
                offset={-70}
                sx={{ fontWeight: 600, mx: 1, letterSpacing: 1, '&:hover': { background: 'rgba(255,255,255,0.08)' }, color: '#fff' }}
              >
                {link.label}
              </Button>
            ))}
            {authLinks.map((link) =>
              link.type === 'router' ? (
                <Button
                  key={link.label}
                  color="inherit"
                  component={RouterLink}
                  to={link.to}
                  sx={{ fontWeight: 600, mx: 1, letterSpacing: 1, '&:hover': { background: 'rgba(255,255,255,0.08)' }, color: '#fff' }}
                >
                  {link.label}
                </Button>
              ) : (
                <Button
                  key={link.label}
                  color="inherit"
                  onClick={handleLogout}
                  sx={{ fontWeight: 600, mx: 1, letterSpacing: 1, '&:hover': { background: 'rgba(255,255,255,0.08)' }, color: '#fff' }}
                >
                  {link.label}
                </Button>
              )
            )}
          </Box>
        )}
      </Toolbar>
      
      {/* Back to Top Button */}
      <Zoom in={showScrollTop}>
        <Fab
          color="primary"
          size="large"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            bgcolor: '#111',
            color: '#fff',
            '&:hover': {
              bgcolor: '#333',
            },
            zIndex: 1000,
          }}
          aria-label="back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </AppBar>
  );
}

export default Navbar; 