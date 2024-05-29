/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link} from "react-router-dom";

function UpdateUserPayroll (){
    const {id} = useParams()
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [hour, setHour] = useState("");
    const [hourlyWage, setHourlyWage] = useState("");
    const [totalSalary, setTotalSalary] = useState("");
    const navigate = useNavigate()
    
useEffect(()=>{
    axios.get('http://localhost:3001/getUser/'+id)
    .then(result => {console.log(result)
        setName(result.data.name)
        setLocation(result.data.location)
        setEmail(result.data.email)
        setPhone(result.data.phone)
        setHour(result.data.hour)
        setHourlyWage(result.data.hourlyWage)
        setTotalSalary(result.data.totalSalary)
    })
    .catch(err => console.log(err))
},[])

const Update = (e) => {
    e.preventDefault();
    axios.put("http://localhost:3001/updateUser/"+id, {name,location, email,phone,hour,hourlyWage,totalSalary})
    .then(result => 
        {console.log(result)
        navigate('/payroll')
})
    .catch(err => console.log(err))
}

    return(
    <div className='d-flex vh-100 justify-content-center align-items-center' style={{ background: "linear-gradient(to bottom, black 50%, white 100%)" }}>
    <div className='w-50 bg-white rounded p-3'>
    <form onSubmit={Update}>
    <h2>Update User</h2>
    <div className='mb-2'>
    <label htmlFor="">Hour</label>
    <input type="number" placeholder='Enter Hour' className='form-control' required
    value={hour} onChange={(e) => setHour(e.target.value)}/>
    </div>
    <div className='mb-2'>
    <label htmlFor="">Hourly Wage</label>
    <input type="number" placeholder='Enter Hourly Wage' className='form-control' required
    value={hourlyWage} onChange={(e) => setHourlyWage(e.target.value)}/>
    </div>
    <div className='mb-2'>
    <label htmlFor="">Total Salary</label>
    <input type="text" placeholder='Enter Total Salary' className='form-control' required
    value={totalSalary} onChange={(e) => setTotalSalary(e.target.value)}/>
    </div>
    <button className='btn btn-success'>Update</button>
    <Link to="/" className="btn btn-secondary mx-2">Back</Link>

    </form>
    </div>
    </div>
)
}

export default UpdateUserPayroll;