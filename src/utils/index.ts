export const isValidString = (value?: string | null) => {
  if (value && typeof value === 'string' && value !== '') {
    return true;
  } else return false;
};

export const isValidStringArray = (value?: any[]) => {
  if (Array.isArray(value)) {
    let result = true;
    value.forEach((value) => {
      const valid = isValidString(value);
      if (valid === false) {
        result = valid;
      }
    });
    return result;
  } else return false;
};
