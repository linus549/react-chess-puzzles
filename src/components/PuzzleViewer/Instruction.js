import Card from "react-bootstrap/Card";

function Instruction({
  textColor,
  background,
  primaryText,
  secondaryText,
  userColor,
}) {
  return (
    <Card text={textColor} bg={background} className="mb-4">
      <Card.Body>
        <Card.Title>{primaryText}</Card.Title>
        <Card.Subtitle>
          {secondaryText}
          {userColor && <span className="text-capitalize">{userColor}</span>}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

export default Instruction;
