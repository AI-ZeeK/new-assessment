import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {
  acceptFriendRequest,
  getFriendRequests,
  getSentFriendRequests,
  reset,
  resetVerifyFriendsState,
} from "../features/user/userSlice";
import FriendRequestSkeleton from "../components/FriendRequestSkeleton";
import {AiOutlineFieldTime, AiOutlinePlus} from "react-icons/ai";
import {
  closeModal,
  closeModal2,
  closeModal3,
  closeModal4,
  closeDeleteModal,
  setModalOpen,
} from "../features/app/AppSlice";
import {toast} from "react-toastify";
import Modal, {DeleteModal} from "../components/Modal";
import PostModal from "../components/PostModal";
import ImageModal from "../components/PostModal";

type Props = {};

const FriendRequest = (props: Props) => {
  const {user} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const {
    friendRequests,
    verifyFriendsState,
    message,
    sentRequests,
    sentFriendRequests,
  } = useSelector((state: RootState) => state.friend);
  useEffect(() => {
    dispatch(getFriendRequests(user?.id));
    dispatch(getSentFriendRequests(user?.id));
    dispatch(closeModal());
    dispatch(closeModal2());
    dispatch(closeModal3());
    dispatch(closeModal4());
    dispatch(closeDeleteModal());
  }, []);
  useEffect(() => {
    if (verifyFriendsState.isError) {
      toast.error(message);
    }
    if (verifyFriendsState.isSuccess) {
      toast.success("Request verified");
      dispatch(getFriendRequests(user?.id));
      dispatch(getSentFriendRequests(user?.id));
    }

    dispatch(resetVerifyFriendsState());
  }, [
    verifyFriendsState.isError,
    verifyFriendsState.isLoading,
    verifyFriendsState.isSuccess,
  ]);
  return (
    <div className="requests-section">
      <div className="friend-requests">
        <h3>Friend Requests</h3>
        {friendRequests.length > 0 ? (
          friendRequests.map((request) => (
            <div key={request.id} className="friend-request">
              <div className="profile-img">
                {request.profilePhoto ? (
                  <img src={request.profilePhoto} alt="" />
                ) : (
                  <p>{request.name.slice(0, 1)}</p>
                )}
              </div>
              <div className="request-details">
                <h4>{request.name}</h4>
                <div className="request-btn">
                  <button
                    className="btn"
                    onClick={() =>
                      dispatch(acceptFriendRequest([request.id, true]))
                    }
                  >
                    Accept
                  </button>
                  <button
                    className="btn-reverse btn"
                    onClick={() =>
                      dispatch(acceptFriendRequest([request.id, false]))
                    }
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : verifyFriendsState.isLoading ? (
          <>
            {[1, 2].map((_, index) => (
              <FriendRequestSkeleton key={index} />
            ))}
          </>
        ) : (
          <h1>No open requests</h1>
        )}
      </div>
      <div className="line-through" />
      <div className="friend-requests">
        <h3>Sent Friend Requests</h3>

        {sentFriendRequests.length > 0 ? (
          sentFriendRequests.map((request) => (
            <div key={request.id} className="friend-request">
              <div className="profile-img">
                {request.profilePhoto ? (
                  <img src={request.profilePhoto} alt="" />
                ) : (
                  <p>{request.name.slice(0, 1)}</p>
                )}
              </div>
              <div className="request-details">
                <h4>{request.name}</h4>
                <div className="request-btn">
                  <button className="btn-reverse btn">
                    <AiOutlineFieldTime fontSize={24} />
                    <span>Pending</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : sentRequests.isLoading ? (
          <>
            {[1, 2].map((_, index) => (
              <FriendRequestSkeleton key={index} />
            ))}
          </>
        ) : (
          <h1>No pending requests</h1>
        )}
      </div>
    </div>
  );
};

export default FriendRequest;
