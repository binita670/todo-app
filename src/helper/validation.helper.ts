import moment from "moment";

export const required = (attribute: string, value: string) => {
  let error = false;
  if (value == undefined || value == null) {
    error = true;
  } else if (value.trim() === "") {
    error = true;
  }
  if (error) {
    throw new Error(`${attribute} is a required field.`);
  }
  return true;
};

export const checkMaxLength = (
  attribute: string,
  value: string,
  maxLength = 50,
) => {
  if (value && value.trim().length > maxLength) {
    throw new Error(`${attribute} must not exceed ${maxLength} characters.}`);
  } else {
    return true;
  }
};

export const validateDateTimeFormat = (
  dateTime: string,
  format = ["YYYY/MM/DD HH:mm"],
) => {
  if (
    dateTime &&
    dateTime !== "" &&
    !moment(dateTime, format, true).isValid()
  ) {
    throw new Error(`Invalid datetime format`);
  }
  return true;
};
