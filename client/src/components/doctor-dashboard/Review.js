import React, { Fragment } from "react";
import Moment from "react-moment";
import Graph from "./Graph";

const Review = ({ review, patient }) => {
  const reviews = review.map((rev) => (
    <div className="card" key={rev._id}>
      <img className="card-img-top" src={rev.user?.avatar} alt="Card  cap" />
      <div className="card-body">
        <em>{rev.user?.name}</em>
        <p className="card-text">{rev.comment}</p>
        <p className="post-date">
          posted on <Moment format="DD/MM/YYYY">{rev.createdAt}</Moment>
        </p>
      </div>
    </div>
  ));
  return (
    <Fragment>
      <div className="review-graph">
        <div className="common-details">
          <h2 className="credentials">
            <strong>Users Reviews</strong>
          </h2>
          <br />
          <div id="testimonials">
            <div className="scroll">
              {review.length === 0 ? "No Reviews Yet" : reviews}
            </div>
          </div>
        </div>
        <br />
        <div className="common-details">
          <h2 className="credentials">
            <br />
            <strong>Total Appointments</strong>
          </h2>
          <br />
          <div id="graph">
            <Graph patient={patient ? patient : null} />
          </div>
        </div>
      </div>
      <br />
    </Fragment>
  );
};

export default Review;
