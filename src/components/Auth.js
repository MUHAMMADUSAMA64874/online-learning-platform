import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('User signed up successfully');
      setError('');
    } catch (error) {
      setMessage('');
      setError(`Error signing up: ${error.message}`);
    }
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('User logged in successfully');
      setError('');
      navigate('/courses'); // Redirect to courses page
    } catch (error) {
      setMessage('');
      setError(`Error logging in: ${error.message}`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Login / Sign Up
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleSignUp}>
        Sign Up
      </Button>
      <Button variant="contained" color="secondary" fullWidth onClick={handleLogin} style={{ marginTop: '1em' }}>
        Login
      </Button>
      {message && <Alert severity="success" style={{ marginTop: '1em' }}>{message}</Alert>}
      {error && <Alert severity="error" style={{ marginTop: '1em' }}>{error}</Alert>}
    </Container>
  );
};

export default Auth;
