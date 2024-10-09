import className from '../ClassName';
import style from './style.module.scss';

const Star = ({ star = 5 }) => {
    const cx = className(style);

    return (
        <div className={cx("content")}>
            {Array.from({ length: star }).map((_, i) => (
                <i key={i} className="bi bi-star-fill"></i>
            ))}
        </div>
    );
};

export default Star;
