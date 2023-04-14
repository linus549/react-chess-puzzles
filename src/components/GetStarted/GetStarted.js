import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Introduction from "components/GetStarted/Introduction";
import Form from "components/GetStarted/Form/Form";

function GetStarted({ data }) {
  return (
    <Container
      className="d-flex align-items-center pt-5"
      style={{ minHeight: "calc(100vh - 3.5rem)" }}
    >
      <Row>
        <Col md="auto" lg={6} className="mb-5">
          <Introduction puzzleCount={data.length} />
        </Col>
        <Col md="auto" lg={6} className="border-start">
          <Form data={data} />
        </Col>
      </Row>
    </Container>
  );
}

export default GetStarted;
