import { InputNameEnum, InputNameType } from '@/@types/enum';

export const getFormattedString = {
  birth: (value: string) => {
    return value
      .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, '$1.$2.$3')
      .replace(/\.{1,2}$/g, '');
  },
  phone: (value: string) => {
    return value
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/\-{1,2}$/g, '');
  },
  name: (value: string) => value,
  email: (value: string) => value,
  gender: (value: string) => value,
  transportation: (value: string) => value,
  region: (value: string) => value,
};

export const formatString = (value: string, type: InputNameType) => {
  let formattedValue = '';
  /* formattedValue = getFormattedString[type](value); */
  return formattedValue;
};
