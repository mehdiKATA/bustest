function containsLetter(str) {
  return /[a-z]/i.test(str);
}

function containsDigit(str) {
  return /[0-9]/.test(str);
}

function containsUppercase(str) {
  return /[A-Z]/.test(str);
}

function containsSymbol(str) {
  return /[!@#$%^&*(),.?":{}|<>]/.test(str);
}

export function verifPwd(str) {
  return (
    str.length >= 8 &&
    containsLetter(str) &&
    containsDigit(str) &&
    containsUppercase(str) &&
    containsSymbol(str)
  );
}
