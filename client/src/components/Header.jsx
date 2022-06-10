import React from "react";
import image from "../images/logo.png";
import "./header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header_logo">
        <img src={image} alt="" />
      </div>

      <ul className="header_nav">
        <li className="header_nav_thue">
          <Link to="/createacc">Thuê Freelancer</Link>
        </li>
        <li className="header_nav_tim">
          <Link to="/createacc">Tìm việc làm</Link>
        </li>
        <li className="header_nav_about">
          <Link to="/createacc">Giới thiệu</Link>
        </li>
        <li className="header_nav_login">
          <Link to="/signin">Đăng nhập</Link>
        </li>
        <li className="header_nav_signin">
          <Link to="/createacc">Đăng ký</Link>
        </li>
      </ul>
      <div className="header_icon-person">
        <button>
          <ion-icon name="person-circle-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
};

export default Header;
