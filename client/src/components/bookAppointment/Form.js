import React, { Fragment, useState } from "react";
import { createAppointment } from "../../features/appointment/appointmentActions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Form = ({ profile, profileId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    bookingTime: "",
    patientName: "",
    fatherName: "",
    age: "",
    bookingDate: "",
    description: "",
  });

  const {
    patientName,
    fatherName,
    age,
    bookingTime,
    bookingDate,
    description,
  } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  return (
    <Fragment>
      <br />
      <div className="heading-common">
        <h1>
          <strong>Book Appointment</strong>
        </h1>
        <p className="lead">
          Doctor details, book your appointment according to dr's checkup time.
        </p>
        <hr />
        <div className="appointment-doctor">
          <img
            className="round-img appointment-img"
            src={profile?.doctor?.avatar}
            alt=""
          />
        </div>
        <p className="lead">
          <strong>{profile?.doctor?.name}</strong>
        </p>
        <p className="lead">
          <strong>{profile?.specialist}</strong>
        </p>
        <p className="lead">
          <strong>Rs. {profile?.fees}/-</strong>
        </p>
        <p className="lead">
          <strong>Checkup Time:- {profile?.timing}</strong>
        </p>
        <hr />
        <p className="lead">
          Provide your details correctly and book your appointment.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(createAppointment({ profileId, formData }));
        }}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="* Patient name"
            name="patientName"
            value={patientName}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="* Father name"
            name="fatherName"
            value={fatherName}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            placeholder="* Age"
            name="age"
            min="1"
            max="150"
            value={age}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <h6>Date</h6>
        <div className="form-group">
          <input
            type="date"
            className="form-control"
            name="bookingDate"
            value={bookingDate}
            required
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => onChange(e)}
          />
        </div>
        <h6>Time</h6>
        <div className="form-group">
          <input
            type="time"
            list="times"
            className="form-control"
            name="bookingTime"
            value={bookingTime}
            required
            step="1800"
            onChange={(e) => onChange(e)}
          />
          <datalist id="times">
            <option value="08:00:00" />
            <option value="09:00:00" />
            <option value="10:00:00" />
            <option value="11:00:00" />
            <option value="12:00:00" />
            <option value="13:00:00" />
            <option value="14:00:00" />
            <option value="15:00:00" />
            <option value="16:00:00" />
            <option value="17:00:00" />
            <option value="18:00:00" />
            <option value="19:00:00" />
          </datalist>
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Health Problem Description"
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us about the Health Problem.</small>
        </div>
        <input type="submit" value="Submit" className="btn btn-info" />{" "}
        <Link to="/home" type="submit" className="btn btn-outline-secondary">
          Go Back
        </Link>
      </form>
      <br />
    </Fragment>
  );
};

export default Form;
