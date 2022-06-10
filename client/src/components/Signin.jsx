import "./sign-in.scss";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        ),
      password: Yup.string()
        .required("")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Invalid username or password"
        ),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="sign-in">
      <div className="sign-in_left">
        <div className="sign-in_left_logo"></div>
        <div className="sign-in_left_text">
          Sign in <br /> or create an account
        </div>
      </div>
      <div className="sign-in_right">
        <div className="sign-in_right_header">
          <h1>Sign in</h1>
          <p>
            New user?
            <Link to="/createacc">Create an account</Link>
          </p>
        </div>
        <div className="sign-in_right_section">
          <form className="info-form" onSubmit={formik.handleSubmit}>
            <div className="info-form_email">
              <label>Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && (
                <p className="errorMsg"> {formik.errors.email} </p>
              )}
            </div>
            <div className="info-form_password">
              <label>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && (
                <p className="errorMsg"> {formik.errors.password} </p>
              )}
              <a href="">Forgot password</a>
            </div>
            <button className="info-form_btn-submit" type="submit">
              Continue
            </button>
          </form>
        </div>
        <div className="sign-in_right_footer">
          <div className="footer_line">
            <hr className="line-1" />
            <div className="or">Or</div>
            <hr className="line-2" />
          </div>
          <div className="footer_btn-gg">
            <div className="footer_btn-gg_icon">
              <ion-icon className="logo-google" name="logo-google"></ion-icon>
            </div>
            <div className="footer_btn-gg_text">Continue with Google</div>
          </div>
          <div className="footer_btn-fb">
            <div className="footer_btn-fb_icon">
              <ion-icon name="logo-facebook"></ion-icon>
            </div>
            <div className="footer_btn-fb_text">Continue with Facebook</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
