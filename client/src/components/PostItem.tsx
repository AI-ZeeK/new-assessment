import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CiEdit} from "react-icons/ci";
import {MdDelete} from "react-icons/md";
import {IoClose} from "react-icons/io5";
import {TfiComments} from "react-icons/tfi";
import {deleteTwit, deletePosts, getTwits} from "../features/post/postSlice";
import {
  createComment,
  deleteComments,
  updateComment,
} from "../features/comment/commentSlice";

const GoalItem = ({post, comments}: any) => {
  const dispatch = useDispatch();
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentLength, setCommentLength] = useState<number>(0);
  const {user} = useSelector((state: any) => state.auth);
  const [comment, setComment] = useState("");
  const [isUpdateComment, setIsUpdateComment] = useState(false);
  const [commentID, setCommentId] = useState("");

  const handeCommentOpen = () => {
    setIsCommentOpen((prev) => !prev);
  };
  const handleDelete = () => {
    // dispatch(deletePosts(post.id));
    dispatch(deleteTwit(post.id));
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

  const handleCommentSubmit = (e: any) => {
    e.preventDefault();
    isUpdateComment && dispatch(updateComment([commentID, comment]));
    !isUpdateComment && dispatch(createComment({postId: post.id, comment}));
    setComment("");
    setIsUpdateComment(false);
  };
  return (
    <>
      <div className="goal">
        <div className="head-box">
          <div className="profile">
            <div className="profile-img">{post.name.slice(0, 1)}</div>
            <h4 className="goal-name">{post.name}</h4>
          </div>

          <div className="goal-date">
            {new Date(post.createdAt).toLocaleString("en-US")}
          </div>
        </div>
        <h2 className="goal-text">{post.title}</h2>
        <small className="goal-text-desc">{post.content}</small>
        <button className="close">
          {user.id === post.authorId && <IoClose onClick={handleDelete} />}
        </button>
        <div className="line-through"></div>
        <div className="comment-block flex_col_center">
          <div className="comment-icon-box">
            <TfiComments className="icon" onClick={handeCommentOpen} />
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
                      <span>{comm.comment}</span>
                      <div className="icon-box">
                        {comm.commentorId === user.id && (
                          <div
                            className="icon"
                            onClick={() => handleSetUpdateComment(comm)}
                          >
                            <CiEdit />{" "}
                          </div>
                        )}
                        {(comm.commentorId === user.id ||
                          user.id === post.authorId) && (
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

export default GoalItem;
