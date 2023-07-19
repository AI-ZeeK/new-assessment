import {BiSolidUserAccount} from "react-icons/bi";
import {PiUserListFill} from "react-icons/pi";
import {FaUserPlus} from "react-icons/fa";
import {HiHome} from "react-icons/hi";

export interface NavTypes {
  id: string;
  icon: string;
  head: string;
  state: boolean;
  link: string;
}
export const navData: NavTypes[] = [
  {
    id: "UIA80SAP",
    head: "Home",
    icon: "HiHome",
    state: true,
    link: "/",
  },
  {
    id: "UIA80ZXP",
    head: "Friend Requests",
    icon: "FaUserPlus",
    state: false,
    link: "/friendrequests",
  },
  {
    id: "UIA80POA",
    head: "Friends Post",
    icon: "BiSolidUserAccount",
    state: false,
    link: "/friends",
  },
  {
    id: "UIA81UAI",
    head: "Users",
    icon: "PiUserListFill",
    state: false,
    link: "/users",
  },
];

export const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "HiHome":
      return <HiHome className="icon" />;
    case "FaUserPlus":
      return <FaUserPlus className="icon" />;
    case "BiSolidUserAccount":
      return <BiSolidUserAccount className="icon" />;
    case "PiUserListFill":
      return <PiUserListFill className="icon" />;

    default:
      return null;
  }
};
