import React from "react";

import NavBarItem from "./components/NavBarItem";
import UserInfos from "./components/UserInfos";

export default ({ userInfos }) => (
  <nav className="navbar navbar-expand-md navbar-dark fixed-top custom-navbar-prop">
    <span className="navbar-brand">
      <a href="/src/components/About" className="navbar-brand custom-brand-font mr-0">
        <img src="/assets/LogoCS.png" height="30" alt="Logo CentraleSupélec" />
        {" Salles modulables"}
      </a>
      <a
        href="https://viarezo.fr"
        target="_blank"
        rel="noopener noreferrer"
        className="navbar-brand custom-brand-font d-none d-lg-inline"
        >
        <span className="custom-alternative-text-color-navbar">
          {" "}
          by <span className="earthOrbiter">ViAREZO</span>
        </span>
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
        <NavBarItem text="Cloisonnages" link="/" />
        <NavBarItem text="About" link="/about" />
        <NavBarItem text="Contact" link="/contact" />
        <NavBarItem text="Tasks" link="/tasks" />
        <UserInfos userInfos={userInfos} link="#" />
      </ul>
    </div>
  </nav>
);