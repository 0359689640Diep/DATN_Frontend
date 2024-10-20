import Joi from "joi";


const ValidateService = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Tên không được để trống',
        'any.required': 'Tên không được để trống',
    }),
    price: Joi.number().required().messages({
        'any.required': 'Giá không được để trống',
        'number.base': 'Giá phải là số',
    }),
    room_type_id: Joi.number().required().messages({
        'any.required': 'Loại phòng không được để trống',
        'number.base': 'Loại phòng phải là số',
    }),
    status_id: Joi.number().required().messages({
        'any.required': 'Trạng thái không được để trống',
        'number.base': 'Trạng thái phải là số',
    }),
    description: Joi.string().optional(),
});

export default ValidateService;