import React, { Fragment } from "react";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { medical, position, institute, from, to, description },
}) => {
  return (
    <Fragment>
      <div className="exp-common-details">
        <h5 className="profile-p">
          <strong>{medical}</strong>
        </h5>
        <p className="mar-1">
          <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
          {!to ? "Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
        </p>
        <p>
          <strong>Position: </strong> {position}
        </p>
        <p>
          <strong>Location: </strong> {institute}
        </p>
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      </div>
      <hr />
    </Fragment>
  );
};

export default ProfileExperience;
