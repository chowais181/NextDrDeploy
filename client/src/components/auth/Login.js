import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../features/user/userActions";
import { useEffect, Fragment } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
// import Error from "../Error";
import toast from "react-hot-toast";
import Alert from "@mui/material/Alert";
const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });

  const { loading, userInfo, error, isLogin } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (isLogin) {
      toast.success("Login successfully");
    }
    if (userInfo) {
      navigate("/admin-dashboard");
    }
  }, [navigate, userInfo, isLogin]);

  const handleSubmit = (data) => {
    dispatch(userLogin(data));
  };

  return (
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
                    <strong>Login </strong>
                    <i className="fas fa-sign-in-alt"></i>
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
                    <br />
                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-info"
                        disabled={loading}
                      >
                        Login
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
              <div className="img-side">
                <img
                  alt="login"
                  className="register-user"
                  src={process.env.PUBLIC_URL + "images/undraw_forms_78yw.svg"}
                />
              </div>
            </div>
          </div>
        </section>
      </Formik>
    </Fragment>
  );
};

export default Login;
