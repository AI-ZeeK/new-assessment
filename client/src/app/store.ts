import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/post/postSlice";
import commentReducer from "../features/comment/commentSlice";
import appReducer from "../features/app/AppSlice";
import friendReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    comment: commentReducer,
    app: appReducer,
    friend: friendReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
