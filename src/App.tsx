import './App.css';

import { Helmet } from 'react-helmet';

import { ThemeProvider } from './context/ThemeProvider';
import AppRouter from './routes';

function App() {
  return (
    <ThemeProvider>
      <Helmet>{/* You can put your head elements here */}</Helmet>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
