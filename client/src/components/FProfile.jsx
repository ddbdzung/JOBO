import "./fprofile.scss";

const FProfile = (props) => {
  return (
    <div className="featured-profile">
      <div className="featured-profile_logo">
        <img
          src="https://images.unsplash.com/photo-1565464027194-7957a2295fb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          alt=""
        />
      </div>
      {props.hotjob && (
        <div className="featured-profile_hotjob">
          <p>HOT JOB</p>
          <span>
            <ion-icon name="star-outline"></ion-icon>
          </span>
        </div>
      )}

      {props.bookmark && (
        <div className="featured-profile_bookmark">
          <span>
            <ion-icon name="bookmark-outline"></ion-icon>
          </span>
        </div>
      )}

      <div className="featured-profile_staff">{props.staff}</div>
      <div className="featured-profile_company">{props.company}</div>
      <div className="featured-profile_address">{props.address}</div>
      <div className="featured-profile_wage">{props.wage}</div>
      <div className="featured-profile_experience">{props.experience}</div>
      <div className="featured-profile_workingTime">{props.workingTime}</div>
      <div className="featured-profile_timeAgo">{props.timeAgo}</div>
    </div>
  );
};

export default FProfile;
