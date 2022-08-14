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

interface TransportationListProps {
  className?: string;
  name: InputNameType;
  onClickTransportation?: (
    event: React.MouseEvent<HTMLButtonElement>,
    transportation: TransportationType
  ) => void;
  transportationList?: TransportationType[];
}

const TransportationList = ({
  className,
  onClickTransportation,
  transportationList,
}: TransportationListProps) => {
  if (!transportationList || !onClickTransportation) return null;

  return (
    <Wrapper className={className}>
      {Transportations.map((transportation, index) => (
        <RoundButton
          key={index}
          showText={transportation}
          isClicked={transportationList.includes(transportation)}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            onClickTransportation(event, transportation)
          }
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
