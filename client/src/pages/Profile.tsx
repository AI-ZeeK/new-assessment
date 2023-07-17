import React, {useEffect} from "react";
import "../App.scss";
import {FaSignOutAlt, FaUserEdit} from "react-icons/fa";
import {HiOutlineCamera} from "react-icons/hi";
import {
  getMyUser,
  getUser,
  logout,
  reset,
  resetUser,
} from "../features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {RootState} from "../app/store";
import {
  closeDeleteModal,
  closeModal,
  closeModal2,
  closeModal3,
  closeModal4,
  openModal4,
} from "../features/app/AppSlice";
import ImageModal, {
  AddProfilePictureModal,
  PostModal,
} from "../components/PostModal";
import {getMyDjengs} from "../features/post/postSlice";
import PostItem from "../components/PostItem";
import PostItemSkeleton from "../components/PostItemSkeleton";
import Modal, {DeleteModal} from "../components/Modal";
import Spinner from "../components/Spinner";

type Props = {
  mine: boolean;
};

const Profile = ({mine}: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {postId} = useParams();
  const {user, myUser} = useSelector((state: RootState) => state.auth);
  const {comments} = useSelector((state: RootState) => state.comment);
  const {modal2Img, deletePostId} = useSelector(
    (state: RootState) => state.app
  );

  const {userPosts, getDjengsState, isLoading, isError, messages} = useSelector(
    (state: RootState) => state.posts
  );
  const onLogout = async () => {
    navigate("/auth");
    await dispatch(logout());
    dispatch(resetUser());
    dispatch(reset());
  };
  const handleOpenAddPictureModal = () => {
    dispatch(openModal4());
  };
  useEffect(() => {
    mine ? dispatch(getMyUser(user?.id)) : dispatch(getMyUser(postId));
  }, [postId, myUser, userPosts]);
  useEffect(() => {
    mine ? dispatch(getMyDjengs(user?.id)) : dispatch(getMyDjengs(postId));
  }, [postId]);
  useEffect(() => {
    dispatch(closeModal());
    dispatch(closeModal2());
    dispatch(closeModal3());
    dispatch(closeModal4());
    dispatch(closeDeleteModal());
  }, []);

  return (
    <div className="profile-page">
      {getDjengsState.isLoading && <Spinner />}

      <section className="profile-info-section">
        <div className="profile-img">
          {mine && (
            <div className="add-image" onClick={handleOpenAddPictureModal}>
              <HiOutlineCamera />{" "}
            </div>
          )}
          <div className="profile-img">
            {user?.profilePhoto ? (
              <img
                src={mine ? user?.profilePhoto : myUser?.profilePhoto}
                alt=""
              />
            ) : (
              <p>{mine ? user?.name.slice(0, 1) : myUser?.name.slice(0, 1)}</p>
            )}
          </div>
        </div>
        <div className="profile-details">
          <h4 className="profile-name">{mine ? user?.name : myUser?.name}</h4>
          <p className="profile-email">{mine ? user?.email : myUser?.email}</p>
        </div>
        {mine && (
          <div className="edit-user?">
            <FaUserEdit />
          </div>
        )}
      </section>
      <section>
        <div></div>
      </section>
      <section>
        {mine && (
          <div style={{display: "flex", justifyContent: "flex-end"}}>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}
      </section>
      <div className="line-through"></div>
      <section className="content">
        {userPosts.length > 0 ? (
          <div className="goals">
            {[...userPosts]
              .sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);

                return dateB.getTime() - dateA.getTime();
              })
              .map((post: any) => (
                <PostItem
                  key={post.id}
                  isLoading={isLoading}
                  post={post}
                  comments={comments}
                />
              ))}
          </div>
        ) : getDjengsState.isLoading ? (
          <div className="goals">
            {[1, 2, 3].map((item, index) => (
              <PostItemSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="goals">
            <h4>You have no Djengs, Yet!!</h4>
          </div>
        )}
      </section>

      <AddProfilePictureModal />
      <Modal />
      <ImageModal img={modal2Img} />
      <PostModal />
      <DeleteModal deletePostId={deletePostId} />
    </div>
  );
};

export default Profile;
