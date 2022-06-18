import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CreateAcc from "../components/CreateAcc";
import Signin from "../components/Signin";
import "./home.scss";
<<<<<<< HEAD
import F_Profile from "../components/FProfile";
import JobFilter from "../components/JobFilter";
import JobSeeking from "../components/JobSeeking";
import Header from "../components/Header";
=======
>>>>>>> 3e9e3c324387fd41d4ca8e23faaa8b56d7b9fb31

const Home = () => {
  const data = [
    {
      staff: "Thiết kế bộ phận thương hiệu",
      company: "Harvey Nash",
      address: "Mỹ Đức, Hà Nội",
      wage: "$700-1000",
      experience: "Từ 1-3 năm",
      workingTime: "Full time",
      timeAgo: "Created 11 days ago",
      hotjob: true,
      bookmark: true,
    },
    {
      staff: "Nhà phát triển website",
      company: "KMS Technology",
      address: "Củ Chi, TP. Hồ Chí Minh",
      wage: "$500-1000",
      experience: "Từ 5-10 năm",
      workingTime: "Freelance",
      timeAgo: "Created 7 days ago",
      hotjob: false,
      bookmark: false,
    },
    {
      staff: "Thiết kế photoshop",
      company: "Global CyberSoft",
      address: "Phong Điền, Cần Thơ",
      wage: "$400-700",
      experience: "Từ 1-3 năm",
      workingTime: "Full time",
      timeAgo: "Created 9 days ago",
      hotjob: false,
      bookmark: false,
    },
    {
      staff: "Lập trình react native",
      company: "TMA Solutions",
      address: "Cái Răng, Cần Thơ",
      wage: "$300-500",
      experience: "Từ 1-3 năm",
      workingTime: "Part time",
      timeAgo: "Created 2 days ago",
      hotjob: false,
      bookmark: false,
    },
    {
      staff: "Chuyên viên marketing",
      company: "CMC Corporation",
      address: "Thanh Khê, Đà Nẵng",
      wage: "$600-800",
      experience: "Từ 3-5 năm",
      workingTime: "Freelance",
      timeAgo: "Created 2 days ago",
      hotjob: false,
      bookmark: false,
    },
    {
      staff: "Ui,Ux Designer",
      company: "FPT software",
      address: "Cẩm Lệ, Đà Nẵng",
      wage: "$100-600",
      experience: "Dưới 1 năm",
      workingTime: "Full time",
      timeAgo: "Created 5 days ago",
      hotjob: false,
      bookmark: false,
    },
  ];

  return (
    <div>
<<<<<<< HEAD
      <Header />

      <div className="container"></div>

      <JobSeeking />

      <JobFilter />

      <div className="list-Fprofile">
        {data.map((item, index) => (
          <>
            <F_Profile
              key={index}
              staff={item.staff}
              company={item.company}
              address={item.address}
              wage={item.wage}
              experience={item.experience}
              workingTime={item.workingTime}
              timeAgo={item.timeAgo}
              hotjob={item.hotjob}
              bookmark={item.bookmark}
            />
          </>
        ))}
      </div>

      {/* <Signin />
      <CreateAcc /> */}
=======
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
>>>>>>> 3e9e3c324387fd41d4ca8e23faaa8b56d7b9fb31
    </div>
  );
};

export default Home;
