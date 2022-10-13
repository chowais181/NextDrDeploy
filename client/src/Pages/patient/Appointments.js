import React, { useEffect, Fragment, useState } from "react";
import AppointmentItems from "./AppointmentItems";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { getMyAppointmentsUser } from "../../features/appointment/appointmentActions";
import Pagination from "react-js-pagination";

const Appointments = () => {
  const dispatch = useDispatch();
  const {
    loading,
    appointments,
    resultPerPage,
    total_appointments,
    isDeleted,
  } = useSelector((state) => state.appointment);
  const { userInfo } = useSelector((state) => state.user);

  ///pagination
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getMyAppointmentsUser({ currentPage }));
  }, [dispatch, currentPage, isDeleted]);

  return (
    <Fragment>
      <section id="dashboard">
        <div className="container">
          <div className="heading-common">
            <h1>
              <strong>My Appointments</strong>
            </h1>
            <h2 className="welcome-heading">
              <i className="fas fa-calendar-check"></i> {userInfo?.name}'s
              appointments
            </h2>
          </div>
          {loading && appointments !== null ? (
            <Loader />
          ) : (
            <Fragment>
              <div className="common-details">
                <br />
                {appointments?.length > 0 ? (
                  <div className="profiles">
                    <Fragment>
                      <AppointmentItems appointment={appointments} />
                    </Fragment>
                  </div>
                ) : (
                  <h4 style={{ color: "#738f93" }}>No Appointments found...</h4>
                )}
              </div>

              {appointments?.length > 0 && (
                <div className="pagination">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    rowsPerPageOptions={[resultPerPage]}
                    totalItemsCount={total_appointments}
                    onChange={setCurrentPageNo}
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
              )}
            </Fragment>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default Appointments;
