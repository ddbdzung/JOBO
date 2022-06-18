<<<<<<< HEAD
import "./jobfilter.scss";

const JobFilter = () => {
  return (
    <div class="job-filter">
      <div className="job-filter_title">
        <h1>Lọc công việc</h1>
      </div>
      <hr />
      <div className="job-filter_classify">
        <h2>Loại công việc</h2>
        <span>
          <ion-icon name="chevron-up-outline"></ion-icon>
        </span>
        <form className="timejob">
          <input type="radio" id="thuctap" name="classify" value="thuctap" />
          <label>Thực tập</label>
          <br />
          <input type="radio" id="fulltime" name="classify" value="fulltime" />
          <label>Full time</label>
          <br />

          <input type="radio" id="parttime" name="classify" value="parttime" />
          <label>Part time</label>
          <br />

          <input
            type="radio"
            id="freelance"
            name="classify"
            value="freelance"
          />
          <label>Freelance</label>
        </form>

        <div class="switch_box">
          <input type="checkbox" class="switch_1" />
          <p>Làm việc từ xa</p>
        </div>
      </div>
      <hr />
      <div className="job-filter_location">
        <h2>Địa điểm</h2>
        <span>
          <ion-icon name="chevron-up-outline"></ion-icon>
        </span>
        <form className="location-job">
          <input type="radio" id="hanoi" name="location" value="hanoi" />
          <label>Hà Nội</label>
          <br />
          <input type="radio" id="hcm" name="location" value="hcm" />
          <label>TP. Hồ Chí Minh</label>
          <br />

          <input type="radio" id="danang" name="location" value="danang" />
          <label>Đà Nẵng</label>
          <br />

          <input type="radio" id="cantho" name="location" value="cantho" />
          <label>Cần Thơ</label>
        </form>
      </div>
      <hr />
      <div className="job-filter_exp">
        <h2>Kinh nghiệm</h2>
        <span>
          <ion-icon name="chevron-up-outline"></ion-icon>
        </span>
        <form className="exp-job">
          <input type="radio" id="less1" name="exp" value="less1" />
          <label>Dưới 1 năm</label>
          <br />
          <input type="radio" id="from13" name="exp" value="less13" />
          <label>Từ 1-3 năm</label>
          <br />

          <input type="radio" id="from35" name="exp" value="less35" />
          <label>Từ 3-5 năm</label>
          <br />

          <input type="radio" id="from510" name="exp" value="less510" />
          <label>Từ 5-10 năm</label>
          <br />

          <input type="radio" id="than10" name="exp" value="than10" />
          <label>10 năm trở nên</label>
        </form>
      </div>
      <hr />
      <div className="job-filter_category">
        <h2>Danh mục công việc</h2>
        <span>
          <ion-icon name="chevron-up-outline"></ion-icon>
        </span>
        <form className="category-job">
          <input
            type="radio"
            id="swEngineer"
            name="category"
            value="swEngineer"
          />
          <label>Software engineer</label>
          <br />
          <input
            type="radio"
            id="gpDesigner"
            name="category"
            value="gpDesigner"
          />
          <label>Graphic Designer</label>
          <br />

          <input
            type="radio"
            id="marketing"
            name="category"
            value="marketing"
          />
          <label>Marketing</label>
          <br />

          <input type="radio" id="sale" name="category" value="sale" />
          <label>Sale</label>
          <br />

          <input
            type="radio"
            id="personnel"
            name="category"
            value="personnel"
          />
          <label>Personnel</label>
        </form>
      </div>
    </div>
  );
=======
import React from "react";

const JobFilter = () => {
  return <div></div>;
>>>>>>> 3e9e3c324387fd41d4ca8e23faaa8b56d7b9fb31
};

export default JobFilter;
