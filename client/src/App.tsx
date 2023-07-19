import React, {useEffect} from "react";
import "./App.scss";
import "./Friends.scss";
import {Routes, Route, useNavigate, useLocation} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import {useDispatch, useSelector} from "react-redux";
import {getUser, setUser} from "./features/auth/authSlice";
import SideBar from "./components/SideBar";
import FriendRequest from "./pages/FriendRequest";
import FriendsPosts from "./pages/FriendsPosts";
import {RootState} from "./app/store";
import UsersList from "./pages/UsersList";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {user} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const userData =
      localStorage.getItem("access-user") !== null
        ? JSON.parse(localStorage.getItem("access-user") as string)
        : null;

    if (user && userData && location.pathname === "/auth") {
      navigate("/");
    }
    if (!userData && !user) {
      navigate("/auth");
    }
  });
  useEffect(() => {
    const userData =
      localStorage.getItem("access-user") !== null
        ? JSON.parse(localStorage.getItem("access-user") as string)
        : null;
    if (userData) {
      dispatch(getUser(userData.id));
    }
  }, []);
  if (user && location.pathname === "/auth") navigate("/");

  return (
    <>
      <div className="container">
        <Header />
        <main
          className="app-body"
          style={{gridTemplateColumns: user ? "1fr 4fr" : "1fr"}}
        >
          {user && (
            <section className="sidebar-section">
              <SideBar />
            </section>
          )}

          <section className="body-section">
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route
                path="/profile/:postId"
                element={<Profile mine={false} />}
              ></Route>
              <Route path="/profile/" element={<Profile mine={true} />}></Route>
              <Route path="/auth" element={<Login />}></Route>
              <Route path="/friendrequests" element={<FriendRequest />}></Route>
              <Route path="/friends" element={<FriendsPosts />}></Route>
              <Route path="/users" element={<UsersList />}></Route>
            </Routes>
          </section>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
