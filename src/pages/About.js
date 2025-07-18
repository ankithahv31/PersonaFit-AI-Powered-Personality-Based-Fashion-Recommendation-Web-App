import React from 'react';
import { Container, Typography, Box, Grid, Divider, Chip } from '@mui/material';

function About() {
  return (
    <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        {/* Section Title with Accent */}
        <Box sx={{ mb: 4, textAlign: 'left' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#143642', mb: 1, letterSpacing: 1 }}>
            About PersonaFit
          </Typography>
          <Box sx={{ width: 110, height: 4, bgcolor: '#111', borderRadius: 2, mb: 3 }} />
        </Box>

        {/* Two-column Intro/Summary */}
        <Grid container spacing={5} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ color: '#385170', fontSize: 18, textAlign: 'justify', lineHeight: 1.7 }}>
              In recent years, the intersection of <b>artificial intelligence (AI)</b> and personalized fashion has opened new avenues for understanding individual preferences beyond surface-level aesthetics. <b>PersonaFit</b> is an AI-driven system that aims to bridge this gap by associating clothing preferences with underlying personality traits, based on the widely recognized Big Five (OCEAN) personality model: <b>Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism</b>.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ color: '#385170', fontSize: 18, textAlign: 'justify', lineHeight: 1.7 }}>
              Through PersonaFit, this project showcases the feasibility of leveraging image-based preference patterns to infer personality-driven fashion choices. The system not only contributes to the field of fashion recommendation and psychological computing but also lays the groundwork for future enhancements through deep learning and larger datasets.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, bgcolor: '#1976d2', opacity: 0.2 }} />

        {/* Subsections */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#143642', mb: 1 }}>
            The Problem We’re Solving
          </Typography>
          <Typography variant="body1" sx={{ color: '#143642', fontSize: 17, textAlign: 'justify', lineHeight: 1.7, mb: 3 }}>
            Fashion recommendations often rely on surface-level data, missing the deeper psychological factors that drive personal style. There is a need for systems that can connect visual preferences to personality, enabling more meaningful and accurate recommendations.
          </Typography>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#143642', mb: 1 }}>
            Our Approach
          </Typography>
          <Typography variant="body1" sx={{ color: '#143642', fontSize: 17, textAlign: 'justify', lineHeight: 1.7, mb: 1 }}>
            The core objective of PersonaFit is to predict the dominant personality trait reflected in a user's clothing preferences. Participants selected dress images from a curated collection. Each image was pre-processed to extract features such as <b>color histograms (YCbCr)</b>, <b>Haralick texture (GLCM)</b>, and <b>Canny edge density</b>. These features were used to train and evaluate machine learning models.
          </Typography>
          <Typography variant="body1" sx={{ color: '#143642', fontSize: 17, textAlign: 'justify', lineHeight: 1.7, mb: 3 }}>
            The dataset, derived from Excel input, mapped each image to a personality trait, either by direct labeling or by the highest trait score. To address class imbalance, <b>SMOTE</b> was applied, ensuring balanced representation across all five categories.
          </Typography>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#143642', mb: 1 }}>
            Our Results
          </Typography>
          <Typography variant="body1" sx={{ color: '#143642', fontSize: 17, textAlign: 'justify', lineHeight: 1.7, mb: 3 }}>
            Three supervised classifiers—<b>Random Forest</b>, <b>Support Vector Machine (SVM)</b>, and <b>K-Nearest Neighbors (KNN)</b>—were trained and compared. The Random Forest model achieved the best performance, with an accuracy of approximately <b>53.52%</b>.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#143642', mb: 1 }}>
            Future Directions <Chip label="Upcoming" color="success" size="small" sx={{ ml: 1, fontWeight: 600 }} />
          </Typography>
          <Typography variant="body1" sx={{ color: '#143642', fontSize: 17, textAlign: 'justify', lineHeight: 1.7 }}>
            PersonaFit demonstrates the potential of using image-based preference patterns to infer personality-driven fashion choices. Future work will explore deep learning approaches and larger datasets to further enhance the system’s accuracy and impact.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default About; 