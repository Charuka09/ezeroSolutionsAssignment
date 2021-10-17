import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
  ListGroup,
  ListGroupItem,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getWeatherStats } from "../services/api";
import SearchResult from "./searchResult";
import data from "./../data.json";

const FullHeightContainer = styled(Container)`
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const FullHeightRow = styled(Row)`
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const FilterRow = styled(Row)`
  justify-content: center;
  align-items: center;
`;

const SearchListCover = styled.div`
  justify-content: center;
  align-items: center;
  height: 50%%;
  background: none;
`;

const SearchArea = styled(InputGroup)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SeachButton = styled(Button)`
  border-radius: 2vw;
  margin-left: 4vw;
  &:hover {
    background-color: blue;
  }
`;

const ListHeading = styled.h5`
  justify-content: center;
  align-items: center;
`

const FilterButton = styled(DropdownButton)`
  width: 60%;
`

function SearchPage() {
  const [weatherStats, setWeatherStats] = useState(new Object);
  const [city, setCity] = useState("Melbourne");

  useEffect(() => {
    setWeatherStats(data);
    getSeachedWeatherStats();
  });

  const getSeachedWeatherStats = async () => {
    try {
      const response = await getWeatherStats(city);
      setWeatherStats(response.data.payload);
    } catch (error: any) {
      if (error.response.status === 404) {
        console.log("data Not Found");
      }
    }
  };

  return (
    <FullHeightContainer fluid>
      <FullHeightRow>
        <Col lg={4} md={3} sm={2}></Col>
        <Col lg={4} md={6} sm={8} xs={12}>
          <ListGroup>
            <ListGroupItem>
              <SearchArea className="">
                <FormControl
                  placeholder="state/city"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
                <SeachButton
                  type="submit"
                  onClick={() => getSeachedWeatherStats()}
                >
                  Find Stats
                </SeachButton>
              </SearchArea>
            </ListGroupItem>
            {/* <ListGroupItem>
              <FilterRow>
                <Col lg={5} md={5} sm={5}>
                  Filter By
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <FilterButton
                    id="dropdown-item-button"
                    title="Dropdown button"
                  >
                    <Dropdown.Item as="button">Action</Dropdown.Item>
                    <Dropdown.Item as="button">Another action</Dropdown.Item>
                    <Dropdown.Item as="button">Something else</Dropdown.Item>
                  </FilterButton>
                </Col>
              </FilterRow>
            </ListGroupItem> */}
            <ListGroupItem>
              <SearchListCover>
                <ListHeading>Search List</ListHeading>
                {weatherStats == undefined ? (
                  <h6>No data Found</h6>
                ) : (
                  <SearchResult data={data}></SearchResult>
                )}
              </SearchListCover>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col lg={4} md={3} sm={2}></Col>
      </FullHeightRow>
    </FullHeightContainer>
  );
}
export default SearchPage;
