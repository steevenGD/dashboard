import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box id="footer" sx={{ backgroundColor: '#212121', color: '#eee', py: 4 }}>

          <Typography 
          variant="body2" 
          sx={{ 
            fontFamily: 'Titillium Web, sans-serif', 
            fontSize: '1.1rem',
            '&:hover': { color: '#fece00' },
            transition: 'all 300ms'
          }}
          >
            Ecuador Weather {new Date().getFullYear()} Steeven Gomez Dunkley.
          </Typography>

    </Box>
  );
};

export default Footer;