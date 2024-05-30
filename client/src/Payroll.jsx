/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as XLSX from 'xlsx';

// Styled Components (unchanged)
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
  cursor: pointer;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err));
  }, []);

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

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

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortOrder('asc');
    }
  };

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortColumn === "Name") {
      return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else {
      // For numeric columns
      return sortOrder === "asc" ? a[sortColumn] - b[sortColumn] : b[sortColumn] - a[sortColumn];
    }
  });

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
        {/* Add search input */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <StyledTable className="table">
          <thead>
            <tr>
              <StyledTh width="30%" onClick={() => handleSort("Name")}>Name</StyledTh>
              <StyledTh width="20%" onClick={() => handleSort("hour")}>Hour</StyledTh>
              <StyledTh width="20%" onClick={() => handleSort("hourlyWage")}>$/H</StyledTh>
              <StyledTh width="20%" onClick={() => handleSort("totalSalary")}>Total</StyledTh>
              <StyledTh width="10%">Action</StyledTh>
            </tr>
          </thead>
          <tbody>
            {/* Render sorted users */}
            {sortedUsers.map((user, index) => (
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
