import React, { Fragment, useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import Tooltip from "@mui/material/Tooltip";
import Loader from "../../components/Loader";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  getMyAppointmentsDoctor,
  updateAppointmentStatusDoctor,
} from "../../features/appointment/appointmentActions";

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
                  {props.modalBody?.map((modal) =>
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

export default function PatientAppointments() {
  const {
    loading,
    appointments,
    isUpdated,
    total_appointments,
    resultPerPage,
  } = useSelector((state) => state.appointment);

  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e + 1);
  };

  //--------------modal
  const [value, setValue] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const modalBody = appointments?.map((pat) => (
    <Fragment key={pat._id}>
      <h2 className="style-heading">
        <strong style={{ textTransform: "capitalize" }}>
          {pat.patientName}
        </strong>
      </h2>
      <p className="profile-p">
        <strong style={{ textTransform: "capitalize" }}>
          Father's Name: {pat.fatherName}
        </strong>
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
        {pat.bookingDate.substring(0, 10)}
      </p>
      <p className="profile-p2">
        <strong>Booking ID: </strong>
        {pat._id}
      </p>

      <p className="profile-p2">
        <strong>Description: </strong>
        {pat.description}
      </p>
    </Fragment>
  ));

  //------------------

  const changeStatus = (id, status) => {
    dispatch(updateAppointmentStatusDoctor({ id, status }));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyAppointmentsDoctor(currentPage));
  }, [dispatch, isUpdated, currentPage]);

  // ------------- columns
  const columns = [
    { field: "index", headerName: "#No", minWidth: 100, flex: 0.1 },
    // { field: "id", headerName: "User ID", minWidth: 300, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.1,
    },
    {
      field: "date",
      headerName: "Appointment Date",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "time",
      headerName: "Appointment Time",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 90,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Fragment>
            <div
              style={{
                color:
                  params.row.status === "pending"
                    ? "blue"
                    : params.row.status === "booked"
                    ? "green"
                    : "red",
              }}
            >
              {params.row.status}
            </div>
          </Fragment>
        );
      },
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "view",
      headerName: "View",
      minWidth: 100,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <button className="btn-action">
              <Tooltip title="View patient details">
                <Icon
                  icon="carbon:view"
                  width="25"
                  height="25"
                  onClick={() => {
                    setValue(params.row.id);
                    setModalShow(true);
                  }}
                />
              </Tooltip>
            </button>
          </Fragment>
        );
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            {params.row.status === "pending" ? (
              <Fragment>
                <button className="btn-action">
                  <Tooltip title="Book appointment">
                    <Icon
                      icon="icon-park-solid:correct"
                      color="green"
                      width="25"
                      height="25"
                      onClick={() => {
                        changeStatus(params.row.id, "booked");
                      }}
                    />
                  </Tooltip>
                </button>

                <button className="btn-action">
                  <Tooltip title="Cancel appointment">
                    <Icon
                      icon="material-symbols:cancel-outline"
                      color="red"
                      width="25"
                      height="25"
                      onClick={() => {
                        changeStatus(params.row.id, "cancelled");
                      }}
                    />
                  </Tooltip>
                </button>
              </Fragment>
            ) : params.row.status === "cancelled" ? (
              <strong style={{ color: "red" }}>Cancelled</strong>
            ) : (
              <strong style={{ color: "green" }}>Booked</strong>
            )}
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  // we slice the array bcz we cannot sort the array in strict mode without it
  appointments?.map((item, index) => {
    rows.push({
      index: index + 1,
      id: item._id,
      name: item.patientName,
      date: item.bookingDate.substring(0, 10),
      time: item.bookingTime,
      status: item.status,
      phoneNumber: "+" + item?.user?.phoneNumber,
    });
    return 1;
  });

  return (
    <Fragment>
      <section className="profiles-page">
        <div className="container">
          <div className="heading-common">
            <h1>
              <strong>Appointments</strong>
            </h1>
          </div>
          <h2 className="welcome-heading">
            <i className="fas fa-user"></i> Patient Appointments
          </h2>
          <br />
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                value={value}
                modalBody={modalBody}
              />
              {appointments?.length > 0 ? (
                <div className="datagrid">
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    rowsPerPageOptions={[resultPerPage]}
                    pagination
                    page={currentPage - 1}
                    pageSize={resultPerPage}
                    paginationMode="server"
                    rowCount={total_appointments}
                    onPageChange={setCurrentPageNo}
                    disableSelectionOnClick
                    components={{ Toolbar: GridToolbar }}
                    loading={loading}
                    autoHeight
                    sx={{
                      m: 1,
                      boxShadow: 2,
                    }}
                  />
                </div>
              ) : (
                <h2
                  style={{ textAlign: "center", margin: "15%", color: "red" }}
                >
                  No appointment found..
                </h2>
              )}
            </Fragment>
          )}
        </div>
      </section>
    </Fragment>
  );
}
