import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../features/profile/profileActions";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isUpdated, myProfile } = useSelector(
    (state) => state.profile
  );

  const [social, setSocial] = useState({
    twitter: "",
    facebook: "",
    youtube: "",
    instagram: "",
  });
  const [formData, setFormData] = useState({
    hospital: "",
    website: "",
    location: "",
    specialist: "",
    fees: "",
    timing: "",
    bio: "",
  });

  const [displySocialInputs, toggleSocialInputs] = useState(false);

  const { hospital, website, location, specialist, fees, timing, bio } =
    formData;
  const { twitter, facebook, youtube, instagram } = social;

  const onChangeSocial = (e) =>
    setSocial({
      ...social,
      [e.target.name]: e.target.value,
    });

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const profileData = { ...formData, social };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profileData));
  };
  // redirect to home page
  useEffect(() => {
    if (isUpdated) {
      navigate("/home");
    }
  }, [navigate, isUpdated]);

  useEffect(() => {
    setFormData({
      hospital: loading || !myProfile?.hospital ? "" : myProfile?.hospital,
      website: loading || !myProfile?.website ? "" : myProfile?.website,
      location: loading || !myProfile?.location ? "" : myProfile?.location,
      specialist:
        loading || !myProfile?.specialist ? "" : myProfile?.specialist,
      fees: loading || !myProfile?.fees ? "" : myProfile?.fees,
      timing: loading || !myProfile?.timing ? "" : myProfile?.timing,
      bio: loading || !myProfile?.bio ? "" : myProfile?.bio,
    });

    setSocial({
      twitter: loading || !myProfile?.social ? "" : myProfile?.social?.twitter,
      facebook:
        loading || !myProfile?.social ? "" : myProfile?.social?.facebook,
      youtube: loading || !myProfile?.social ? "" : myProfile?.social?.youtube,
      instagram:
        loading || !myProfile?.social ? "" : myProfile?.social?.instagram,
    });
  }, [loading, myProfile]);

  return (
    <Fragment>
      <section className="Login">
        <div className="container">
          <div style={{ height: "auto" }} className="common-form">
            <div className="form-side">
              <div className="heading-common">
                <h1>
                  <strong>Edit Profile </strong>
                  <i className="far fa-id-card"></i>
                </h1>
                <p className="lead">
                  <i className="fas fa-user"></i> Edit your profile, enter all
                  the correct information to make your profile stand out.
                </p>
              </div>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="* Hospital or Clinic"
                    name="hospital"
                    value={hospital}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <small className="form-text text-muted">
                    Could be your own clinic or one you work{" "}
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="* Specialist"
                    name="specialist"
                    value={specialist}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <small className="form-text text-muted">
                    Give us an idea of your specalist.{" "}
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="* Timing. e.g. Mon-Fri 10:00 am to 5:00 pm"
                    name="timing"
                    value={timing}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <small className="form-text text-muted">
                    At which time you are available for patients, mention day
                    with time.{" "}
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="* Fees"
                    name="fees"
                    value={fees}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <small className="form-text text-muted">
                    Checkup fee per appointment booking.{" "}
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="* Location."
                    name="location"
                    value={location}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <small className="form-text text-muted">
                    Could be your own clinic address or one you work{" "}
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Website."
                    name="website"
                    value={website}
                    onChange={(e) => onChange(e)}
                  />
                  <small className="form-text text-muted">
                    Could be your own or a clinic website{" "}
                  </small>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    placeholder=" A short bio of yourself"
                    name="bio"
                    value={bio}
                    onChange={(e) => onChange(e)}
                  />
                  <small className="form-text">
                    Tell us a little about yourself
                  </small>
                </div>
                <div className="mb-3">
                  <button
                    onClick={() => toggleSocialInputs(!displySocialInputs)}
                    type="button"
                    className="btn btn-outline-secondary"
                  >
                    Edit Social Network Links
                  </button>
                  <span className="text-muted"> Optional</span>
                </div>
                {displySocialInputs && (
                  <Fragment>
                    <div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fab fa-twitter"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Twitter Profile URL"
                          name="twitter"
                          value={twitter}
                          onChange={(e) => onChangeSocial(e)}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fab fa-facebook"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Facebook Profile URL"
                          name="facebook"
                          value={facebook}
                          onChange={(e) => onChangeSocial(e)}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fab fa-youtube"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Youtube Profile URL"
                          name="youtube"
                          value={youtube}
                          onChange={(e) => onChangeSocial(e)}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fab fa-instagram"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Instagram Profile URL"
                          name="instagram"
                          value={instagram}
                          onChange={(e) => onChangeSocial(e)}
                        />
                      </div>
                    </div>
                  </Fragment>
                )}
                <input
                  type="submit"
                  className="btn btn-info"
                  disabled={loading}
                />{" "}
                <Link to="/home" className="btn btn-outline-secondary">
                  Go Back
                </Link>
              </form>
              <br />
            </div>
            <div className="img-side">
              <img
                src={process.env.PUBLIC_URL + "images/mention.svg"}
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

export default EditProfile;
