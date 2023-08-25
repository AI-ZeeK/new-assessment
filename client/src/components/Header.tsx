import {FaSignInAlt, FaSignOutAlt, FaUserAlt} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {logout, reset, resetUser} from "../features/auth/authSlice";
import {useEffect} from "react";
import {baseUrl} from "../constants/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state.auth);
  const onLogout = async () => {
    await dispatch(logout());
    dispatch(resetUser());
    dispatch(reset());

    navigate("/auth");
  };
  return (
    <header className="header">
      <div className="logo flex_row_center">
        <Link to="/">Djengo</Link>
      </div>
      <ul className="flex_row_center head">
        {user ? (
          <>
            {/* <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button> */}
            <div className="profile" onClick={() => navigate(`/profile`)}>
              <div className="profile-img">
                {user.profilePhoto ? (
                  <img src={`${baseUrl}/${user.profilePhoto}`} alt="" />
                ) : (
                  <p>{user.name.slice(0, 1)}</p>
                )}
              </div>
              <h4 className="profile-name">{user.name}</h4>
            </div>
          </>
        ) : (
          <>
            <li className="flex_row_center">
              <Link to="/auth" className="flex_row_center">
                <FaSignInAlt /> Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
