export const REGEX_FOR_VALIDATION: { [key: string]: RegExp } = {
  NAME: /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,
  BIRTH: /[^0-9]/g,
  PHONE: /[^0-9]/g,
  EMAIL:
    /^[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}com$/,
};
