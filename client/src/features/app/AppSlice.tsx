import {createSlice} from "@reduxjs/toolkit";
import {NavTypes, navData} from "../../data/NavData";

interface InitialTypes {
  isModalOpen: boolean;
  isModal2Open: boolean;
  isModal3Open: boolean;
  isModal4Open: boolean;
  isDeleteModalOpen: boolean;
  isBioUpdateModalOpen: boolean;
  modal2Img: any;
  postBlock: Post;
  profilePicture: string;
  deletePostId: string;
  navData: NavTypes[];
}
export interface Post {
  id: string;
  name: string;
  profilePhoto: string;
  image: string;
  content: string;
  createdAt: any;
  authorId: string;
  postlikes: any[];
}

const initialState: InitialTypes = {
  isModalOpen: false,
  isModal2Open: false,
  isModal3Open: false,
  isModal4Open: false,
  isBioUpdateModalOpen: false,
  isDeleteModalOpen: false,
  modal2Img: null,
  navData: navData,
  profilePicture: "",
  deletePostId: "",
  postBlock: {
    id: "",
    name: "",
    profilePhoto: "",
    image: "",
    content: "",
    createdAt: "",
    authorId: "",
    postlikes: [],
  },
};

export const AppSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setModalOpen: (state) => {
      state.isModalOpen = true;
      state.isModal2Open = false;
      state.isModal3Open = false;
      state.isModal4Open = false;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    openModal2: (state, {payload}) => {
      state.modal2Img = payload;
      state.isModal2Open = true;
      state.isModalOpen = false;
      state.isModal3Open = false;
      state.isModal4Open = false;
    },
    closeModal2: (state) => {
      state.isModal2Open = false;
    },
    openModal3: (state) => {
      state.isModal3Open = true;
      state.isModalOpen = false;
      state.isModal2Open = false;
      state.isModal4Open = false;
    },
    closeModal3: (state) => {
      state.isModal3Open = false;
    },
    openModal4: (state) => {
      console.log(456);
      state.isModal4Open = true;
      state.isModalOpen = false;
      state.isModal2Open = false;
      state.isModal3Open = false;
    },
    closeModal4: (state) => {
      state.isModal4Open = false;
    },
    openDeleteModal: (state) => {
      state.isDeleteModalOpen = true;
      state.isModal4Open = false;
      state.isModalOpen = false;
      state.isModal2Open = false;
      state.isModal3Open = false;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
    },
    openBioUpdateModal: (state) => {
      state.isBioUpdateModalOpen = true;
    },
    closeBioUpdateModal: (state) => {
      state.isBioUpdateModalOpen = false;
    },
    setPostBlock: (state, {payload}) => {
      state.postBlock = payload;
    },
    setDeletePostId: (state, {payload}) => {
      state.deletePostId = payload;
    },
    setNavData: (state, {payload}) => {
      const x = state.navData.map((navItem) => {
        return payload.id === navItem.id
          ? {...navItem, state: true}
          : {...navItem, state: false};
      });
      state.navData = x;
    },
  },
});

export const {
  setModalOpen,
  closeModal,
  openModal2,
  closeModal2,
  setPostBlock,
  openModal3,
  closeModal3,
  openModal4,
  closeModal4,
  openDeleteModal,
  closeDeleteModal,
  setDeletePostId,
  setNavData,
  openBioUpdateModal,
  closeBioUpdateModal,
} = AppSlice.actions;
export default AppSlice.reducer;
