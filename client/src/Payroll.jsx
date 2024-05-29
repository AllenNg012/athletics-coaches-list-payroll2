// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as XLSX from 'xlsx';

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

const Payroll = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err));
  }, []);

  

  const handleExport = () => {
    const fileName = 'payroll.xlsx';
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const exportData = users.map(user => {
      return {
        Name: user.name,
        Hour: user.hour,
        HourlyRate: user.hourlyWage,
        Total: user.totalSalary
      };
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Payroll');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    const url = URL.createObjectURL(data);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      <TableContainer>
        <TopDiv>
          <h1>Payroll</h1>
          <div>
            <button onClick={handleExport} className="btn btn-primary">Export to Excel</button>
            <AddButton to="/" className="btn" style={{ background: "#00000063" }}>Coach</AddButton>
          </div>
        </TopDiv>
        <StyledTable className="table">
          <thead>
            <tr>
              <StyledTh width="30%">Name</StyledTh>
              <StyledTh width="20%">Hour</StyledTh>
              <StyledTh width="20%">$/H</StyledTh>
              <StyledTh width="20%">Total</StyledTh>
              <StyledTh width="10%">Action</StyledTh>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <StyledTd width="30%">{user.name}</StyledTd>
                <StyledTd width="20%">{user.hour}</StyledTd>
                <StyledTd width="20%">{user.hourlyWage}</StyledTd>
                <StyledTd width="20%">{user.totalSalary}</StyledTd>
                <StyledTd width="10%">
                  <Link to={`/updatePayroll/${user._id}`} className="btn btn-success">Edit</Link>
                </StyledTd>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </Container>
  );
}

export default Payroll;
