import { Routes, Route } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import Header from './component/layout/Header';
import Main from './component/layout/Main';
import SearchCountries from './pages/SearchCountries';

import './App.css'

function App() {

  return (
    <>
      <ThemeProvider>
        <Header />

        <Main>
          <Routes>
            <Route path='/' element={<SearchCountries />} exact />

            {/* <Route path='/country'>
              <Country />
            </Route> */}
          </Routes>
        </Main>

        {/* <Attribution/> */}

      </ThemeProvider>
    </>
  )
}

export default App
