import React, { useEffect } from 'react';
import styled from 'styled-components';
import RoundButton from '@/components/RoundButton';
import useToggleButton from '@/hooks/useToggleButton';
import {
  Transportations,
  TransportationType,
  ButtonTypeEnum,
  InputNameType,
} from '@/@types/enum';

import { useRecoilState } from 'recoil';
import { applicantInfoState, applicantValidationState } from '@/recoil/atoms';

interface TransportationListProps {
  className?: string;
  name: InputNameType;
}

const TransportationList = ({ className, name }: TransportationListProps) => {
  const { selectedList, onToggleButton } = useToggleButton<TransportationType>(
    ButtonTypeEnum.MULTIPLE
  );
  /* const [applicantInfo, setApplicantInfo] = useRecoilState(applicantInfoState);
  const [applicantValidation, setApplicantValidation] = useRecoilState(
    applicantValidationState
  );
  useEffect(() => {
    setApplicantInfo({ ...applicantInfo, transportation: selectedList });
    selectedList.length > 0
      ? setApplicantValidation({ ...applicantValidation, [name]: true })
      : setApplicantValidation({ ...applicantValidation, [name]: false });
  }, [selectedList]); */

  return (
    <Wrapper className={className}>
      {Transportations.map((transportation, index) => (
        <RoundButton
          key={index}
          showText={transportation}
          isClicked={selectedList.includes(transportation)}
          onClick={() => onToggleButton(transportation)}
        />
      ))}
    </Wrapper>
  );
};

export default React.memo(TransportationList);

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;
