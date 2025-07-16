import React from 'react';
import { Container, Typography, Card, CardContent, Box, Button, LinearProgress, Alert, Snackbar } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showInvalid, setShowInvalid] = useState(false);
  const [showNoImages, setShowNoImages] = useState(false);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
    setDownloadUrl('');
    setError('');
  };

  const isImageFile = (file) => {
    return /\.(jpg|jpeg|png|bmp|gif)$/i.test(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setShowHint(true);
      return;
    }
    // Validate all files are images
    const imageFiles = files.filter(isImageFile);
    if (imageFiles.length === 0) {
      setShowNoImages(true);
      return;
    }
    if (imageFiles.length !== files.length) {
      setShowInvalid(true);
      return;
    }
    setLoading(true);
    setError('');
    setDownloadUrl('');
    try {
      const formData = new FormData();
      imageFiles.forEach((file) => formData.append('files', file));
    const API_URL = process.env.REACT_APP_API_URL;
const res = await fetch(`${API_URL}/classify-images/`, {
  method: 'POST',
  body: formData,
});
      if (!res.ok) throw new Error('Failed to process images');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError(err.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: { xs: 4, md: 8 }, px: { xs: 1, sm: 0 } }}>
      <Card elevation={4}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="300px">
            <CloudUploadIcon color="primary" sx={{ fontSize: { xs: 40, sm: 60 }, mb: 2 }} />
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 600, fontSize: { xs: '1.3rem', sm: '2rem' } }}>
              Dashboard
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center', marginTop: 24 }}>
              <input
                type="file"
                multiple
                webkitdirectory="true"
                directory="true"
                onChange={handleFileChange}
                style={{ marginBottom: 8, width: '100%' }}
              />
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1, fontSize: { xs: 12, sm: 14 } }}>
                Please select a <b>folder</b> containing dress images for personality classification.
              </Typography>
              <br />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ mt: 2, py: 1.2, fontSize: { xs: '1rem', sm: '1.1rem' }, width: { xs: '100%', sm: 'auto' } }}
              >
                Submit
              </Button>
            </form>
            <Snackbar
              open={showHint}
              autoHideDuration={3000}
              onClose={() => setShowHint(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              message="Please select a folder of images before submitting."
            />
            <Snackbar
              open={showInvalid}
              autoHideDuration={4000}
              onClose={() => setShowInvalid(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              message="Please select a folder containing only image files (jpg, jpeg, png, bmp, gif)."
            />
            <Snackbar
              open={showNoImages}
              autoHideDuration={4000}
              onClose={() => setShowNoImages(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              message="No valid images found in the selected folder."
            />
            {loading && <Box width="100%" mt={2}><LinearProgress /></Box>}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {downloadUrl && (
              <Button
                href={downloadUrl}
                download="categorized_images.zip"
                variant="outlined"
                color="success"
                startIcon={<DownloadIcon />}
                sx={{ mt: 2, width: { xs: '100%', sm: 'auto' } }}
              >
                Download Result
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Dashboard; 
