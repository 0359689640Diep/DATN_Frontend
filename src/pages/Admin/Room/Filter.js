import { useState } from "react";

const Filter = ({ fetchData, roomTypes }) => {
    const [formData, setFormData] = useState({
        number: "",
        room_type_id: "",
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Cập nhật dữ liệu form
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Gửi dữ liệu lên server
        fetchData(formData);
    }
    const handleDelete = () => {
        fetchData();
        setFormData({
            number: "",
            room_type_id: "",
        })
    };
    return (
        <form className="d-flex justify-content-start" onSubmit={handleSubmit}>
            <div className="mb-3">
                <input value={formData.number} type="number" name="number" className="form-control" placeholder="Số phòng" onChange={handleChange} />
            </div>
            <div className="mb-3 ms-2">
                <select value={formData.room_type_id} className="form-control rounded" name="room_type_id" onChange={handleChange}>
                    <option value="">Loại phòng</option>
                    {roomTypes.map((roomType) => (
                        <option key={roomType.id} value={roomType.id}>
                            {roomType.type}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3 ms-2">
                <button type="submit" className="btn btn-outline-primary">
                    <i className="bi bi-funnel"></i>
                    <span className="ms-2"> Lọc </span>
                </button>
                <button type="button" className="btn btn-outline-danger ms-2" onClick={handleDelete}>
                    <i className="bi bi-trash"></i>
                    <span className="ms-2"> Xóa lọc </span>
                </button>
            </div>
        </form>
    );
}

export default Filter;