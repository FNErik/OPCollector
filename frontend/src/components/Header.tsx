import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { User } from '../types/User';

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

interface HeaderProps {
  user: User | null; // Definición de la prop user, que puede ser User o null
}

function Header({ user }: HeaderProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#CC3333', // Cambia este valor al color primario deseado
      },
    },
  });

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: `0 0 1px rgba(2, 31, 59, 0.2), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.3), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.3)`,
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <img
                src={
                  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                }
                style={logoStyle}
                alt="logo of opcollector"
              />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Link to="/collections" style={{ textDecoration: 'none', color: 'inherit', marginLeft: '1rem', marginRight: '1rem'}}>
                  <Typography variant="body2" color="text.primary">
                    Collections
                  </Typography>
                </Link>
                <Link to="/browse-cards" style={{ textDecoration: 'none', color: 'inherit', marginLeft: '1rem', marginRight: '1rem' }}>
                  <Typography variant="body2" color="text.primary">
                    Browse cards
                  </Typography>
                </Link>
                <Link to="/my-collection" style={{ textDecoration: 'none', color: 'inherit', marginLeft: '1rem', marginRight: '1rem' }}>
                  <Typography variant="body2" color="text.primary">
                    My collection
                  </Typography>
                </Link>
                <Link to="/deck-builder" style={{ textDecoration: 'none', color: 'inherit', marginLeft: '1rem', marginRight: '1rem' }}>
                  <Typography variant="body2" color="text.primary">
                    Deck builder
                  </Typography>
                </Link>
                {/* <MenuItem
                  onClick={() => ('faq')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    FAQ
                  </Typography>
                </MenuItem> */}
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            > 
              {
                user === null ? (
                <React.Fragment>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component="a"
                    href="/login"
                  >
                    Log in
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    component="a"
                    href="/signup"
                  >
                    Sign up
                  </Button>
                </React.Fragment>
              ) : (
                
                <React.Fragment>
                  <p className=' text-gray-700 mr-5'>
                    {user?.name + " " + user?.surname}
                  </p>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </React.Fragment>
              )
            }
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      flexGrow: 1,
                    }}
                  >
                  
                  <Link to="/collections" style={{ textDecoration: 'none', color: 'inherit', marginLeft: '1.2rem', marginBottom: '1rem' }}>
                    Collections
                  </Link>
                  <Link to="/browse-cards" style={{ textDecoration: 'none', color: 'inherit', marginLeft: '1.2rem', marginBottom: '1rem' }}>
                    Browse cards
                  </Link>
                  <Link to="/my-collection" style={{ textDecoration: 'none', color: 'inherit', marginLeft: '1.2rem', marginBottom: '1rem' }}>
                    My collection
                  </Link>
                  <Link to="/deck-builder" style={{ textDecoration: 'none', color: 'inherit', marginLeft: '1.2rem', marginBottom: '1rem' }}>
                    Deck builder
                  </Link>
                  {/* <Link to="/collections" style={{ textDecoration: 'none', color: 'inherit', marginLeft: '1.2rem', marginBottom: '1rem' }}>
                    FAQ
                  </Link> */}
                  <Divider />
                  {
                  user === null ? (
                  <React.Fragment>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="contained"
                        component="a"
                        href="/signup"
                        sx={{ width: '100%' }}
                      >
                        Sign up
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="outlined"
                        component="a"
                        href="/login"
                        sx={{ width: '100%' }}
                      >
                        Log in
                      </Button>
                    </MenuItem>
                  </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <p className=' text-2xl text-gray-700 ml-5 my-5'>
                        {user?.name + " " + user?.surname}
                      </p>
                      <MenuItem>
                      <Button
                        color="primary"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        onClick={handleLogout}
                      >
                        Log out
                      </Button>
                    </MenuItem>
                    </React.Fragment>
                  )
                }
                  </Box>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;