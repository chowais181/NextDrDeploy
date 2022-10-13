import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getUserDetails } from "../../features/user/userActions";
import { myProfile } from "../../features/profile/profileActions";
const ProtectedRoute = (props) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    if (!userInfo) {
      dispatch(getUserDetails());
    }
    dispatch(myProfile());
  }, [dispatch, userInfo]);
  // show unauthorized screen if no user is found in redux store
  if (!localStorage.getItem("userToken")) {
    return <Navigate to="/" />;
  }
  // return the rest of the code here
  return props.children;
};

export default ProtectedRoute;
