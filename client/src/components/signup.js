import React, { useState } from 'react';
import { z } from 'zod';
import Axios from 'axios';
import {
  Grid, Box, Typography, TextField, Button, Snackbar, Alert,
  FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Autocomplete, Divider,
  Link
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const usertypes = [
  { label: 'Renter', value: 'Renter' },
  { label: 'Owner', value: 'Owner' },
];

const signupSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z.string().min(8, 'Confirm Password must be at least 8 characters long'),
  location: z.string().min(1, 'Location is required'),
  user_type: z.string().nonempty('User type is required'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
});

export const Signup = () => {
  const initialFormValues = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    location: '',
    user_type: '',
  };
  const [formValues, setFormValues] = useState(initialFormValues)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const [errors, setErrors] = useState({}); // To hold validation errors

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirm = () => setShowConfirm((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseDownConfirm = (event) => event.preventDefault();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    // Clear error if the field is now valid
    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined, // Clear the specific error for this field
      }));
  }
  };

  const handleUserTypeChange = (event, newValue) => {
    setFormValues({
      ...formValues,
      user_type: newValue ? newValue.value : '',
    });

    // Clear error for user_type
    if (newValue) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        user_type: undefined,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Validate the form values with Zod
      signupSchema.parse(formValues);
      
      // If validation passes, proceed with the signup
      const response = await Axios.post(`${window.location.origin}/user/signup`, formValues);
      console.log("Message:", response.data.message)
      if (response.status === 201) {
        setNotificationMessage('Successfully registered');
        setShowNotification(true);
        setFormValues(initialFormValues); // Clear the form
      } else {
        setNotificationMessage('Error in signup');
        setShowNotification(true);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = err.flatten().fieldErrors;
        setErrors(formattedErrors);
      } else if (err.response) {
        // If the error is an Axios error with a response
        const errorMessage = err.response.data.message; // Adjust based on server response structure
        setNotificationMessage(errorMessage);
        setShowNotification(true);
      } else {
        // Handle other errors (like network errors)
        setNotificationMessage('An unexpected error occurred');
        setShowNotification(true);
        console.error(err);
      }
    }
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit}>
      <Grid container sx={{ paddingTop: 10, width: {xs:'98%', sm:'60%'}, paddingLeft: {xs:0, sm:34} }}>
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
            
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Divider sx={{ borderColor: '#4B3F72' }}/>
            <TextField
              size="small"
              margin="normal"
              fullWidth
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              label="Email"
              required
              error={Boolean(errors.email)}
              helperText={errors.email?.[0]}
            />
            <TextField
              size="small"
              margin="normal"
              fullWidth
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              label="User name"
              required
              error={Boolean(errors.name)}
              helperText={errors.name?.[0]}
            />
            <FormControl 
              size='small'
              margin="normal"
              fullWidth
              variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formValues.password}
                onChange={handleChange}
                required
                autoComplete='off'
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                error={Boolean(errors.password)}
              />
              {errors.password && <Typography color="error">{errors.password?.[0]}</Typography>}
            </FormControl>
            <FormControl 
              size='small'
              margin="normal"
              fullWidth
              variant="outlined"
              >
              <InputLabel htmlFor="outlined-adornment-confirm">Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm"
                type={showConfirm ? 'text' : 'password'}
                margin="normal"
                fullWidth
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                required
                autoComplete='off'
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirm}
                      onMouseDown={handleMouseDownConfirm}
                      edge="end"
                    >
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
                error={Boolean(errors.confirmPassword)}
              />
              {errors.confirmPassword && <Typography color="error">{errors.confirmPassword?.[0]}</Typography>}
            </FormControl>
            <TextField
              size="small"
              margin="normal"
              fullWidth
              type="text"
              name="location"
              value={formValues.location}
              label="Location"
              required
              onChange={handleChange}
              error={Boolean(errors.location)}
              helperText={errors.location?.[0]}
            />
            <Autocomplete
              disablePortal
              id="usertype"
              size='small'
              margin="normal"
              fullWidth
              required
              options={usertypes}
              renderInput={(params) => <TextField {...params} label="User type" />}
              onChange={handleUserTypeChange}
              getOptionLabel={(option) => option.label}
              error={Boolean(errors.user_type)}
            />
            {errors.user_type && <Typography color="error">{errors.user_type?.[0]}</Typography>}
            <Divider />
            <Box
                sx={{
                  display: 'flex',                  // Set the Box as a flex container
                  justifyContent: 'center',          // Centers the button horizontally
                  alignItems: 'center',              // Centers the button vertically (optional)
                  width: '100%',      
                  marginTop:1,               
                }}
              >
                <Button
                  type="submit"
                  sx={{
                    bgcolor: '#1974D2',
                    paddingLeft: 3,
                    paddingRight: 3,
                    borderRadius: 1,
                    color: 'white',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#1974D2',
                      opacity: 0.9,
                    },
                  }}
                >
                  Sign up
                </Button>
              </Box>

            <Typography component="h5">
              Have an account? <Link href="/signin">Sign in</Link>
            </Typography>
          </Box>
      </Grid>

      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{
          vertical: 'top', // Position at the top
          horizontal: 'right', // Position on the right
        }}
      >
        <Alert
          onClose={() => setShowNotification(false)}
          severity={notificationMessage.includes('Successfully registered') ? 
              'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};