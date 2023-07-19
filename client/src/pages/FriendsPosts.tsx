import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import PostItem from "../components/PostItem";
import PostItemSkeleton from "../components/PostItemSkeleton";
import {getFriendPosts} from "../features/user/userSlice";
import {
  closeModal,
  closeModal2,
  closeModal3,
  closeModal4,
  closeDeleteModal,
  setModalOpen,
} from "../features/app/AppSlice";
import {AiOutlinePlus} from "react-icons/ai";
import ImageModal, {PostModal} from "../components/PostModal";
import Modal, {DeleteModal} from "../components/Modal";

type Props = {};

const FriendsPosts = (props: Props) => {
  const {friendsPosts, friendsState} = useSelector(
    (state: RootState) => state.friend
  );
  const {user} = useSelector((state: RootState) => state.auth);
  const {modal2Img, deletePostId} = useSelector(
    (state: RootState) => state.app
  );
  const {comments} = useSelector((state: RootState) => state.comment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendPosts(user?.id));
    dispatch(closeModal());
    dispatch(closeModal2());
    dispatch(closeModal3());
    dispatch(closeModal4());
    dispatch(closeDeleteModal());
  }, []);
  return (
    <div className="friends-posts-section">
      {friendsPosts.map((friendPost) => (
        <section key={friendPost.id} className="friends-posts">
          {friendPost.posts.length > 0 ? (
            <div className="goals">
              {[...friendPost.posts]
                .sort((a, b) => {
                  const dateA = new Date(a.createdAt);
                  const dateB = new Date(b.createdAt);

                  return dateB.getTime() - dateA.getTime();
                })
                .map((post: any) => (
                  <PostItem key={post.id} post={post} comments={comments} />
                ))}
            </div>
          ) : friendsState.isLoading ? (
            <div className="goals">
              {[1, 2, 3].map((item, index) => (
                <PostItemSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div
              style={{maxWidth: "24rem", width: "100%"}}
              key={friendPost.id}
              className="friend-request"
            >
              <div className="profile-img">
                {friendPost.profilePhoto ? (
                  <img src={friendPost.profilePhoto} alt="" />
                ) : (
                  <p>{friendPost.name.slice(0, 1)}</p>
                )}
              </div>
              <div className="request-details">
                <h4>{friendPost.name}</h4>
                <p>No posts yet</p>
              </div>
            </div>
          )}
        </section>
      ))}
      <div className="addDjeng" onClick={() => dispatch(setModalOpen())}>
        <AiOutlinePlus />
      </div>
      <Modal />
      <ImageModal img={modal2Img} />
      <PostModal />
      <DeleteModal deletePostId={deletePostId} />
    </div>
  );
};

export default FriendsPosts;
