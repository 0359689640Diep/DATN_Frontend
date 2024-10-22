import Joi from "joi";


const ValidateServiceUsers = Joi.object({
    service_id: Joi.number().required().messages({
        'any.required': 'Dịch vụ không được để trống',
        'number.base': 'Dịch vụ phải là số',
    }),
    user_id: Joi.number().required().messages({
        'any.required': 'Nhân viên không được để trống',
        'number.base': 'Nhân viên phải là số',
    }),
    status_id: Joi.number().required().messages({
        'any.required': 'Trạng thái không được để trống',
        'number.base': 'Trạng thái phải là số',
    }),
});

export default ValidateServiceUsers;