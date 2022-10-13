import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    _id,
    doctor: { name, avatar },
    hospital,
    location,
    specialist,
    fees,
  },
}) => {
  return (
    <div className="profiles">
      <div className="profile-1">
        <div className="profile-img">
          <img src={avatar} alt="" />
        </div>
        <div className="profile-details">
          <div className="profile-desc">
            <h2 className="profile-heading">
              <strong>{name}</strong>
            </h2>
            <p className="profile-p">
              <strong>{specialist}</strong>{" "}
            </p>
            <p className="profile-p2">
              <strong>{hospital}</strong> {location}
            </p>
            <p className="profile-p2">
              <strong>Rs. {fees}</strong> Consultation fee at clinic
            </p>
          </div>
        </div>
        <div className="mx-auto profile-buttons">
          <Fragment>
            <Link
              to={`/home/appointment/${_id}`}
              type="button"
              className="rounded-pill profile-btn btn btn-info"
            >
              <i className="fas fa-calendar-check"></i> Book Appointment
            </Link>
          </Fragment>

          <Link
            to={`/home/doctor/${_id}`}
            type="button"
            className="rounded-pill profile-btn btn btn-dark"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileItem;
