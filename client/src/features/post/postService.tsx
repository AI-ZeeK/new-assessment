import axios from "axios";
import {baseUrl} from "../../constants/constants";
const API = axios.create({
  baseURL: baseUrl,
});
const API_URL = "/api/post";

API.interceptors.request.use((req) => {
  if (localStorage.getItem("access-token")) {
    req.headers.authorization = `Bearer ${JSON.parse(
      localStorage.getItem("access-token") as string
    )}`;
  }

  return req;
});

const createTwit = async (image: string, content: string, authorId: string) => {
  const res = await API.post(
    API_URL,
    {
      image,
      content,
      authorId,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};
const likePost = async (postId: string, userId: string) => {
  const {data} = await API.put(`${API_URL}/${postId}/${userId}`);
  return data;
};

//  Get user Twits
const getTwits = async () => {
  const {data} = await API.get(API_URL);

  return data;
};
const getMyDjengs = async (id: string) => {
  const {data} = await API.get(`${API_URL}/users/${id}`);
  return data;
};
const getDjeng = async (id: string) => {
  const {data} = await API.get(`${API_URL}/user/${id}`);
  return data;
};

// Delete user Twit
const deleteTwit = async (TwitId: any) => {
  const {data} = await API.delete(`${API_URL}/${TwitId}`);

  return data;
};

const TwitService = {
  createTwit,
  getTwits,
  deleteTwit,
  likePost,
  getMyDjengs,
  getDjeng,
};

export default TwitService;
