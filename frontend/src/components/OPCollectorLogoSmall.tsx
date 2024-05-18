import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
//@ts-ignore
import tcgLogo from '../images/icons/logo.png';
import './css/OPCollectorLogo.css';

const OPCollectorLogo = () => {
    const navigate = useNavigate();

    const redirectToHome = () => {
        navigate('/');
    };

    return (
        <div onClick={redirectToHome} style={{ cursor: 'pointer' }}>
            <Grid container justifyContent="center" alignItems="center" spacing={1}>
                <Grid item>
                    <div className='logoWrapper small'>
                        <img src={tcgLogo} alt="Icono" />
                    </div>
                </Grid>
                <Grid item>
                    <Typography component="h1" variant="h6" className='headerText'>
                        OPCollector
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}

export default OPCollectorLogo;
