import { useEffect, useState } from "react";
import className from "../../../components/ClassName";
import style from "./style.scss";
import { getRoomType } from "../../../services/Customers/RoomType";

const HomeCustomer = () => {
    const cx = className(style);

    const [data, setData] = useState([]); // Dữ liệu hiển thị
    const [allData, setAllData] = useState([]); // Dữ liệu gốc
    const [filter, setFilter] = useState({}); // Tạo state lưu trữ giá trị filter

    const fetchData = async (params = {}) => {
        try {
            const response = await getRoomType(params);
            if (response.status === 200) {
                setData(response.data);
                setAllData(response.data); // Lưu trữ dữ liệu gốc
            }
        } catch (error) {
            console.error('Error fetching room types:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Lấy dữ liệu ban đầu khi component render
    }, []);

    useEffect(() => {
        // Lọc dữ liệu dựa trên filter
        const filteredData = allData.filter(item => {
            const matchesType = filter.type ? item.id === parseInt(filter.type) : true;
            const matchesPrice = filter.price_per_night ? item.price_per_night <= parseFloat(filter.price_per_night) : true;
            return matchesType && matchesPrice;
        });
        setData(filteredData);
    }, [filter, allData]); // Lọc khi filter hoặc allData thay đổi

    const handleChangeFilter = (e) => {
        const { name, value } = e.target;
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: value,
        })); // Cập nhật filter
    };

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className={`${cx("cotent")}`}>
                    <h2>Các loại phòng chúng tôi đang có</h2>
                    <p>Nhanh tay đặt ngay, để mai sẽ lỡ</p>
                </div>
                <div className="d-flex justify-content-between py-4">
                    <select className="form-control" name="type" onChange={handleChangeFilter}>
                        <option value="">Chọn loại phòng</option>
                        {
                            allData.map((item) => { // Sử dụng allData để lấy tất cả loại phòng
                                return <option key={item.id} value={item.id}>{item.type}</option>
                            })
                        }
                    </select>
                    <input 
                        type="number" 
                        className="form-control ms-3" 
                        onChange={handleChangeFilter} 
                        name="price_per_night" 
                        placeholder="Nhập giá bạn cần" 
                    />
                </div>
            </div>
            <div className={`${cx("list-product")} row`}>
                {
                    data.map((item, index) => {
                        let image = item.room_images.length > 0 ? item.room_images[0] : { description: "Không có ảnh", image_url: "" };
                        return (
                            <div key={index} className={`${cx("product")} col-12 col-md-4 mb-3`}>
                                <img src={image.image_url} alt={image.description} />
                                <div>
                                    <h3>{item.type}</h3>
                                    <p>{item.description ?? ""}</p>
                                    <span>Giá: {item.price_per_night ?? 0} đ / đêm</span>
                                    <div className="d-flex justify-content-center">
                                        <button type="button" className="btn">Đăng ký ngay</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default HomeCustomer;
