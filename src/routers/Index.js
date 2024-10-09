import ListRoom from "../pages/Admin/Room/Index";
import RoomType from "../pages/Admin/RoomType/Index";
import HomeCustomer from "../pages/Cusstomer/Home";
import Home from '../pages/Admin/Home';
import DetailCustomer from "../pages/Cusstomer/Detail";


// Route sử dụng cho khách hàng
const pulicRouter = [
    {
        path: "/", component: HomeCustomer,
    },
    {
        path: "/detail/:id", component: DetailCustomer,
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