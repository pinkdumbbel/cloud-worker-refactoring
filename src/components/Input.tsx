import React, { useState } from 'react';

import { formatString } from '@/utils/formatString';
import { InputNameType, InputNameEnum } from '@/@types/enum';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { applicantInfoState, applicantValidationState } from '@/recoil/atoms';

import styled from 'styled-components';
import { ChangeEventType } from '@/@types/react';
import { NOT_VALID_MESSAGE } from '@/constants/validation';
interface InputProps {
  name: InputNameType;
  type?: string;
  placeholder?: string;
  value?: string;
  maxLength?: number;

  validation?: boolean;
  readOnly?: boolean;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  placeholder,
  value,
  type,
  name,
  maxLength,
  validation,
  readOnly,
  onChange,
  onClick,
  onBlur,
}: InputProps) => {
  return (
    <Wrapper>
      <StyledInput
        name={name}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
        placeholder={placeholder}
        type={type || 'text'}
        value={value}
        maxLength={maxLength}
        readOnly={readOnly}
      />
      {!validation && <Message>{NOT_VALID_MESSAGE[name]}</Message>}
    </Wrapper>
  );
};

export default Input;

const Wrapper = styled.div`
  margin-bottom: 30px;
`;

const StyledInput = styled.input`
  border-bottom: 1px solid;

  width: 100%;
  height: 30px;

  ::placeholder {
    color: ${({ theme }) => theme.color.font.gray};
  }
`;

const Message = styled.p`
  margin-top: 10px;
  color: red;
`;
