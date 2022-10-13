import React, { Fragment, useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import Tooltip from "@mui/material/Tooltip";
import {
  getAllProfiles,
  updateProfileStatus,
} from "../../features/profile/profileActions";
import { useNavigate } from "react-router-dom";

export default function UsersList() {
  const { loading, profiles, isUpdated, total_profiles, resultPerPage } =
    useSelector((state) => state.profile);
    
  const navigate = useNavigate();
  const changeStatus = (id, status) => {
    dispatch(updateProfileStatus({ id, status }));
  };

  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e + 1);
  };

  let keyword = "";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProfiles({ currentPage, keyword }));
    console.log(currentPage);
  }, [dispatch, currentPage, keyword, isUpdated]);

  // ------------- columns -------------
  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.1,
    },
    {
      field: "hospital",
      headerName: "Hospital",
      minWidth: 200,
      flex: 0.1,
    },

    {
      field: "location",
      headerName: "Location",
      minWidth: 250,
      flex: 2.5,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "profileStatus",
      headerName: "Profile Status",
      minWidth: 130,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Fragment>
            <div
              style={{
                color:
                  params.row.profileStatus === "pending"
                    ? "blue"
                    : params.row.profileStatus === "accepted"
                    ? "green"
                    : "red",
              }}
            >
              {params.row.profileStatus}
            </div>
          </Fragment>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "view",
      headerName: "View",
      minWidth: 100,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <button className="btn-action">
              <Tooltip title="View Complete Profile">
                <Icon
                  icon="carbon:view"
                  width="25"
                  height="25"
                  color="#fcba03"
                  onClick={() => {
                    navigate(`/doctor-list/doctor/${params.row.id}`);
                  }}
                />
              </Tooltip>
            </button>
          </Fragment>
        );
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            {params.row.profileStatus === "pending" ? (
              <Fragment>
                <button className="btn-action">
                  <Tooltip title="Accept user application for doctor ">
                    <Icon
                      icon="icon-park-solid:correct"
                      color="green"
                      width="25"
                      height="25"
                      onClick={() => {
                        changeStatus(params.row.id, "accepted");
                      }}
                    />
                  </Tooltip>
                </button>

                <button className="btn-action">
                  <Tooltip title="Cancel user application for doctor">
                    <Icon
                      icon="material-symbols:cancel-outline"
                      color="red"
                      width="25"
                      height="25"
                      onClick={() => {
                        changeStatus(params.row.id, "cancelled");
                      }}
                    />
                  </Tooltip>
                </button>
              </Fragment>
            ) : params.row.profileStatus === "cancelled" ? (
              <strong style={{ color: "red" }}>Cancelled</strong>
            ) : (
              <strong style={{ color: "green" }}>Accepted</strong>
            )}
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  // we slice the array bcz we cannot sort the array in strict mode without it
  profiles?.map((item, index) => {
    rows.push({
      id: item._id,
      name: item.name,
      hospital: item.hospital,
      location: item.location,
      createdAt: item.createdAt.substring(0, 10),
      phoneNumber: "+" + item?.doctor?.phoneNumber,
      profileStatus: item.profileStatus,
    });
    return 1;
  });

  return (
    <Fragment>
      <section className="profiles-page">
        <div className="container">
          <div className="heading-common">
            <h1>
              <strong>Doctors List</strong>
            </h1>
          </div>
          <h2 className="welcome-heading">
            <i className="fas fa-user-md"></i> Users who applied for doctor role
          </h2>

          <br />

          {profiles?.length > 0 ? (
            <div className="datagrid">
              <DataGrid
                rows={rows}
                columns={columns}
                rowsPerPageOptions={[resultPerPage]}
                pagination
                page={currentPage - 1}
                pageSize={resultPerPage}
                paginationMode="server"
                rowCount={total_profiles}
                onPageChange={setCurrentPageNo}
                disableSelectionOnClick
                components={{ Toolbar: GridToolbar }}
                loading={loading}
                autoHeight
                sx={{
                  m: 1,
                  boxShadow: 2,
                }}
              />
            </div>
          ) : (
            <Fragment>
              {loading ? (
                ""
              ) : (
                <h2
                  style={{ textAlign: "center", margin: "15%", color: "red" }}
                >
                  No doctor profile found..
                </h2>
              )}
            </Fragment>
          )}
        </div>
      </section>
    </Fragment>
  );
}
