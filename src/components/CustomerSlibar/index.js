import { useEffect, useState } from "react";
import className from "../ClassName";
import Star from "../Star";
import styles from "./style.module.scss";
import { getRoomType } from "../../services/Customers/RoomType";



const CustomerSlibar = () => {
    const cx = className(styles);
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const response = await getRoomType();
        if (response.status === 200) {
            setData(response.data);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={cx('slibar')}>
            <div className={cx('slibar-header')}>
                <h5>Các loại phòng tương tự</h5>
            </div>
            <div className={cx('slibar-body')}>

            {
                data.map((item, index) => (
                    <div key={index} className={`${cx('slibar-item')} d-flex justify-content-between`}>
                        <img src={item.room_images[0].image_url} alt={item.room_images[0].description} />
                        <div className={cx('slibar-item-content')}>
                            <h5>Loại Phòng: {item.type}</h5>
                            <div className={cx('star')}><Star star={item.average_rating} /></div>
                            <p>Giá: {item.price_per_night} đ</p>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default CustomerSlibar;