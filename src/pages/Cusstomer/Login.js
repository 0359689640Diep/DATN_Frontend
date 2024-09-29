import React, { useState } from 'react';
import Joi from 'joi';
import LoginRequset from '../../services/Authentication/Login';
import { Response } from '../../components/Response';
import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    // Define Joi schema for validation
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required().messages({
            'string.empty': 'Email không được để trống',
            'string.email': 'Email không đúng định dạng',
        }),
        password: Joi.string().min(6).required().messages({
            'string.empty': 'Password không được để trống',
            'string.min': 'Mật khẩu phải có tối thiểu 6 ký tự',
        }),
    });

    // Handle input change
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        const { error } = schema.validate(formData, { abortEarly: false });
        if (error) {
            const newErrors = {};
            error.details.forEach((err) => {
                newErrors[err.path[0]] = err.message;
            });
            setErrors(newErrors);
        } else {
            setErrors({});
            const response = await LoginRequset(formData);
            Response(response);
            let redirect = "";
            switch (response.data.role) {
                case 1:
                    redirect = "/admin";
                    break;
                case 2:
                    // lễ tân
                    redirect = "/receptionist";
                    break;
                case 3:
                    // quản lý
                    redirect = "/manage";
                    break;
                case 4:
                    // khách hàng
                    redirect = "/";
                    break;
                default:
                    break;
            }
            navigate(redirect);
            localStorage.setItem("accessToken", response.data.access_token);
        }
    };

    return (
        <form  onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}
