import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/signin'
import SignUp from './pages/signup'
import Home from './pages/home';
import Car from './components/car';
import CollapsibleTable from './components/expense/table';
import { UserContext } from './client/UserContext';
import { useState } from 'react';
import Settings from './components/settings';

function App() {
  const [categoryId, setCategoryId] = useState('');

  const setId = id => {
    setCategoryId(id);
  }

  const getId = () => {
    return categoryId;
  }
  return (
    <UserContext.Provider value={{setId, getId}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn />} exact />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Home />}>
            <Route path='car' element={<Car />} />
            <Route path='table' element={<CollapsibleTable />} />
            <Route path='settings' element={<Settings/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
