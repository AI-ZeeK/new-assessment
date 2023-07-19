import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CiEdit} from "react-icons/ci";
import {MdDelete, MdDeleteForever} from "react-icons/md";
import {GoVerified} from "react-icons/go";
import {
  AiFillLike,
  AiOutlineFieldTime,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
} from "react-icons/ai";
import {TfiComments} from "react-icons/tfi";
import {deleteTwit, getDjeng, likePost} from "../features/post/postSlice";
import {
  createComment,
  deleteComments,
  updateComment,
} from "../features/comment/commentSlice";
import {useNavigate} from "react-router-dom";
import {RootState} from "../app/store";
import {
  openDeleteModal,
  openModal2,
  openModal3,
  setDeletePostId,
} from "../features/app/AppSlice";
import moments from "moments";
import {BsThreeDots} from "react-icons/bs";
import {
  getFriendPosts,
  getFriendRequests,
  getSentFriendRequests,
  sendFriendRequest,
} from "../features/user/userSlice";
// const postMadeAt = moments();

const PostItem = ({post, comments, isLoading}: any) => {
  const dispatch = useDispatch();
  const optionsRef: any = useRef(null);
  const {friendsPosts, friendsState, friendRequests, sentFriendRequests} =
    useSelector((state: RootState) => state.friend);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentLength, setCommentLength] = useState<number>(0);
  const [openOptions, setOpenOptions] = useState(false);
  const {user} = useSelector((state: RootState) => state.auth);
  const [comment, setComment] = useState("");
  const [isUpdateComment, setIsUpdateComment] = useState(false);
  const [commentID, setCommentId] = useState("");
  const navigate = useNavigate();
  const handeCommentOpen = () => {
    setIsCommentOpen((prev) => !prev);
  };

  const handleDeleteComment = (commentId: string) => {
    dispatch(deleteComments(commentId));
    // dispatch(deleteTwit(post.id));
  };
  const handleSetUpdateComment = ({id, comment}: any) => {
    setIsUpdateComment((prev) => !prev);
    !isUpdateComment && setComment(comment);
    setCommentId(id);
  };
  const handlePostLike = (postId: string, userId: any) => {
    dispatch(likePost([postId, userId]));
    dispatch(getFriendPosts(user?.id));
  };
  const liked = post.postlikes.filter((iLiked: string) => {
    return user?.id === iLiked;
  });
  const isFriend = friendsPosts.filter((isfriend: any) => {
    return isfriend.id === post.authorId;
  });
  const isSentFriendRequest = sentFriendRequests.filter((isfriend: any) => {
    return isfriend.friendId === post.authorId && isfriend.userId === user?.id;
  });
  const isFriendRequest = friendRequests.filter((isfriend: any) => {
    return isfriend.friendId === post.authorId && isfriend.userId === user?.id;
  });

  const handleSeeMore = async (postId: string) => {
    dispatch(openModal3());
    dispatch(getDjeng(postId));
  };
  const handleOpenModal2 = () => {
    dispatch(openModal2(post.image));
  };

  const handleCommentSubmit = (e: any) => {
    e.preventDefault();
    isUpdateComment && dispatch(updateComment([commentID, comment]));
    !isUpdateComment && dispatch(createComment({postId: post.id, comment}));
    setComment("");
    setIsUpdateComment(false);
  };
  const handleConfirmDelete = () => {
    dispatch(openDeleteModal());
    dispatch(setDeletePostId(post.id));
    setOpenOptions(false);
  };
  const handleClickOutside = (event: any) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setOpenOptions(false);
    }
  };
  const postComments = comments.filter((comm: any) => {
    return comm.postId === post.id;
  });

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    dispatch(getSentFriendRequests(user?.id));
    dispatch(getFriendRequests(user?.id));

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="goal">
        <div className="head-box">
          <div
            className="profile"
            onClick={() =>
              user?.id === post.authorId
                ? navigate(`/profile`)
                : navigate(`/profile/${post.authorId}`)
            }
          >
            <div className="profile-img">
              {post.profilePhoto ? (
                <img src={post.profilePhoto} alt="" />
              ) : (
                <p>{post.name.slice(0, 1)}</p>
              )}
            </div>
            <h4 className="goal-name">{post.name}</h4>
          </div>
          <div className="options-block" ref={optionsRef}>
            <button
              className="options"
              onClick={() => setOpenOptions((prev) => !prev)}
            >
              <BsThreeDots />
            </button>
            <ul className={`options-list ${openOptions ? "active" : ""}`}>
              {user?.id !== post.authorId && (
                <>
                  {Boolean(isFriend.length) ? (
                    <li
                      onClick={() =>
                        dispatch(sendFriendRequest([post.authorId, user?.id]))
                      }
                    >
                      <AiOutlineUserDelete className="icon" />{" "}
                      <span>Unfriend</span>
                    </li>
                  ) : Boolean(isSentFriendRequest.length) ? (
                    <li style={{background: "#00000088", color: "#ffffff"}}>
                      <AiOutlineFieldTime fontSize={24} />
                      <span>Pending</span>
                    </li>
                  ) : Boolean(isFriendRequest.length) ? (
                    <>
                      <li
                        onClick={() => {
                          navigate("/friendrequests");
                        }}
                      >
                        <GoVerified className="icon" />{" "}
                        <span>Verify Request</span>
                      </li>
                    </>
                  ) : (
                    <li
                      onClick={() =>
                        dispatch(sendFriendRequest([post.authorId, user?.id]))
                      }
                    >
                      <AiOutlineUserAdd className="icon" />{" "}
                      <span>Add Friend</span>
                    </li>
                  )}
                </>
              )}
              {user?.id === post.authorId && (
                <li onClick={handleConfirmDelete}>
                  <MdDeleteForever className="icon" /> <span>Delete</span>
                </li>
              )}{" "}
            </ul>
          </div>
        </div>
        <h2 className="goal-text">{post.title}</h2>
        <small className="goal-text-desc">
          {post.content.length < 140 ? (
            post.content
          ) : (
            <span>
              {post.content.slice(0, 140)}
              <span className="see-more" onClick={() => handleSeeMore(post.id)}>
                ...see more
              </span>
            </span>
          )}
        </small>
        {/* {user??.id === post.authorId && (
          <button className="close">
            <IoClose onClick={handleDelete} />
          </button>
        )} */}

        {post.image && (
          <div className="image-box" onClick={handleOpenModal2}>
            <img src={post.image} alt="new alts" />
          </div>
        )}
        <div className="goal-date">
          {new Date(post.createdAt).toLocaleString("en-US")}
        </div>
        <div className="line-through"></div>
        <div className="comment-block flex_col_center">
          <div className="comment-icon-box">
            <div className="like-box">
              <div
                className={`icon ${liked.length > 0 ? "active" : ""} `}
                onClick={() => handlePostLike(post.id, user?.id)}
              >
                <AiFillLike />
              </div>
              <p>
                {liked.length > 0 && post.postlikes.length > 1
                  ? `You & ${post.postlikes.length - 1} ${
                      post.postlikes.length <= 2 ? "other" : "others"
                    } liked`
                  : liked.length > 0 && post.postlikes.length <= 1
                  ? "You liked"
                  : post.postlikes.length > 1
                  ? `${post.postlikes.length} likes`
                  : post.postlikes.length === 1
                  ? `${post.postlikes.length} like`
                  : ``}
              </p>
            </div>
            <div className="icon">
              <p>{postComments.length === 0 ? "" : postComments.length}</p>

              <TfiComments onClick={handeCommentOpen} />
            </div>
          </div>
          <div
            className={`${
              isCommentOpen ? "comment-box active" : "comment-box"
            }`}
          >
            <ul>
              {comments.map((comm: any) => {
                if (comm.postId === post.id)
                  return (
                    <li className="comment-lists" key={comm.id}>
                      <div
                        className="comment-profile-img"
                        onClick={() =>
                          user?.id === comm.commentorId
                            ? navigate(`/profile`)
                            : navigate(`/profile/${post.authorId}`)
                        }
                      >
                        {comm.profilePhoto ? (
                          <img src={comm.profilePhoto} alt="" />
                        ) : (
                          <p>{comm.name.slice(0, 1)}</p>
                        )}
                      </div>

                      <span>{comm.comment}</span>
                      <div className="icon-box">
                        {comm.commentorId === user?.id && (
                          <div
                            className="icon"
                            onClick={() => handleSetUpdateComment(comm)}
                          >
                            <CiEdit />{" "}
                          </div>
                        )}
                        {(comm.commentorId === user?.id ||
                          user?.id === post.authorId) && (
                          <div
                            className="icon"
                            onClick={() => handleDeleteComment(comm.id)}
                          >
                            <MdDelete />{" "}
                          </div>
                        )}
                      </div>
                    </li>
                  );
              })}
            </ul>
            <form
              action=""
              className="flex_row_end form-box"
              onSubmit={handleCommentSubmit}
            >
              <input
                type="text"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                placeholder="add comment"
                className="comment-input"
              />
              <button className="comment-btn " type="submit">
                {isUpdateComment ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostItem;
