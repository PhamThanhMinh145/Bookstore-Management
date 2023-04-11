import { AiFillHome } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import {
  BsBookHalf,
  BsFillCartCheckFill,
  BsPersonLinesFill
} from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { SiAffinitypublisher } from "react-icons/si";

export const links = [
  {
    title: "DASHBOARD",

    links: [
      {
        name: "home",
        icon: <AiFillHome />,
      },
    ],
  },

  {
    title: "ACCOUNTS",
    links: [
      {
        name: "employee",
        icon: <IoIosPeople />,
      },
      {
        name: "customer",
        icon: <MdOutlinePeopleAlt />,
      },
    ],
  },
  {
    title: "PRODUCTS",
    links: [
      {
        name: "books",
        icon: <BsBookHalf />,
      },
      {
        name: "publishers",
        icon: <SiAffinitypublisher />,
      },
      {
        name: "authors",
        icon: <BsPersonLinesFill />,
      },
      {
        name: "fields",
        icon: <BiCategory />,
      },
    ],
  },
  {
    title: "SALES",
    links: [
      {
        name: "orders",
        icon: <BsFillCartCheckFill />,
      },
    ],
  },
];

export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#12E86B",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];

export const getRoleCollection = () => [
  { roleID: 1, role: "Admin" },
  { roleID: 3, role: "Staff" },
];

export const getAuthorCollection = () => [
  { id: "1", title: "Nguyen Nhat Anh" },
  { id: "2", title: "To Huu" },
];

export const getPublisherCollection = () => [
  { id: "1", title: "NXB Kim Dong" },
  { id: "2", title: "NXB Anh trang" },
];

export const getFieldCollection = () => [
  { id: "1", title: "Thiller" },
  { id: "2", title: "Science and fiction" },
];

// export const userProfileData = [
//   {
//     icon: <BsCurrencyDollar />,
//     title: "My Profile",
//     desc: "Account Settings",
//     iconColor: "#03C9D7",
//     iconBg: "#E5FAFB",
//   },
//   {
//     icon: <FiCreditCard />,
//     title: "My Tasks",
//     desc: "To-do and Daily Tasks",
//     iconColor: "rgb(255, 244, 229)",
//     iconBg: "rgb(254, 201, 15)",
//   },
// ];
