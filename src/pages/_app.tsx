import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@emotion/react'
import { Provider } from 'react-redux'
import store from '../store'

export const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
    h2: {
      fontFamily: 'Pacifico',
    },
    h4: {
      fontFamily: 'Pacifico',
    },
    h5: {
      fontFamily: 'Pacifico',
    },
    h6: {
      fontFamily: 'Pacifico',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          '&.MuiButton-containedPrimary': {
            backgroundColor: '#76c893',
            color: '#fff',
          },
          '&:hover': {
            opacity:0.8,
          },
          '&[disabled]': {
            backgroundColor: '#ced4da',
            color: '#adb5bd',
          },
        },
      },
    },
   
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#76c893',
    },
    secondary: {
      main: '#6c757d',
      light: '#76c893',
      dark: '#76c893',
    },
    text: {
      primary: '#6c757d',
      secondary: '#76c893',
      
    },
    background: {
      default: '#f8f9fa',
    },
    error: {
      main: '#e01e37',
    },
    warning: {
      main: '#ffa200',
    },
    info: {
      main: '#00a2ff',
    },
    success: {
      main: '#008000',
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
