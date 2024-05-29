/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import Users from './Users'
import Payroll from './Payroll'
import UpdateUserPayroll from './UpdateUserPayroll'

function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
   <Routes>
    
    
    <Route path='/' element={<Users />}></Route>
    <Route path='/payroll' element={<Payroll />}></Route>
    <Route path='/create' element={<CreateUser />}></Route>
    <Route path='/update/:id' element={<UpdateUser />}></Route>
    <Route path='/updatePayroll/:id' element={<UpdateUserPayroll />}></Route>

    
    
    </Routes>
    </BrowserRouter>
  )
}

export default App
