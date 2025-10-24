import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(25, 118, 210)', // Blue primary color
    },
    secondary: {
      main: '#ffffff', // White for contrast
    },
    background: {
      default: '#1e1e1e', // Dark background
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff', // White text for high contrast
      secondary: '#cccccc', // Muted white for secondary text
      error: '#ff5252', // Bright red for error text
    },
    error: {
      main: '#ff5252', // Define error color in the palette
    },
  },
  typography: {
    fontFamily: ["Nunito Sans", "Roboto"].join(","),
    h3: {
      fontWeight: 700, // Bold headers
      color: 'rgb(25, 118, 210)', // Blue for headers
    },
    body1: {
      color: '#cccccc', // Softer white for body text
    },
    errorText: {
      color: '#ff5252', // Error text style
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff', // White text on buttons
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundColor: 'rgb(25, 118, 210)', // Blue button color
          },
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            backgroundColor: '#333333', // Dark grey for secondary button
          },
        },
      ],
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'rgb(25, 118, 210)', // Set links to primary color
          '&:hover': {
            textDecoration: 'underline', // Underline on hover
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // Removes the default shadow
          backgroundImage: 'none', // Removes the default overlay gradient
        },
      },
    },
  },
});

export default theme;
