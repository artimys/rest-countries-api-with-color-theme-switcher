import { Routes, Route } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import Header from './component/layout/Header';
import Main from './component/layout/Main';

import './App.css'

function App() {

  return (
    <>
      <ThemeProvider>
        <Header />

        <Main>
          <Routes>
            <Route path='/' element={<h1>Heading</h1>} exact />
              {/* <AllCountries /> */}
            {/* </Route> */}

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
