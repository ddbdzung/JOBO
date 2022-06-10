import "./create-acc.scss";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const CreateAcc = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      // firstName: "",
      // lastName: "",
      password: "",
      confirm: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        ),

      // firstName: Yup.string().required(""),

      // lastName: Yup.string().required(""),

      // fistName: Yup.string()
      //   .required("")
      //   .min(4, "Must be 4 characters or more"),

      // lastName: Yup.string()
      //   .required("")
      //   .min(4, "Must be 4 characters or more"),

      password: Yup.string()
        .required("")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Invalid username or password"
        ),
      confirm: Yup.string()
        .required("")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  // const navigate = useNavigate();

  // const handleSubmit =  () => {
  axios({
    method: "post",
    url: "http://localhost:3000/api/v1/auth/login",
    data: {
      email: email,
      password: password,
      confirm: confirm,
    },
  })
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
    });
  //   console.log(resData);

  //   if (resData.request.status === 200) {
  //     console.log("Đăng ky thành công");
  //     navigate("/");
  //     localStorage.setItem("accessToken", resData.data.token);
  //     localStorage.setItem("isLogin", true);
  //   }
  // };

  return (
    <div className="sign-in">
      <div className="sign-in_left">
        <div className="sign-in_left_logo"></div>
        <div className="sign-in_left_text">
          Sign in <br /> or create an account
        </div>
      </div>
      <div className="create-acc_right">
        <div className="create-acc_right_header">
          <h1>Create an account</h1>
          <p className="create-acc_right_header_already">
            Already have an account?
            <Link to="/signin">Sign in</Link>
          </p>
          <p className="create-acc_right_header_email">Sign up with email</p>
        </div>
        <div className="create-acc_right_section">
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
                <p className="errorMsg">{formik.errors.email}</p>
              )}
            </div>

            {/* <div className="info-form_firstName">
              <label>First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              {formik.errors.firstName && (
                <p className="errorMsg">{formik.errors.firstName}</p>
              )}
            </div>

            <div className="info-form_lastName">
              <label>Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
              {formik.errors.lastName && (
                <p className="errorMsg">{formik.errors.lastName}</p>
              )}
            </div> */}

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
                <p className="errorMsg">{formik.errors.password}</p>
              )}
            </div>

            <div className="info-form_confirm">
              <label>Confirm</label>
              <input
                type="password"
                id="confirm"
                name="confirm"
                value={formik.values.confirm}
                onChange={formik.handleChange}
              />
              {formik.errors.confirm && (
                <p className="errorMsg">{formik.errors.confirm}</p>
              )}
            </div>

            <button className="info-form_btn-submit" type="submit">
              Continue
            </button>
          </form>
        </div>
        <div className="create-acc_right_footer">
          <div className="footer_line">
            <hr className="line-1" />
            <div className="or">Or</div>
            <hr className="line-2" />
          </div>
          <p className="signup_social">Sign up with social</p>
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

export default CreateAcc;
