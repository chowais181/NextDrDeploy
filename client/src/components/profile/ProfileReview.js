import React, { Fragment } from "react";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { deleteReview } from "../../features/profile/profileActions";

const ProfileReview = ({
  doctorId,
  review: { _id, comment, user, createdAt },
}) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  return (
    <Fragment>
      <div className="current-review">
        <div className="img-user">
          <img className="user-pic round-img" src={user?.avatar} alt="" />
          <h6>
            <strong>{user ? user?.name : "Deleted User"}</strong>
          </h6>
        </div>
        <div className="user-review">
          <p>{comment}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{createdAt}</Moment>
          </p>
          {user?._id === userInfo?._id && (
            <button
              onClick={() => dispatch(deleteReview({ _id, doctorId }))}
              className="btn btn-danger"
            >
              <i className="fa fa-trash" />
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileReview;
