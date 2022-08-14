import React from 'react';
import {
  Checkbox,
  RoundButton,
  RegionModal,
  Label,
  Input,
  TransportationList,
} from '@/components';
import styled from 'styled-components';
import SelectButton from '@/components/SelectButton';
import { CHECKBOX_LABEL_TEXT } from '@/constants';
import Agreement from '@/components/Modal/Agreement';
import useApplicant from '@/hooks/useApplicant';
import { InputNameEnum, InputNameType } from '@/@types/enum';

const ApplyPage = () => {
  const {
    handleSubmit,
    showModal,
    isAgreements,
    handleChangeEachAgreement,
    isAllPassValidation,
    isAgreement,
    openAgreementModal,
    closeAgreementModal,
    contentType,
    inputs,
  } = useApplicant();

  return (
    <form onSubmit={handleSubmit}>
      <Title>크라우드 워커에 지원하기 위해 필요한 정보를 입력해 주세요</Title>
      {inputs.map(
        (
          {
            title,
            name,
            placeholder,
            value,
            values,
            transportationList,
            validation,
            readOnly,
            labels,
            maxLength,
            onChange,
            onClick,
            onBlur,
            onClickTransportation,
            checked,
            type,
          },
          index
        ) => {
          const LabelComponent = title ? <Label title={title} /> : null;
          if (
            name === InputNameEnum.GENDER ||
            name === InputNameEnum.AGREEMENT
          ) {
            return (
              <React.Fragment key={index}>
                {LabelComponent}
                <SelectButton
                  {...(name && { name })}
                  {...(type && { type })}
                  {...(checked && { checked })}
                  labels={labels as string[]}
                  values={values as string[]}
                  onChange={onChange}
                />
              </React.Fragment>
            );
          }
          if (name === InputNameEnum.TRANSPORTATION) {
            return (
              <React.Fragment key={index}>
                {LabelComponent}
                <TransportationList
                  name={name}
                  onClickTransportation={onClickTransportation}
                  transportationList={transportationList}
                />
              </React.Fragment>
            );
          }
          return (
            <React.Fragment key={index}>
              {LabelComponent}
              <Input
                name={name as InputNameType}
                placeholder={placeholder}
                value={value}
                readOnly={readOnly}
                {...(validation !== undefined && { validation })}
                {...(maxLength && { maxLength })}
                {...(onChange && { onChange })}
                {...(onClick && { onClick })}
                {...(onBlur && { onBlur })}
              />
            </React.Fragment>
          );
        }
      )}

      <Hr />
      {CHECKBOX_LABEL_TEXT.map((label, index) => {
        return (
          <Checkbox
            key={label}
            labelText={label}
            name={index.toString()}
            checked={isAgreements[index]}
            onChange={handleChangeEachAgreement}
            openAgreementModal={openAgreementModal}
          />
        );
      })}

      <ApplyButton
        showText="지원하기"
        width="100%"
        borderRadius="8px"
        padding="15px 13px"
        disabled={!isAllPassValidation}
      />
      {showModal && <RegionModal />}
      {isAgreement && (
        <Agreement close={closeAgreementModal} contentType={contentType} />
      )}
    </form>
  );
};

export default ApplyPage;

const Hr = styled.hr`
  border: 1px solid black;
`;
const Title = styled.h1`
  width: 270px;
  font-size: 1.2rem;
  margin-bottom: 35px;
`;

const ApplyButton = styled(RoundButton)<{ disabled: boolean }>`
  margin-top: 30px;
  background-color: ${({ theme, disabled }) =>
    !disabled && theme.color.button.darkbrown};
  color: ${({ theme, disabled }) => !disabled && theme.color.font.white};
`;
