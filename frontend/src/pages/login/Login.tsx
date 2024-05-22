import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import validateFormData from '../../scripts/validateFormData.ts';
import ImageCarousel from '../../components/ImageCarrousel.tsx';
import OPCollectorLogo from '../../components/OPCollectorLogo.tsx';
import { useNavigate } from 'react-router-dom';

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

const theme = createTheme({
  palette: {
    primary: {
      main: '#CC3333',
    },
  },
});

export default function Login() {
  const navigate = useNavigate();
  const [errorVisible, setErrorVisible] = useState(false);

  const handleInputChange = () => {
    setErrorVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll('input');
    const formValidation = validateFormData(inputs);
    if (!Array.isArray(formValidation)) {
      try {
        const email = formValidation['email'].value;
        const password = formValidation['password'].value;

        const response = await fetch('http://localhost:4022/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, pass: password }),
        });
        const user = await response.json();
        if (response.ok) {
          console.log("Logged correctly");
          console.log(user);
          if (!user.isDeleted) {
            localStorage.setItem("user", JSON.stringify(user));
            const storedUser = localStorage.getItem("user");
            if (storedUser !== null) {
              const user = JSON.parse(storedUser);
              console.log(user);
              navigate("/my-collection");
            } else {
              console.error("No se encontraron datos de usuario en el almacenamiento local");
            }
          }
        } else {
          console.log("mala");
        }
      } catch (err) {
        setErrorVisible(true);
        console.error(err.message);
      }
    } else {
      setErrorVisible(true);
      console.error(formValidation);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <ImageCarousel />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              mt: 14,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <OPCollectorLogo />
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                style={{ marginBottom: "1rem" }}
                onChange={handleInputChange}
              />
              <h1 id="control" className={`ml-1 text-red-500 ${errorVisible ? '' : 'invisible'}`}> Invalid credentials </h1>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, pb: 1, pt: 1 }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}