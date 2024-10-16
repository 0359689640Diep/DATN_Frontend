import { useState, useEffect } from "react";
import style from './style.module.scss';
import className from "../ClassName";

const HandleStar = ({ star = 0, onStarClick }) => {
    const [rating, setRating] = useState(star);
    const cx = className(style);
    // Cập nhật rating khi prop star thay đổi
    useEffect(() => {
        setRating(star);
    }, [star]);

    const handleClick = (newRating) => {
        setRating(newRating);
        onStarClick(newRating); // Thông báo cho component cha
    };

    return (
        <div className={cx("content")}>
            <i
                className={`bi bi-star${1 <= rating ? "-fill" : ""}`}
                onClick={() => handleClick(1)}
                style={{ cursor: "pointer" }}
            />
            <i
                className={`bi bi-star${2 <= rating ? "-fill" : ""}`}
                onClick={() => handleClick(2)}
                style={{ cursor: "pointer" }}
            />
            <i
                className={`bi bi-star${3 <= rating ? "-fill" : ""}`}
                onClick={() => handleClick(3)}
                style={{ cursor: "pointer" }}
            />
            <i
                className={`bi bi-star${4 <= rating ? "-fill" : ""}`}
                onClick={() => handleClick(4)}
                style={{ cursor: "pointer" }}
            />
            <i
                className={`bi bi-star${5 <= rating ? "-fill" : ""}`}
                onClick={() => handleClick(5)}
                style={{ cursor: "pointer" }}
            />
        </div>
    );
};

export default HandleStar;
