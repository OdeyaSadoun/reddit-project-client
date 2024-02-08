import React, { useState, ChangeEvent } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { SearchBarProps } from "src/interfaces/SearchBarProps.interface";


const SearchBar: React.FC<SearchBarProps> = ({ setSearchData }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setSearchData(inputValue);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={inputValue}
              onChange={handleInputChange}
            />
            <Button onClick={handleSearch}>
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
