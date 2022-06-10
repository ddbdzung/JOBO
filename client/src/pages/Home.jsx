import React from "react";
import CreateAcc from "../components/CreateAcc";
import Signin from "../components/Signin";
import "./home.scss";

const Home = () => {
  return (
    <div>
      <div className="header">
        <div className="header_logo">
          <img src="../images/logo.png" alt="" />
        </div>

        <ul className="header_nav">
          <li className="header_nav_thue">
            <a href="#">Thuê Freelancer</a>
          </li>
          <li className="header_nav_tim">
            <a href="#">Tìm việc làm</a>
          </li>
          <li className="header_nav_about">
            <a href="#">About Us</a>
          </li>
          <li className="header_nav_login">
            <a href="#">Đăng nhập</a>
          </li>
          <li className="header_nav_signin">
            <a href="#">Đăng ký</a>
          </li>
        </ul>
        <div className="header_icon-person">
          <button>
            <ion-icon name="person-circle-outline"></ion-icon>
          </button>
        </div>
      </div>
      <div className="container"></div>
      <div className="job-seeking">
        <input type="text" placeholder="Tìm kiếm việc làm" />
        <button>Search</button>
      </div>
      {/* <Signin /> */}
      {/* <CreateAcc /> */}
    </div>
  );
};

export default Home;
