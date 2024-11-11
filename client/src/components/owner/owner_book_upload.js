import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography, IconButton, Autocomplete, Divider, Snackbar, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const OwnerBookUpload = () => {
  const [formData, setFormData] = useState({
    bookTitle: '',
    bookAuthor: '',
    bookPrice: '',
    bookQuantity: '',
    selectedBook: null,
    bookCover: null,
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverUpload = (event) => {
    setFormData((prev) => ({ ...prev, bookCover: event.target.files[0] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { bookCover } = formData;

    // Check if a book cover is selected
    if (!bookCover) {
      setNotificationMessage('Please upload a book cover');
      setShowNotification(true);
      return; // Stop the submission
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', formData.bookTitle);
    formDataToSubmit.append('author', formData.bookAuthor);
    formDataToSubmit.append('price', formData.bookPrice);
    formDataToSubmit.append('quantity', formData.bookQuantity);
    formDataToSubmit.append('catagory', formData.selectedBook);
    formDataToSubmit.append('cover', bookCover);

    const token = localStorage.getItem('token'); // Retrieve the token from storage
    if (!token) {
      console.log('No token found, please log in');
      return;
    }
 
    const response = await fetch(`${window.location.origin}/owner/book/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Include the JWT token
      },
      body: formDataToSubmit,
    });

    if (response.ok) {
      setNotificationMessage('Book uploaded successfully');
      setShowNotification(true);
      // Clear form fields
      setFormData({
        bookTitle: '',
        bookAuthor: '',
        bookPrice: '',
        bookQuantity: '',
        selectedBook: null,
        bookCover: null,
      });
    } else {
      const errorMessage = await response.json();
      setNotificationMessage(errorMessage.message || 'Error uploading book');
      setShowNotification(true);
    }
  };

  const bookOptions = [
    { label: 'Fiction', value: 'Fiction' },
    { label: 'Self Help', value: 'Self Help' },
    { label: 'Business', value: 'Business' },
  ];

  return (
    <Box sx={{ paddingTop: 10, alignItems: 'center', alignContent: 'center', paddingLeft: {xs:1, sm:10, md:20, lg:32} }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginLeft: 1,
          padding: 3,
          border: '3px solid #4B3F72',          // Dark purple/blue for a classic cover
          borderRadius: '4px',                  // Slightly rounded edges
          boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)', // Deeper shadow for depth
          backgroundColor: '#FFF7E6',           // Light cream color for pages
          position: 'relative',
          overflow: 'hidden',
          
          // Spine effect
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '20px',
            height: '100%',
            backgroundColor: '#4B3F72',         // Matching the border color
            borderRight: '3px solid #4B3F72',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)', // Inner shadow for a "spine" look
          },
        }}
      >
        <Typography variant="h5" gutterBottom pb={1}>
          Add a New Book
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs ={12} sm={5.6}>
            <TextField
              label="Book Title"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleChange}
              fullWidth
              sx={{ paddingBottom: 2 }}
              size="small"
              required
            />
            <TextField
              label="Book Author"
              name="bookAuthor"
              value={formData.bookAuthor}
              onChange={handleChange}
              fullWidth
              sx={{ paddingBottom: 2 }}
              size="small"
              required
            />
            <TextField
              label="Book Price"
              type="number"
              name="bookPrice"
              value={formData.bookPrice}
              onChange={handleChange}
              fullWidth
              size="small"
              required
            />
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ ml: 2 }} />
          <Grid item xs={12} sm={5.6}>
            <TextField
              label="Book Quantity"
              type="number"
              name="bookQuantity"
              value={formData.bookQuantity}
              onChange={handleChange}
              fullWidth
              sx={{ paddingBottom: 2 }}
              size="small"
              required
            />
            <Autocomplete
              disablePortal
              id="catagory"
              size="small"
              sx={{ paddingBottom: 2 }}
              required
              value={formData.selectedBook}
              options={bookOptions}
              fullWidth
              isOptionEqualToValue={(option, value) => option.value === value?.value}
              renderInput={(params) => <TextField {...params} label="Book Category" />}
              onInputChange={(event, newInputValue) => {
                setFormData((prev) => ({ ...prev, selectedBook: newInputValue }));
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <input
                accept="image/*"
                id="book-cover-upload"
                name="cover"
                type="file"
                onChange={handleCoverUpload}
                style={{ display: 'none' }}
              />
              <Box
                sx={{
                  border: 1,
                  width: '100%',
                  borderColor: '#ccc',
                  borderRadius: 2,
                }}
              >
                <label htmlFor="book-cover-upload">
                  <IconButton
                    component="span"
                    size="small"
                    color="primary"
                  >
                    <CloudUploadIcon />
                    {formData.bookCover ? formData.bookCover.name : ' Upload Book Cover'}
                  </IconButton>
                </label>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={() => setShowNotification(false)}
          severity={notificationMessage.includes('Book uploaded successfully') ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};