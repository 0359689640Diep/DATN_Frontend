import Joi from "joi";


const ValidateRoom = Joi.object({
    number: Joi.number().required().messages({
        'any.required': 'Số phòng không được để trống',
        'number.base': 'Số phòng phải là số',
    }),
    room_type_id: Joi.number().required().messages({
        'any.required': 'Loại phòng không được để trống',
        'number.base': 'Loại phòng phải là số',
    }),
    status_id: Joi.number().required().messages({
        'any.required': 'Trạng thái không được để trống',
        'number.base': 'Trạng thái phải là số',
    }),
});

export default ValidateRoom;