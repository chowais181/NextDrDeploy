import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addReview,
  getSingleProfile,
} from "../../features/profile/profileActions";

const ReviewForm = ({ profileId }) => {
  const [comment, setText] = useState("");
  const { isCreated } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isCreated) {
      dispatch(getSingleProfile(profileId));
    }
  });

  return (
    <Fragment>
      <div className="text-area-style">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addReview({ profileId, comment }));
            setText("");
          }}
        >
          <textarea
            className="text-area"
            name="text"
            cols="20"
            rows="3"
            placeholder="Write a review"
            required
            value={comment}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <input type="submit" value="Submit" className="btn btn-secondary" />
        </form>
      </div>
    </Fragment>
  );
};

export default ReviewForm;
