import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Checked } from '@/assets/icons';
import { ChangeEventType } from '@/@types/react';
import { useRecoilState } from 'recoil';
import { applicantInfoState } from '@/recoil/atoms';
import { InputNameType } from '@/@types/enum';

interface RadioProps {
  name?: InputNameType; //버튼 그룹. ex)성별 gender
  labels: string[]; //표면적 이름 ex)남자 or 여자
  values: string[]; //데이터값 ex) male or female
  className?: string;
  type?: string;
  onChange: (event: ChangeEventType<HTMLInputElement>) => void;
  checked?: boolean;
}

const SelectButton = ({
  name,
  labels,
  values,
  type = 'radio',
  className,
  onChange,
  checked = false,
}: RadioProps) => {
  return (
    <Wrapper className={className}>
      {labels.map((label, index) => (
        <RadioGroup key={index}>
          <input
            type="radio"
            name={name}
            id={values[index]}
            value={values[index]}
            onChange={onChange}
            {...(type === 'checkbox' && { checked })}
          />
          <label htmlFor={values[index]}>
            <Checked />
            {label}
          </label>
        </RadioGroup>
      ))}
    </Wrapper>
  );
};

export default SelectButton;

const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox('center', 'flex-start')};
  width: 100%;
  margin-top: 8px;
  margin-bottom: 30px;
`;
const RadioGroup = styled.div`
  display: flex;
  flex: 1;
  input {
    display: none;
    &:checked + label {
      color: ${({ theme }) => theme.color.font.black};
    }
    &:checked + label svg {
      fill: ${({ theme }) => theme.color.font.black};
    }
  }
  label {
    ${({ theme }) => theme.mixins.flexBox('center', 'flex-start')};
    color: ${({ theme }) => theme.color.font.gray};
  }
  svg {
    width: 1.3rem;
    margin-right: 10px;
    fill: ${({ theme }) => theme.color.font.gray};
  }
`;
