/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom, black 50%, white 100%);
  min-height: 100vh;
  padding-bottom: 5vh;
`;

const TableContainer = styled.div`
  width: 75%;
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-top: 6vw;
`;

const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
`;

const StyledTh = styled.th`
  width: ${({ width }) => width};
  overflow: hidden;
`;

const StyledTd = styled.td`
  width: ${({ width }) => width};
  overflow: hidden;
`;

const AddButton = styled(Link)`
  margin-left: 1vw;
`;
const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1vw; /* Add margin-left here */
`;

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    
    // Check if the user confirmed the deletion
    if (isConfirmed) {
      // Proceed with deletion
      axios.delete('http://localhost:3001/deleteUser/' + id)
        .then(result => {
          console.log(result);
          setUsers(users.filter(user => user._id !== id)); // Update state instead of reloading the page
        })
        .catch(err => console.log(err));
    }
  };

  const EditButton = styled(Link)`
  margin-right: 8px; /* Add margin-right here */
`;

  return (
    <Container>
      <TableContainer>
      <TopDiv>
          <h1>Coach List</h1>
          <div>
            <AddButton to="/create" className="btn btn-success">Add Coach</AddButton>
            <AddButton to="/payroll" className="btn" style={{ background: "#00000063" }}>Payroll</AddButton>
          </div>
        </TopDiv>
        <StyledTable className="table">
          <thead>
            <tr>
              <StyledTh width="20%">Name</StyledTh>
              <StyledTh width="30%">location</StyledTh>
              <StyledTh width="20%">Email</StyledTh>
              <StyledTh width="16%">Phone</StyledTh>
              <StyledTh width="14%">Action</StyledTh>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <StyledTd width="20%">{user.name}</StyledTd>
                <StyledTd width="15%">{user.location}</StyledTd>
                <StyledTd width="15%">{user.email}</StyledTd>
                <StyledTd width="15%">{user.phone}</StyledTd>
                <StyledTd width="15%">
                  <EditButton to={`/update/${user._id}`} className="btn btn-success">Edit</EditButton>
                  <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                </StyledTd>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </Container>
  );
}

export default Users;
