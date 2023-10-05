export const required = (attribute: string, value: string) => {
    let error = false;
    if (value == undefined ||  value == null) {
      error = true;
    } else if (value.trim() === "" ) {
      error = true;
    }
    if (error) {
      throw new Error(`${attribute} is a required field.`);
    }
}
  
export const checkMaxLength = (attribute: string, value: string, maxLength = 50, removeNewLine=true) => {
    // if (value && removeNewLine === true) {
    //   value = value.replace(/(\r\n|\n|\r)/gm, "");
    //   value = removeTags(value);
    // }
    if (value && value.trim().length > maxLength) {
      throw new Error(`${attribute} must not exceed ${maxLength} characters.}`);
    } else {
      return true;
    }
}

function removeTags(str: string) {
    if ((str===null) || (str===''))
    {return false;}
    else
    {str = str.toString();}
    return str.replace( /(<([^>]+)>)/ig, '');
  }