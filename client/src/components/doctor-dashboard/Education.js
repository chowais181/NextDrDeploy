import React, { Fragment } from "react";
import Moment from "react-moment";
import { deleteEducation } from "../../features/profile/profileActions";
import { useDispatch } from "react-redux";
const Education = ({ education }) => {
  const dispatch = useDispatch();
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.university}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          "Now"
        ) : (
          <Moment format="DD/MM/YYYY">{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => dispatch(deleteEducation(edu._id))}
          type="button"
          className="btn btn-danger"
          style={{ color: "red" }}
        >
          X
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <div className="common-details">
        <h2 className="credentials">
          <strong>Education Credentials</strong>
        </h2>
        <br />
        <div className="common-table">
          <table className="table">
            <tr>
              <th>University</th>
              <th>Degree</th>
              <th>Years</th>
              <th></th>
            </tr>
            {educations}
          </table>
        </div>
      </div>
      <br />
    </Fragment>
  );
};

export default Education;
