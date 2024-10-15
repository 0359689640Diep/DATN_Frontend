import { useState } from "react";

const HandleStar = ({ star = 0, onStarClick }) => {
    const [rating, setRating] = useState(star);

    const handleClick = (newRating) => {
        setRating(newRating);
        onStarClick(newRating); // Thông báo cho component cha
    };

    return (
        <div>
            {Array.from({ length: 5 }).map((_, index) => (
                <i
                    key={index}
                    className={`bi bi-star${index < rating ? "-fill" : ""}`}
                    onClick={() => handleClick(index + 1)}
                    style={{ cursor: "pointer" }}
                />
            ))}
        </div>
    );
};

export default HandleStar;
