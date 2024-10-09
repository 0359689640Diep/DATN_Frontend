import className from "../ClassName";
import Star from "../Star";
import styles from "./style.module.scss";



const CustomerSlibar = () => {
    const cx = className(styles);


    return (
        <div className={cx('slibar')}>
            <div className={cx('slibar-header')}>
                <h5>Các loại phòng tương tự</h5>
            </div>
            <div className={cx('slibar-body')}>

                <div className={`${cx('slibar-item')} d-flex justify-content-between`}>
                    <img src="http://127.0.0.1:8000/storage/uploads/YqegfRNoWx6gpkkmOXEwwqoEJeNqtbw3xdBBXEKN.jpg" alt="room1" />
                    <div className={cx('slibar-item-content')}>
                        <h5>Loại Phòng: Phòng 1</h5>
                        <div className={cx('star')}><Star star={5} /></div>
                        <p>Giá: 150,000 đ</p>
                    </div>
                </div>

                <div className={`${cx('slibar-item')} d-flex justify-content-between`}>
                    <img src="http://127.0.0.1:8000/storage/uploads/YqegfRNoWx6gpkkmOXEwwqoEJeNqtbw3xdBBXEKN.jpg" alt="room1" />
                    <div className={cx('slibar-item-content')}>
                        <h5>Loại Phòng: Phòng 1</h5>
                        <div className={cx('star')}><Star star={5} /></div>
                        <p>Giá: 150,000 đ</p>
                    </div>
                </div>
                <div className={`${cx('slibar-item')} d-flex justify-content-between`}>
                    <img src="http://127.0.0.1:8000/storage/uploads/YqegfRNoWx6gpkkmOXEwwqoEJeNqtbw3xdBBXEKN.jpg" alt="room1" />
                    <div className={cx('slibar-item-content')}>
                        <h5>Loại Phòng: Phòng 1</h5>
                        <div className={cx('star')}><Star star={5} /></div>
                        <p>Giá: 150,000 đ</p>
                    </div>
                </div>
                <div className={`${cx('slibar-item')} d-flex justify-content-between`}>
                    <img src="http://127.0.0.1:8000/storage/uploads/YqegfRNoWx6gpkkmOXEwwqoEJeNqtbw3xdBBXEKN.jpg" alt="room1" />
                    <div className={cx('slibar-item-content')}>
                        <h5>Loại Phòng: Phòng 1</h5>
                        <div className={cx('star')}><Star star={5} /></div>
                        <p>Giá: 150,000 đ</p>
                    </div>
                </div>
                <div className={`${cx('slibar-item')} d-flex justify-content-between`}>
                    <img src="http://127.0.0.1:8000/storage/uploads/YqegfRNoWx6gpkkmOXEwwqoEJeNqtbw3xdBBXEKN.jpg" alt="room1" />
                    <div className={cx('slibar-item-content')}>
                        <h5>Loại Phòng: Phòng 1</h5>
                        <div className={cx('star')}><Star star={5} /></div>
                        <p>Giá: 150,000 đ</p>
                    </div>
                </div>
                <div className={`${cx('slibar-item')} d-flex justify-content-between`}>
                    <img src="http://127.0.0.1:8000/storage/uploads/YqegfRNoWx6gpkkmOXEwwqoEJeNqtbw3xdBBXEKN.jpg" alt="room1" />
                    <div className={cx('slibar-item-content')}>
                        <h5>Loại Phòng: Phòng 1</h5>
                        <div className={cx('star')}><Star star={5} /></div>
                        <p>Giá: 150,000 đ</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerSlibar;