import className from "../ClassName";
import style from "./style.scss";


const CustomerNav = ({listNav}) => {
    const cx = className(style);
    return (
        <nav>
            <ul className={`${cx("nav")} justify-content-start align-items-center`}>
                {listNav.map((item, index) => (
                    <li key={index} className={`nav-item d-flex justify-content-between align-items-center`}>
                        <i className={`bi bi-${item.icon}`}></i>
                        <a href={item.url} className="mx-1">{item.title}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default CustomerNav;