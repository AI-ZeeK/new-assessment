import React, {useState, useEffect} from "react";
import {FaUserAlt} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Spinner from "../components/Spinner";
import {login, reset} from "../features/auth/authSlice";
import {RootState} from "../app/store";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {email, password} = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/");
      setTimeout(() => {
        dispatch(reset());
      }, 100);
    }
  }, [isError, isSuccess]);

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <div className="login-box">
      {isLoading && <Spinner />}

      <section className="heading">
        <h1>
          <FaUserAlt /> Login
        </h1>
        <p>Start making posts</p>
      </section>
      <section className="content">
        <section className="" style={{width: "100%"}}>
          <form action="" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                required
                onChange={onChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                required
                value={password}
                onChange={onChange}
                placeholder="Enter your password"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Submit
              </button>
            </div>
          </form>
        </section>
      </section>
    </div>
  );
};

export default Login;
