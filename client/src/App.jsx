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
import Registration1 from "./components/Registration2/Registration1";
import Registration2 from "./components/Registration2/Registration2";


import Programs from './Programs';
import CreateProgram from './CreateProgram';
import Survey from './components/Survey/Survey';
// Import UpdateProgram if it's needed later
import UpdateProgram from './UpdateProgram';

import Success from './components/Success';
import Cancel from './components/Cancel';

function App() {
  return (
    <Router>
      {/* Conditionally render Header */}
      <ConditionalHeader />
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Registration1" element={<Registration1 />} />
        <Route path="/Registration2" element={<Registration2 />} />
        <Route path='/coach' element={<Users />}></Route>
        <Route path='/payroll' element={<Payroll />}></Route>
        <Route path='/create' element={<CreateUser />}></Route>
        <Route path='/update/:id' element={<UpdateUser />}></Route>
        <Route path='/updatePayroll/:id' element={<UpdateUserPayroll />}></Route>
        <Route path='/programs' element={<Programs />} />
        <Route path='/create-program' element={<CreateProgram />} />
         <Route path='/update-program/:id' element={<UpdateProgram />} ></Route>
         <Route path='/success' element={<Success />} ></Route>
         <Route path='/cancel' element={<Cancel />} ></Route>
         <Route path='/survey' element={<Survey />} ></Route>
      </Routes>
    </Router>
  );
}

// Conditionally render Header based on location
function ConditionalHeader() {
  const location = useLocation();
  const showHeader = location.pathname === "/" || !(location.pathname.startsWith("/Registration") || location.pathname === "/survey");

  return showHeader ? <Header /> : null;
}


export default App;
