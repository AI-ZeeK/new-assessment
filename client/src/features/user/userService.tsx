import axios from "axios";
const API = axios.create({
  //   baseURL: `https://newassessment.onrender.com`,
  baseURL: `http://localhost:5000`,
});
const API_URL = "/api/friends";
// friends/:friendId/:userId
API.interceptors.request.use((req) => {
  if (localStorage.getItem("access-token")) {
    req.headers.authorization = `Bearer ${JSON.parse(
      localStorage.getItem("access-token") as string
    )}`;
  }

  return req;
});

const SendFriendRequest = async (friendId: string, userId: string) => {
  const {data} = await API.put(`${API_URL}/${friendId}/${userId}`);
  return data;
};

const AcceptFriendRequest = async (
  requestId: string,
  requestState: boolean
) => {
  console.log(requestId, requestState);
  const {data} = await API.put(`${API_URL}/${requestId}`, {
    requestState,
  });
  console.log(data);
  return data;
};

const GetFriendRequests = async (userId: string) => {
  const {data} = await API.get(`${API_URL}/requests/received/${userId}`);
  return data;
};
const GetSentFriendRequests = async (userId: string) => {
  const {data} = await API.get(`${API_URL}/requests/sent/${userId}`);
  return data;
};

const GetFriendPosts = async (userId: string) => {
  const {data} = await API.get(`${API_URL}/${userId}/posts`);
  return data;
};
const GetAllUsers = async () => {
  const {data} = await API.get(`${API_URL}/all`);
  return data;
};

const userService = {
  SendFriendRequest,
  AcceptFriendRequest,
  GetFriendRequests,
  GetFriendPosts,
  GetSentFriendRequests,
  GetAllUsers,
};

export default userService;
