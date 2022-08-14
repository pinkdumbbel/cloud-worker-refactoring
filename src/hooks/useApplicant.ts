import { useEffect, useState } from 'react';
import useApplyUserModel from '@/api/models/useApplyUserModel';
import { REGEX_FOR_VALIDATION } from '@/constants/validation';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  applicantInfoState,
  applicantRegionState,
  applicantValidationState,
  modalTriggerState,
} from '@/recoil/atoms';
import moveScroll from '@/utils/moveScroll';
import { UserInterface } from 'request';
import formatDate from '@/utils/formatDate';
import { ChangeEventType } from '@/@types/react';
import {
  ContentType,
  InputNameEnum,
  InputNameOmitKeyType,
  InputNameType,
  TransportationType,
} from '@/@types/enum';
import { InputDataInterface } from '@/@types/input';
import { CHECKBOX_LABEL_TEXT } from '@/constants';

const useApplicant = () => {
  const { postUser } = useApplyUserModel();
  const navigate = useNavigate();
  const [isAgreement, setIsAgreement] = useState(false);
  const [contentType, setContentType] = useState<ContentType>('privacy');

  const [showModal, setShowModal] = useRecoilState<boolean>(modalTriggerState);
  const [applicantInfo, setApplicantInfo] = useRecoilState(applicantInfoState);
  const applicantRegion = useRecoilValue(applicantRegionState);
  const [applicantValidation, setApplicantValidation] = useRecoilState(
    applicantValidationState
  );
  const resetApplicantInfo = useResetRecoilState(applicantInfoState);
  const [isAgreements, setIsAgreements] = useState<boolean[]>([false, false]);
  const [isAllPassValidation, setIsAllPassValidation] =
    useState<boolean>(false);

  const handleClickedRegion = () => {
    setShowModal(true);
    moveScroll();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: UserInterface = {
      id: 0,
      ...applicantInfo,
      applyDate: formatDate(new Date()),
      birth: applicantInfo.birth.replaceAll('.', '-'),
      isWinning: false,
      region: {
        city: applicantRegion.city,
        district: applicantRegion.district,
      },
    };

    await postUser(data);
    resetApplicantInfo();
    navigate('/landing');
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

      default:
        return value;
    }
  };

  const getUpperInputName = (inputName: InputNameType) => {
    return inputName.toUpperCase() as InputNameOmitKeyType;
  };

  const preventNotValidInput = (inputName: InputNameType, value: string) => {
    if (inputName === InputNameEnum.EMAIL) {
      return value;
    }
    return value.replace(
      REGEX_FOR_VALIDATION[getUpperInputName(inputName)],
      ''
    );
  };

  const setInputValidation = (inputName: InputNameType, value: string) => {
    switch (inputName) {
      case InputNameEnum.GENDER || InputNameEnum.EMAIL:
        return;
      case InputNameEnum.BIRTH:
        value = value.replaceAll('.', '');
        break;
      case InputNameEnum.PHONE:
        value = value.replaceAll('-', '');
        break;
    }

    const validation =
      value.length <= 1
        ? !REGEX_FOR_VALIDATION[getUpperInputName(inputName)].test(value)
        : true;
    setApplicantValidation((prevValidation) => {
      return {
        ...prevValidation,
        [inputName]: validation,
      };
    });
  };

  const onChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const inputName = name as InputNameType;

    setInputValidation(inputName, value);
    setApplicantInfo((prevInfo) => ({
      ...prevInfo,
      [name]: getFormattedString(
        inputName,
        preventNotValidInput(inputName, value)
      ),
    }));
  };

  const onClickTransportation = (
    event: React.MouseEvent<HTMLButtonElement>,
    transportation: TransportationType
  ) => {
    event.preventDefault();
    const selectedIndex = applicantInfo.transportation.indexOf(transportation);
    if (selectedIndex >= 0) {
      setApplicantInfo((prevInfo) => {
        return {
          ...prevInfo,
          transportation: prevInfo.transportation.filter(
            (_, index) => selectedIndex !== index
          ),
        };
      });

      return;
    }
    setApplicantInfo((prevInfo) => ({
      ...prevInfo,
      transportation: [...prevInfo.transportation, transportation],
    }));
  };

  const onEmailBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setApplicantValidation((prevValidation) => ({
      ...prevValidation,
      email: REGEX_FOR_VALIDATION.EMAIL.test(value),
    }));
  };

  const checkValidation = () => {
    const hasValue = Object.values(applicantInfo).every(
      (info) => info.length > 0
    );
    console.log(`hasValue:${hasValue} `);
    console.log(applicantInfo);
    const isValidation = Object.values(applicantValidation).every(
      (validation) => validation
    );
    console.log(`isValidation:${isValidation}`);
    const isAgreement = isAgreements.every((agreement) => agreement);
    console.log(`isAgreement:${isAgreement}`);
    return hasValue && isValidation && isAgreement;
  };

  const inputs: InputDataInterface[] = [
    {
      title: '이름',
      name: 'name',
      placeholder: '홍길동 (한글만 입력 가능)',
      value: applicantInfo.name,
      onChange: onChangeInputs,
      validation: applicantValidation.name,
      readOnly: false,
    },
    {
      title: '성별',
      name: 'gender',
      labels: ['여자', '남자'],
      onChange: onChangeInputs,
      values: ['F', 'M'],
    },
    {
      title: '생년월일',
      name: 'birth',
      placeholder: 'YYYY.MM.DD',
      value: applicantInfo.birth,
      onChange: onChangeInputs,
      validation: applicantValidation.birth,
      maxLength: 10,
      readOnly: false,
    },
    {
      title: '거주지역',
      name: 'region',
      placeholder: '거주지역 선택',
      value:
        !showModal && applicantRegion.district
          ? `${applicantRegion.city} ${applicantRegion.district}`
          : '',
      onClick: handleClickedRegion,
      readOnly: true,
    },
    {
      title: '연락처',
      name: 'phone',
      placeholder: "'-'없이 입력해 주세요",
      value: applicantInfo.phone,
      onChange: onChangeInputs,
      validation: applicantValidation.phone,
      maxLength: 13,
      readOnly: false,
    },
    {
      title: '이메일',
      name: 'email',
      placeholder: 'MYD@snplab.com',
      value: applicantInfo.email,
      validation: applicantValidation.email,
      onChange: onChangeInputs,
      onBlur: onEmailBlur,
      readOnly: false,
    },
    {
      name: 'transportation',
      title: '주로 이용하는 교통수단',
      onClickTransportation,
      transportationList: applicantInfo.transportation,
    },
    {
      name: 'agreement',
      labels: ['이용약관 모두 동의'],
      onChange: handleChangeAgreement,
      values: ['yes'],
      type: 'checkbox',
      checked:
        isAgreements.filter((prev) => prev === true).length ===
        CHECKBOX_LABEL_TEXT.length,
    },
  ];
  useEffect(() => {
    setIsAllPassValidation(checkValidation());
  }, [applicantInfo, isAgreements]);

  return {
    handleSubmit,
    applicantInfo,
    onChangeInputs,
    applicantValidation,
    handleClickedRegion,
    showModal,
    applicantRegion,
    onEmailBlur,
    onClickTransportation,
    handleChangeAgreement,
    isAgreements,
    handleChangeEachAgreement,
    openAgreementModal,
    isAllPassValidation,
    isAgreement,
    closeAgreementModal,
    contentType,
    inputs,
  };
};

export default useApplicant;
