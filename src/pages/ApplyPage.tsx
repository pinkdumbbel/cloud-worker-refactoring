import React, { useState, useEffect } from 'react';
import {
  Checkbox,
  RoundButton,
  RegionModal,
  Label,
  Input,
  TransportationList,
} from '@/components';
import { useNavigate } from 'react-router-dom';

import { ChangeEventType } from '@/@types/react';

import { useRecoilState } from 'recoil';
import {
  applicantInfoState,
  applicantValidationState,
  modalTriggerState,
} from '@/recoil/atoms';

import styled from 'styled-components';
import useApplicant from '@/hooks/useApplicant';
import SelectButton from '@/components/SelectButton';
import { CHECKBOX_LABEL_TEXT } from '@/constants';
import { UserInterface } from 'request';
import formatDate from '@/utils/formatDate';
import useApplyUserModel from '@/api/models/useApplyUserModel';
import {
  ContentType,
  ContentTypeEnum,
  InputNameEnum,
  InputNameType,
} from '@/@types/enum';
import moveScroll from '@/utils/moveScroll';
import Agreement from '@/components/Modal/Agreement';
import { REGEX_FOR_VALIDATION } from '@/constants/validation';

const ApplyPage = () => {
  const { postUser } = useApplyUserModel();
  const [isAgreement, setIsAgreement] = useState(false);
  const [contentType, setContentType] = useState<ContentType>('privacy');

  const [showModal, setShowModal] = useRecoilState<boolean>(modalTriggerState);
  const [applicantInfo, setApplicantInfo] = useRecoilState(applicantInfoState);
  const [applicantValidation, setApplicantValidation] = useRecoilState(
    applicantValidationState
  );

  const [isAgreements, setIsAgreements] = useState<boolean[]>([false, false]);
  const [isAllPassValidation, setIsAllPassValidation] =
    useState<boolean>(false);

  const [inputs, setInputs] = useState({
    name: '',
    birth: '',
    phone: '',
    email: '',
  });

  const [emailValidation, setEmailValidation] = useState(true);

  const handleClickedRegion = () => {
    setShowModal(true);
    moveScroll();
  };

  const handleClickedApplyButton = async () => {
    const data: UserInterface = {
      ...applicantInfo,
      applyDate: formatDate(new Date()),
      birth: applicantInfo.birth.replaceAll('.', '-'),
    };

    await postUser(data);
    window.location.replace('/landing');
  };

  const handleChangeAgreement = (event: ChangeEventType<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsAgreements((prev) => {
      return prev.map(() => checked);
    });
  };

  const handleChangeEachAgreement = (
    event: ChangeEventType<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;
    setIsAgreements((prev) => {
      const temp = [...prev];
      temp[Number(name)] = checked;
      return [...temp];
    });
  };

  const openAgreementModal = (index: number) => {
    const type: ContentType[] = ['privacy', 'thirdParty'];
    setContentType(type[index]);
    setIsAgreement(true);
  };

  const closeAgreementModal = () => {
    setIsAgreement(false);
  };

  const getFormattedString = (inputName: InputNameType, value: string) => {
    switch (inputName) {
      case InputNameEnum.BIRTH:
        return value
          .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, '$1.$2.$3')
          .replace(/\.{1,2}$/g, '');

      case InputNameEnum.PHONE:
        return value
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
          .replace(/\-{1,2}$/g, '');
    }
  };

  const checkValidation = (inputName: InputNameType, value: string) => {
    if (inputName === InputNameEnum.EMAIL) return value;

    return value.replace(REGEX_FOR_VALIDATION[inputName.toUpperCase()], '');
  };

  const onChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const inputName = name as InputNameType;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: getFormattedString(inputName, checkValidation(inputName, value)),
    }));
  };

  return (
    <div>
      <Title>크라우드 워커에 지원하기 위해 필요한 정보를 입력해 주세요</Title>

      <Label title="이름" />
      <Input
        reg={REGEX_FOR_VALIDATION.NAME}
        name="name"
        placeholder="홍길동 (한글만 입력 가능)"
        value={inputs.name}
        onChangeInputs={onChangeInputs}
      />

      <Label title="성별" />
      <SelectButton
        name="gender"
        labels={['여자', '남자']}
        onChange={onChangeInputs}
        values={['F', 'M']}
      />

      <Label title="생년월일" />
      <Input
        reg={REGEX_FOR_VALIDATION.BIRTH}
        name="birth"
        placeholder="YYYY.MM.DD"
        value={inputs.birth}
        onChangeInputs={onChangeInputs}
        maxLength={10}
      />

      <Label title="거주지역" />
      <Input name="birth" placeholder="거주지역 선택" />

      <Label title="연락처" />
      <Input
        reg={REGEX_FOR_VALIDATION.PHONE}
        name="phone"
        placeholder="'-'없이 입력해 주세요"
        value={inputs.phone}
        onChangeInputs={onChangeInputs}
        maxLength={13}
      />

      <Label title="이메일" />
      <Input
        reg={REGEX_FOR_VALIDATION.EMAIL}
        name="email"
        placeholder="MYD@snplab.com"
        type="email"
        value={inputs.email}
        onChangeInputs={onChangeInputs}
      />

      <Label title="주로 이용하는 교통수단" />
      <TransportationList name="transportation" />

      <AllAgreeRadio
        labels={['이용약관 모두 동의']}
        values={['yes']}
        type="checkbox"
        onChange={handleChangeAgreement}
        checked={
          isAgreements.filter((prev) => prev === true).length ===
          CHECKBOX_LABEL_TEXT.length
        }
      />
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
        onClick={handleClickedApplyButton}
      />
      {showModal && <RegionModal />}
      {isAgreement && (
        <Agreement close={closeAgreementModal} contentType={contentType} />
      )}
    </div>
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

const AllAgreeRadio = styled(SelectButton)`
  padding-left: 0px;
`;

const ApplyButton = styled(RoundButton)<{ disabled: boolean }>`
  margin-top: 30px;
  background-color: ${({ theme, disabled }) =>
    !disabled && theme.color.button.darkbrown};
  color: ${({ theme, disabled }) => !disabled && theme.color.font.white};
`;
