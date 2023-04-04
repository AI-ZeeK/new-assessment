import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrClose } from "react-icons/gr";
import { TfiComments } from "react-icons/tfi";
import { deleteTwit, deletePosts } from "../features/post/postSlice";
import { createComment } from "../features/comment/commentSlice";

const GoalItem = ({ post, comments }: any) => {
	const dispatch = useDispatch();
	const [isCommentOpen, setIsCommentOpen] = useState(false);
	const [commentLength, setCommentLength] = useState<number>(0);
	const { user } = useSelector((state: any) => state.auth);
	const [comment, setComment] = useState("");

	const handeCommentOpen = () => {
		setIsCommentOpen((prev) => !prev);
	};
	const handleDelete = () => {
		dispatch(deletePosts(post.id));
		dispatch(deleteTwit(post.id));
	};

	const handleCommentSubmit = (e: any) => {
		e.preventDefault();
		dispatch(createComment({ postId: post.id, comment }));
	};
	return (
		<>
			<div className="goal">
				<div className="goal-date">
					{new Date(post.createdAt).toLocaleString("en-US")}
				</div>
				<h2 className="goal-text">{post.title}</h2>
				<small className="goal-text">{post.content}</small>
				<button className="close">
					{user.id === post.authorId && (
						<GrClose onClick={handleDelete} style={{ fontSize: "1.4rem" }} />
					)}
				</button>
				<div className="line-through"></div>
				<div className="comment-block flex_col_center gap_102">
					<div className="comment-icon-box">
						<TfiComments className="icon" onClick={handeCommentOpen} />
					</div>
					<div
						className={`${
							isCommentOpen ? "comment-box active" : "comment-box"
						}`}>
						<ul>
							{comments.map((element: any) => {
								if (element.postId === post.id)
									return (
										<li className="comment-lists" key={element.id}>
											{element.comment}
										</li>
									);
							})}
						</ul>
						<form
							action=""
							className="flex_row_end form-box"
							onSubmit={handleCommentSubmit}>
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
								Add
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default GoalItem;
