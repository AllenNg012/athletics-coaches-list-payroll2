// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f5f5ef;
  min-height: 100vh;
  padding-bottom: 5vh;
  padding-top: 10vh;

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
  tr{ text-align: center;}
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

 

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(-sortOrder);
    } else {
      setSortKey(key);
      setSortOrder(1);
    }
  };

  let filteredPrograms = programs.slice(); // Start with all programs




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
     <Container id="Location">
      <TableContainer>
        <TopDiv>
          <h1>Find the right program for your child!</h1>

        </TopDiv>
        <FilterContainer>

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
              <StyledTh width="10%" onClick={() => handleSort("name")}>Name {sortKey === "name" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
              <StyledTh width="15%" onClick={() => handleSort("time")}>Time {sortKey === "time" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
              <StyledTh width="25%" onClick={() => handleSort("place")}>Place {sortKey === "place" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
              <StyledTh width="10%" onClick={() => handleSort("fees")}>Program Fees {sortKey === "fees" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
              <StyledTh width="15%">Register</StyledTh>
              <StyledTh width="15%">Info</StyledTh>

            </tr>
          </thead>
          <tbody>
            {filteredPrograms && filteredPrograms.map((program, index) => (
              <tr key={index}>
                <StyledTd width="10%">{program.name}</StyledTd>
                <StyledTd width="15%">{new Date(program.time).toLocaleString()}</StyledTd>
                <StyledTd width="25%">{`${program.place} (${program.location})`}</StyledTd>
                <StyledTd width="10%">${program.fees} per week</StyledTd>
                <StyledTd width="15%">
                <Link to={`/Registration?programName=${program.name}&programAge=${program.age}&programPlace=${program.place}&programLocation=${program.location}`} className="btn btn-success">Register</Link>
                </StyledTd>
                <StyledTd width="15%">
                <Link to={`/`}>Click for more information</Link>
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
