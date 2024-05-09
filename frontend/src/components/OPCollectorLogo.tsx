import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
//@ts-ignore
import tcgLogo from '../images/icons/tcglogo.webp';
import './css/OPCollectorLogo.css';

const OPCollectorLogo = () => {
    return (
        <Grid container flexDirection="column" justifyContent="center" alignItems="center" spacing={1}>
            <Grid item>
                <div className='logoWrapper'>
                    <img src={tcgLogo} alt="Icono" />
                </div>
            </Grid>
            <Grid item>
                <Typography component="h1" variant="h4">
                    OPCollector
                </Typography>
            </Grid>
        </Grid>
      );
    }

export default OPCollectorLogo;