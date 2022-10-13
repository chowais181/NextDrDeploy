import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { deleteAppointmentUser } from "../../features/appointment/appointmentActions";

const AppointmentItems = ({ appointment }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.appointment);

  const appointments = appointment?.map((appnt) => (
    <div key={appnt._id} className="profile-1">
      <div className="profile-img">
        <Link to={`/home/doctor/${appnt.doctorProfile?._id}`}>
          <img src={appnt.doctorProfile?.doctor?.avatar} alt="" />
          <h5 className="heading-sub">
            <strong>{appnt.doctorProfile?.doctor?.name}</strong>
          </h5>
        </Link>
      </div>
      <div className="profile-details">
        <div className="appointment-p profile-desc">
          <h2 className="profile-heading">
            <strong>{appnt.patientName.toUpperCase()}</strong>
          </h2>
          <p className="profile-p">
            <strong style={{ textTransform: "capitalize" }}>
              Father's Name: {appnt.fatherName}
            </strong>
          </p>
          <p className="profile-p2">
            <strong>Age: </strong>
            {appnt.age}
          </p>

          <p className="profile-p2">
            <strong>Booking Time: </strong>

            {appnt.bookingTime}
          </p>
          <p className="profile-p2">
            <strong>Booking Date: </strong>
            <Moment format="DD/MM/YYYY">{appnt.bookingDate}</Moment>
          </p>
          <p className="profile-p2">
            <strong>Booking ID: </strong>
            {appnt._id}
          </p>
          <h4 className="profile-status">
            <p
              style={{
                marginTop: "8px",
                textTransform: "capitalize",
                color:
                  appnt.status === "pending"
                    ? "rgb(22, 186, 227)"
                    : appnt.status === "booked"
                    ? "#41d171"
                    : "#ed1c11",
              }}
            >
              {" "}
              {appnt.status}
            </p>
          </h4>
        </div>
      </div>
      <div className="desc-p">
        {appnt.description ? (
          <p className="profile-p2">
            <strong>Description: </strong>
            {appnt.description}
          </p>
        ) : (
          ""
        )}
        {appnt.status === "cancelled" ? (
          ""
        ) : (
          <button
            onClick={() => dispatch(deleteAppointmentUser(appnt._id))}
            type="button"
            className="profile-btn btn btn-danger"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  ));
  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>{appointments}</Fragment>}
    </Fragment>
  );
};

export default AppointmentItems;
