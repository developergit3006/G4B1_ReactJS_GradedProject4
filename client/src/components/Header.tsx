import React, { ChangeEvent, useState } from "react";
import {  Routes, Route, BrowserRouter, NavLink } from "react-router-dom";
import Main from "./Main";
import MovieInfo from "./MovieInfo";
import Form from 'react-bootstrap/esm/Form';
import { Col, Container ,Nav, Navbar, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFilm } from "react-icons/fa6";
import { ImSearch } from "react-icons/im";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("movies-in-theaters");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>  
      <BrowserRouter>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand to="/" as={NavLink}>
                <FontAwesomeIcon icon={faFilm}/>
                Movies On Tip 
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link  to={" "} as={NavLink}
                    state={{ tab: "movies-in-theaters" }}
                    onClick={() => handleTabClick("movies-in-theaters")}
                    > 
                    <span className={activeTab === "movies-in-theaters" ? "active" : ""}>Movies in theaters</span></Nav.Link>
                  <Nav.Link to={" "} as={NavLink}
                    state={{ tab: "movies-coming" }}
                    onClick={() => handleTabClick("movies-coming")}
                    >
                      <span className={activeTab === "movies-coming" ? "active" : ""}> Coming soon</span>    
                  </Nav.Link>
                  <Nav.Link to={" "} as={NavLink}
                  state={{ tab: "top-rated-india" }}
                  onClick={() => handleTabClick("top-rated-india")}
                  >
                  <span className={activeTab === "top-rated-india" ? "active" : ""}> Top rated Indian</span>
                  </Nav.Link>
                  <Nav.Link 
                    to={""} as={NavLink}
                    state={{ tab: "top-rated-movies" }}
                    onClick={() => handleTabClick("top-rated-movies")}
                    >
                  <span className={activeTab === "top-rated-movies" ? "active" : ""}> Top rated movies</span>
                  </Nav.Link>
                  <Nav.Link  to={""} as={NavLink}
                    state={{ tab: "favourite" }}
                    onClick={() => handleTabClick("favourite")}
                    >
                  <span className={activeTab === "favourite" ? "active" : ""}> Favourites</span>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
            <Form>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search Movie"
                    className=" mr-sm-2"
                    onChange={handleSearch} 
                  />
                </Col>
                <Col xs="auto">
               
                </Col>
                <Col xs="auto">
                  <button className="btn">
                  <ImSearch size={17} color="white" />
                  </button>
                </Col>
              </Row>
            </Form> 
          </Navbar>
          <Routes>
            <Route path="" element={<Main searchValue={search} />} />
            <Route path="/:MovieName" element={<MovieInfo />} />
          </Routes>  
      </BrowserRouter>
    </>
  );
}

export default Header;