import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProfile } from "../../features/profile/profileActions";
import Loader from "../Loader";
import Form from "./Form";
import { useParams, useNavigate } from "react-router-dom";

const AppointmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, isCreated } = useSelector((state) => state.appointment);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getSingleProfile(id));
    if (isCreated) {
      navigate("/appointments");
    }
  }, [id, dispatch, isCreated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <section id="Login">
          <div className="container">
            <div className="common-form">
              <div className="form-side">
                {profile !== null ? (
                  <Form profile={profile} profileId={profile?._id} />
                ) : (
                  ""
                )}
              </div>
              <div className="img-side">
                <img
                  src={process.env.PUBLIC_URL + "/images/calendar.svg"}
                  alt=""
                  className="register-user"
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default AppointmentForm;
