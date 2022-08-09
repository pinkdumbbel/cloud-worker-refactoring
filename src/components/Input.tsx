import React, { useState } from 'react';

import { formatString } from '@/utils/formatString';
import { InputNameType, InputNameEnum } from '@/@types/enum';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { applicantInfoState, applicantValidationState } from '@/recoil/atoms';

import styled from 'styled-components';
import { ChangeEventType } from '@/@types/react';

interface InputsInterface {
  name: string;
  birth: string;
  phone: string;
  email: string;
}

interface InputProps {
  name?: InputNameType;
  type?: string;
  reg?: RegExp;
  regWhiteList?: boolean;
  placeholder?: string;
  value?: string;
  validationBorder?: boolean;
  maxLength?: number;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChangeInputs?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  reg = new RegExp(''),
  regWhiteList = false,
  validationBorder = false,
  placeholder,
  value,
  type,
  onChangeInputs,
  name,
  maxLength,
}: InputProps) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [applicantInfo, setApplicantInfo] = useRecoilState(applicantInfoState);
  const setApplicantValidation = useSetRecoilState(applicantValidationState);
  const checkValidation = (value: string) => {
    const regex = new RegExp(reg);
    const isValid = regex.test(value);
    return regWhiteList ? isValid : !isValid;
  };

  const handleValidationCheck = (event: ChangeEventType<HTMLInputElement>) => {
    const { name, value: inputValue } = event.target;
    if (!checkValidation(inputValue)) {
      if (!validationBorder) {
        event.currentTarget.value = inputValue.replace(reg, '');
      } else {
        setIsValid(false);
      }
      return false;
    }
    setIsValid(true);

    return true;
  };

  const makeAutoFormat = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: InputNameType
  ) => {
    let inputValue = event.currentTarget.value;
    event.currentTarget.value = formatString(inputValue, type);
  };

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    if (name === InputNameEnum.BIRTH || name === InputNameEnum.PHONE) {
      makeAutoFormat(event, name);
    }

    setApplicantInfo({ ...applicantInfo, [name]: value });
    const resultValidation = value ? true : false;
    setApplicantValidation((prev) => ({ ...prev, [name]: resultValidation }));
  };

  return (
    <div>
      <StyledInput
        name={name}
        onChange={onChangeInputs}
        validationBorder={isValid}
        placeholder={placeholder}
        type={type || 'text'}
        value={value}
        maxLength={maxLength}
        /* value={value || ''} */
        /* value={value ? value : applicantInfo[name]} */
      />
    </div>
  );
};

const StyledInput = styled.input<{
  validationBorder: boolean;
}>`
  border-bottom: 1px solid
    ${({ theme, validationBorder }) =>
      validationBorder ? theme.color.border.lightgray : theme.color.border.red};

  width: 100%;
  height: 30px;
  margin-bottom: 30px;

  ::placeholder {
    color: ${({ theme }) => theme.color.font.gray};
  }
`;

export default Input;
