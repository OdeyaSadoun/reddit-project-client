import React, { ChangeEvent } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { SearchBarDisplayProps } from "../../../interfaces/props/SearchBarDisplayProps.interface";

const SearchBarDisplay: React.FC<SearchBarDisplayProps> = ({
  handleInputChange,
  handleSearch,
  inputValue,
}) => {
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
              onChange={(e) =>
                handleInputChange(e as ChangeEvent<HTMLInputElement>)
              }
            />
            <Button onClick={handleSearch}>Search</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBarDisplay;
