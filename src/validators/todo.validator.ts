import { checkSchema } from "express-validator";
import { checkMaxLength, required } from "../helper";

export const todoValidator = checkSchema({
    'name': {
        custom: {
            options: (value) => {
                required("Name", value);
                checkMaxLength("Name", value);
            }
        }
    },
    'description': {
        custom: {
            options: (value) => {
                required("Name", value);
                checkMaxLength("Name", value, 100);
            }
        }
    },
    'deadline': {
        custom: {
            options: (value) => {
                required("Name", value);
            }
        }
    }
});