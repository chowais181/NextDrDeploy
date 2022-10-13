import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { getSingleProfile } from "../../features/profile/profileActions";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileReview from "./ProfileReview";
import ReviewForm from "../profile/ReviewForm";
import { useParams, Link } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { loading, profile } = useSelector((state) => state.profile);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSingleProfile(id));
  }, [id, dispatch]);

  return (
    <Fragment>
      <br />
      <section id="profile-page">
        <div className="container">
          <div className="current-profile">
            {userInfo?.role === "admin" ? (
              ""
            ) : (
              <div className="current-btn">
                <Link className="rounded-pill btn btn-dark" to="/home">
                  Back to Profiles
                </Link>
                <Fragment>
                  <Link
                    to={`/home/appointment/${id}`}
                    type="button"
                    className="rounded-pill btn btn-info"
                  >
                    <i className="fas fa-calendar-check"></i> Book Appointment
                  </Link>
                </Fragment>

                {id === userInfo?._id ? (
                  <Link
                    to="/edit-profile"
                    className="rounded-pill btn btn-secondary"
                  >
                    <i className="fas fa-edit"></i>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            )}

            <br />
            {profile === null || loading ? (
              <Loader />
            ) : (
              <Fragment>
                <ProfileTop profile={profile} />
                <br />

                <ProfileAbout profile={profile} />
                <div className="exp-edu">
                  <div className="exp-bottom">
                    <h2 className="exp-common-heading">Experience</h2>
                    {profile?.experience?.length > 0 ? (
                      <Fragment>
                        {profile?.experience?.map((experience) => (
                          <ProfileExperience
                            key={experience._id}
                            experience={experience}
                          />
                        ))}
                      </Fragment>
                    ) : (
                      <h4>No Experience credentials</h4>
                    )}
                  </div>
                  <div className="edu-bottom">
                    <h2 className="exp-common-heading">Education</h2>
                    {profile?.education?.length > 0 ? (
                      <Fragment>
                        {profile?.education?.map((education) => (
                          <ProfileEducation
                            key={education._id}
                            education={education}
                          />
                        ))}
                      </Fragment>
                    ) : (
                      <h4>No education credentials</h4>
                    )}
                  </div>
                </div>
                <br/>
                <div className="patient-review">
                  <h2 className="exp-common-heading">Patient Reviews</h2>

                  {userInfo?.role === "admin" ? (
                    ""
                  ) : (
                    <ReviewForm profileId={profile?._id} />
                  )}

                  {profile?.reviews?.length > 0 ? (
                    <Fragment>
                      <h4 className="exp-common-heading1">
                        Total Reviews: {profile?.reviews?.length}
                      </h4>
                      {profile.reviews.map((rev) => (
                        <ProfileReview
                          key={rev._id}
                          review={rev}
                          doctorId={profile?._id}
                        />
                      ))}
                    </Fragment>
                  ) : (
                    <h4>No Reviews</h4>
                  )}
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Profile;
