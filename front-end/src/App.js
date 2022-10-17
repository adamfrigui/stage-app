import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List'
import New from './pages/new/New'
import Single from './pages/single/Single'
import Conge from './pages/Conge/Conge'
import Unauth from './pages/error/Unauth'
import './App.css'
import './style/Dark.scss'
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import Profile from './pages/profile/Profile';
import PrivateRoutes from './routing/PrivateRoutes';
import AdminRoutes from './routing/AdminRoutes'
import NotFound from './pages/error/NotFound';
import Accepted from './pages/Accepted/Accepted';
import ListeConge from './pages/notification/ListeConge';
import CongeAcc from './pages/CongeAccepte/CongeAcc';
import CongeRefuse from './pages/CongeRefuse/CongeRefuse';


function App() {
  const { darkMode } = useContext(DarkModeContext)
  return (
    <div className={darkMode ? "App dark" : "App"}>
      <BrowserRouter>
        <Routes>
          <Route element={<AdminRoutes />}>
            <Route path='/users'>
              <Route index element={<List />} />
              <Route path=':userid' element={<Single />} />
              <Route path='new' element={<New title="Add New User" />} />
            </Route>
            <Route path='/ListeConge' element={<ListeConge />} />
            <Route path='/manageaccept' element={<Accepted />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path='/'>
              <Route index element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/conge" element={<Conge />} />
              <Route path='/Congeaccept' element={<CongeAcc/>} />
              <Route path='/CongeRefuse' element={<CongeRefuse/>} />
            </Route>
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/unauthorized' element={<Unauth />} />
          <Route path='*' element={<NotFound />} />
          
          
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
