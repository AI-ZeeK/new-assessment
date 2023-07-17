import {AiOutlineUserAdd, AiTwotoneLike} from "react-icons/ai";
import {BiHomeAlt2} from "react-icons/bi";
import {FaUserPlus, FaUsers} from "react-icons/fa";
import {
  HiHome,
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineUsers,
} from "react-icons/hi";

export interface NavTypes {
  id: string;
  icon: JSX.Element;
  head: string;
  state: boolean;
  link: string;
}
export const navData: NavTypes[] = [
  {
    id: "UIA80SAP",
    head: "Home",
    icon: <HiHome className="icon" />,
    state: false,
    link: "/",
  },
  {
    id: "UIA80ZXP",
    head: "Friend Requests",
    icon: <FaUserPlus className="icon" />,
    state: false,
    link: "/friendrequests",
  },
  {
    id: "UIA80POA",
    head: "Friends",
    icon: <FaUsers className="icon" />,
    state: false,
    link: "/friends",
  },
  {
    id: "UIA81UAI",
    head: "Liked Posts",
    icon: <AiTwotoneLike className="icon" />,
    state: false,
    link: "/likedposts",
  },
];

export const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "RiDashboardFill":
    // return <RiDashboardFill fontSize={18} />;

    default:
      return null;
  }
};
