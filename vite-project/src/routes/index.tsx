import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/login';
import { Home } from '../pages/home';

export function AppRoutes (){
  return (
    <Routes>
      <Route path="/login"
        element={<Login/>}>
      </Route>
    
    <Route path="/home"
      element={<Home/>}>
    </Route>
  </Routes>
  );
}