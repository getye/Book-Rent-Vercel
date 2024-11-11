import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert, Grid, Box, Typography, TextField, Button, Link, FormControlLabel, Checkbox, Divider } from '@mui/material';

export const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const formdata = { password: password, user_email: email };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${window.location.origin}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });

      const responseData = await response.json();

      if (response.ok) {
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('userRole', responseData.user_type);

        if (responseData.user_type === "Renter") {
          navigate('/renter/dashboard');
        } else if (responseData.user_type === "Owner") {
          navigate('/owner/dashboard');
        } else {
          navigate('/admin/dashboard');
        }

        console.log('Successfully signed in as ' + responseData.user_type);
      } else {
        // Handle error response
        setNotificationMessage('Wrong email or password'); // Set the error message
        setShowNotification(true); // Show the notification
        console.log('Error:', response.status);
      }
    } catch (error) {
      // Handle fetch error
      setNotificationMessage('An error occurred. Please try again.'); // Set a generic error message
      setShowNotification(true); // Show the notification
      console.log('Error:', error);
    }
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit}>
      <Grid container sx={{ paddingTop: 10, width: {xs:'98%', sm:'50%'}, paddingLeft: {xs:0, sm:34} }}>
        <Box
          sx={{
            marginLeft: 1,
            padding: 3,
            border: '2px solid #A52A2A', // Dark brown border
            borderRadius: '8px',          // Rounded edges to resemble a book's binding
            boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', // Slight shadow for depth
            backgroundColor: '#FAF0E6',    // Light tan color for a classic book feel
          }}
          >
          <Typography component="h1" variant="h5" sx={{ fontFamily: 'serif' }}>
            Sign in
          </Typography>
          <Divider sx={{ borderColor: '#A52A2A' }} />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            size="small"
            label="Email Address"
            name="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            size="small"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 1 }}>
            Sign In
          </Button>
          <Grid>
            <Link href="/forgot">Forgot password?</Link>
          </Grid>
          <Grid className="footer">
            <Typography component="h5">
              Don't have an account? <Link href="/signup">Sign Up</Link>
            </Typography>
          </Grid>
        </Box>

      </Grid>

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
          severity={notificationMessage.includes('successfully') ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};