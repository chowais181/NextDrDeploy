import React, { Fragment } from "react";

import { useSelector } from "react-redux";
import AdminCards from "./admin-cards/AdminCards";

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <Fragment>
      <section id="dashboard">
        <div className="container">
          <div className="heading-common">
            <h1>
              <strong>Dashboard</strong>
            </h1>
            <h2 className="welcome-heading">
              <i className="fas fa-user-md"></i> Welcome {userInfo?.name}
            </h2>
          </div>
          <br />
          <AdminCards />
        </div>
      </section>
      <br />
    </Fragment>
  );
};

export default AdminDashboard;
