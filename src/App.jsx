
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login"
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import UserList from './pages/UserList';

function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path= "/" element = {<Login />} />
        <Route path= "/dashboard" element = {<Dashboard />} />
        <Route path= "/register" element = {<Register />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  )
  
}

export default App
