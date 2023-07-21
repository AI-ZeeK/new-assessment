import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import FriendRequestSkeleton from "../components/FriendRequestSkeleton";
import {
  closeModal,
  closeModal2,
  closeModal3,
  closeModal4,
  closeDeleteModal,
} from "../features/app/AppSlice";
import {
  getAllUsers,
  getFriendRequests,
  getSentFriendRequests,
  resetSendRequestState,
  sendFriendRequest,
} from "../features/user/userSlice";
import {useNavigate} from "react-router-dom";
import {
  AiOutlineFieldTime,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
} from "react-icons/ai";
import {GoVerified} from "react-icons/go";
import UserItem from "../components/UserItem";
import {toast} from "react-toastify";

type Props = {};

const UsersList = (props: Props) => {
  const {Users, getAllUsersState, sendRequestState, message} = useSelector(
    (state: RootState) => state.friend
  );
  const {user} = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSend, setIsSend] = useState(false);

  useEffect(() => {
    dispatch(closeModal());
    dispatch(closeModal2());
    dispatch(closeModal3());
    dispatch(closeModal4());
    dispatch(closeDeleteModal());
  }, []);
  useEffect(() => {
    if (sendRequestState.isError) {
      toast.error(message);
    }
    if (sendRequestState.isSuccess) {
      isSend
        ? toast.success("Request Sent")
        : toast.success("Unfriend Successful");
      dispatch(getAllUsers());
      if (user) {
        dispatch(getFriendRequests(user.id));
        dispatch(getSentFriendRequests(user.id));
      }
      dispatch(resetSendRequestState());
    }
  }, [
    sendRequestState.isError,
    sendRequestState.isLoading,
    sendRequestState.isSuccess,
  ]);

  useEffect(() => {
    if (user) {
      dispatch(getFriendRequests(user.id));
      dispatch(getSentFriendRequests(user.id));
    }
  }, []);

  return (
    <div className="requests-section">
      <div className="friend-requests">
        {Users.length > 0 ? (
          Users.map((User) => (
            <UserItem setIsSend={setIsSend} key={User.id} User={User} />
          ))
        ) : getAllUsersState.isLoading ? (
          <>
            {[1, 2].map((_, index) => (
              <FriendRequestSkeleton key={index} />
            ))}
          </>
        ) : (
          <h1>No User</h1>
        )}
      </div>
    </div>
  );
};

export default UsersList;
