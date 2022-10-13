import React, { useEffect, Fragment } from "react";
import Experience from "./Experience";
import Education from "./Education";
import Patient from "./Patient";
import Review from "./Review";
import Loader from "../Loader";
import { deleteProfile } from "../../features/profile/profileActions";
import {getUserDetails} from "../../features/user/userActions";
import { getMyAppointmentsDoctor } from "../../features/appointment/appointmentActions";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const { loading, myProfile, isDeletedProfile } = useSelector(
    (state) => state.profile
  );
  const { appointments } = useSelector((state) => state.appointment);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMyAppointmentsDoctor());

    if (isDeletedProfile) {
      dispatch(getUserDetails());
      navigate("/");
    }
  }, [dispatch, isDeletedProfile, navigate, myProfile]);

  return (
    <Fragment>
      <section id="dashboard">
        <div className="container">
          <div className="heading-common">
            <h1>
              <strong>Dashboard</strong>
            </h1>
            <h2 className="welcome-heading">
              <i className="fas fa-user-md"></i> Welcome {myProfile?.name}
            </h2>
          </div>
          <br />
          {loading && myProfile === null ? (
            <Loader />
          ) : (
            <Fragment>
              {myProfile ? (
                <Fragment>
                  {appointments !== null && appointments?.length > 0 ? (
                    <Patient patient={appointments} />
                  ) : (
                    <h5 style={{ color: "#738f93" }}>No Appointments yet..</h5>
                  )}
                  <Review
                    patient={appointments && appointments}
                    review={myProfile?.reviews}
                  />
                  <Experience experience={myProfile?.experience} />
                  <Education education={myProfile?.education} />
                  <button
                    onClick={() => dispatch(deleteProfile())}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i className="fas fa-user-minus"></i> Delete My Account
                  </button>
                </Fragment>
              ) : (
                <Fragment>
                  <p>You have not any Profile add your Profile..</p>
                  <Link to="/apply-doctor" className="btn btn-info">
                    Create Profile
                  </Link>
                </Fragment>
              )}
            </Fragment>
          )}
        </div>
      </section>
      <br />
    </Fragment>
  );
};

export default DoctorDashboard;
