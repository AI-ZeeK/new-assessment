import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import PostForm from "../components/PostForm";
import Spinner from "../components/Spinner";
import {reset} from "../features/post/postSlice";
import PostItem from "../components/PostItem";
import {getTwits} from "../features/post/postSlice";
import {getComments} from "../features/comment/commentSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state: any) => state.auth);
  const {posts, isLoading, isError, message} = useSelector(
    (state: any) => state.posts
  );
  const {comments} = useSelector((state: any) => state.comment);
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/auth");
      return;
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  useEffect(() => {
    const user =
      localStorage.getItem("access-user") !== null
        ? JSON.parse(localStorage.getItem("access-user") as string)
        : null;
    dispatch(getTwits());
    dispatch(getComments());
  }, [dispatch]);
  //   if (isLoading) {
  //     return <Spinner />;
  //   }
  return (
    <>
      {isLoading && <Spinner />}
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Twits Dashboard</p>
      </section>
      <div className="form-content">
        <PostForm />
      </div>

      <section className="content">
        {posts.length > 0 ? (
          <div className="goals">
            {posts.map((post: any) => (
              <PostItem key={post.id} post={post} comments={comments} />
            ))}
          </div>
        ) : (
          <h3>You have not made any Twit</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
