import React, { useState, useContext, useEffect } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import data from "./../data.json";

const SearchItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
`;

const Image = styled(Card.Img)`
  width: 5vh;
  height: 5vw;
`;

const WeatherCard = styled(Card)`
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const CardTitle = styled(Card.Title)`
  font-family: Tahoma, Verdana, sans-serif;
  font-size: 14px;
  font-weight: bold;
`;

function SearchResult(props: any) {
  return (
    <SearchItem>
      <WeatherCard>
        <Card.Body>
          <ListGroup horizontal>
            <ListGroupItem>
              <Image variant="top" src={props.data.current.weather_icons[0]} />
            </ListGroupItem>
            <ListGroupItem>
              <CardTitle>
                Weather Data at {props.data.location.country} - {props.data.location.region}{" "}
                - {props.data.location.name}{" "}
              </CardTitle>
            </ListGroupItem>
          </ListGroup>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
          Observation Time - {props.data.current.observation_time}
          </ListGroupItem>
        </ListGroup>
        <ListGroup className="list-group-flush" horizontal>
          <ListGroupItem>
            Temperature - {props.data.current.temperature}
          </ListGroupItem>
          <ListGroupItem>
            Humidity - {props.data.current.humidity}
          </ListGroupItem>
        </ListGroup>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            Wind Speed - {props.data.current.wind_speed}
          </ListGroupItem>
          <ListGroupItem>
            Wind Degree - {props.data.current.wind_degree}
          </ListGroupItem>
          <ListGroupItem>
            Wind Direction - {props.data.current.wind_dir}
          </ListGroupItem>
          <ListGroupItem>
            Wind Pressure - {props.data.current.pressure}
          </ListGroupItem>
          <ListGroupItem>
            Colud Cover - {props.data.current.cloudcover}
          </ListGroupItem>
          <ListGroupItem>
            UV index - {props.data.current.uv_index}
          </ListGroupItem>
          <ListGroupItem>
          {props.data.current.is_day == "no" ? <p>Day</p>: <p>night</p>}
            Cloud Cover - {props.data.current.cloudcover}
          </ListGroupItem>
          <ListGroupItem>
            Wind Degree - {props.data.current.uv_index}
          </ListGroupItem>
        </ListGroup>
      </WeatherCard>
    </SearchItem>
  );
}

export default SearchResult;
