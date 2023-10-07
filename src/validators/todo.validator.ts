import { checkSchema } from "express-validator";
import { checkMaxLength, required, validateDateTimeFormat } from "../helper";

export const todoValidator = checkSchema({
  name: {
    custom: {
      options: (value: string) => {
        required("Name", value);
        checkMaxLength("Name", value);
        return true;
      },
    },
  },
  description: {
    custom: {
      options: (value: string) => {
        required("Description", value);
        checkMaxLength("Description", value, 100);
        return true;
      },
    },
  },
  deadline: {
    custom: {
      options: (value: string) => {
        required("Deadline", value);
        validateDateTimeFormat(value);
        return true;
      },
    },
  },
});