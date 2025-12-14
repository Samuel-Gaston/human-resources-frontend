import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Sites from './pages/Sites.tsx';
import User from './pages/User.tsx';
import Department from './pages/Department.tsx';
import Position from './pages/Position.tsx';
import Salary from './pages/Salary.tsx';
import Personnel from './pages/Personnel.tsx';
import Fine from './pages/Fine.tsx';
import FineType from './pages/Fine-Types.tsx';
import Leave from './pages/Leave.tsx';
import LeaveType from './pages/Leave-Types.tsx';
import CNPS from './pages/CNPS.tsx';
import Contract from './pages/Contract.tsx';
import ContractType from './pages/Contract-Types.tsx';
import axios from 'axios';
axios.defaults.withCredentials=true;
axios.defaults.baseURL="http://localhost:5000";
function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />} />
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/user' element={<User />} />
      <Route path='/site' element={<Sites />} />
      <Route path='/department' element={<Department />} />
      <Route path='/position' element={<Position />} />
      <Route path='/salary' element={<Salary />} />
      <Route path='/personnel' element={<Personnel />} />
      <Route path='/fine' element={<Fine />} />
      <Route path='/fine-type' element={<FineType />} />
      <Route path='/leave' element={<Leave />} />
      <Route path='/leave-type' element={<LeaveType />} />
      <Route path='/cnps' element={<CNPS />} />
      <Route path='/contract' element={<Contract />} />
      <Route path='/contract-type' element={<ContractType />} />
    </Routes>
    </BrowserRouter>
</>
  )
}

export default App
