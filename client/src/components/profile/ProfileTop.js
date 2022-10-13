import React from "react";
const ProfileTop = ({
  profile: {
    doctor: { name, avatar, phoneNumber },
    hospital,
    location,
    specialist,
    fees,
    website,
    social,
  },
}) => {
  return (
    <div className="top-profile">
      <div className="top-details">
        <div className="top-img">
          <img className="round-img" src={avatar} alt="" />
        </div>
        <div className="details">
          <h2 className="profile-top-heading">
            <strong>{name}</strong>
          </h2>
          <br />
          <h3 className="profile-top-desc">{specialist}</h3>
          <br />
          <p className="profile-top-p">
            <strong>{hospital}</strong>, {location}
          </p>
          <p className="fee">
            <strong>Rs. {fees}/- </strong>Consultation Fee
          </p>
          <p className="fee">
            <i className="fas fa-mobile-alt" />
            {" +"}
            {phoneNumber}
          </p>
          <div className="logos">
            {website && (
              <a
                className="logo"
                href={website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-globe fa-2x"></i>
              </a>
            )}
            {social && social.twitter && (
              <a
                className="logo"
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter fa-2x"></i>
              </a>
            )}
            {social && social.facebook && (
              <a
                className="logo"
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-square fa-2x"></i>
              </a>
            )}
            {social && social.instagram && (
              <a
                className="logo"
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            )}
            {social && social.youtube && (
              <a
                className="logo"
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube fa-2x"></i>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="top-profile-img">
        <img alt="" src={process.env.PUBLIC_URL + "/images/doctor4.svg"} />
      </div>
    </div>
  );
};

export default ProfileTop;
