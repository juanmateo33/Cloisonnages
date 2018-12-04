import React from "react";

import NavBarItem from "./components/NavBarItem";
import UserInfos from "./components/UserInfos";

export default ({ userInfos }) => (
  <nav className="navbar navbar-expand-md navbar-dark fixed-top custom-navbar-prop">
    <span className="navbar-brand">
      <a href="/" className="navbar-brand custom-brand-font mr-0">
        <img src="/assets/LogoCS.png" height="30" alt="Logo CentraleSupélec" />
        {" Salles modulables"}
      </a>
      
    </span>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div
      className="collapse navbar-collapse custom-font-size-16"
      id="navbarSupportedContent"
    >
      <ul className="navbar-nav ml-auto">
        <NavBarItem text="Tâches" link="/tasks" />
        <NavBarItem text="A Propos" link="/about" />
        <NavBarItem text="Contact" link="/contact" />
        <NavBarItem text="Aide" link="/help" />
        <UserInfos userInfos={userInfos} link="#" />
      </ul>
    </div>
  </nav>
);