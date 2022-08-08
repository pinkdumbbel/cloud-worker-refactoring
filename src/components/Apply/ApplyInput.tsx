import React from 'react';
import { Label, Input } from '@/components';
import styled from 'styled-components';
import { REGEX_FOR_VALIDATION } from '@/constants/validation';
import { InputNameType } from '@/@types/enum';

interface ApplyInputProps {
  title: string;
  name: InputNameType;
  placeholder: string;
  reg?: RegExp;
  regWhiteList?: boolean;
  validationBorder?: boolean;
  maxLength?: number;
  value?: string;
}
const ApplyInput = ({
  title,
  reg = new RegExp(''),
  regWhiteList = false,
  validationBorder = false,
  name,
  value,
  ...otherProps
}: ApplyInputProps) => {
  // console.log(value);
  return (
    <>
      <Label title={title} />
      <InputField
        reg={reg}
        regWhiteList={regWhiteList}
        validationBorder={validationBorder}
        name={name}
        value={value}
        {...otherProps}
      />
    </>
  );
};

export default ApplyInput;

const InputField = styled(Input)`
  border-top: none;
  border-left: none;
  border-right: none;
  margin-top: 10px;
`;
