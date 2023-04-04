import axios from "axios";
const API = axios.create({
	baseURL: `https://assesment-eg7s.onrender.com`,
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
	const token = JSON.parse(localStorage.getItem("access-user") as string).token;
	console.log(token, TwitData);
	const { data } = await API.post(API_URL, {
		postId: TwitData.postId,
		comment: TwitData.comment,
	});
	console.log(data);
	return data;
};

//  Get user Twits
const getComments = async () => {
	const { data } = await API.get(API_URL);
	return data;
};

const commentService = {
	createComment,
	getComments,
};

export default commentService;
