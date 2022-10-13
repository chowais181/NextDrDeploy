import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addExperience } from "../../features/profile/profileActions";
const AddExperience = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUpdated } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    position: "",
    institute: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { institute, position, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({
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
    <div>
      <Fragment>
        <section className="Login">
          <div className="container">
            <div style={{ height: "auto" }} className="common-form">
              <div className="form-side">
                <div className="heading-common">
                  <h1>
                    <strong>Add Experience </strong>
                    <i className="fab fa-black-tie"></i>
                  </h1>
                  <p className="lead">
                    <i className="fas fa-user"></i> Add any job or position that
                    you have had in the past or current
                  </p>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(addExperience(formData));
                  }}
                >
                 
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="* Position"
                      name="position"
                      value={position}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="* Location"
                      name="institute"
                      value={institute}
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
                          setFormData({ ...formData, current: !current });
                          toggleDisabled(!toDateDisabled);
                        }}
                      />{" "}
                      Current Job
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
                      Tell us a little about the job.
                    </small>
                  </div>
                  <input type="submit" className="btn btn-info" />{" "}
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
                  className="register-user"
                  src={
                    process.env.PUBLIC_URL +
                    "images/undraw_medical_research_qg4d.svg"
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    </div>
  );
};

export default AddExperience;
