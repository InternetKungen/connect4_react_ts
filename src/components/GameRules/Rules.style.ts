import { SxProps, Theme } from '@mui/material';
import { shadowStyle } from '../../utils/Style';

export const rulesRootStyles: SxProps<Theme> = (theme) => ({
  ...shadowStyle(theme),
  position: 'relative',
  mx: 'auto', // Center horizontally
  my: 'auto', // Center vertically if parent has set height
  backgroundColor: '#FFFFFF', // Background color on rules board
  padding: '3.4rem 2rem',
  [theme.breakpoints.up('sm')]: {
    padding: '3.4rem',
  },
  borderRadius: '4rem',
  maxWidth: '480px', // Restrict width for centering
  display: 'flex', // Use flexbox to align content
  flexDirection: 'column',
  alignItems: 'center', // Center content horizontally
  justifyContent: 'center', // Center content vertically
  
  mt: '10vh', // Adjust this value to move the component down the page
  
  '.ruleBlock': {
    mt: '3rem',
  },

  h2: {
    textAlign: 'center',
      color:'#black'
  },

  h3: {
    my: '1.6rem',
    color:'#0059ff'
  },

  '& p': {
    opacity: 0.8,
  },

  ol: {
    listStyleType: 'none',
    p: 0,
    li: {
      display: 'flex',
      counterIncrement: 'my-awesome-counter',
      mb: '1rem',
      '&:before': {
        content: 'counter(my-awesome-counter)',
        mr: '2rem',
        width: '1rem',
        fontWeight: 700,
      },

      span: {
        opacity: 0.8,
      },
    },
  },

  '& + .button-container': {
    display: 'flex',
    justifyContent: 'center',
    mt: '-4rem',

    '& .icon-button:hover circle': {
      '&:nth-of-type(1), &:nth-of-type(2)': {
        fill: theme.palette.primary.main,
      },
    },
  },
});
