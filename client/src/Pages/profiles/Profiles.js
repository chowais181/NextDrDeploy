import { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import ProfileItem from "./ProfileItem";
import { getAllProfilesUser } from "../../features/profile/profileActions";
import SearchNotFound from "../../components/SearchNotFound";
import Pagination from "react-js-pagination";
//.....................................................

export default function Profiles() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const handleClick = (e) => {
    e.preventDefault();
    setKeyword(searchRef.current.value);
    setCurrentPage(1);
  };

  const {
    profiles,
    loading,
    resultPerPage,

    filteredProfilesCount,
  } = useSelector((state) => state.profile);

  ///pagination

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  //----------------------
  let isProfileNotFound = 0;
  if (loading === false) {
    isProfileNotFound = profiles && profiles.length === 0;
  }

  useEffect(() => {
    dispatch(getAllProfilesUser({ currentPage, keyword }));
  }, [dispatch, currentPage, keyword]);
  return (
    <Fragment>
      <section className="profiles-page">
        <div className="container">
          <div className="heading-common">
            <h1>
              <strong>Doctor Profiles</strong>
            </h1>
          </div>
          <h2 className="welcome-heading">
            <i className="fas fa-user-md"></i> Book your Appointments
          </h2>

          <div className="search-profile">
            <div className="form-group has-search">
              <span className="fa fa-search form-control-feedback"></span>
              <form onSubmit={handleClick} className="srch">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="form-control"
                  placeholder="Search Doctor by name..."
                />
              </form>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              {isProfileNotFound && keyword !== "" ? (
                <SearchNotFound searchQuery={keyword} />
              ) : (
                <Fragment>
                  {profiles?.length > 0 ? (
                    profiles.map((profile) => (
                      <ProfileItem key={profile._id} profile={profile} />
                    ))
                  ) : (
                    <h2
                      style={{
                        textAlign: "center",
                        margin: "15%",
                        color: "red",
                      }}
                    >
                      No Profiles found..
                    </h2>
                  )}
                </Fragment>
              )}

              {profiles?.length > 0 && (
                <div className="pagination">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={filteredProfilesCount}
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
}
