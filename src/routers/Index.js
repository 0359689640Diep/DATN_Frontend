import ListRoom from "../pages/Admin/Room/Index";
import RoomType from "../pages/Admin/RoomType/Index";
import HomeCustomer from "../pages/Cusstomer/Home";
import Home from '../pages/Admin/Home';
import DetailCustomer from "../pages/Cusstomer/Detail";
import BookingsCustomer from "../pages/Cusstomer/Bookings";
import TransactionHistory from "../pages/Cusstomer/Transaction";
import DetailTransactionHistory from "../pages/Cusstomer/Transaction/detail";
import Account from "../pages/Cusstomer/Account";


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
        path: "/detail/payments/:id", component: BookingsCustomer,
    },
    {
        path: "/transaction-history", component: TransactionHistory,
    },
    {
        path: "/detail-transaction-history/:id", component: DetailTransactionHistory,
    },
    {
        path: "/account", component: Account,
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