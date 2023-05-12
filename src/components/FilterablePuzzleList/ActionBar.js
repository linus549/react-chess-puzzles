import { forwardRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ActionBar = forwardRef(({ text, color, background, children }, ref) => {
  return (
    <Container
      ref={ref}
      fluid
      className={`position-fixed text-${color} bg-${background}`}
      style={{ zIndex: "1010" }}
    >
      <Container className="pe-0 py-2">
        <Row className="d-flex">
          <Col xs="auto" className="fs-4">
            {text}
          </Col>
          <Col xs="auto" className="ms-auto">
            {children}
          </Col>
        </Row>
      </Container>
    </Container>
  );
});

export default ActionBar;
