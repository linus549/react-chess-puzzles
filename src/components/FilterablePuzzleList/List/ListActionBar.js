import { forwardRef, useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ActionBar from "components/FilterablePuzzleList/ActionBar";

const ListActionBar = forwardRef(
  ({ text, selectAll, selectRandom, onFilterClick }, ref) => {
    const [showModal, setShowModal] = useState(false);
    const [modalInputFieldValue, setModalInputFieldValue] = useState("1");
    const modalInputFieldRef = useRef(null);

    useEffect(
      function focusModalInputField() {
        if (modalInputFieldRef.current) {
          modalInputFieldRef.current.focus();
        }
      },
      [showModal]
    );

    function handleShowModal() {
      setShowModal(true);
    }

    function handleCloseModal() {
      setShowModal(false);
    }

    function handleModalInputChange(e) {
      setModalInputFieldValue(e.target.value);
    }

    function handleModalInputFocus(e) {
      e.target.select();
    }

    function handleSubmit(e) {
      e.preventDefault();
      selectRandom(modalInputFieldValue);
      setShowModal(false);
    }

    return (
      <>
        <ActionBar ref={ref} text={text} color="dark" background="white">
          <DropdownButton
            className="d-inline-block"
            id="dropdown-select"
            title="Select"
          >
            <Dropdown.Item onClick={handleShowModal}>Random</Dropdown.Item>
            <Dropdown.Item onClick={selectAll}>All</Dropdown.Item>
          </DropdownButton>

          <Button variant="primary" className="ms-2" onClick={onFilterClick}>
            Filter
          </Button>
        </ActionBar>

        <Modal centered show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Select Random</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form id="modal-form" onSubmit={handleSubmit}>
              <Form.Label>Number of Puzzles</Form.Label>
              <Form.Control
                ref={modalInputFieldRef}
                type="number"
                min="1"
                value={modalInputFieldValue}
                required
                onChange={handleModalInputChange}
                onFocus={handleModalInputFocus}
              />
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>

            <Button type="submit" form="modal-form" variant="primary">
              Select
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
);

export default ListActionBar;
