import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {createDjeng} from "../features/post/postSlice";

const GoalForm = () => {
  const {user} = useSelector((state: any) => state.auth);

  const [twitTitle, setTwitTitle] = useState("");
  const [twitContent, setTwitContent] = useState("");
  const dispatch = useDispatch();
  const onSubmit = (e: any) => {
    e.preventDefault();

    dispatch(createDjeng({twitTitle, twitContent, authorId: user.id}));
    setTwitTitle("");
    setTwitContent("");
  };

  return (
    <section className="form">
      <form action="" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Twit Title</label>
          <input
            type="text"
            name="text"
            id="text"
            value={twitTitle}
            required
            onChange={(e) => setTwitTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Twit Content</label>
          <textarea
            // type="text"
            name="text"
            id="text"
            required
            value={twitContent}
            onChange={(e) => setTwitContent(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Twit
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
