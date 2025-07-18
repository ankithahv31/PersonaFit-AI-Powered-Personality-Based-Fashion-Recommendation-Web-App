import React from 'react';
import { Container, Typography, Card, CardContent, Box, Button, LinearProgress, Alert, Snackbar, Grid, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import { useState, useRef, useEffect } from 'react';

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showInvalid, setShowInvalid] = useState(false);
  const [showNoImages, setShowNoImages] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingTotal, setProcessingTotal] = useState(0);
  const [processing, setProcessing] = useState(false);
  const jobIdRef = useRef(null);

  const MAX_IMAGES = 1000;

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > MAX_IMAGES) {
      alert(`You can only upload up to ${MAX_IMAGES} images at a time.`);
      e.target.value = '';
      setFiles([]);
      return;
    }
    setFiles(selectedFiles);
    setDownloadUrl('');
    setError('');
    setProcessingProgress(0);
    setProcessingTotal(0);
    setProcessing(false);
    jobIdRef.current = null;
  };

  const isImageFile = (file) => {
    return /\.(jpg|jpeg|png|bmp|gif)$/i.test(file.name);
  };

  const pollProcessingProgress = (jobId) => {
    setProcessing(true);
    const poll = () => {
      fetch(`http://localhost:8000/progress/${jobId}`)
        .then(res => res.json())
        .then(data => {
          setProcessingProgress(data.processed);
          setProcessingTotal(data.total);
          if (data.done) {
            setProcessing(false);
            // Fetch the result zip
            fetch(`http://localhost:8000/result/${jobId}`)
              .then(res => {
                if (!res.ok) throw new Error('Failed to fetch result');
                return res.blob();
              })
              .then(blob => {
                const url = window.URL.createObjectURL(blob);
                setDownloadUrl(url);
              })
              .catch(() => setError('Failed to fetch result.'));
          } else {
            setTimeout(poll, 1000);
          }
        })
        .catch(() => {
          setProcessing(false);
          setError('Failed to get processing progress.');
        });
    };
    poll();
  };

  const handleSubmit = (e) => {
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
    setUploadProgress(0);
    setProcessingProgress(0);
    setProcessingTotal(imageFiles.length);
    setProcessing(false);
    jobIdRef.current = null;

    const formData = new FormData();
    imageFiles.forEach((file) => formData.append('files', file));

    const xhr = new window.XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/classify-images/', true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percent);
      }
    };

    xhr.onload = function () {
      setLoading(false);
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          const jobId = response.job_id;
          jobIdRef.current = jobId;
          pollProcessingProgress(jobId);
        } catch {
          setError('Unexpected response from server.');
        }
      } else {
        setError('Failed to process images');
      }
    };

    xhr.onerror = function () {
      setLoading(false);
      setError('Error occurred');
    };

    xhr.responseType = 'text';
    xhr.send(formData);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #f5f7fa 60%, #e3eafc 100%)', py: 6 }}>
      <Container maxWidth="md">
        <Paper elevation={6} sx={{ p: { xs: 2, sm: 4, md: 6 }, borderRadius: 5, boxShadow: '0 8px 32px rgba(33,147,176,0.10)', mb: 4, border: '3px solid #111' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#143642', mb: 1, letterSpacing: 1, textAlign: 'center' }}>
            Dashboard
          </Typography>
          <Typography variant="h6" sx={{ color: '#385170', mb: 4, textAlign: 'center', fontWeight: 400 }}>
            Upload your dress images and get AI-powered personality classification results instantly.
          </Typography>
          <Grid container spacing={4} direction="column">
            {/* Upload Area */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f7fa' }}>
                <CloudUploadIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#143642' }}>
                  Upload Images
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    sx={{ mb: 2, fontWeight: 600, color: '#111', bgcolor: '#fff', borderColor: '#111', '&:hover': { bgcolor: '#f5f5f5', borderColor: '#111' } }}
                  >
                    Select Folder
                    <input
                      type="file"
                      multiple
                      webkitdirectory="true"
                      directory="true"
                      onChange={handleFileChange}
                      hidden
                    />
                  </Button>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1, fontSize: 14 }}>
                    Please select a <b>folder</b> containing dress images for personality classification.<br />
                    <b>You can upload up to 1,000 images at a time.</b>
                  </Typography>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2, py: 1.2, fontSize: '1.1rem', width: '100%', fontWeight: 700, bgcolor: '#111', color: '#fff', '&:hover': { bgcolor: '#222' } }}
                    disabled={loading || processing}
                  >
                    Submit
                  </Button>
                </form>
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
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
              </Paper>
            </Grid>
            {/* Progress & Result Area */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f7fa' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#143642' }}>
                  Progress & Results
                </Typography>
                {loading && (
                  <Box width="100%" mt={2}>
                    <LinearProgress variant="determinate" value={uploadProgress} />
                    <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                      {uploadProgress}% uploaded
                    </Typography>
                  </Box>
                )}
                {processing && (
                  <Box width="100%" mt={2}>
                    <LinearProgress variant="determinate" value={processingTotal ? (processingProgress / processingTotal) * 100 : 0} />
                    <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                      Processing: {processingProgress} / {processingTotal} images
                    </Typography>
                  </Box>
                )}
                {downloadUrl && !processing && !loading && (
                  <Box width="100%" mt={3} display="flex" flexDirection="column" alignItems="center">
                    <Alert severity="success" sx={{ mb: 2, width: '100%' }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#143642' }}>
                        Success! Your images have been processed.
                      </Typography>
                    </Alert>
                    <Button
                      href={downloadUrl}
                      download="categorized_images.zip"
                      variant="contained"
                      sx={{ width: '100%', fontWeight: 700, bgcolor: '#111', color: '#fff', '&:hover': { bgcolor: '#222' } }}
                      startIcon={<DownloadIcon />}
                    >
                      Download Result
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default Dashboard; 