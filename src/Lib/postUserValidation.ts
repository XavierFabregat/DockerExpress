export function postUserValidation (username: string, password: string, repeatPassword: string) {
  if (!username || !password || !repeatPassword) {
    return { valid: false, message: "Username and password are required" };
  } else if (password !== repeatPassword) {
    return { valid: false, message: "Passwords do not match" };
  } else if (!/(?=.*[!@#$%^&*_-])/.test(password) || !(password.length > 5)) {
    return { valid: false, message: "Password invalid." };
  } else if (username.length < 6) {
    return { valid: false, message: "Username must be at least 6 characters" };
  } else {
    return { valid: true, message: "" };
  }
}

export function validatePassword (password: string) {
  if (!/(?=.*[!@#$%^&*_-])/.test(password) || !(password.length > 5)) {
    return { valid: false, message: "Password invalid." };
  } else {
    return { valid: true, message: "" };
  }
}

export function validateUsername (username: string) {
  if (username.length < 6) {
    return { valid: false, message: "Username must be at least 6 characters" };
  } else {
    return { valid: true, message: "" };
  }
}


export function validateUpdatePasswords (password: string, repeatPassword: string) {
  if (!password || !repeatPassword) { 
    return { valid: false, message: "Password and repeat password are required" };
  } else if (!validatePassword(password).valid || !validatePassword(repeatPassword).valid) {
    return { valid: false, message: "Password/s invalid." };
  } else if (password !== repeatPassword) {
    return { valid: false, message: "Passwords do not match" };
  } else {
    return { valid: true, message: "" };
  }
}