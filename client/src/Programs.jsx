// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

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
  margin-top: 3vw;
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
  margin-left: 1vw;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const FilterSelect = styled.select`
  margin-right: 16px;
  padding: 4px;
`;

const ResetButton = styled.button`
  padding: 8px 16px;
`;

function Programs() {
  const [programs, setPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(1);

  // Filter state variables
  const [ageFilter, setAgeFilter] = useState('');
  const [sportFilter, setSportFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/programs')
      .then(result => setPrograms(result.data || []))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this program?");
    
    if (isConfirmed) {
      axios.delete('http://localhost:3001/programs/' + id)
        .then(result => {
          console.log(result);
          setPrograms(programs.filter(program => program._id !== id));
        })
        .catch(err => console.log(err));
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(-sortOrder);
    } else {
      setSortKey(key);
      setSortOrder(1);
    }
  };

  let filteredPrograms = programs.slice(); // Start with all programs

  // Filter by search term (name only)
  filteredPrograms = filteredPrograms.filter(program =>
    program.name && program.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleResetFilters = () => {
    setAgeFilter('');
    setSportFilter('');
    setLocationFilter('');
    setGenderFilter('');
  };

  // Apply additional filters
  if (ageFilter) {
    filteredPrograms = filteredPrograms.filter(program => program.age === ageFilter);
  }
  if (sportFilter) {
    filteredPrograms = filteredPrograms.filter(program => program.sport === sportFilter);
  }
  if (locationFilter) {
    filteredPrograms = filteredPrograms.filter(program => program.location === locationFilter);
  }
  if (genderFilter) {
    filteredPrograms = filteredPrograms.filter(program => program.gender === genderFilter);
  }

  // Sort filtered programs
  filteredPrograms.sort((a, b) => {
    if (sortKey) {
      if (typeof a[sortKey] === 'string') {
        return a[sortKey].localeCompare(b[sortKey]) * sortOrder;
      } else {
        return (a[sortKey] - b[sortKey]) * sortOrder;
      }
    }
    return 0;
  });

  return (
    <Container>
      <Header />
      <TableContainer>
        <TopDiv>
          <h1>Program List</h1>
          <div>
            <AddButton to="/create-program" className="btn btn-success">Add Program</AddButton>
          </div>
        </TopDiv>
        <FilterContainer>
          <input 
            type="text" 
            placeholder="Search by name" 
            value={searchTerm} 
            onChange={handleSearch} 
          />
          <FilterSelect value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
            <option value="">All Ages</option>
            <option value="3-4">3-4</option>
            <option value="5-6">5-6</option>
            <option value="7-8">7-8</option>
            <option value="9-10">9-10</option>
          </FilterSelect>
          <FilterSelect value={sportFilter} onChange={(e) => setSportFilter(e.target.value)}>
            <option value="">All Sports</option>
            <option value="Basketball">Basketball</option>
            <option value="Soccer">Soccer</option>
            <option value="Baseball">Baseball</option>
          </FilterSelect>
          <FilterSelect value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option value="">All Locations</option>
            <option value="Vaughan">Vaughan</option>
            <option value="Markham">Markham</option>
            <option value="Aurora">Aurora</option>
            <option value="Newmarket">Newmarket</option>
            <option value="Mississauga">Mississauga</option>
            <option value="Brampton">Brampton</option>
            <option value="East York">East York</option>
            <option value="Midtown">Midtown</option>
          </FilterSelect>
          <FilterSelect value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
            <option value="">All Genders</option>
            <option value="Girls">Girls</option>
            <option value="CO-ED/All Genders">CO-ED/All Genders</option>
          </FilterSelect>
          <ResetButton onClick={handleResetFilters}>Reset Filters</ResetButton>
        </FilterContainer>
        <StyledTable className="table">
        <thead>
  <tr>
    <StyledTh width="15%" onClick={() => handleSort("name")}>Name {sortKey === "name" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
    <StyledTh width="15%" onClick={() => handleSort("time")}>Time {sortKey === "time" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
    <StyledTh width="10%" onClick={() => handleSort("age")}>Age {sortKey === "age" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
    <StyledTh width="15%" onClick={() => handleSort("sport")}>Sport {sortKey === "sport" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
    <StyledTh width="15%" onClick={() => handleSort("gender")}>Gender {sortKey === "gender" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
    <StyledTh width="15%" onClick={() => handleSort("place")}>Place {sortKey === "place" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
    <StyledTh width="15%" onClick={() => handleSort("fees")}>Program Fees {sortKey === "fees" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
    <StyledTh width="10%">Action</StyledTh>
  </tr>
</thead>

<tbody>
  {filteredPrograms && filteredPrograms.map((program, index) => (
    <tr key={index}>
      <StyledTd width="15%">{program.name}</StyledTd>
      <StyledTd width="15%">{new Date(program.time).toLocaleString()}</StyledTd>
      <StyledTd width="10%">{program.age}</StyledTd>
      <StyledTd width="15%">{program.sport}</StyledTd>
      <StyledTd width="15%">{program.gender}</StyledTd>
      <StyledTd width="15%">{`${program.place} (${program.location})`}</StyledTd>
      <StyledTd width="15%">${program.fees} per week</StyledTd>
      <StyledTd width="10%">
        <Link to={`/update-program/${program._id}`} className="btn btn-success">Edit</Link>
        <button className="btn btn-danger" onClick={() => handleDelete(program._id)}>Delete</button>
      </StyledTd>
    </tr>
  ))}
</tbody>

        </StyledTable>
      </TableContainer>
    </Container>
  );
}

export default Programs;
