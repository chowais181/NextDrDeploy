import { Fragment } from "react";
import Profiles from "./profiles/Profiles";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { myProfile } from "../features/profile/profileActions";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(myProfile());
  }, [dispatch]);

  return (
    <Fragment>
      <section id="dashboard">
        <div className="container">
          <Profiles />
        </div>
      </section>
    </Fragment>
  );
}
