
import './App.css'
import Login from './Pages/Login/Login'
import NotFound from './Pages/NotFound/NotFound';
import Register from './Pages/Register/Register'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Pages/DashBoard/Dashboard';


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard size={length}/>} />
          <Route exactpath="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
