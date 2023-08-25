import React, {useEffect, useState} from "react";
import {User} from "../features/auth/authSlice";
import {
  AiOutlineUserDelete,
  AiOutlineFieldTime,
  AiOutlineUserAdd,
} from "react-icons/ai";
import {GoVerified} from "react-icons/go";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {useNavigate} from "react-router-dom";
import {
  getFriendRequests,
  getSentFriendRequests,
  resetSendRequestState,
  sendFriendRequest,
} from "../features/user/userSlice";
import {toast} from "react-toastify";
import {baseUrl} from "../constants/constants";

type Props = {
  User: User;
  setIsSend: (t: boolean) => void;
};

const UserItem = ({User, setIsSend}: Props) => {
  const {
    friendsPosts,
    sendRequestState,
    message,
    friendRequests,
    sentFriendRequests,
  } = useSelector((state: RootState) => state.friend);

  const {user} = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isFriend = friendsPosts.filter((isfriend: any) => {
    return isfriend.id === User.id;
  });
  const isSentFriendRequest = sentFriendRequests.filter((isfriend: any) => {
    return isfriend.friendId === User.id && isfriend.userId === user?.id;
  });
  const isFriendRequest = friendRequests.filter((isfriend: any) => {
    return isfriend.friendId === User.id && isfriend.userId === user?.id;
  });

  return (
    <div className="friend-request">
      <div
        className="profile-img"
        onClick={() =>
          user?.id === User.id
            ? navigate(`/profile`)
            : navigate(`/profile/${User.id}`)
        }
      >
        {User.profilePhoto ? (
          <img src={`${baseUrl}/${User.profilePhoto}`} alt="" />
        ) : (
          <p>{User.name.slice(0, 1)}</p>
        )}
      </div>
      <div className="user-details">
        <h4>{User.name}</h4>
        <>
          {Boolean(isFriend.length) ? (
            <div
              className="friend-box"
              onClick={() => {
                dispatch(sendFriendRequest([User.id, user?.id]));
                setIsSend(false);
              }}
            >
              <AiOutlineUserDelete className="icon" fontSize={18} />{" "}
              <span>Unfriend</span>
            </div>
          ) : Boolean(isSentFriendRequest.length) ? (
            <div
              className="friend-box"
              style={{background: "#00000088", color: "#ffffff"}}
            >
              <AiOutlineFieldTime fontSize={22} />
              <span>Pending</span>
            </div>
          ) : User.id === user?.id ? (
            <></>
          ) : Boolean(isFriendRequest.length) ? (
            <div
              className="friend-box"
              onClick={() => {
                navigate("/friendrequests");
              }}
            >
              <GoVerified className="icon" fontSize={18} />{" "}
              <span>Verify Request</span>
            </div>
          ) : (
            <div
              className="friend-box"
              style={{background: "#000000", color: "#ffffff"}}
              onClick={() => {
                dispatch(sendFriendRequest([User.id, user?.id]));
                setIsSend(true);
              }}
            >
              <AiOutlineUserAdd className="icon" /> <span>Add Friend</span>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default UserItem;
function rresetSendRequestStateeset(): any {
  throw new Error("Function not implemented.");
}
