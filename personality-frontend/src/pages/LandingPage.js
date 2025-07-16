import React, { useRef, useState } from 'react';
import { Box, Button, Typography, Container, Paper, Divider, Fade } from '@mui/material';
import { Link } from 'react-router-dom';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import StyleIcon from '@mui/icons-material/Style';
import PsychologyIcon from '@mui/icons-material/Psychology';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const bgImage = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1500&q=80';

const carouselItems = [
  {
    icon: <EmojiObjectsIcon sx={{ fontSize: 64, color: '#1976d2' }} />, title: 'AI-Powered',
    desc: 'Advanced machine learning maps dress features to personality traits.'
  },
  {
    icon: <StyleIcon sx={{ fontSize: 64, color: '#1976d2' }} />, title: 'Personalized Fashion',
    desc: 'Recommendations go beyond demographics to psychological preferences.'
  },
  {
    icon: <PsychologyIcon sx={{ fontSize: 64, color: '#1976d2' }} />, title: 'Reduce Returns',
    desc: 'Aligning design with personality helps lower product return rates.'
  }
];

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
      background: `linear-gradient(rgba(33,147,176,0.7), rgba(109,213,237,0.7)), url(${bgImage}) center/cover no-repeat`,
      color: 'white',
      pb: 10
    }}>
      {/* Hero Section */}
      <Container maxWidth="md" sx={{ textAlign: 'center', pt: { xs: 6, md: 12 }, pb: { xs: 4, md: 8 } }}>
        <Fade in timeout={1200}>
          <Box>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 800, letterSpacing: 1, textShadow: '0 4px 24px rgba(0,0,0,0.3)', fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' } }}>
              Discover Your Personality
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ textShadow: '0 2px 8px rgba(0,0,0,0.2)', fontSize: { xs: '1.1rem', sm: '1.3rem', md: '2rem' } }}>
              AI-powered fashion recommendations based on the Big Five personality traits
            </Typography>
            {!isLoggedIn && (
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{ mt: 4, mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 }, background: '#fff', color: '#2193b0', fontWeight: 700, boxShadow: 3, px: 4, width: { xs: '100%', sm: 'auto' } }}
              >
                Get Started
              </Button>
            )}
            <Button
              onClick={handleLearnMore}
              variant="outlined"
              size="large"
              sx={{ mt: 4, color: '#fff', borderColor: '#fff', fontWeight: 700, px: 4, width: { xs: '100%', sm: 'auto' } }}
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
        <Container maxWidth="md" sx={{ mt: { xs: 3, md: 6 }, mb: { xs: 4, md: 8 } }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 700, color: '#fff', mb: 4, textShadow: '0 2px 8px rgba(0,0,0,0.2)', fontSize: { xs: '1.3rem', sm: '1.7rem', md: '2.2rem' } }}>
            Why This Project?
          </Typography>
          <Box sx={{ width: '100%', maxWidth: 700, mx: 'auto' }}>
            <Paper elevation={8} sx={{ background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)', color: '#fff', borderRadius: 4, p: { xs: 2, md: 6 }, boxShadow: 6 }}>
              <Slider {...sliderSettings}>
                {carouselItems.map((item, idx) => (
                  <Box key={idx} sx={{ textAlign: 'center', py: { xs: 2, md: 4 } }}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2
                    }}>
                      <Box sx={{
                        background: '#fff',
                        borderRadius: '50%',
                        border: '3px solid #1976d2',
                        boxShadow: 3,
                        width: { xs: 60, sm: 80, md: 90 },
                        height: { xs: 60, sm: 80, md: 90 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {item.icon}
                      </Box>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff', mt: 2, fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.7rem' } }}>{item.title}</Typography>
                    <Typography variant="body1" sx={{ color: '#e3f2fd', mt: 1, fontSize: { xs: 14, sm: 16, md: 18 } }}>{item.desc}</Typography>
                  </Box>
                ))}
              </Slider>
            </Paper>
          </Box>
          {/* Big Five Personality Traits Info */}
          <Paper ref={bigFiveRef} elevation={6} sx={{ background: 'rgba(255,255,255,0.97)', color: '#222', borderRadius: 4, p: { xs: 1, md: 5 }, mt: { xs: 3, md: 6 }, boxShadow: 4, border: highlight ? '3px solid #1976d2' : undefined, transition: 'border 0.5s' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2', mb: 2, fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.7rem' } }}>
              The Big Five Personality Traits
            </Typography>
            <ul style={{ fontSize: 16, marginLeft: 16, paddingLeft: 0 }}>
              <li><b>Openness:</b> Imagination, creativity, curiosity, and a preference for variety and new experiences.</li>
              <li><b>Conscientiousness:</b> Organization, dependability, discipline, and goal-oriented behaviors.</li>
              <li><b>Extraversion:</b> Sociability, assertiveness, talkativeness, and high levels of emotional expressiveness.</li>
              <li><b>Agreeableness:</b> Compassion, cooperativeness, trust, and a tendency to help others.</li>
              <li><b>Neuroticism:</b> Tendency toward emotional instability, anxiety, moodiness, and irritability.</li>
            </ul>
            <Typography variant="body2" sx={{ color: '#1976d2', mt: 2, fontSize: { xs: 12, sm: 14, md: 16 } }}>
              These five traits are widely used in psychology to describe human personality and are the foundation for this AI-powered fashion recommendation system.
            </Typography>
          </Paper>
        </Container>
      </span>
      {/* About Section */}
      <span id="about-section">
        <Container maxWidth="md" sx={{ mt: { xs: 5, md: 10 }, mb: { xs: 4, md: 8 } }}>
          <Fade in timeout={1200}>
            <Paper elevation={0} sx={{ borderRadius: 4, background: 'rgba(245, 249, 255, 0.98)', p: { xs: 1, md: 6 }, boxShadow: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#2193b0', mb: 2, fontSize: { xs: '1.3rem', sm: '1.7rem', md: '2.2rem' } }}>
                About the Project
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="body1" sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, mb: 2, color: '#222' }}>
                In today's fast-evolving fashion industry, understanding consumer preferences has become increasingly important for delivering personalized shopping experiences. Traditional recommendation systems often rely on user browsing history or demographic data, which may not effectively capture the deeper psychological preferences behind a consumer’s fashion choices.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, mb: 2, color: '#222' }}>
                The proposed project seeks to bridge this gap by developing an AI-based model that classifies dress images according to the personality traits of potential consumers. This is accomplished by mapping features extracted from dress images—such as color, texture, and style—to the Five-Factor Model (Big Five) of personality, derived from survey data collected using the NEO-FFI questionnaire.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, mb: 2, color: '#222' }}>
                The system's primary aim is to enable shopkeepers or fashion retailers to upload dress images and receive predictions about which personality types are more likely to prefer those designs. This innovation not only supports better-targeted marketing strategies but also helps reduce product return rates by aligning design with personality-driven preferences.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, mb: 2, color: '#222' }}>
                The project uses image preprocessing techniques like background removal and face masking to ensure unbiased image input, and integrates advanced feature extraction methods like BQMP and Haralick texture analysis, followed by training a classification model to make personality-based predictions.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, color: '#222' }}>
                This initiative is conducted as an academic project under the supervision and support of faculty members from the student’s college. While it does not belong to any commercial company, the project simulates a real-world application scenario, emphasizing applied AI, computer vision, and personality psychology in the domain of fashion recommendation.
              </Typography>
            </Paper>
          </Fade>
        </Container>
      </span>
    </Box>
  );
}

export default LandingPage; 