import React from "react";
import {navData} from "../data/NavData";
import {Link} from "react-router-dom";

type Props = {};

const SideBar = (props: Props) => {
  return (
    <>
      <ul className="nav-items non-mobile">
        {navData.map((navItem) => (
          <Link to={navItem.link} key={navItem.id}>
            <li className="nav-item">
              {navItem.icon}
              <span>{navItem.head}</span>
            </li>
          </Link>
        ))}
      </ul>
      <ul className="mobile-nav-items">
        {navData.map((navItem) => (
          <Link to={navItem.link} key={navItem.id}>
            <li className="nav-item">
              {navItem.icon}
              <span>{navItem.head}</span>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default SideBar;
