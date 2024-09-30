import ListRoom from "../pages/Admin/Room/Index";
import RoomType from "../pages/Admin/RoomType/Index";
import HomeCustomer from "../pages/Cusstomer/Home";
import Login from "../pages/Cusstomer/Login";
import Home from '../pages/Admin/Home';


// Route sử dụng cho khách hàng
const pulicRouter = [
    {
        path: "/", component: HomeCustomer,
    },
    {
        path: "/login", component: Login,

    },
    {
        path: "/register", component: "Register",

    },
    {
        path: "/register-verification", component: "RegisterVerification",

    },
    {
        path: "/forgot-password", component: "ForgotPassword",

    },
];

const privateRouter = [
    {
        path: "/admin", component: "Admin",
    },
]
// kết thúc

const adminRoute = [
    {
        path: "/admin", component: Home ,
    },
    {
        path: "/admin/list-room", component: ListRoom,
    },
    {
        path: "/admin/room-type", component: RoomType,
    },
]

export { pulicRouter, privateRouter, adminRoute };