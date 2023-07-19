import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {setNavData} from "../features/app/AppSlice";
import {getIconComponent} from "../data/NavData";

type Props = {};

const SideBar = (props: Props) => {
  const dispatch = useDispatch();
  const {navData} = useSelector((state: RootState) => state.app);
  return (
    <>
      <ul className="nav-items non-mobile">
        {navData.map((navItem) => {
          const icon = getIconComponent(navItem.icon);
          return (
            <Link
              to={navItem.link}
              key={navItem.id}
              onClick={() => dispatch(setNavData(navItem))}
            >
              <li className={`nav-item ${navItem.state ? "active" : ""}`}>
                {icon}
                <span>{navItem.head}</span>
              </li>
            </Link>
          );
        })}
      </ul>
      <ul className="mobile-nav-items">
        {navData.map((navItem) => {
          const icon = getIconComponent(navItem.icon);
          return (
            <Link
              to={navItem.link}
              key={navItem.id}
              onClick={() => dispatch(setNavData(navItem))}
            >
              <li className={`nav-item ${navItem.state ? "active" : ""}`}>
                {icon}
                <span>{navItem.head}</span>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default SideBar;
