import React, { useRef, useState } from 'react';
import { Box, Button, Typography, Container, Paper, Divider, Fade, Tabs, Tab, Box as MuiBox } from '@mui/material';
import { Link } from 'react-router-dom';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LockIcon from '@mui/icons-material/Lock';

const bgImage = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1500&q=80';



function LandingPage() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // 2 seconds
    arrows: false,
    adaptiveHeight: true
  };

  // Check if user is logged in
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  // Ref and state for highlighting Big Five section
  const bigFiveRef = useRef(null);
  const [highlight, setHighlight] = useState(false);

  const handleLearnMore = (e) => {
    e.preventDefault();
    if (bigFiveRef.current) {
      bigFiveRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlight(true);
      setTimeout(() => setHighlight(false), 2000);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: `linear-gradient(rgba(33,147,176,0.3), rgba(109,213,237,0.3)), url(${bgImage}) center/cover no-repeat`,
      color: 'white',
      pb: 10
    }}>
      {/* Hero Section */}
      <Container maxWidth="md" sx={{ textAlign: 'center', pt: { xs: 6, md: 12 }, pb: { xs: 4, md: 8 } }}>
        <Fade in timeout={1200}>
          <Box>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 800, letterSpacing: 1, textShadow: '0 4px 24px rgba(0,0,0,0.3)', fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' }, color: '#111' }}>
              Discover Your Personality
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ textShadow: '0 2px 8px rgba(0,0,0,0.2)', fontSize: { xs: '1.1rem', sm: '1.3rem', md: '2rem' }, color: '#111' }}>
              AI-powered fashion recommendations based on the Big Five personality traits
            </Typography>
            {!isLoggedIn && (
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{ mt: 4, mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 }, background: '#fff', color: '#111', fontWeight: 700, boxShadow: 3, px: 4, width: { xs: '100%', sm: 'auto' }, border: '2px solid #111', '&:hover': { background: '#f5f5f5', color: '#111', border: '2px solid #111' } }}
              >
                Get Started
              </Button>
            )}
            <Button
              onClick={handleLearnMore}
              variant="outlined"
              size="large"
              sx={{ mt: 4, color: '#111', borderColor: '#111', fontWeight: 700, px: 4, width: { xs: '100%', sm: 'auto' }, '&:hover': { background: '#f5f5f5', color: '#111', borderColor: '#111' } }}
            >
              Learn More
            </Button>
            <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ animation: 'bounce 2s infinite', '@keyframes bounce': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(10px)' } } }}>
                <span style={{ fontSize: 40, opacity: 0.7 }}>▼</span>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Container>
      {/* Why This Project Section with Carousel */}
      <span id="why-section">
        <Container maxWidth="md" sx={{ my: { xs: 4, md: 8 } }}>
          <Box sx={{
            bgcolor: '#f5f7fa',
            borderRadius: 5,
            boxShadow: '0 8px 32px rgba(33,147,176,0.10)',
            p: { xs: 2, sm: 4, md: 6 },
            maxWidth: 700,
            width: '100%',
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}>
            <Typography variant="h3" align="center" sx={{ fontWeight: 800, color: '#143642', mb: 2, letterSpacing: 1 }}>
              Why This Project?
            </Typography>
            <Divider sx={{ mb: 4, bgcolor: '#111', height: 3, borderRadius: 2, width: 90, mx: 'auto' }} />
            <Slider {...sliderSettings}>
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ color: '#111', fontWeight: 700, mb: 2 }}>
                  The Problem
                </Typography>
                <Typography variant="body1" sx={{ color: '#143642', fontSize: { xs: 16, sm: 18 } }}>
                  Traditional fashion recommendations miss the deeper psychological factors that drive personal style.
                </Typography>
              </Box>
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ color: '#111', fontWeight: 700, mb: 2 }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" sx={{ color: '#143642', fontSize: { xs: 16, sm: 18 } }}>
                  PersonaFit bridges this gap by mapping visual preferences to personality, enabling more meaningful, accurate recommendations.
                </Typography>
              </Box>
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ color: '#111', fontWeight: 700, mb: 2 }}>
                  Impact
                </Typography>
                <Typography variant="body1" sx={{ color: '#143642', fontSize: { xs: 16, sm: 18 } }}>
                  Our system empowers users and retailers with AI-powered insights for better style and satisfaction.
                </Typography>
              </Box>
            </Slider>
          </Box>
        </Container>
      </span>
      {/* Features of this Model Section as Tabs */}
      <span id="features-section">
        <Box sx={{ bgcolor: 'linear-gradient(135deg, #f5f7fa 60%, #e3eafc 100%)', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="lg">
            <Paper elevation={6} sx={{ bgcolor: '#fff', borderRadius: 5, boxShadow: '0 8px 32px rgba(33,147,176,0.10)', p: { xs: 2, sm: 4, md: 6 }, maxWidth: 900, width: '100%', mx: 'auto', mt: { xs: 3, md: 5 }, mb: { xs: 3, md: 7 } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', mb: 5 }}>
                <Typography variant="h3" align="center" sx={{ fontWeight: 800, color: '#143642', letterSpacing: 1, position: 'relative', display: 'inline-block', mb: 0 }}>
                  Key Features of PersonaFit
                </Typography>
                <Box sx={{ height: 4, bgcolor: '#111', borderRadius: 2, width: 110, mt: 1 }} />
              </Box>
              <FeatureTabs darkMode={false} />
            </Paper>
          </Container>
        </Box>
      </span>
      {/* Big Five Personality Traits Info */}
      <Paper ref={bigFiveRef} elevation={6} sx={{
        background: '#f5f7fa',
        color: '#222',
        borderRadius: 5,
        p: { xs: 2, sm: 4, md: 6 },
        maxWidth: 900,
        width: '100%',
        mx: 'auto',
        mt: { xs: 3, md: 6 },
        boxShadow: '0 8px 32px rgba(33,147,176,0.10)',
        border: highlight ? '3px solid #1976d2' : undefined,
        transition: 'border 0.5s',
      }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#111', mb: 2, fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.7rem' } }}>
          The Big Five Personality Traits
        </Typography>
        <ul style={{ fontSize: 16, marginLeft: 16, paddingLeft: 0 }}>
          <li><b>Openness:</b> Imagination, creativity, curiosity, and a preference for variety and new experiences.</li>
          <li><b>Conscientiousness:</b> Organization, dependability, discipline, and goal-oriented behaviors.</li>
          <li><b>Extraversion:</b> Sociability, assertiveness, talkativeness, and high levels of emotional expressiveness.</li>
          <li><b>Agreeableness:</b> Compassion, cooperativeness, trust, and a tendency to help others.</li>
          <li><b>Neuroticism:</b> Tendency toward emotional instability, anxiety, moodiness, and irritability.</li>
        </ul>
        <Typography variant="body2" sx={{ color: '#111', mt: 2, fontSize: { xs: 12, sm: 14, md: 16 } }}>
          These five traits are widely used in psychology to describe human personality and are the foundation for this AI-powered fashion recommendation system.
        </Typography>
      </Paper>
    </Box>
  );
}

export default LandingPage;

function FeatureTabs({ darkMode }) {
  const [tab, setTab] = React.useState(0);
  const handleChange = (e, newValue) => setTab(newValue);
  const features = [
    {
      label: 'AI & Analysis',
      icon: <EmojiObjectsIcon sx={{ mr: 1 }} />,
      content: (
        <MuiBox sx={{ p: 0 }}>
          <Paper elevation={3} sx={{ bgcolor: '#fff', p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#111', fontSize: 20 }}>
              AI-Powered Personality Mapping
            </Typography>
            <Typography variant="body2" sx={{ color: '#111', mb: 2 }}>
              Maps your clothing preferences to the Big Five (OCEAN) personality traits using advanced AI.
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#111', fontSize: 20 }}>
              Image-Based Feature Extraction
            </Typography>
            <Typography variant="body2" sx={{ color: '#111' }}>
              Analyzes dress images for color, texture, and edge density to understand your style.
            </Typography>
          </Paper>
        </MuiBox>
      )
    },
    {
      label: 'Personalization',
      icon: <AutoAwesomeIcon sx={{ mr: 1 }} />,
      content: (
        <MuiBox sx={{ p: 0 }}>
          <Paper elevation={3} sx={{ bgcolor: '#fff', p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#111', fontSize: 20 }}>
              Personalized Recommendations
            </Typography>
            <Typography variant="body2" sx={{ color: '#111', mb: 2 }}>
              Get fashion suggestions tailored to your unique personality profile.
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#111', fontSize: 20 }}>
              Interactive Results
            </Typography>
            <Typography variant="body2" sx={{ color: '#111' }}>
              Download trait-wise organized folders in zip format.
            </Typography>
          </Paper>
        </MuiBox>
      )
    },
    {
      label: 'Security & Fairness',
      icon: <LockIcon sx={{ mr: 1 }} />,
      content: (
        <MuiBox sx={{ p: 0 }}>
          <Paper elevation={3} sx={{ bgcolor: '#fff', p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#111', fontSize: 20 }}>
              Privacy & Security
            </Typography>
            <Typography variant="body2" sx={{ color: '#111', mb: 2 }}>
              Your data is processed securely and never shared.
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#111', fontSize: 20 }}>
              Balanced & Fair
            </Typography>
            <Typography variant="body2" sx={{ color: '#111', mb: 2 }}>
              Ensures fair predictions for all personality types using SMOTE.
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#111', fontSize: 20 }}>
              Multiple Classifiers
            </Typography>
            <Typography variant="body2" sx={{ color: '#111', mb: 2 }}>
              Random Forest, SVM, and KNN models compared for best accuracy.
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#111', fontSize: 20 }}>
              Future-Ready
            </Typography>
            <Typography variant="body2" sx={{ color: '#111' }}>
              Built for easy integration of deep learning and larger datasets.
            </Typography>
          </Paper>
        </MuiBox>
      )
    }
  ];
  return (
    <MuiBox sx={{ width: '100%', bgcolor: 'transparent' }}>
      <Tabs
        value={tab}
        onChange={handleChange}
        centered
        variant="fullWidth"
        sx={{
          mb: 2,
          '& .MuiTab-root': {
            fontWeight: 700,
            fontSize: 18,
            color: '#111 !important',
            transition: 'color 0.2s',
            '&:hover': { color: '#111 !important' },
            position: 'relative',
            '&.Mui-selected::after': {
              content: '""',
              display: 'block',
              width: 60,
              height: 3,
              backgroundColor: '#111',
              borderRadius: 2,
              margin: '6px auto 0',
            },
          },
          '& .Mui-selected': { color: '#111 !important' },
          '& .MuiTabs-indicator': { backgroundColor: '#111 !important' },
        }}
      >
        {features.map((f, i) => (
          <Tab key={f.label} icon={f.icon} label={f.label} />
        ))}
      </Tabs>
      {features[tab].content}
    </MuiBox>
  );
} 