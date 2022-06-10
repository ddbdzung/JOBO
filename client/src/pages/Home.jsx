import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CreateAcc from "../components/CreateAcc";
import Signin from "../components/Signin";
import "./home.scss";
import F_Profile from "../components/FProfile";
import JobFilter from "../components/JobFilter";
import JobSeeking from "../components/JobSeeking";
import Header from "../components/Header";

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
    </div>
  );
};

export default Home;
