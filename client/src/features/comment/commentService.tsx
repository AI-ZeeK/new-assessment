import axios from "axios";
const API = axios.create({
  // baseURL: `https://assesment-eg7s.onrender.com`,
  baseURL: `http://localhost:5000`,
});
const API_URL = "/api/comment/";

API.interceptors.request.use((req) => {
  if (localStorage.getItem("access-user")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("access-user") as string).token
    }`;
  }

  return req;
});

const createComment = async (TwitData: any) => {
  const {data} = await API.post(API_URL, {
    postId: TwitData.postId,
    comment: TwitData.comment,
  });
  return data;
};
const updateComment = async (id: string, comment: any) => {
  const {data} = await API.put(`${API_URL}${id}`, {
    comment: comment,
  });
  return data;
};

//  Get user Twits
const getComments = async () => {
  const {data} = await API.get(API_URL);
  return data;
};
//  Delete user Twits
const deleteComments = async (id: string) => {
  console.log(`${API_URL}/${id}`, ".....", id);
  const {data} = await API.delete(`${API_URL}${id}`);
  return data;
};

const commentService = {
  createComment,
  getComments,
  deleteComments,
  updateComment,
};

export default commentService;
