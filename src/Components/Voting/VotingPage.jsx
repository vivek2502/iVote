import '../ViewInfo.css'
import React, { Component, useRef, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom'

class VotingPage extends React.Component {
  render() {
    return (
      <>
        <nav className="navBg navbar navbar-expand-lg navbar-dark">
          <a className="BrandName navbar-brand" href="#">
            <span className="flickPlay">
              <i className=" fas fa-compact-disc"></i> i
            </span>
            VOTE
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navElements navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to="/UserDashBoard" className="nav-link">
                  DashBoard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/VotingPage" className="nav-link">
                  Vote
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/SurveyForm" className="nav-link">
                  Survey
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/EnquiryForm" className="nav-link">
                  Enquiry
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <footer id="footer">
          <p>© Copyright 2022 iVOTE</p>
        </footer>
      </>
    )
  }
}

export default VotingPage
