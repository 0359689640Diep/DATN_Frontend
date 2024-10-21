import ListRoom from "../pages/Admin/Room/Index";
import RoomType from "../pages/Admin/RoomType/Index";
import HomeCustomer from "../pages/Cusstomer/Home";
import Home from '../pages/Admin/Home';
import DetailCustomer from "../pages/Cusstomer/Detail";
import BookingsCustomer from "../pages/Cusstomer/Bookings";
import TransactionHistory from "../pages/Cusstomer/Transaction";
import DetailTransactionHistory from "../pages/Cusstomer/Transaction/detail";
import Account from "../pages/Cusstomer/Account";
import AccountAdmin from "../pages/Admin/Account/Index";
import Banner from "../pages/Admin/Banner/Index";
import Service from "../pages/Admin/Service/Index";
import Bookings from "../pages/Admin/Bookings/Index";
import DetailService from "../pages/Admin/DetailService/Index";


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
    {
        path: "/admin/service", component: Service,
    },
    {
        path: "/admin/service/:id", component: DetailService,
    },
    {
        path: "/admin/account", component: AccountAdmin,
    },
    {
        path: "/admin/banner", component: Banner,
    },
    {
        path: "/admin/bookings", component: Bookings,
    },
]

export { pulicRouter, privateRouter, adminRoute };