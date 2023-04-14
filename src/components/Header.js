import { useContext } from "react";
import AppContext from "contexts/AppContext";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { view } from "components/App";

function Header() {
  const { state, appDispatch } = useContext(AppContext);

  function handleGetStartedClick() {
    appDispatch({ type: "show_get_started" });
  }

  function handleAllPuzzlesClick() {
    appDispatch({ type: "show_all_puzzles" });
  }

  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand>Chess Puzzles</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav-items" />
        <Navbar.Collapse id="navbar-nav-items">
          <Nav activeKey={state.currentView}>
            <Nav.Link
              eventKey={view.GET_STARTED}
              onClick={handleGetStartedClick}
            >
              Get Started
            </Nav.Link>

            <Nav.Link
              eventKey={view.ALL_PUZZLES}
              onClick={handleAllPuzzlesClick}
            >
              All Puzzles
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
