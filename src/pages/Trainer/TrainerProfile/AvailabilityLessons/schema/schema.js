import Joi from "joi";

export const availabilitySchema = Joi.object({
  daysOfWeek: Joi.array().items(Joi.number()),
  specificDate: Joi.string().allow(""),
  startTime: Joi.string().required(),
  isRecurring: Joi.boolean().required()
}).custom((value, helpers) => {
  if (value.isRecurring && (!value.daysOfWeek || value.daysOfWeek.length === 0)) {
    return helpers.message("Please select at least one day for recurring lessons");
  }
  if (!value.isRecurring && !value.specificDate) {
    return helpers.message("Please select a date for one-time lesson");
  }
  return value;
});
