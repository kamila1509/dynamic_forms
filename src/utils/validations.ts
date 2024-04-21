export const validatorMap = {
  required: (value) => validateRequired(value),
  length: (value, min, max) => validateLength(value, min, max),
  email: (value) => validateEmail(value),
  letters: (value) => validateLetters(value),
  numbers: (value) => validateNumbers(value),
  noSpacesAtEdges: (value) => validateNoSpacesAtEdges(value),
  regex: (value, pattern) => validateRegex(value, pattern),
};

export const applyValidation = (value, validationOptions) => {
  let error = null;

  for (const option in validationOptions) {
    if (validationOptions[option]) {
      switch (option) {
        case "minLength":
          error = validatorMap.length(
            value,
            validationOptions.minLength,
            validationOptions.maxLength
          );
          break;
        case "maxLength":
          error = validatorMap.length(
            value,
            validationOptions.minLength,
            validationOptions.maxLength
          );
          break;
        case "regex":
          if(value !== "") {
            error = validatorMap.regex(value, validationOptions.regex);
          }
          break;
        default:
          error = validatorMap[option] ? validatorMap[option](value) : null;
      }

      if (error) {
        return error;
      }
    }
  }

  return null;
};

export const validateRequired = (value: string) => {
  if (typeof value == "object") {
    return value[0] == "" ? "Este campo es obligatorio" : null;
  } else {
    return value.trim() === "" ? "Este campo es obligatorio" : null;
  }
};

export const validateLength = (value, min, max) => {
  const length = value.length;
  if (length < min || length > max) {
    return `La longitud debe estar entre ${min} y ${max} caracteres`;
  }
  return null;
};

export const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value)
    ? null
    : "Ingresa una dirección de correo electrónico válida";
};

export const validateLetters = (value) => {
  const lettersRegex = /^[A-Za-z]+$/;
  return lettersRegex.test(value)
    ? null
    : "Este campo solo debe contener letras";
};

export const validateNumbers = (value) => {
  const numbersRegex = /^[0-9]+$/;
  return numbersRegex.test(value)
    ? null
    : "Este campo solo debe contener números";
};

export const validateNoSpacesAtEdges = (value) => {
  return /^\s|\s$/.test(value)
    ? "No se permiten espacios en blanco al principio o al final"
    : null;
};

export const validateRegex = (value, pattern) => {
  const customRegex = new RegExp(pattern);
  return customRegex.test(value) ? null : "El formato no es válido";
};
