/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import Users from './Users'
import Payroll from './Payroll'
import UpdateUserPayroll from './UpdateUserPayroll'

import Home from "./components/Home";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";

function App() {
  return (
    <Router>
      <ConditionalHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path='/coach' element={<Users />}></Route>
        <Route path='/payroll' element={<Payroll />}></Route>
        <Route path='/create' element={<CreateUser />}></Route>
        <Route path='/update/:id' element={<UpdateUser />}></Route>
        <Route path='/updatePayroll/:id' element={<UpdateUserPayroll />}></Route>
      </Routes>
    </Router>
  );
}

function ConditionalHeader() {
  const location = useLocation();
  const showHeader = location.pathname === "/" || location.pathname === "/Registration"; // Check if pathname is "/" or "/Registration"

  return showHeader ? <Header /> : null;
}

export default App;




