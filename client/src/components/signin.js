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
          <Typography component="h1" variant="h5" sx={{ fontfontFamily: 'serif', color: '#4B3F72' }}>
            Sign in
          </Typography>
          <Divider sx={{ borderColor: '#4B3F72' }} />

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
          <Button type="submit" 
            sx={{
              bgcolor:'#1974D2', 
              paddingLeft:3,
              paddingRight:3,
              borderRadius:1,
              color:'white',
              textTransform: 'none',
              '&:hover': {
                      bgcolor: '#1974D2',
                      opacity: 0.9,
                    },}}>
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