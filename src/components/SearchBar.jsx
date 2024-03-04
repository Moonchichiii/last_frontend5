import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Form inline="true" onSubmit={handleSubmit}>
      <Row>
        <Col lg="auto">
          <Form.Control
            type="text"
            placeholder="Search for posts or profiles"
            className="mr-sm-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Button type="submit">Search</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBar;
