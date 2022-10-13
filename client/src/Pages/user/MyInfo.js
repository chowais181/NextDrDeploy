import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../assets/App.css";
import Alert from "@mui/material/Alert";
import Loader from "../../components/Loader";
//-----------------------
import React, { Fragment, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateUser, getUserDetails } from "../../features/user/userActions";
//------------------
const MyInfo = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Enter full name")
      .matches(/^[a-zA-Z\s*]+$/, "Enter correct name")
      .min(3, "Enter full name")
      .max(30, "Name length exceeds"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^(\+92|0|92)(3)[0-9]{9}$/, "Not a valid number"),
  });

  const { loading, error, isUpdated, userInfo } = useSelector(
    (state) => state.user
  );

  const initialValues = {
    name: userInfo?.name,
    phoneNumber: userInfo?.phoneNumber,
    email: userInfo?.email,
    previousPic: userInfo?.avatar,
  };

  const dispatch = useDispatch();

  const [pic, setPic] = useState(null);

  const handleSubmit = (data) => {
    console.log(data);
    data.avatar = pic;
    // set the set pic null again
    setPic(null);
    if (JSON.stringify(data) !== JSON.stringify(initialValues)) {
      dispatch(updateUser(data));
      dispatch(getUserDetails());
    }
  };

  // redirect to login page
  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <section id="common">
              <div className="container">
                <div className="common-form">
                  <div className="form-side">
                    <div className="heading-common">
                      <h1>
                        <strong> My Info </strong>
                        <i className="fas fa-user"></i>
                      </h1>
                    </div>

                    {/* <div className="top-img"> */}
                    <img
                      className="round-img-myInfo"
                      src={userInfo?.avatar}
                      alt=""
                    />
                    {/* </div> */}

                    <div className="register-form">
                      <hr />
                      {error && (
                        <Alert variant="outlined" severity="error">
                          {error}
                        </Alert>
                      )}
                      <Form>
                        <div className="form-group">
                          <label className="label">Name</label>
                          <Field
                            name="name"
                            type="text"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="email" className="label">
                            {" "}
                            Email{" "}
                          </label>
                          <Field
                            name="email"
                            type="email"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="username" className="label">
                            {" "}
                            Phone Number{" "}
                          </label>
                          <Field
                            name="phoneNumber"
                            className="form-control"
                            placeholder="E.g. 03001234567"
                          />
                          <ErrorMessage
                            name="phoneNumber"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="profileImage" className="label">
                            {" "}
                            Profile Image{" "}
                          </label>
                          <input
                            name="profileImage"
                            id="profileImage"
                            type="file"
                            className="form-control"
                            onChange={(event) => {
                              setPic(event.target.files[0]);
                            }}
                          />
                        </div>

                        <br />
                        <div className="form-group">
                          <button
                            type="submit"
                            className="btn btn-info"
                            disabled={loading}
                          >
                            Update
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                  <div className="img-side">
                    <img
                      className="register-user"
                      src={process.env.PUBLIC_URL + "images/mention.svg"}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <br />
            </section>
          </Formik>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyInfo;
