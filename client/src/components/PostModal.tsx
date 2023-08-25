import React, {useCallback, useEffect, useRef, useState} from "react";
import {
  AiFillLike,
  AiOutlineFieldTime,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
} from "react-icons/ai";
import {BsThreeDots, BsUpload} from "react-icons/bs";
import {IoClose} from "react-icons/io5";
import {TfiComments} from "react-icons/tfi";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RootState} from "../app/store";
import {
  closeModal2,
  closeModal3,
  openModal2,
  openModal3,
  closeModal4,
  openDeleteModal,
  setDeletePostId,
  closeBioUpdateModal,
} from "../features/app/AppSlice";
import {updateBio, updateProfilePhoto} from "../features/auth/authSlice";
import {
  deleteComments,
  updateComment,
  createComment,
} from "../features/comment/commentSlice";
import {deleteTwit, likePost} from "../features/post/postSlice";
import PostItemSkeleton from "./PostItemSkeleton";
import {MdDelete, MdDeleteForever} from "react-icons/md";
import {CiEdit} from "react-icons/ci";
import {GoVerified} from "react-icons/go";
import {sendFriendRequest} from "../features/user/userSlice";
import {baseUrl} from "../constants/constants";

type Props = {};

const ImageModal = ({img}: any) => {
  const modalRef: any = useRef(null);
  const modalOverlayRef: any = useRef(null);

  const dispatch = useDispatch();
  const {isModal2Open} = useSelector((state: RootState) => state.app);

  const handleClickOutside = (event: any) => {
    // console.log(12);
    if (
      modalRef.current &&
      modalOverlayRef.current &&
      modalOverlayRef.current.contains(event.target) &&
      !modalRef.current.contains(event.target)
      // !topNavRef.current.contains(event.target)
    ) {
      dispatch(closeModal2());
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <section
      ref={modalOverlayRef}
      className={`modal-overlay  ${isModal2Open ? "active" : ""}`}
    >
      <div ref={modalRef} className="modal-image">
        <img src={`${baseUrl}/${img}`} alt="" />
      </div>
    </section>
  );
};
export default ImageModal;

export const PostModal = () => {
  const modalRef: any = useRef(null);
  const modalOverlayRef: any = useRef(null);
  const optionsRef: any = useRef(null);
  const [comment, setComment] = useState("");
  const [isUpdateComment, setIsUpdateComment] = useState(false);
  const [commentID, setCommentId] = useState("");
  const {comments} = useSelector((state: RootState) => state.comment);
  const dispatch = useDispatch();
  const {isModal3Open} = useSelector((state: RootState) => state.app);

  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const {user} = useSelector((state: RootState) => state.auth);
  const {friendsPosts, friendsState, friendRequests, sentFriendRequests} =
    useSelector((state: RootState) => state.friend);
  const {post, djengState} = useSelector((state: RootState) => state.posts);
  const navigate = useNavigate();
  const handeCommentOpen = () => {
    setIsCommentOpen((prev) => !prev);
  };
  const handleDelete = () => {
    dispatch(deleteTwit(post.id));
  };
  const handleDeleteComment = (commentId: string) => {
    dispatch(deleteComments(commentId));
  };
  const handleSetUpdateComment = ({id, comment}: any) => {
    setIsUpdateComment((prev) => !prev);
    !isUpdateComment && setComment(comment);
    setCommentId(id);
  };
  const handlePostLike = (postId: string, userId: any) => {
    console.log(postId, userId);
    dispatch(likePost([postId, userId]));
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

  const postComments = comments.filter((comm: any) => {
    return comm.postId === post.id;
  });

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
    if (
      modalRef.current &&
      modalOverlayRef.current &&
      modalOverlayRef.current.contains(event.target) &&
      !modalRef.current.contains(event.target)
    ) {
      dispatch(closeModal3());
    }
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setOpenOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <section
      ref={modalOverlayRef}
      className={`modal-overlay  ${isModal3Open ? "active" : ""}`}
    >
      {djengState.isLoading ? (
        <div ref={modalRef}>
          <PostItemSkeleton />
        </div>
      ) : (
        <div
          ref={modalRef}
          className="goal"
          style={{width: "98%", maxHeight: "90vh"}}
        >
          <div className="head-box">
            <div
              className="profile"
              onClick={() =>
                user?.id === post.authorId
                  ? navigate(`/profile`)
                  : navigate(`/profile/${post.id}`)
              }
            >
              <div className="profile-img">
                {post.profilePhoto ? (
                  <img src={`${baseUrl}/${post.profilePhoto}`} alt="" />
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
                )}
                <li onClick={() => dispatch(closeModal3())}>
                  <IoClose className="icon" /> <span>Close</span>
                </li>
              </ul>
            </div>
          </div>
          <small
            className="goal-text-desc"
            style={{maxHeight: "40rem", overflow: "auto"}}
          >
            {post.content}
          </small>

          {post.image && (
            <div className="image-box" onClick={handleOpenModal2}>
              <img src={`${baseUrl}/${post.image}`} alt="new alts" />
            </div>
          )}

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
              {/* <div className="comment-box"> */}
              <div className="icon">
                <p>{postComments.length === 0 ? "" : postComments.length}</p>
                <TfiComments onClick={handeCommentOpen} />
              </div>
              {/* </div> */}
            </div>
            <div
              className={`modal-option comment-box${
                isCommentOpen ? "  active" : ""
              } `}
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
                            <img
                              src={`${baseUrl}/${comm.profilePhoto}`}
                              alt=""
                            />
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
      )}
    </section>
  );
};

export const AddProfilePictureModal = (props: Props) => {
  const modalRef: any = useRef(null);
  const modalOverlayRef: any = useRef(null);
  const fileInputRef: any = useRef(null);

  const [selectedFile, setSelectedFile] = useState<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState<any>(null);
  const {user} = useSelector((state: any) => state.auth);
  const {isModal4Open} = useSelector((state: RootState) => state.app);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (selectedFile === null) {
      dispatch(closeModal4());

      return;
    }
    dispatch(updateProfilePhoto([user.id, selectedFile]));
    dispatch(closeModal4());
    setSelectedFile(null);
  };

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleClickOutside = (event: any) => {
    // console.log(12);
    if (
      modalRef.current &&
      modalOverlayRef.current &&
      modalOverlayRef.current.contains(event.target) &&
      !modalRef.current.contains(event.target)
      // !topNavRef.current.contains(event.target)
    ) {
      dispatch(closeModal4());
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onDrop = useCallback(async (event: any) => {
    const selectFile = event.target.files[0];
    // selectFile.forEach(async (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(selectFile);
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");

    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      setProfileInfo(binaryStr);
    };

    setSelectedFile(selectFile);
  }, []);
  return (
    <section
      ref={modalOverlayRef}
      className={`modal-overlay  ${isModal4Open ? "active" : ""}`}
    >
      <div ref={modalRef} className="modal">
        <div className="modal-head">
          <div className="profile" onClick={() => navigate(`/profile`)}>
            <div className="profile-img">
              {user?.profilePhoto ? (
                <img src={`${baseUrl}/${user.profilePhoto}`} alt="" />
              ) : (
                <p>{user?.name.slice(0, 1)}</p>
              )}
            </div>
            <h4 className="profile-name">{user?.name}</h4>
          </div>
          <div className="close" onClick={() => dispatch(closeModal4())}>
            <IoClose />
          </div>
        </div>
        <div className="line-through" />
        <section className="post-form">
          <form action="forms-block" onSubmit={onSubmit}>
            <div className={`active file-box`}>
              <div className="custom-file" onClick={handleFileSelect}>
                <BsUpload className="icon" />
                {selectedFile ? (
                  <p>{selectedFile.name}</p>
                ) : (
                  <p>Upload Picture</p>
                )}
              </div>
              <input
                type="file"
                className="file"
                accept=".jpg, .png, .gif, .jpeg"
                style={{display: "none"}}
                ref={fileInputRef}
                onChange={onDrop}
              />
            </div>

            <div className="form-block">
              <button type="submit" className="btn btn-block">
                Update
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};
export const AddBioModal = (props: Props) => {
  const modalRef: any = useRef(null);
  const modalOverlayRef: any = useRef(null);
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state: any) => state.auth);
  const {isBioUpdateModalOpen} = useSelector((state: RootState) => state.app);

  const onSubmit = (e: any) => {
    e.preventDefault();

    dispatch(updateBio([user?.id, bio]));
    dispatch(closeBioUpdateModal());
  };

  const handleClickOutside = (event: any) => {
    if (
      modalRef.current &&
      modalOverlayRef.current &&
      modalOverlayRef.current.contains(event.target) &&
      !modalRef.current.contains(event.target)
    ) {
      dispatch(closeBioUpdateModal());
    }
  };
  const handleChangeInput = (e: any) => {
    const scriptTagRegex: RegExp =
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

    if (scriptTagRegex.test(e.target.value)) {
      setBio("");
      alert(`That's hilarious bruv`);
    } else {
      setBio(e.target.value.slice(0, 104));
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <section
      ref={modalOverlayRef}
      className={`modal-overlay  ${isBioUpdateModalOpen ? "active" : ""}`}
    >
      <div ref={modalRef} className="modal">
        <div className="modal-head">
          <div className="profile" onClick={() => navigate(`/profile`)}>
            <div className="profile-img">
              {user?.profilePhoto ? (
                <img src={`${baseUrl}/${user.profilePhoto}`} alt="" />
              ) : (
                <p>{user?.name.slice(0, 1)}</p>
              )}
            </div>
            <h4 className="profile-name">{user?.name}</h4>
          </div>
          <div
            className="close"
            onClick={() => dispatch(closeBioUpdateModal())}
          >
            <IoClose />
          </div>
        </div>
        <div className="line-through" />
        <section className="post-form">
          <form action="forms-block" onSubmit={onSubmit}>
            <div className="forms-box">
              <textarea
                className="form-control"
                name="content"
                required
                rows={4}
                value={bio}
                onChange={handleChangeInput}
                placeholder="Write a message"
              ></textarea>
            </div>
            <div className="content-length">
              <span>{bio.length}/104</span>
            </div>

            <div className="form-block">
              <button type="submit" className="btn btn-block">
                Update
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};
