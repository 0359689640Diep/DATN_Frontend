import { useEffect, useState } from "react";
import className from "../../components/ClassName";
import style from "./style.scss";
import { getBanners } from "../../services/Banner";


const Slibar = () => {
    const cx = className(style);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBanners();
                if(response.status === 200){
                    setData(response.data);
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };

        fetchData();
    }, []); // Chạy một lần khi component mount
    

    return (
        <div id="carouselExample" className={`${cx("slibar")} carousel slide`}>
            <div className="carousel-inner">
            {
                data.map((item, index) => (
                    <div key={index} className={`carousel-item ${index === 0? 'active' : ''}`}>
                        <img src={item.image_url} className="d-block w-100" alt="images" />
                    </div>
                ))
            }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Slibar;