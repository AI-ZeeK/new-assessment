import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {IoClose, IoImage} from "react-icons/io5";
import {BsUpload} from "react-icons/bs";
import {closeDeleteModal, closeModal} from "../features/app/AppSlice";
import {useNavigate, useParams} from "react-router-dom";
import {createDjeng, deleteTwit, getMyDjengs} from "../features/post/postSlice";
import Spinner from "./Spinner";

type Props = {};

const Modal = (props: Props) => {
  const modalRef: any = useRef(null);
  const modalOverlayRef: any = useRef(null);
  const fileInputRef: any = useRef(null);

  const [addImage, setAddimage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [postData, setPostData] = useState({
    content: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState<any>(null);
  const {user} = useSelector((state: any) => state.auth);
  const {isModalOpen} = useSelector((state: RootState) => state.app);
  const {posts, isLoading, isError, message} = useSelector(
    (state: any) => state.posts
  );

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (addImage) {
      await dispatch(createDjeng([profileInfo, postData.content, user.id]));

      dispatch(closeModal());
      setPostData({content: ""});
      setSelectedFile(null);
      return;
    }

    await dispatch(createDjeng([null, postData.content, user.id]));
    dispatch(closeModal());
    setPostData({content: ""});
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
      dispatch(closeModal());
    }
  };

  const handleChangeInput = (e: any) => {
    const scriptTagRegex: RegExp =
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

    if (scriptTagRegex.test(e.target.value)) {
      setPostData((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
      alert(`That's hilarious bruv`);
    } else {
      setPostData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value.slice(0, 500),
      }));
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
      className={`modal-overlay  ${isModalOpen ? "active" : ""}`}
    >
      <div ref={modalRef} className="modal">
        <div className="modal-head">
          <div
            className="profile"
            onClick={() => navigate(`/profile/${user?.id}`)}
          >
            <div className="profile-img">{user?.name.slice(0, 1)}</div>
            <h4 className="profile-name">{user?.name}</h4>
          </div>
          <div className="close" onClick={() => dispatch(closeModal())}>
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
                value={postData.content}
                onChange={handleChangeInput}
                placeholder="Write a message"
              ></textarea>
            </div>
            <div className="content-length">
              <span>{postData.content.length}/500</span>
            </div>
            <div className={`${addImage ? "active" : ""} file-box`}>
              <div className="custom-file" onClick={handleFileSelect}>
                <BsUpload className="icon" />
                {selectedFile ? (
                  <p>{selectedFile.name}</p>
                ) : (
                  <p>Upload Image</p>
                )}
              </div>
              <input
                type="file"
                className="file"
                accept=".jpg, .png, .gif"
                style={{display: "none"}}
                ref={fileInputRef}
                onChange={onDrop}
              />
            </div>

            <div className="form-block">
              <div
                className="add-image"
                onClick={() => setAddimage((prev) => !prev)}
              >
                <IoImage />
              </div>
              <button type="submit" className="btn ">
                Post
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default Modal;

export const DeleteModal = ({deletePostId}: any) => {
  const modalRef: any = useRef(null);
  const modalOverlayRef: any = useRef(null);
  const dispatch = useDispatch();
  const {postId} = useParams();

  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState<any>(null);
  const {user} = useSelector((state: any) => state.auth);
  const {isDeleteModalOpen} = useSelector((state: RootState) => state.app);
  const {deleteDjengState} = useSelector((state: RootState) => state.posts);
  const handleDelete = async () => {
    // dispatch(deletePosts(post.id));
    await dispatch(deleteTwit(deletePostId));

    await dispatch(getMyDjengs(user.id));
    dispatch(closeDeleteModal());
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleClickOutside = (event: any) => {
    if (
      modalRef.current &&
      modalOverlayRef.current &&
      modalOverlayRef.current.contains(event.target) &&
      !modalRef.current.contains(event.target)
    ) {
      dispatch(closeDeleteModal());
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    !postId ? dispatch(getMyDjengs(user?.id)) : dispatch(getMyDjengs(postId));
  }, [postId]);
  return (
    <section
      ref={modalOverlayRef}
      className={`modal-overlay  ${isDeleteModalOpen ? "active" : ""}`}
    >
      {deleteDjengState.isLoading && <Spinner />}

      <div ref={modalRef} className="modal">
        <div className="modal-head">
          <h3>Confirm Delete</h3>
        </div>
        <div className="line-through" />
        <div className="confirm-delete">
          <p>
            You will not be able to undo this action.. <br />
            Do you wish to proceed?
          </p>
          <div className="btn-box">
            <button className="btn" onClick={handleDelete}>
              Yes
            </button>
            <button
              className="btn btn-reverse"
              onClick={() => dispatch(closeDeleteModal())}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
