import { InputNameOmitKeyType, InputNameType } from '@/@types/enum';

export const REGEX_FOR_VALIDATION: {
  [key in InputNameOmitKeyType]: RegExp;
} = {
  NAME: /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,
  BIRTH: /[^0-9]/g,
  PHONE: /[^0-9]/g,
  EMAIL:
    /^[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}com$/,
};

export const NOT_VALID_MESSAGE: { [key: string]: string } = {
  name: '이름은 한글만 입력 가능합니다.',
  birth: '생년월일은 숫자만 입력 가능합니다.',
  phone: '전화번호는 숫자만 입력 가능합니다.',
  email: '올바른 이메일 형식이 아닙니다.',
};
