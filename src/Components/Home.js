import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="banner-wrapper">
          <div className="banner-left">
            <h2>Diary Manager</h2>
            <br />
            <p>
              {" "}
              &nbsp;🤍<b>Diary Manager</b> 
              The Diary manager that safeguards your memories and helps you to reflect upon past experiences, 
              analyze and improve yourself. what's your dream project?Your goals 
             let's achieve them hand in hand
            </p>

            <button
              className="explore-button"
              onClick={() => navigate("/dashboard")}
            >
              Explore
            </button>
          </div>
          <br />

          <div className="banner-right">
            <img
              src="https://webstockreview.net/images/note-clipart-study-notes-2.png"
              alt="img"
            />
          </div>
        </div>
        <div style={{ color: "rgb(177, 73, 201)", fontWeight: "500" }}>
          🤞🏻Looking forward to do daily updates and making great things
          happen!!!
        </div>
        <br />
        <div className="contact1">
          <i class="fa-solid fa-phone" style={{ color: "#6b92d6;" }}></i>&nbsp;
          <p className="contact-info">+91-8610016443</p>
        </div>
        <div className="contact2">
          <i class="fa-solid fa-envelope" style={{ color: "#326bcd;" }}></i>
          &nbsp;<p className="contact-info">diarymanager@gmail.com</p>
        </div>
      </div>
    </>
  );
}

export default Home;
