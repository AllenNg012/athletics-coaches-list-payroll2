/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/getUser/" + id)
      .then((result) => {
        console.log(result);
        setName(result.data.name);
        setLocation(result.data.location);
        setEmail(result.data.email);
        setPhone(result.data.phone);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/updateUser/" + id, {
        name,
        location,
        email,
        phone,
      })
      .then((result) => {
        console.log(result);
        window.alert("User updated successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        window.alert("Failed to update user!");
      });
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center" style={{ background: "linear-gradient(to bottom, black 50%, white 100%)" }}>
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Update}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input type="text" placeholder="Enter Name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label htmlFor="">Location</label>
            <input type="text" placeholder="Enter Location" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input type="email" placeholder="Enter Email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label htmlFor="">Phone</label>
            <input type="number" placeholder="Enter Phone" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <button className="btn btn-success">Update</button>
          <Link to="/" className="btn btn-secondary mx-2">Back</Link>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
