import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../assets/App.css";
import Alert from "@mui/material/Alert";
//-------------------
import toast from "react-hot-toast";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../features/user/userActions";
//------------------
const Register = () => {
  const initialValues = {
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    // profileImage: null,
    acceptTerms: false,
  };

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
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/,
        `Password must contain lowercase, uppercase,number, special character & length 8-20`
      )
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must not exceed 20 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),

    // profileImage: Yup.mixed()
    //   .test("type", "Invalid Image format", (value) => {
    //     return (
    //       (value && value.type === "image/jpeg") ||
    //       value.type === "image/jpg" ||
    //       value.type === "image/png"
    //     );
    //   })
    //   .test(
    //     "size",
    //     "File size is too big",
    //     (value) => value && value.size <= 1 * 1024 * 1024 // 1MB),
    //   ),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isRegister } = useSelector((state) => state.user);

  const [pic, setPic] = useState(null);

  const handleSubmit = (data) => {
    data.profileImage = pic;
    console.log(data);
    dispatch(registerUser(data));
  };

  // redirect to login page
  useEffect(() => {
    if (isRegister) {
      toast.success("Sign Up successfully");
      navigate("/login");
      //for false is register
      dispatch(registerUser());
    }
  }, [navigate, isRegister, dispatch]);

  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <section id="common">
            <div className="container">
              <div className="common-form">
                <div className="form-side">
                  <div className="heading-common">
                    <h1>
                      <strong>Sign Up </strong>
                      <i className="fas fa-user-plus"></i>
                    </h1>
                  </div>

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
                        <label htmlFor="password" className="label">
                          {" "}
                          Password{" "}
                        </label>
                        <Field
                          name="password"
                          type="password"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="confirmPassword" className="label">
                          {" "}
                          Confirm Password{" "}
                        </label>
                        <Field
                          name="confirmPassword"
                          type="password"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="profileImage" className="label">
                          {" "}
                          Upload Image{" "}
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

                      <div className="form-group form-check">
                        <Field
                          name="acceptTerms"
                          type="checkbox"
                          className="form-check-input"
                        />
                        <label
                          htmlFor="acceptTerms"
                          className="form-check-label"
                        >
                          I have read and agree to the Terms
                        </label>
                        <ErrorMessage
                          name="acceptTerms"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-info"
                          disabled={loading}
                        >
                          Sign Up
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
                <div className="img-side">
                  <img
                    className="register-user"
                    src={process.env.PUBLIC_URL + "images/newDoctor1.svg"}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </Formik>
    </Fragment>
  );
};

export default Register;
