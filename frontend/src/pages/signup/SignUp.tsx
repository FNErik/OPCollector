import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import validateFormData from '../../scripts/validateFormData.ts';
import OPCollectorLogo from '../../components/OPCollectorLogo.tsx';
import Header from '../../components/Header.tsx';
import { User } from '../../types/User.ts';
import getCurrentUser from '../../scripts/getCurrentUser.ts';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        OPCollector
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const theme = createTheme({
  palette: {
    primary: {
      main: '#CC3333', // Cambia este valor al color primario deseado
    },
  },
});

export default function SignUp() {
  const user: User | null = getCurrentUser();
  const [errorVisible, setErrorVisible] = useState({
    firstName: false,
    lastName: false,
    email: false,
    emailExists: false,
    password: false,
  });

  const handleInputChange = () => {
    setErrorVisible({
      firstName: false,
      lastName: false,
      email: false,
      emailExists: false,
      password: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll('input');

    const formValidation = validateFormData(inputs);
    if (!Array.isArray(formValidation)) {
      try {
        const email: string = formValidation['email'].value;
        const password: string = formValidation['password'].value;
        const firstName: string = formValidation['firstName'].value;
        const lastName: string = formValidation['lastName'].value;

        const response = await fetch('http://localhost:4022/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name: firstName, surname: lastName }),
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          // Loguear el usuario creado
        } else {
            setErrorVisible((prev) => ({ ...prev, emailExists: true }));
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      let errorState = {
        firstName: false,
        lastName: false,
        email: false,
        emailExists: false,
        password: false,
      };
      formValidation.forEach((error) => {
        if (error.firstName) errorState.firstName = true;
        if (error.lastName) errorState.lastName = true;
        if (error.email) errorState.email = true;
        if (error.password) errorState.password = true;
      });
      setErrorVisible(errorState);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header user={user} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <OPCollectorLogo />
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleInputChange}
                />
                <h1 id="control-firstName" className={`ml-1 mt-1 text-red-500 ${errorVisible.firstName ? '' : 'hidden'}`}>Can't be empty</h1>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleInputChange}
                />
                <h1 id="control-lastName" className={`ml-1 mt-1 text-red-500 ${errorVisible.lastName ? '' : 'hidden'}`}>Can't be empty</h1>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleInputChange}
                />
                <h1 id="control-email" className={`ml-1 mt-1 text-red-500 ${errorVisible.email ? '' : 'hidden'}`}>Email is invalid</h1>
                <h1 id="control-email-exists" className={`ml-1 mt-1 text-red-500 ${errorVisible.emailExists ? '' : 'hidden'}`}>Email already in use</h1>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInputChange}
                />
                <h1 id="control-password" className={`ml-1 mt-1 text-red-500 ${errorVisible.password ? '' : 'hidden'}`}>Can't be empty</h1>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, pb: 1.5, pt: 1.5 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
