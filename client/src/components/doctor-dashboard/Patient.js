import React, { Fragment, useState } from "react";
import Moment from "react-moment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Patient Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body">
          <div className="profiles">
            <div className="profile-1">
              <div className="profile-details">
                <div className="appointment-p prfile-desc">
                  {props.modalBody.map((modal) =>
                    props.value === modal.key ? modal.props.children : ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
const Patient = ({ patient }) => {
  const [value, setValue] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  const modalBody = patient?.map((pat) => (
    <Fragment key={pat._id}>
      <h2 className="style-heading">
        <strong>{pat.patientName}</strong>
      </h2>
      <p className="profile-p">
        <strong>Father's name: {pat.fatherName}</strong>
      </p>
      <p className="profile-p2">
        <strong>Age: </strong>
        {pat.age}
      </p>
      <p className="profile-p2">
        <strong>Status: </strong>
        {pat.status}
      </p>
      <p className="profile-p2">
        <strong>Date: </strong>
        <Moment format="DD/MM/YYYY">{pat.bookingDate}</Moment>
      </p>
      <p className="profile-p2">
        <strong>Booking ID: </strong>
        {pat._id}
      </p>

      <p className="profile-p2">
        <strong>Description: </strong>
        {pat.description}
      </p>
      <button className="btn btn-info">
        <Link style={{ all: "unset" }} to="/patient-appointments">
          Proceed
        </Link>
      </button>
    </Fragment>
  ));
  const patients = patient.map((ptn) => (
    <tr key={ptn._id}>
      <td>{ptn._id}</td>
      <td>{ptn.patientName}</td>
      <td>
        <Moment format="DD/MM/YYYY">{ptn.bookingDate}</Moment>
      </td>
      <td>
        <button
          onClick={() => {
            setValue(ptn._id);
            setModalShow(true);
          }}
          type="button"
          className="btn btn-info"
        >
          View
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        value={value}
        modalBody={modalBody}
      />
      <div className="common-details">
        <h2 className="credentials">
          <strong>Patient Credentials</strong>
        </h2>
        <br />
        <div className="common-table">
          <div className="scroll-table">
            <table className="table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Patient's Name</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{patients}</tbody>
            </table>
          </div>
        </div>
      </div>
      <br />
    </Fragment>
  );
};

export default Patient;
