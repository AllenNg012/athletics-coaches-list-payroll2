// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

function CreateUser() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hour, setHour] = useState("");
  const [hourlyWage, setHourlyWage] = useState("");
  const [totalSalary, setTotalSalary] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const calculateTotalSalary = () => {
      const total = parseFloat(hour) * parseFloat(hourlyWage);
      setTotalSalary(total.toFixed(2));
    };

    calculateTotalSalary();
  }, [hour, hourlyWage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend validation: Check if any of the fields are empty
    if (!name || !email || !phone || !location || !hour || !hourlyWage || !totalSalary || !gender) {
      window.alert("Please fill in all fields.");
      return;
    }
    // If all fields are filled, proceed with submitting the form
    axios.post("http://localhost:3001/createUser", { name, email, phone, location, hour, hourlyWage, totalSalary, gender })
      .then(() => {
        // Show success message
        window.alert("User created successfully!");
        // Clear input fields  

        setName("");
        setLocation("");
        setEmail("");
        setPhone("");
        setHour("");
        setHourlyWage("");
        setTotalSalary("");
        setGender("");
        // Optionally, navigate to another page
        navigate('/');
      })
      .catch(err => {
        // Show error message
        window.alert("Failed to create user!");
        console.error(err);
      });
  }

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center' style={{ background: "linear-gradient(to bottom, black 50%, white 100%)" }}>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className='mb-2'>
            <label htmlFor="">Name</label>
            <input type="text" placeholder='Enter Name' className='form-control' required
              value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label htmlFor="">Location</label>
            <input type="text" placeholder='Enter Location' className='form-control' required
              value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label htmlFor="">Email</label>
            <input type="email" placeholder='Enter Email' className='form-control' required
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label htmlFor="">Phone</label>
            <input type="number" placeholder='Enter Phone' className='form-control' required
              value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label htmlFor="">Hour</label>
            <input type="number" placeholder='Enter Hour' className='form-control' required
              value={hour} onChange={(e) => setHour(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label htmlFor="">Hourly Wage</label>
            <input type="number" placeholder='Enter Hourly Wage' className='form-control' required
              value={hourlyWage} onChange={(e) => setHourlyWage(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label htmlFor="">Total Salary</label>
            <input type="text" placeholder='Total Salary' className='form-control' required readOnly 
              value={totalSalary} onChange={(e) => setTotalSalary(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label htmlFor="">Gender</label>
            <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <button type="submit" className='btn btn-success'>Submit</button>

          <Link to="/" className="btn btn-secondary mx-2">Back</Link>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
