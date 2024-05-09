import React, { useState, useEffect } from 'react';
import { Grid, Fade } from '@mui/material';

// @ts-ignore
import carrousel1 from '../images/carrousel/carrousel1.jpg'
// @ts-ignore
import carrousel2 from '../images/carrousel/carrousel2.jpg'
// @ts-ignore
import carrousel3 from '../images/carrousel/carrousel3.jpg_large'

const images = [
  carrousel1,
  carrousel2,
  carrousel3,
  // Agrega más imágenes según sea necesario
];

const intervalTime = 15000;

const ImageCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, intervalTime); // Cambia de imagen cada 15 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        display: 'grid',
        placeItems: 'center', 
      }}
    >
      {images.map((imageUrl, idx) => (
        <Fade key={idx} in={idx === index} timeout={1000}>
          <img
            src={imageUrl}
            alt={`imagen-${idx}`}
            style={{
              height: '110%',
              objectFit: 'cover',
              position: 'absolute',
              transition: 'opacity 1s ease-in-out',
              opacity: idx === index ? 1 : 0,
            }}
          />
        </Fade>
      ))}
    </Grid>
  );
};

export default ImageCarousel;
