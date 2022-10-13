import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import ProfileTop from "../profile/ProfileTop";
import ProfileAbout from "../profile/ProfileAbout";
import ProfileExperience from "../profile/ProfileExperience";
import ProfileEducation from "../profile/ProfileEducation";
import ProfileReview from "../profile/ProfileReview";

const ViewProfile = () => {
  const { loading, myProfile } = useSelector((state) => state.profile);

  return (
    <Fragment>
      <br />
      <section id="profile-page">
        <div className="container">
          <div className="current-profile">
            {myProfile === null || loading ? (
              <Loader />
            ) : (
              <Fragment>
                <ProfileTop profile={myProfile} />
                <br />

                <ProfileAbout profile={myProfile} />
                <div className="exp-edu">
                  <div className="exp-bottom">
                    <h2 className="exp-common-heading">Experience</h2>
                    {myProfile?.experience?.length > 0 ? (
                      <Fragment>
                        {myProfile?.experience?.map((experience) => (
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
                    {myProfile?.education?.length > 0 ? (
                      <Fragment>
                        {myProfile?.education?.map((education) => (
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
                <br />
                <div className="patient-review">
                  <h2 className="exp-common-heading">Patient Reviews</h2>
                  {myProfile?.reviews?.length > 0 ? (
                    <Fragment>
                      <h4 className="exp-common-heading1">
                        Total Reviews: {myProfile?.reviews?.length}
                      </h4>
                      {myProfile.reviews.map((rev) => (
                        <ProfileReview
                          key={rev._id}
                          review={rev}
                          doctorId={myProfile?._id}
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

export default ViewProfile;
