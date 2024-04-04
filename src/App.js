import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Home from './pages/Home';
import Preview from './pages/Preview';
import Editor from './pages/Editor';
import Camera from './pages/Camera';
import Selection from './pages/Selection';


const theme = createTheme({
  palette: {
    primary: {
      main: '#ef1632'
    },
    secondary: {
      main: '#ff1c39'
    }
  },

  typography: {
    fontFamily: 'Helvetica Mid',
    fontWeightLight: 200,
    fontWeightRegular: 400,
    fontWeightBold: 800,
    fontSize: 20
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home title={"Selfie Generator"} />} />
          <Route exact path='/camera' element={<Camera title={"Selfie Generator"} />} />
          <Route exact path='/selection' element={<Selection title={"Selfie Generator"} />} />
          <Route exact path='/preview' element={<Preview title={"Preview | Selfie Generator"} />} />
          <Route exact path='/editor/:id' element={<Editor title={"Editor | Selfie Generator"} />} />
          <Route exact path='/editor/' element={<Editor title={"Editor | Selfie Generator"} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
