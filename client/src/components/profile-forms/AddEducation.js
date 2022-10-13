import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEducation } from "../../features/profile/profileActions";

const AddEducation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isUpdated } = useSelector((state) => state.profile);
  const [formData, setFormdata] = useState({
    university: "",
    degree: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { university, degree, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });

  // redirect to home page
  useEffect(() => {
    if (isUpdated) {
      navigate("/home");
    }
  }, [navigate, isUpdated]);

  return (
    <Fragment>
      <section className="Login">
        <div className="container">
          <div style={{ height: "auto" }} className="common-form">
            <div className="form-side">
              <div className="heading-common">
                <h1>
                  <strong>Add Education</strong>
                  <i className="fas fa-university"></i>
                </h1>
                <p className="lead">
                  <i className="fas fa-user"></i> Add any university,
                  Medicalcamp, etc that you have attended
                </p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(addEducation(formData));
                }}
              >
              
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="* University"
                    name="university"
                    value={university}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="* Degree or Certification"
                    name="degree"
                    value={degree}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <h6>From Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control"
                    name="from"
                    value={from}
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <p>
                    <input
                      type="checkbox"
                      name="current"
                      checked={current}
                      value={current}
                      onChange={(e) => {
                        setFormdata({ ...formData, current: !current });
                        toggleDisabled(!toDateDisabled);
                      }}
                    />{" "}
                    Current
                  </p>
                </div>
                <h6>To Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control"
                    name="to"
                    value={to}
                    onChange={(e) => onChange(e)}
                    max={new Date().toISOString().split("T")[0]}
                    disabled={toDateDisabled ? "disabled" : ""}
                    required={!toDateDisabled ? "required" : ""}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="description"
                    className="form-control"
                    placeholder=" Program Description"
                    value={description}
                    onChange={(e) => onChange(e)}
                  ></textarea>
                  <small className="form-text">
                    Tell us a little about the program.
                  </small>
                </div>
                <input
                  type="submit"
                  className="btn btn-info"
                  disabled={loading}
                />{" "}
                <Link
                  to="/dashboard"
                  type="submit"
                  className="btn btn-outline-secondary"
                >
                  Go Back
                </Link>
              </form>
              <br />
            </div>
            <div className="img-side">
              <img
                src={process.env.PUBLIC_URL + "images/graduation.svg"}
                alt=""
                className="register-user"
              />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default AddEducation;
