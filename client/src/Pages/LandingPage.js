import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../assets/App.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const { userInfo, isLogin } = useSelector((state) => state.user);
  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate, userInfo, isLogin]);
  return (
    <Fragment>
      <section className="profiles-page">
        <section id="landing">
          <div className="container">
            <div className="heading">
              <h1 className="main-heading">Find Your Best Doctor &</h1>
              <h1 className="main-heading">
                Book Your <span className="main-span">Appointment.</span>
              </h1>
            </div>
            <div className="signup">
              <div className="doctor-signup">
                <h2 className=" item heading-sub">
                  <strong>Login</strong>
                </h2>
                <p className="item description">
                  Welcome back!
                  <br />
                  We are facilitating both user and doctor. You can book your
                  Appointment with best doctors.
                </p>
                <Link to="/login" type="button" className="item btn btn-info">
                  Login
                </Link>
                <br />
              </div>
              <div className="user-signup">
                <h2 className="item heading-sub">
                  <strong>Sign Up</strong>
                </h2>
                <p className="item special description">
                  Welcome.New User!
                  <br />
                  Best app for finding your doctor and book Appointment.
                  Automate manually booking.
                </p>
                <Link to="/register" className="item btn btn-outline-info">
                  Sign up
                </Link>
                <br />
              </div>
            </div>
            <br />
            <div className="img">
              <div className="img-1">
                <img
                  alt="doctor"
                  src={process.env.PUBLIC_URL + "images/landingPage.svg"}
                />
              </div>
            </div>
          </div>
          <br />
          <br />
        </section>
      </section>

      <br />
    </Fragment>
  );
}
