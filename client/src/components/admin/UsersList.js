import React, { Fragment, useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import Tooltip from "@mui/material/Tooltip";
import { confirmAlert } from "react-confirm-alert";
import {
  getAllUser,
  deleteUser,
  updateUserRole,
} from "../../features/user/userActions";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export default function UsersList() {
  const { loading, users, isDeleted, isUpdated, total_user, resultPerPage } =
    useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e + 1);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser(currentPage));
  }, [dispatch, isDeleted, isUpdated, currentPage]);

  // ------------- columns -------------
  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.1,
    },

    {
      field: "phoneNumber",
      headerName: "Phone Number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.5,

      renderCell: (params) => {
        return (
          <Fragment>
            <Box sx={{ minWidth: 150 }}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={params.row.role}
                  label="Role"
                  onChange={(e) => {
                    dispatch(
                      updateUserRole({
                        id: params.row.id,
                        role: e.target.value,
                      })
                    );
                  }}
                >
                  <MenuItem value={"patient"}>Patient</MenuItem>
                  <MenuItem value={"doctor"}>Doctor</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Box>
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
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <button className="btn-action">
              <Tooltip title="Delete User">
                <Icon
                  icon="eva:person-delete-fill"
                  color="red"
                  width="25"
                  height="25"
                  onClick={() => {
                    confirmAlert({
                      title: "Delete User",
                      message: "Are you sure to delete this user ?",
                      buttons: [
                        {
                          label: "Yes",
                          onClick: () =>
                            dispatch(
                              deleteUser({
                                id: params.row.id,
                                avatar: params.row.avatar,
                              })
                            ),
                        },
                        {
                          label: "No",
                          // onClick: () => alert("Click No")
                        },
                      ],
                    });
                  }}
                />
              </Tooltip>
            </button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];

  // we slice the array bcz we cannot sort the array in strict mode without it
  users.map((item) => {
    rows.push({
      id: item._id,
      avatar: item.avatar,
      name: item.name,
      email: item.email,
      role: item.role,
      createdAt: item.createdAt.substring(0, 10),
      phoneNumber: "+" + item.phoneNumber,
    });
    return 1;
  });

  return (
    <Fragment>
      <section className="profiles-page">
        <div className="container">
          <div className="heading-common">
            <h1>
              <strong>Users List</strong>
            </h1>
          </div>
          <h2 className="welcome-heading">
            <i className="fas fa-user"></i> Registered Users
          </h2>
          <br />

          {users?.length > 0 ? (
            <div className="datagrid">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={resultPerPage}
                rowsPerPageOptions={[resultPerPage]}
                loading={loading}
                disableSelectionOnClick
                components={{ Toolbar: GridToolbar }}
                page={currentPage - 1}
                paginationMode="server"
                rowCount={total_user}
                onPageChange={setCurrentPageNo}
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
                  No user found..
                </h2>
              )}
            </Fragment>
          )}
        </div>
        <br />
      </section>
    </Fragment>
  );
}
