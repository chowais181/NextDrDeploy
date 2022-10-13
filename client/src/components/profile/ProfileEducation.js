import React, { Fragment } from "react";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { university, degree, from, to, description },
}) => {
  return (
    <Fragment>
      <div className="exp-common-details">
        <p className="mar-1">
          <Moment format="DD/MM/YYYY">{from}</Moment> -
          {!to ? "Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
        </p>
        <p>
          <strong>Degree: </strong> {degree}
        </p>
        <p>
          <strong>University: </strong> {university}
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

export default ProfileEducation;
