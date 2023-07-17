import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import PostForm from "../components/PostForm";
import Spinner from "../components/Spinner";
import {reset} from "../features/post/postSlice";
import PostItem from "../components/PostItem";
import {getTwits} from "../features/post/postSlice";
import {getComments} from "../features/comment/commentSlice";
import {AiOutlinePlus} from "react-icons/ai";

import {
  closeDeleteModal,
  closeModal,
  closeModal2,
  closeModal3,
  closeModal4,
  setModalOpen,
} from "../features/app/AppSlice";
import {RootState} from "../app/store";
import Modal, {DeleteModal} from "../components/Modal";
import ImageModal, {PostModal} from "../components/PostModal";
import PostItemSkeleton from "../components/PostItemSkeleton";
import {getFriendPosts} from "../features/user/userSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state: RootState) => state.auth);
  const {modal2Img, deletePostId} = useSelector(
    (state: RootState) => state.app
  );
  const {posts, isLoading, isError, messages} = useSelector(
    (state: RootState) => state.posts
  );

  const {sentFriendRequests} = useSelector((state: RootState) => state.friend);
  const {comments} = useSelector((state: RootState) => state.comment);
  useEffect(() => {
    if (isError) {
      console.log(messages);
    }

    if (!user) {
      navigate("/auth");
      return;
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, messages, dispatch]);
  useEffect(() => {
    const user =
      localStorage.getItem("access-user") !== null
        ? JSON.parse(localStorage.getItem("access-user ") as string)
        : null;
    dispatch(getTwits());
    dispatch(getComments());
  }, [sentFriendRequests]);
  useEffect(() => {
    dispatch(getFriendPosts(user?.id));
    dispatch(closeModal());
    dispatch(closeModal2());
    dispatch(closeModal3());
    dispatch(closeModal4());
    dispatch(closeDeleteModal());
  }, []);
  //   if (isLoading) {
  //     return <Spinner />;
  //   }
  return (
    <>
      {isLoading && <Spinner />}

      {/* <div className="form-content">
        <PostForm />
      </div> */}

      <section className="content">
        {posts.length > 0 ? (
          <div className="goals">
            {[...posts]
              .sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);

                return dateB.getTime() - dateA.getTime();
              })
              .map((post: any) => (
                <PostItem key={post.id} post={post} comments={comments} />
              ))}
          </div>
        ) : (
          <div className="goals">
            {[1, 2, 3].map((_, index) => (
              <PostItemSkeleton key={index} />
            ))}
          </div>
        )}
      </section>

      <div className="addDjeng" onClick={() => dispatch(setModalOpen())}>
        <AiOutlinePlus />
      </div>
      <Modal />
      <ImageModal img={modal2Img} />
      <PostModal />
      <DeleteModal deletePostId={deletePostId} />
    </>
  );
};

export default Dashboard;
