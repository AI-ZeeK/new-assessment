import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset, resetUser } from "../features/auth/authSlice";
import { useEffect } from "react";

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state: any) => state.auth);
	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		dispatch(resetUser());

		navigate("/auth");
	};

	return (
		<header className="header">
			<div className="logo flex_row_center">
				<Link to="/">Assessment Posts</Link>
			</div>
			<ul className="flex_row_center">
				{user ? (
					<>
						<li>
							<button className="btn" onClick={onLogout}>
								<FaSignOutAlt /> Logout
							</button>
						</li>
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
